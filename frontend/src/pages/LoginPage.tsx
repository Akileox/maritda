import { useContext } from 'react';
import { LanguageContext } from '../App';
import MainContent from '../components/MainContent';

const LoginPage = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <MainContent>
      <div className="max-w-sm mx-auto py-16">
        <h2 className="font-bold text-3xl mb-6 text-gray-900 dark:text-white">{lang === 'ko' ? '로그인' : 'Login'}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-8">
          {lang === 'ko'
            ? '서비스 이용을 위해 로그인해 주세요.'
            : 'Please log in to use the service.'}
        </p>
        <button className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-700 shadow-lg hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all text-lg">
          {lang === 'ko' ? '카카오로 로그인' : 'Login with Kakao'}
        </button>
      </div>
    </MainContent>
  );
};

export default LoginPage; 