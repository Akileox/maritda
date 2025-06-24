import { useContext } from 'react';
import { LanguageContext } from '../App';
import MainContent from '../components/MainContent';

const PricingPage = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <MainContent>
      <div className="max-w-2xl mx-auto py-16">
        <h2 className="font-bold text-3xl mb-6 text-gray-900 dark:text-white">{lang === 'ko' ? '요금제 안내' : 'Pricing'}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-200">
          {lang === 'ko'
            ? '현재 베타 기간 동안 모든 번역 기능을 무료로 제공합니다. 정식 요금제는 추후 안내될 예정입니다.'
            : 'All translation features are free during the beta period. Official pricing will be announced soon.'}
        </p>
      </div>
    </MainContent>
  );
};

export default PricingPage; 