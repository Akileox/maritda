import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import LogoBridgeA from './LogoBridgeA';
import { useContext, useRef, useState, useEffect } from 'react';
import { LanguageContext } from '../App';
import useAuth from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Header = () => {
  const location = useLocation();
  const { lang } = useContext(LanguageContext);
  const user = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // 드롭다운 외부 클릭 시 닫힘
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleProfileClick = () => setOpen((v) => !v);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setOpen(false);
      navigate('/');
    } catch (e) {
      alert('로그아웃 실패');
    }
  };

  const handleMyInfo = () => {
    setOpen(false);
    navigate('/profile');
  };

  return (
    <header className="w-full h-20 flex items-center justify-between px-4 sm:px-10 fixed top-0 left-0 z-30 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border-b border-gray-100 dark:border-neutral-800 transition-colors">
      {/* 로고 */}
      <Link to="/" className="flex items-center gap-3 group">
        <LogoBridgeA className="w-10 h-10 group-hover:scale-105 transition-transform" />
        <span className="font-inter font-bold text-2xl text-gray-900 dark:text-white tracking-wide select-none">
          {lang === 'ko' ? '말잇다' : 'Maritda'}
        </span>
      </Link>
      {/* 네비게이션 */}
      <nav className="flex items-center gap-2 sm:gap-4 md:gap-8">
        <Link
          to="/"
          className={`hidden sm:inline font-inter text-base px-2 py-1 transition-colors duration-200 rounded-md ${location.pathname === '/' ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950' : 'text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/50'}`}
        >
          {lang === 'ko' ? '기능 소개' : 'Features'}
        </Link>
        <Link
          to="/pricing"
          className={`hidden sm:inline font-inter text-base px-2 py-1 transition-colors duration-200 rounded-md ${location.pathname === '/pricing' ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950' : 'text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/50'}`}
        >
          {lang === 'ko' ? '요금제' : 'Pricing'}
        </Link>
        <Link
          to="/editor"
          className="ml-2 sm:ml-4 px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-700 shadow-md flex items-center gap-2 hover:scale-105 hover:shadow-lg transition-all text-base"
        >
          {lang === 'ko' ? '무료로 번역 시작하기' : 'Start Translating Free'}
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
        {user && user.photoURL ? (
          <div className="relative ml-4" ref={profileRef}>
            <img
              src={user.photoURL}
              alt="profile"
              className="w-8 h-8 rounded-full border cursor-pointer"
              onClick={handleProfileClick}
            />
            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-neutral-900 shadow-lg rounded-lg py-2 z-50 border border-gray-100 dark:border-neutral-800 animate-fadein">
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-sm"
                  onClick={handleMyInfo}
                >
                  {lang === 'ko' ? '내 정보' : 'My Info'}
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-sm"
                  onClick={handleLogout}
                >
                  {lang === 'ko' ? '로그아웃' : 'Logout'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="ml-4 px-4 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-base"
          >
            {lang === 'ko' ? '로그인' : 'Login'}
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header; 