from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import translate

app = FastAPI(
    title="Maritda API",
    description="AI 자막 번역 및 편집 서비스 '말잇다'의 API 문서입니다.",
    version="1.0.0",
)

# CORS 설정
origins = [
    "http://localhost:5173", # 프론트엔드 개발 서버 주소
    "http://localhost:5174", # 포트 변경 시
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(translate.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to Maritda API"}