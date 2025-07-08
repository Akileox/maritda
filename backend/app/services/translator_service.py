from fastapi import UploadFile
from typing import List
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import random
import logging

# 자막 블록 데이터 구조 정의
class SubtitleBlock:
    def __init__(self, index: int, timeline: str, text: str):
        self.index = index
        self.timeline = timeline
        self.text = text

    def __repr__(self):
        return f"SubtitleBlock({self.index}, {self.timeline}, {self.text[:30]}...)"

logging.basicConfig(level=logging.INFO, format='[%(levelname)s][%(asctime)s][%(module)s] %(message)s')

def parse_srt_file(file_content: str) -> List[SubtitleBlock]:
    """
    SRT 파일을 robust하게 파싱하여 SubtitleBlock 리스트로 반환
    """
    blocks = []
    for block_num, block in enumerate(re.split(r'\n{2,}', file_content.strip()), 1):
        try:
            lines = block.strip().split('\n')
            if len(lines) >= 3:
                idx = int(lines[0].lstrip('\ufeff').strip())
                timeline = lines[1]
                text = '\n'.join(lines[2:])
                blocks.append(SubtitleBlock(idx, timeline, text))
            else:
                logging.warning(f"[parse_srt_file] {block_num}번째 블록: 줄 개수 부족 (lines={lines})")
        except Exception as e:
            logging.exception(f"[parse_srt_file] {block_num}번째 블록 파싱 실패: {e} (block={block})")
            raise ValueError(f"SRT 파싱 실패: {block_num}번째 블록에서 오류: {e}")
    return blocks

def group_blocks(blocks: List[SubtitleBlock], group_limit: int = 2800) -> List[List[SubtitleBlock]]:
    """
    2800자 이하로 여러 블록을 그룹핑
    """
    groups = []
    current_group = []
    current_len = 0
    for i, block in enumerate(blocks):
        block_len = len(block.text)
        if current_len + block_len > group_limit:
            if not current_group:
                logging.warning(f"[group_blocks] {i}번째 블록: 단일 블록이 group_limit({group_limit}) 초과")
            groups.append(current_group)
            current_group = []
            current_len = 0
        current_group.append(block)
        current_len += block_len
    if current_group:
        groups.append(current_group)
    logging.info(f"[group_blocks] 총 {len(groups)}개 그룹 생성 (group_limit={group_limit})")
    return groups

# 향후 셀레니움 번역 연동을 위한 스켈레톤
class PapagoSeleniumTranslator:
    def __init__(self, headless=True):
        chrome_options = Options()
        if headless:
            chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1280,800')
        chrome_options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
        try:
            service = Service(ChromeDriverManager().install())
            self.driver = webdriver.Chrome(service=service, options=chrome_options)
            self.url = 'https://papago.naver.com/'
        except Exception as e:
            logging.exception(f"[PapagoSeleniumTranslator.__init__] WebDriver 생성 실패: {e}")
            raise RuntimeError(f"PapagoSeleniumTranslator 초기화 실패: {e}")

    def translate(self, text: str) -> str:
        try:
            self.driver.get(self.url)
            time.sleep(2)
            # 입력창, 번역 버튼, 결과창 셀렉터 (2024년 기준)
            textarea = self.driver.find_element(By.CSS_SELECTOR, 'textarea#txtSource')
            textarea.clear()
            textarea.send_keys(text)
            btn = self.driver.find_element(By.CSS_SELECTOR, 'button#btnTranslate')
            btn.click()
            for _ in range(20):
                time.sleep(0.5)
                result_area = self.driver.find_element(By.CSS_SELECTOR, 'div#txtTarget')
                result = result_area.text.strip()
                if result:
                    break
            else:
                logging.error(f"[PapagoSeleniumTranslator.translate] 번역 결과를 찾을 수 없음 (text={text[:30]}...)")
                raise Exception('번역 결과를 찾을 수 없음')
            delay = random.uniform(5, 7)
            time.sleep(delay)
            if 'captcha' in self.driver.page_source.lower():
                logging.error(f"[PapagoSeleniumTranslator.translate] CAPTCHA 감지 (text={text[:30]}...)")
                raise Exception('CAPTCHA detected!')
            return result
        except Exception as e:
            logging.exception(f"[PapagoSeleniumTranslator.translate] 번역 자동화 실패: {e} (text={text[:30]}...)")
            raise Exception(f'Papago 번역 자동화 실패: {e}')

    def close(self):
        self.driver.quit()

def parse_ass_file(file_content: str) -> List[SubtitleBlock]:
    """
    ASS 파일을 파싱하여 SubtitleBlock 리스트로 반환
    """
    blocks = []
    in_events = False
    for line_num, line in enumerate(file_content.splitlines(), 1):
        try:
            if line.strip().startswith('[Events]'):
                in_events = True
            elif in_events and line.strip().startswith('Dialogue:'):
                parts = line.split(',', 9)
                if len(parts) >= 10:
                    text = parts[9]
                    blocks.append(SubtitleBlock(index=len(blocks)+1, timeline=parts[1], text=text))
                else:
                    logging.warning(f"[parse_ass_file] {line_num}번째 줄: Dialogue 파싱 실패 (parts={parts})")
        except Exception as e:
            logging.exception(f"[parse_ass_file] {line_num}번째 줄 파싱 실패: {e} (line={line})")
            raise ValueError(f"ASS 파싱 실패: {line_num}번째 줄에서 오류: {e}")
    return blocks

