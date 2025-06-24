import { useContext } from 'react';
import { LanguageContext } from '../App';
import MainContent from '../components/MainContent';

const AboutPage = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <MainContent>
      <div className="max-w-2xl mx-auto py-16">
        <h2 className="font-bold text-3xl mb-6 text-gray-900 dark:text-white">{lang === 'ko' ? '서비스 소개' : 'About Maritda'}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-200">
          {lang === 'ko'
            ? '말잇다는 AI 기반 자막 번역 서비스로, 영상의 언어 장벽을 허물고 전 세계와 소통할 수 있도록 돕습니다.'
            : 'Maritda is an AI-powered subtitle translation service that breaks language barriers and connects your videos to the world.'}
        </p>
      </div>
    </MainContent>
  );
};

export default AboutPage; 