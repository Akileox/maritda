import pytest
from backend.app.services.translator_service import (
    parse_srt_file, parse_ass_file, group_blocks, rebuild_srt_file, rebuild_ass_file, SubtitleBlock
)
import logging

SRT_SAMPLE = (
    "1\n00:00:09,464 --> 00:00:13,464\n(飛行機の音)\n"
    "\n"
    "2\n00:00:16,471 --> 00:00:22,477\n♬～\n"
    "\n"
    "3\n00:00:22,477 --> 00:00:25,480\n(曽根崎裕子)たった今\n血液検査の結果が出ました｡\n"
    "\n"
    "4\n00:00:25,480 --> 00:00:30,485\n関西空港で検疫を受けた\n赤井逸郎という男性です｡\n"
    "\n"
    "5\n00:00:30,485 --> 00:00:35,490\n(裕子)間違いありません｡\nｱﾙﾀｲﾗ出血熱に感染してます｡\n"
    "\n"
)

ASS_SAMPLE = '''[Script Info]\nTitle: Sample\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Default,Arial,20,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,2,0,2,10,10,10,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\nDialogue: 0,0:00:01.00,0:00:03.00,Default,,0,0,0,,Hello world!\nDialogue: 0,0:00:04.00,0:00:06.00,Default,,0,0,0,,This is a test.\n'''

def test_parse_srt_file():
    try:
        blocks = parse_srt_file(SRT_SAMPLE)
        assert len(blocks) == 5, f"SRT 블록 개수 불일치: 기대=5, 실제={len(blocks)}"
        assert blocks[0].text == '(飛行機の音)', f"1번째 블록 텍스트 불일치: {blocks[0].text}"
        assert blocks[1].text == '♬～', f"2번째 블록 텍스트 불일치: {blocks[1].text}"
        assert blocks[2].text == '(曽根崎裕子)たった今\n血液検査の結果が出ました｡', f"3번째 블록 텍스트 불일치: {blocks[2].text}"
        assert blocks[3].text == '関西空港で検疫を受けた\n赤井逸郎という男性です｡', f"4번째 블록 텍스트 불일치: {blocks[3].text}"
        assert blocks[4].text == '(裕子)間違いありません｡\nｱﾙﾀｲﾗ出血熱に感染してます｡', f"5번째 블록 텍스트 불일치: {blocks[4].text}"
    except Exception as e:
        logging.exception(f"[test_parse_srt_file] 테스트 실패: {e}")
        raise

def test_group_blocks():
    try:
        blocks = parse_srt_file(SRT_SAMPLE)
        groups = group_blocks(blocks, group_limit=20)
        assert len(groups) == 4, f"그룹 개수 불일치: 기대=4, 실제={len(groups)}"
    except Exception as e:
        logging.exception(f"[test_group_blocks] 테스트 실패: {e}")
        raise

def test_rebuild_srt_file():
    try:
        blocks = parse_srt_file(SRT_SAMPLE)
        translated = ['안녕 세상!', '이것은 테스트입니다.']
        srt = rebuild_srt_file(blocks, translated)
        assert '안녕 세상!' in srt, f"'안녕 세상!'이 SRT에 없음: {srt}"
        assert '이것은 테스트입니다.' in srt, f"'이것은 테스트입니다.'가 SRT에 없음: {srt}"
    except Exception as e:
        logging.exception(f"[test_rebuild_srt_file] 테스트 실패: {e}")
        raise

def test_parse_ass_file():
    try:
        blocks = parse_ass_file(ASS_SAMPLE)
        assert len(blocks) == 2, f"ASS 블록 개수 불일치: 기대=2, 실제={len(blocks)}"
        assert blocks[0].text == 'Hello world!', f"1번째 블록 텍스트 불일치: {blocks[0].text}"
        assert blocks[1].text == 'This is a test.', f"2번째 블록 텍스트 불일치: {blocks[1].text}"
    except Exception as e:
        logging.exception(f"[test_parse_ass_file] 테스트 실패: {e}")
        raise

def test_rebuild_ass_file():
    try:
        blocks = parse_ass_file(ASS_SAMPLE)
        translated = ['안녕 세상!', '이것은 테스트입니다.']
        ass = rebuild_ass_file(ASS_SAMPLE, blocks, translated)
        assert '안녕 세상!' in ass, f"'안녕 세상!'이 ASS에 없음: {ass}"
        assert '이것은 테스트입니다.' in ass, f"'이것은 테스트입니다.'가 ASS에 없음: {ass}"
    except Exception as e:
        logging.exception(f"[test_rebuild_ass_file] 테스트 실패: {e}")
        raise 