# Maritda: 서비스 기획서 (Master Plan v1.0)

> **한 줄 요약:** AI 어시스턴트를 탑재한 지능형 자막 번역 및 편집 웹 서비스

---

## 1. 프로젝트 개요

### 1.1. 프로젝트명
* Maritda (말잇다)

### 1.2. 최종 목표
단순 번역을 넘어, 사용자의 작업 스타일과 콘텐츠의 특성까지 이해하는 개인화된 AI 어시스턴트를 통해, 누구나 전문가 수준의 자막을 가장 효율적으로 제작할 수 있는 웹 기반 솔루션을 제공한다.

---

## 2. 문제 정의 및 필요성

### 2.1. 타겟 사용자
* **콘텐츠 소비자:** 해외 콘텐츠를 원어의 뉘앙스에 가깝게 이해하고 싶은 사용자
* **콘텐츠 제작자:** 자신의 영상에 고품질 다국어 자막을 신속하게 추가하고 싶은 크리에이터
* **외국어 학습자:** 미디어를 통해 생생한 언어 용법을 학습하고 싶은 학습자

### 2.2. 기존 시장의 문제점
* **기계적인 번역:** 번역 결과물의 문맥과 톤이 어색하며, 캐릭터의 개성을 전혀 살리지 못한다.
* **비효율적인 수정:** 번역 수정 및 싱크 조절을 위해 여러 프로그램을 오가며 반복적인 작업을 해야 한다.
* **획일적인 결과물:** 모든 사용자가 동일한 번역 결과물만 얻게 되어, 개인의 목적이나 스타일에 맞는 결과물을 얻기 어렵다.

### 2.3. 'Maritda'의 차별점
* **AI 기반 개인화:** 사용자의 규칙과 영상의 특성을 학습하여 '톤 앤 매너', '가독성'까지 제안하는 AI 어시스턴트.
* **통합 작업 환경:** 번역, 영상 확인, 편집, 교정 등 모든 과정이 한 화면에서 이루어지는 원스톱 솔루션.
* **웹 기반의 뛰어난 접근성:** 별도의 프로그램 설치 없이, 언제 어디서든 웹 브라우저로 접속하여 작업을 이어갈 수 있다.

---

## 3. 서비스 아키텍처 및 기술 스택

### 3.1. 시스템 구성도
* `사용자 (Web Browser)` ↔ `프론트엔드 (React)` ↔ `API` ↔ `백엔드 (Python/FastAPI)` ↔ `외부 번역/LLM 서비스`

### 3.2. 주요 기술 스택
* **백엔드:** `Python` (`FastAPI` 프레임워크)
* **프론트엔드:** `React` (반응형 웹 디자인)
* **배포:** `Docker`를 활용한 클라우드 환경 (AWS, GCP 등)

---

## 4. 핵심 기능 명세

### 4.1. 기본 번역 기능
* `.srt`, `.ass` 등 주요 자막 파일 포맷 지원.
* 사용자가 업로드한 파일을 즉시 번역하여 결과 제공.

### 4.2. 인브라우저 자막 편집기
* 웹 화면에서 번역된 자막 텍스트를 직접 수정하고, 타임라인을 미세 조정하는 기능.

### 4.3. 영상-자막 동기화 뷰어
* 영상(파일 또는 URL)을 함께 로드하여, 실제 장면에 맞춰 자막을 확인하고 수정하는 기능. 문맥 파악의 정확도를 극대화.

### 4.4. 톤 앤 매너 조절 (AI)
* **캐릭터 RP 부여:** "10대 소녀의 장난스러운 말투" 등 특정 캐릭터의 페르소나를 설정하여 번역 톤을 변경.
* **캐릭터별 규칙 설정:** "A 캐릭터는 격식체, B 캐릭터는 반말 사용" 등 프로젝트 전반에 적용될 톤 규칙을 지정.

### 4.5. 가독성 AI 어시스턴트
* **AI 자동 피드백:** 한 줄당 글자 수, 초당 글자 수(CPS), 자막 노출 시간 등 가독성 규칙을 AI가 자동으로 검사하고 개선안 제안.
* **사용자 지정 규칙 (User Rules):** 사용자가 자신만의 가독성 규칙(예: "한 줄은 30자 이하")을 설정하면, AI가 해당 규칙을 최우선으로 검사.

---

## 5. 개발 로드맵

### 5.1. Phase 1: MVP - 핵심 번역 엔진 구축
* **목표:** '업로드-번역-다운로드'의 핵심 기능 사이클 완성.
* **구현 기능:** `4.1. 기본 번역 기능`

### 5.2. Phase 2: 고급 편집 환경 구축
* **목표:** 전문적인 수정 및 편집이 가능한 원스톱 환경 제공.
* **구현 기능:** `4.2. 인브라우저 자막 편집기`, `4.3. 영상-자막 동기화 뷰어`

### 5.3. Phase 3: AI 어시스턴트 도입
* **목표:** 사용자의 작업 스타일을 학습하고 맞춰주는 지능형 개인화 기능 구현.
* **구현 기능:** `4.4. 톤 앤 매너 조절`, `4.5. 가독성 AI 어시스턴트`

## 📁 프로젝트 구조

