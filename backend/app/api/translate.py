from fastapi import APIRouter, File, UploadFile, Form, Depends, HTTPException
from app.services import translator_service
from app.models.schemas import TranslationResponse
import logging
from fastapi.responses import StreamingResponse
import io
from app.auth import verify_firebase_token

router = APIRouter(
    tags=["Translations"],
)

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS = {'.srt', '.ass'}
ALLOWED_MIME = {'text/plain', 'application/octet-stream'}

@router.post("/translate", response_model=TranslationResponse)
async def create_translation(
    file: UploadFile = File(...),
    source_lang: str = Form(...),
    dest_lang: str = Form(...),
    user=Depends(verify_firebase_token)
):
    """
    자막 파일을 받아 번역을 수행하는 엔드포인트.
    - file: multipart/form-data 로 전송된 자막 파일
    - source_lang: 원본 언어 코드
    - dest_lang: 목표 언어 코드
    """
    import os
    ext = os.path.splitext(file.filename)[-1].lower()
    try:
        if ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(status_code=400, detail={
                "error_stage": "validate_extension",
                "reason": "unsupported_extension",
                "detail": f"지원하지 않는 파일 확장자: {ext}",
                "filename": file.filename
            })
        file.file.seek(0, 2)
        size = file.file.tell()
        file.file.seek(0)
        if size > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail={
                "error_stage": "validate_size",
                "reason": "file_too_large",
                "detail": f"파일 용량 초과: {size} bytes (최대 10MB)",
                "filename": file.filename
            })
        if file.content_type not in ALLOWED_MIME:
            raise HTTPException(status_code=400, detail={
                "error_stage": "validate_mime",
                "reason": "unsupported_mime",
                "detail": f"지원하지 않는 MIME 타입: {file.content_type}",
                "filename": file.filename
            })
        try:
            translated_text = translator_service.translate_subtitle(
                file=file,
                source_lang=source_lang,
                dest_lang=dest_lang
            )
            return TranslationResponse(translated_content=translated_text)
        except Exception as e:
            logging.exception(f"[API][create_translation] 번역 처리 중 예외 발생: {e} (filename={file.filename}, source_lang={source_lang}, dest_lang={dest_lang})")
            raise HTTPException(status_code=500, detail={
                "error_stage": "translate_subtitle",
                "reason": type(e).__name__,
                "detail": str(e),
                "filename": file.filename,
                "source_lang": source_lang,
                "dest_lang": dest_lang
            })
    except HTTPException as he:
        logging.warning(f"[API][create_translation] 요청 검증 실패: {he.detail}")
        raise
    except Exception as e:
        logging.exception(f"[API][create_translation] 알 수 없는 예외: {e} (filename={file.filename})")
        raise HTTPException(status_code=500, detail={
            "error_stage": "unknown",
            "reason": type(e).__name__,
            "detail": str(e),
            "filename": file.filename
        })

@router.post("/translate/download")
async def download_translation(
    file: UploadFile = File(...),
    source_lang: str = Form(...),
    dest_lang: str = Form(...),
    user=Depends(verify_firebase_token)
):
    import os
    ext = os.path.splitext(file.filename)[-1].lower()
    try:
        if ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(status_code=400, detail={
                "error_stage": "validate_extension",
                "reason": "unsupported_extension",
                "detail": f"지원하지 않는 파일 확장자: {ext}",
                "filename": file.filename
            })
        file.file.seek(0, 2)
        size = file.file.tell()
        file.file.seek(0)
        if size > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail={
                "error_stage": "validate_size",
                "reason": "file_too_large",
                "detail": f"파일 용량 초과: {size} bytes (최대 10MB)",
                "filename": file.filename
            })
        if file.content_type not in ALLOWED_MIME:
            raise HTTPException(status_code=400, detail={
                "error_stage": "validate_mime",
                "reason": "unsupported_mime",
                "detail": f"지원하지 않는 MIME 타입: {file.content_type}",
                "filename": file.filename
            })
        try:
            translated_text = translator_service.translate_subtitle(
                file=file,
                source_lang=source_lang,
                dest_lang=dest_lang
            )
            base, ext = os.path.splitext(file.filename)
            download_name = f"{base}_translated{ext}"
            return StreamingResponse(
                io.BytesIO(translated_text.encode("utf-8")),
                media_type="text/plain",
                headers={
                    "Content-Disposition": f"attachment; filename={download_name}"
                }
            )
        except Exception as e:
            logging.exception(f"[API][download_translation] 번역 처리 중 예외 발생: {e} (filename={file.filename}, source_lang={source_lang}, dest_lang={dest_lang})")
            raise HTTPException(status_code=500, detail={
                "error_stage": "translate_subtitle",
                "reason": type(e).__name__,
                "detail": str(e),
                "filename": file.filename,
                "source_lang": source_lang,
                "dest_lang": dest_lang
            })
    except HTTPException as he:
        logging.warning(f"[API][download_translation] 요청 검증 실패: {he.detail}")
        raise
    except Exception as e:
        logging.exception(f"[API][download_translation] 알 수 없는 예외: {e} (filename={file.filename})")
        raise HTTPException(status_code=500, detail={
            "error_stage": "unknown",
            "reason": type(e).__name__,
            "detail": str(e),
            "filename": file.filename
        }) 