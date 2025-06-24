import { useContext } from 'react';
import { LanguageContext } from '../App';
import MainContent from '../components/MainContent';

const FAQS = [
  {
    q: {
      ko: '어떤 파일 형식을 지원하나요?',
      en: 'What file formats are supported?',
    },
    a: {
      ko: '현재 .srt, .ass 자막 파일을 지원합니다.',
      en: 'Currently, .srt and .ass subtitle files are supported.',
    },
  },
  {
    q: {
      ko: '번역 품질은 어떤가요?',
      en: 'How is the translation quality?',
    },
    a: {
      ko: '최신 AI 모델을 활용해 자연스러운 번역을 제공합니다.',
      en: 'We use state-of-the-art AI models to provide natural translations.',
    },
  },
  {
    q: {
      ko: '서비스는 무료인가요?',
      en: 'Is the service free?',
    },
    a: {
      ko: '베타 기간 동안 모든 기능을 무료로 제공합니다.',
      en: 'All features are free during the beta period.',
    },
  },
  {
    q: {
      ko: '개인정보는 안전하게 보호되나요?',
      en: 'Is my personal information safe?',
    },
    a: {
      ko: '모든 데이터는 안전하게 암호화되어 처리됩니다.',
      en: 'All data is securely encrypted and handled.',
    },
  },
];

const FAQPage = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <MainContent>
      <div className="max-w-2xl mx-auto py-16">
        <h2 className="font-bold text-3xl mb-8 text-gray-900 dark:text-white">{lang === 'ko' ? '자주 묻는 질문' : 'Frequently Asked Questions'}</h2>
        <ul className="space-y-8">
          {FAQS.map((item, idx) => (
            <li key={idx} className="bg-gray-50 dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
              <div className="font-semibold text-lg text-blue-700 dark:text-blue-300 mb-2">{item.q[lang]}</div>
              <div className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">{item.a[lang]}</div>
            </li>
          ))}
        </ul>
      </div>
    </MainContent>
  );
};

export default FAQPage; 