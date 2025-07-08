import MainContent from '../components/MainContent';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { LanguageContext } from '../App';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { lang } = useContext(LanguageContext);
  const headline = lang === 'ko'
    ? <>언어의 벽, <span className="text-blue-600 dark:text-blue-400">AI로 무너뜨리다.</span></>
    : <>Break the <span className="text-blue-600 dark:text-blue-400">language barrier.</span> Powered by AI.</>;
  const subtext = lang === 'ko'
    ? '글과 언어, 세상을 잇는 AI 브릿지'
    : 'AI bridges your language to the world.';
  const cta = lang === 'ko' ? '무료로 번역 시작하기' : 'Start Translating Free';
  return (
    <MainContent>
      <div className="flex flex-col items-center justify-center w-full min-h-[80vh] py-24 sm:py-32 gap-8 bg-white dark:bg-neutral-900 transition-colors">
        <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-center text-gray-900 dark:text-white tracking-tight drop-shadow-lg">
          {headline}
        </h1>
        <p className="text-xl sm:text-2xl text-center text-gray-700 dark:text-gray-200 max-w-2xl font-medium">
          {subtext}
        </p>
        <Link
          to="/editor"
          className="mt-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-700 shadow-lg flex items-center gap-2 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all text-lg"
        >
          {cta}
          <ArrowRightIcon className="w-6 h-6" />
        </Link>
      </div>
    </MainContent>
  );
};

export default HomePage; 