import firebase_admin
from firebase_admin import credentials, auth as firebase_auth
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os

# 환경변수에서 경로를 읽고, 없으면 기본값 사용
cred_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "/etc/secrets/firebase-adminsdk.json")
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

security = HTTPBearer()

def verify_firebase_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    try:
        decoded_token = firebase_auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired Firebase token",
        ) 