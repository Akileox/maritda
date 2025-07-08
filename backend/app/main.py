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
    # 개발 환경 (Vite, CRA, 기타)
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://127.0.0.1",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8080",
    "http://127.0.0.1:5176",
    # 배포 환경 (Vercel 프론트엔드 주소 추가)
    "https://maritda.vercel.app",
    # 필요시 커스텀 도메인도 추가
    # "https://your-custom-domain.com",
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