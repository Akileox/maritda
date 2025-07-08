from pydantic import BaseModel

class TranslationRequest(BaseModel):
    source_lang: str
    dest_lang: str

class TranslationResponse(BaseModel):
    translated_content: str 

class ErrorResponse(BaseModel):
    error_stage: str
    reason: str
    detail: str
    filename: str = None
    source_lang: str = None
    dest_lang: str = None 