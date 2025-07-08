from typing import List
import re

def parse_srt_file(file_content: str) -> List[SubtitleBlock]:
    """
    SRT 파일을 파싱하여 SubtitleBlock 리스트로 반환 (줄바꿈 정규화 + split 방식)
    """
    content = file_content.replace('\r\n', '\n').replace('\r', '\n')
    blocks = []
    for block in content.strip().split('\n\n'):
        lines = block.strip().split('\n')
        if len(lines) >= 3:
            idx = lines[0]
            timeline = lines[1]
            text = '\n'.join(lines[2:])
            blocks.append(SubtitleBlock(int(idx), timeline.strip(), text.strip()))
    return blocks 