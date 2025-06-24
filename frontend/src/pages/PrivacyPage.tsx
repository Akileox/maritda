import { useContext } from 'react';
import { LanguageContext } from '../App';
import MainContent from '../components/MainContent';

const PRIVACY = {
  ko: `제1조(개인정보의 수집 및 이용 목적)
회사는 서비스 제공을 위해 최소한의 개인정보만을 수집·이용합니다.

제2조(수집하는 개인정보 항목)
이름, 이메일 등 서비스 제공에 필요한 정보만을 수집합니다.

제3조(개인정보의 보유 및 이용기간)
수집된 개인정보는 서비스 이용기간 동안만 보유·이용되며, 이용 종료 시 즉시 파기됩니다.

(이하 생략)`,
  en: `Article 1 (Purpose of Collection and Use of Personal Information)
The Company collects and uses only the minimum personal information necessary to provide the service.

Article 2 (Items of Personal Information Collected)
Only information necessary for service provision, such as name and email, is collected.

Article 3 (Retention and Use Period of Personal Information)
Collected personal information is retained and used only during the service period and is destroyed immediately after use ends.

(etc.)`,
};

const PrivacyPage = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <MainContent>
      <div className="max-w-2xl mx-auto py-16">
        <h2 className="font-bold text-3xl mb-8 text-gray-900 dark:text-white">{lang === 'ko' ? '개인정보처리방침' : 'Privacy Policy'}</h2>
        <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-neutral-800 rounded-xl p-6 text-base leading-relaxed">
          {PRIVACY[lang]}
        </pre>
      </div>
    </MainContent>
  );
};

export default PrivacyPage; 