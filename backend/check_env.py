import sys
import os
import shutil
import importlib.util
import subprocess

REQUIRED_PYTHON_PACKAGES = [
    'selenium',
    'webdriver_manager',
    'fastapi',
    'uvicorn',
    'python_multipart',
]

CHROME_CANDIDATES = [
    'google-chrome', 'chromium-browser', 'chromium', 'chrome', 'chrome.exe'
]


def check_python_packages():
    print('[PYTHON] 필수 패키지 설치 여부 점검:')
    missing = []
    for pkg in REQUIRED_PYTHON_PACKAGES:
        if importlib.util.find_spec(pkg) is None:
            print(f'  [X] {pkg} (미설치)')
            missing.append(pkg)
        else:
            print(f'  [O] {pkg}')
    if missing:
        print('\n[!] 누락된 패키지 설치:')
        print(f'    pip install {" ".join(missing)}')
    return not missing


def check_chromedriver():
    print('\n[CHROMEDRIVER] chromedriver 설치/경로 점검:')
    chromedriver_path = shutil.which('chromedriver')
    if chromedriver_path:
        print(f'  [O] chromedriver: {chromedriver_path}')
        return True
    else:
        print('  [X] chromedriver (미설치)')
        print('    설치 예시: sudo apt install chromium-chromedriver')
        return False


def check_chrome_browser():
    print('\n[BROWSER] Chrome/Chromium 브라우저 설치/경로 점검:')
    for candidate in CHROME_CANDIDATES:
        path = shutil.which(candidate)
        if path:
            print(f'  [O] {candidate}: {path}')
            return True
    print('  [X] Chrome/Chromium 브라우저 (미설치)')
    print('    설치 예시: sudo apt install chromium-browser')
    return False


def check_pythonpath():
    print('\n[PYTHONPATH] PYTHONPATH 환경변수 점검:')
    pythonpath = os.environ.get('PYTHONPATH', None)
    if pythonpath:
        print(f'  [O] PYTHONPATH: {pythonpath}')
        return True
    else:
        print('  [!] PYTHONPATH 미설정 (대부분의 경우 무시해도 무방)')
        return True


def check_system_libs():
    print('\n[LIBS] 시스템 라이브러리(헤드리스 크롬용) 점검:')
    # 대표적으로 libnss3, libatk-bridge2.0-0, libx11-xcb1 등
    try:
        result = subprocess.run(['ldd', '--version'], capture_output=True)
        print('  [O] ldd(라이브러리 의존성 확인 가능)')
        return True
    except Exception:
        print('  [X] ldd 명령어 사용 불가 (glibc 미설치?)')
        return False


def main():
    print('==== Maritda 환경 점검 (self-check) ====' )
    ok = True
    if not check_python_packages():
        ok = False
    if not check_chromedriver():
        ok = False
    if not check_chrome_browser():
        ok = False
    check_pythonpath()
    check_system_libs()
    if ok:
        print('\n[✔] 환경 점검 통과!')
    else:
        print('\n[!] 일부 필수 요소가 누락되었습니다. 위 안내에 따라 설치 후 재시도하세요.')

if __name__ == '__main__':
    main() 