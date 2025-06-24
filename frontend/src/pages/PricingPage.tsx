import { useContext } from 'react';
import { LanguageContext } from '../App';
import MainContent from '../components/MainContent';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const plans = [
  {
    key: 'free',
    badge: { ko: '무료', en: 'Free' },
    name: { ko: '무료 플랜', en: 'Free Plan' },
    price: { ko: '₩0', en: '$0' },
    desc: {
      ko: '누구나 부담 없이 시작할 수 있는 기본 번역 서비스',
      en: 'Essential translation for everyone, free to start',
    },
    features: [
      { ko: '무제한 번역', en: 'Unlimited translations' },
      { ko: '간편한 사용', en: 'Easy to use' },
      { ko: '언제 어디서나 접근', en: 'Access anytime, anywhere' },
    ],
    cta: { ko: '무료 시작', en: 'Start Free' },
    highlight: false,
  },
  {
    key: 'pro',
    badge: { ko: '추천', en: 'Best' },
    name: { ko: '프로 플랜', en: 'Pro Plan' },
    price: { ko: '₩19,900', en: '$19.9' },
    desc: {
      ko: '더 빠르고, 더 강력한 번역 경험을 원하는 분께 추천',
      en: 'For those who want faster, more powerful translation',
    },
    features: [
      { ko: '빠른 번역 속도', en: 'Faster translation speed' },
      { ko: '우선 지원', en: 'Priority support' },
      { ko: '상업적 사용 가능', en: 'Commercial use allowed' },
    ],
    cta: { ko: '업그레이드', en: 'Upgrade' },
    highlight: true,
  },
  {
    key: 'ai',
    badge: { ko: 'AI', en: 'AI' },
    name: { ko: 'AI 플랜', en: 'AI Plan' },
    price: { ko: '₩49,900', en: '$49.9' },
    desc: {
      ko: 'AI와 함께하는 맞춤형 번역, 협업과 피드백까지 한 번에',
      en: 'Personalized AI translation, collaboration & feedback',
    },
    features: [
      { ko: 'AI 맞춤 피드백', en: 'AI personalized feedback' },
      { ko: '프로젝트별 번역 관리', en: 'Project-based translation management' },
      { ko: '팀 협업 지원', en: 'Team collaboration' },
    ],
    cta: { ko: 'AI 체험', en: 'Try AI' },
    highlight: false,
  },
];

const PricingPage = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <MainContent>
      <div className="max-w-4xl mx-auto py-16">
        <h2 className="font-bold text-3xl mb-8 text-gray-900 dark:text-white text-center">{lang === 'ko' ? '요금제 안내' : 'Pricing'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`relative flex flex-col rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm p-8 transition-all ${plan.highlight ? 'ring-2 ring-blue-500 scale-105 z-10' : ''}`}
            >
              <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${plan.highlight ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-200'}`}>
                {plan.badge[lang as 'ko' | 'en']}
              </span>
              <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{plan.name[lang as 'ko' | 'en']}</h3>
              <div className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">{plan.price[lang as 'ko' | 'en']}</div>
              <div className="mb-4 text-gray-700 dark:text-gray-200 text-sm">{plan.desc[lang as 'ko' | 'en']}</div>
              <ul className="mb-6 space-y-3">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <CheckCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    {f[lang as 'ko' | 'en']}
                  </li>
                ))}
              </ul>
              <button className={`mt-auto px-5 py-2 rounded-lg font-semibold text-white ${plan.highlight ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 hover:bg-gray-700'} shadow transition-all`}>{plan.cta[lang as 'ko' | 'en']}</button>
            </div>
          ))}
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-200 text-center">
          {lang === 'ko'
            ? '현재 베타 기간 동안 모든 번역 기능을 무료로 제공합니다. 정식 요금제는 추후 안내될 예정입니다.'
            : 'All translation features are free during the beta period. Official pricing will be announced soon.'}
        </p>
      </div>
    </MainContent>
  );
};

export default PricingPage; 