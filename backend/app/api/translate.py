from fastapi import APIRouter, File, UploadFile, Form, Depends
from app.services import translator_service
from app.models.schemas import TranslationResponse

router = APIRouter(
    tags=["Translations"],
)

@router.post("/translate", response_model=TranslationResponse)
async def create_translation(
    file: UploadFile = File(...),
    source_lang: str = Form(...),
    dest_lang: str = Form(...)
):
    """
    자막 파일을 받아 번역을 수행하는 엔드포인트.
    - file: multipart/form-data 로 전송된 자막 파일
    - source_lang: 원본 언어 코드
    - dest_lang: 목표 언어 코드
    """
    translated_text = translator_service.translate_subtitle(
        file=file,
        source_lang=source_lang,
        dest_lang=dest_lang
    )
    return TranslationResponse(translated_content=translated_text) 