\`\`\`
maritda/
├── frontend/      # React 프론트엔드 소스코드
├── backend/       # FastAPI 백엔드 소스코드
├── Dockerfile     # 배포용 Dockerfile
└── README.md
\`\`\`

---

# 실전 개발/운영/배포/코드 예시 (PR/협업/리뷰용)

## 주요 기술 스택

- **프론트엔드:** React (Vite, TypeScript, TailwindCSS)
- **백엔드:** FastAPI (Python)
- **인증:** Firebase Authentication (Google, Github 등 소셜 로그인)
- **DB:** Firestore (사용자 정보)
- **배포:** Vercel(프론트), Render(백엔드)
- **CI/CD:** 환경변수 자동화, gitignore, 보안, 실전 배포

## 환경변수 예시 (.env.example)

```env
# 프론트엔드 (frontend/.env.example)
VITE_API_BASE_URL=your_api_base_url
```
- 실제 배포 시 Vercel 환경변수에 `VITE_API_BASE_URL=https://maritda-backend.onrender.com` 추가 필요

## 프론트엔드 예제: 자막 번역 파이프라인

```tsx
// EditorPage.tsx (일부)
const handleTranslate = async () => {
  if (!file) return;
  setLoading(true);
  setError('');
  setResult('');
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('source_lang', LANGUAGE_CODES[sourceLang]);
    formData.append('dest_lang', LANGUAGE_CODES[targetLang]);
    let headers: Record<string, string> = {};
    if (user) {
      const token = await user.getIdToken();
      headers["Authorization"] = `Bearer ${token}`;
    }
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/translate`, {
      method: 'POST',
      body: formData,
      headers,
    });
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    setResult(data.translated_content);
  } catch (e) {
    setError('번역 중 오류가 발생했습니다.');
  } finally {
    setLoading(false);
  }
};
```

## 백엔드 예제: FastAPI 번역 엔드포인트

```python
# backend/app/main.py (일부)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import translate

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[...],  # Vercel/로컬 모두 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(translate.router, prefix="/api/v1")
```

```python
# backend/app/api/translate.py (일부)
@router.post("/translate")
async def create_translation(
    file: UploadFile = File(...),
    source_lang: str = Form(...),
    dest_lang: str = Form(...),
    user=Depends(verify_firebase_token)
):
    # 파일 확장자/용량/MIME 검증
    # 번역 서비스 호출
    translated_text = translator_service.translate_subtitle(
        file=file,
        source_lang=source_lang,
        dest_lang=dest_lang
    )
    return {"translated_content": translated_text}
```

## 인증/보안

- **Firebase Auth**로 소셜 로그인(구글, 깃허브 등) 및 JWT 토큰 검증
- FastAPI에서 토큰 미들웨어로 보호
- Firestore에 사용자 정보/권한 저장

## 배포/운영

- **Vercel**: 프론트엔드 배포, 환경변수로 백엔드 주소 관리
- **Render**: 백엔드 배포, CORS/보안 설정
- **.env, .env.production** 등은 gitignore로 보호, 민감정보 push protection 적용

## 실행 방법

1. **백엔드 실행**
   ```sh
   cd backend
   uvicorn app.main:app --reload
   ```

2. **프론트엔드 실행**
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

3. **환경변수 세팅**
   - `.env` 파일에 `VITE_API_BASE_URL` 지정
   - Vercel 환경변수에도 동일하게 추가

## 기타

- robust 예외처리, 로깅, 테스트 코드, UI/UX 개선, 다크모드, 어드민, git 보안 등 실전 운영 노하우 반영
- 자세한 내용은 코드/커밋/PR을 참고

---

**이 README는 PR/협업/리뷰용으로, 실제 코드와 연동되는 주요 구조와 예제만을 간결하게 정리한 버전입니다.**

---

## ⚠️ 배포/운영 주의사항 (필수 체크리스트)

- **requirements.txt(파이썬 패키지) 변경 시**: 반드시 커밋/푸시해야 Render 등 배포 환경에 반영됩니다.
- **Firebase/Firebase Auth/Firestore/Google API 등 외부 서비스 연동 시**: 관련 패키지(`firebase-admin`, `google-cloud-firestore`, `google-auth`, `google-api-python-client` 등)가 requirements.txt에 누락되지 않았는지 항상 확인하세요.
- **패키지 추가/업데이트 후**: Render(또는 기타 배포 환경)에서 빌드/배포가 정상적으로 완료되는지 꼭 확인하세요.
- **환경변수, 서비스 계정 키 등 민감정보**: .gitignore에 반드시 포함, 커밋/푸시 금지!
- **CORS, 도메인, API 경로 등**: 프론트/백엔드 배포 주소가 바뀌면 CORS 허용 origins, 환경변수 등도 함께 수정해야 합니다.
- **Firebase 서비스 계정 키 파일(firebase-adminsdk.json)**: 배포 환경(Render 등)에서는 반드시 Secret File로 등록하고, 코드에서 환경변수(`GOOGLE_APPLICATION_CREDENTIALS`) 또는 기본 경로(`/etc/secrets/firebase-adminsdk.json`)로 지정해야 합니다. (git에는 절대 포함하지 말 것)

---
