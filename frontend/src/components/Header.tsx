import { Link, useLocation } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import LogoBridgeA from './LogoBridgeA';
import { useContext } from 'react';
import { LanguageContext, ThemeContext } from '../App';

const navItems = [
  { label: { ko: '기능 소개', en: 'Features' }, path: '/' },
  { label: { ko: '요금제', en: 'Pricing' }, path: '/pricing' },
  { label: { ko: '로그인', en: 'Login' }, path: '/login' },
];

const Header = () => {
  const location = useLocation();
  const { lang, setLang } = useContext(LanguageContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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
      {/* 네비게이션 + CTA + 언어 토글 */}
      <nav className="flex items-center gap-2 sm:gap-4 md:gap-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`hidden sm:inline font-inter text-base px-2 py-1 transition-colors duration-200 rounded-md ${location.pathname === item.path ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950' : 'text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/50'}`}
          >
            {item.label[lang as 'ko' | 'en']}
          </Link>
        ))}
        <Link
          to="/editor"
          className="ml-2 sm:ml-4 px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-700 shadow-md flex items-center gap-2 hover:scale-105 hover:shadow-lg transition-all text-base"
        >
          {lang === 'ko' ? '무료로 번역 시작하기' : 'Start Translating Free'}
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
        <button
          className="ml-4 px-3 py-1 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 font-semibold text-sm font-pretendard-rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
          onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
        >
          {lang === 'ko' ? 'EN' : 'KO'}
        </button>
        <button
          className="ml-2 p-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? (lang === 'ko' ? '라이트모드로 전환' : 'Switch to light mode') : (lang === 'ko' ? '다크모드로 전환' : 'Switch to dark mode')}
        >
          {theme === 'dark' ? (
            // 라이트모드 아이콘
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.25-9H21M3 12h2.25m12.02 6.02l1.59 1.59m-13.44-13.44l1.59 1.59m0 9.9l-1.59 1.59m13.44-13.44l-1.59 1.59M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
            </svg>
          ) : (
            // 다크모드 아이콘
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.006 2.354-7.464 5.75-9.062a.75.75 0 01.977.937 7.501 7.501 0 008.836 9.386.75.75 0 01.939.954z" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header; 