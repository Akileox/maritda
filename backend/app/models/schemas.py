from pydantic import BaseModel

class TranslationRequest(BaseModel):
    source_lang: str
    dest_lang: str

class TranslationResponse(BaseModel):
    translated_content: str 