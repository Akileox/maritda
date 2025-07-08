import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../..')))
from backend.app.services.translator_service import (
    parse_srt_file, parse_ass_file, group_blocks, rebuild_srt_file, rebuild_ass_file, SubtitleBlock
)

SRT_SAMPLE = (
    "1\n00:00:01,000 --> 00:00:03,000\nHello world!\n\n"
    "2\n00:00:04,000 --> 00:00:06,000\nThis is a test.\n\n"
)

ASS_SAMPLE = '''[Script Info]\nTitle: Sample\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Default,Arial,20,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,2,0,2,10,10,10,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\nDialogue: 0,0:00:01.00,0:00:03.00,Default,,0,0,0,,Hello world!\nDialogue: 0,0:00:04.00,0:00:06.00,Default,,0,0,0,,This is a test.\n'''

def test_parse_srt_file():
    blocks = parse_srt_file(SRT_SAMPLE)
    assert len(blocks) == 2
    assert blocks[0].text == 'Hello world!'
    assert blocks[1].text == 'This is a test.'

def test_group_blocks():
    blocks = parse_srt_file(SRT_SAMPLE)
    groups = group_blocks(blocks, group_limit=20)
    assert len(groups) == 2  # 각 블록이 20자 이하이므로 그룹 2개

def test_rebuild_srt_file():
    blocks = parse_srt_file(SRT_SAMPLE)
    translated = ['안녕 세상!', '이것은 테스트입니다.']
    srt = rebuild_srt_file(blocks, translated)
    assert '안녕 세상!' in srt
    assert '이것은 테스트입니다.' in srt

def test_parse_ass_file():
    blocks = parse_ass_file(ASS_SAMPLE)
    assert len(blocks) == 2
    assert blocks[0].text == 'Hello world!'
    assert blocks[1].text == 'This is a test.'

def test_rebuild_ass_file():
    blocks = parse_ass_file(ASS_SAMPLE)
    translated = ['안녕 세상!', '이것은 테스트입니다.']
    ass = rebuild_ass_file(ASS_SAMPLE, blocks, translated)
    assert '안녕 세상!' in ass
    assert '이것은 테스트입니다.' in ass 