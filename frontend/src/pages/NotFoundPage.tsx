import { useContext } from 'react';
import { LanguageContext } from '../App';
import MainContent from '../components/MainContent';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <MainContent>
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 gap-8">
        <div className="text-7xl mb-2 select-none" aria-hidden>🚧</div>
        <h2 className="font-bold text-3xl text-gray-900 dark:text-white mb-2">
          {lang === 'ko' ? '페이지를 찾을 수 없습니다.' : 'Page Not Found'}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-center max-w-md">
          {lang === 'ko'
            ? '요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.'
            : 'The page you are looking for does not exist or has been moved.'}
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-700 shadow-lg hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all text-lg"
        >
          {lang === 'ko' ? '홈으로 돌아가기' : 'Go to Home'}
        </Link>
      </div>
    </MainContent>
  );
};

export default NotFoundPage; 