def parse_subtitle_file(file_content: str, filename: str) -> List[SubtitleBlock]:
    """
    파일 확장자에 따라 SRT/ASS 파싱 자동 선택
    """
    try:
        if filename.lower().endswith('.srt'):
            return parse_srt_file(file_content)
        elif filename.lower().endswith('.ass'):
            return parse_ass_file(file_content)
        else:
            logging.error(f"[parse_subtitle_file] 지원하지 않는 자막 파일 형식: {filename}")
            raise ValueError('지원하지 않는 자막 파일 형식입니다.')
    except Exception as e:
        logging.exception(f"[parse_subtitle_file] 파일 파싱 실패: {filename}, {e}")
        raise

def translate_blocks(block_groups: List[List[SubtitleBlock]], translator: PapagoSeleniumTranslator, max_retry: int = 2) -> List[str]:
    """
    각 그룹별로 순차적으로 번역(실패 시 최대 max_retry 재시도)
    번역 결과를 블록별로 분할하여 리스트로 반환
    """
    translated_texts = []
    for i, group in enumerate(block_groups):
        group_text = '\n'.join([block.text for block in group])
        for attempt in range(1, max_retry+2):
            try:
                result = translator.translate(group_text)
                lines = result.split('\n')
                if len(lines) != len(group):
                    logging.error(f"[translate_blocks] 그룹 {i+1}: 블록 개수 불일치 (기대={len(group)}, 결과={len(lines)})")
                    raise Exception(f"블록 개수 불일치: 기대={len(group)}, 결과={len(lines)}")
                translated_texts.extend(lines)
                logging.info(f"[translate_blocks] 그룹 {i+1}/{len(block_groups)} 번역 성공 (시도 {attempt})")
                break
            except Exception as e:
                logging.warning(f"[translate_blocks] 그룹 {i+1}/{len(block_groups)} 번역 실패 (시도 {attempt}): {e}")
                if attempt == max_retry+1:
                    translated_texts.extend(["[번역실패]"] * len(group))
    return translated_texts

def rebuild_srt_file(blocks: List[SubtitleBlock], translated_texts: List[str]) -> str:
    """
    번역된 텍스트를 원래 SRT 구조에 맞게 조립
    """
    try:
        lines = []
        for i, (block, text) in enumerate(zip(blocks, translated_texts)):
            lines.append(str(block.index))
            lines.append(block.timeline)
            lines.append(text)
            lines.append('')
        if len(blocks) != len(translated_texts):
            logging.error(f"[rebuild_srt_file] 블록/번역 개수 불일치 (blocks={len(blocks)}, translated={len(translated_texts)})")
            raise ValueError(f"블록/번역 개수 불일치: blocks={len(blocks)}, translated={len(translated_texts)}")
        return '\n'.join(lines)
    except Exception as e:
        logging.exception(f"[rebuild_srt_file] SRT 재조립 실패: {e}")
        raise

def rebuild_ass_file(original_content: str, blocks: List[SubtitleBlock], translated_texts: List[str]) -> str:
    """
    번역된 텍스트를 원래 ASS 구조에 맞게 삽입
    """
    try:
        result = []
        in_events = False
        block_idx = 0
        for line_num, line in enumerate(original_content.splitlines(), 1):
            if line.strip().startswith('[Events]'):
                in_events = True
                result.append(line)
            elif in_events and line.strip().startswith('Dialogue:') and block_idx < len(translated_texts):
                parts = line.split(',', 9)
                if len(parts) >= 10:
                    parts[9] = translated_texts[block_idx]
                    block_idx += 1
                    result.append(','.join(parts))
                else:
                    result.append(line)
            else:
                result.append(line)
        if block_idx != len(translated_texts):
            logging.error(f"[rebuild_ass_file] 번역 텍스트 개수 불일치 (block_idx={block_idx}, translated={len(translated_texts)})")
            raise ValueError(f"ASS 재조립 실패: 번역 텍스트 개수 불일치")
        return '\n'.join(result)
    except Exception as e:
        logging.exception(f"[rebuild_ass_file] ASS 재조립 실패: {e}")
        raise

def translate_subtitle(file: UploadFile, source_lang: str, dest_lang: str) -> str:
    """
    SRT/ASS 파일 파싱, 그룹핑, 셀레니움 번역 연동, 결과 조립
    """
    try:
        content = file.file.read().decode('utf-8')
        blocks = parse_subtitle_file(content, file.filename)
        groups = group_blocks(blocks)
        translator = PapagoSeleniumTranslator(headless=True)
        try:
            translated_texts = translate_blocks(groups, translator)
        finally:
            translator.close()
        # 결과 조립
        if file.filename.lower().endswith('.srt'):
            return rebuild_srt_file(blocks, translated_texts)
        elif file.filename.lower().endswith('.ass'):
            return rebuild_ass_file(content, blocks, translated_texts)
        else:
            logging.error(f"[translate_subtitle] 지원하지 않는 자막 파일 형식: {file.filename}")
            raise ValueError('지원하지 않는 자막 파일 형식입니다.')
    except Exception as e:
        logging.exception(f"[translate_subtitle] 전체 파이프라인 실패: {e} (file={getattr(file, 'filename', None)})")
        raise 