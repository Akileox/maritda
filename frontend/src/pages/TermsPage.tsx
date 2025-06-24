import { useContext } from 'react';
import { LanguageContext } from '../App';
import MainContent from '../components/MainContent';

const TERMS = {
  ko: `제1조(목적)
이 약관은 Maritda(이하 '회사')가 제공하는 서비스의 이용조건 및 절차, 이용자와 회사의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.

제2조(정의)
이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
1. '서비스'란 회사가 제공하는 모든 온라인 서비스를 의미합니다.
2. '이용자'란 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.

제3조(약관의 효력 및 변경)
1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.
2. 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.

(이하 생략)`,
  en: `Article 1 (Purpose)
These Terms and Conditions set forth the rights, obligations, and responsibilities of users and Maritda (the "Company") regarding the use of the services provided by the Company.

Article 2 (Definitions)
1. "Service" means all online services provided by the Company.
2. "User" means any member or non-member who uses the services provided by the Company.

Article 3 (Effect and Modification of Terms)
1. These terms apply to all users who wish to use the services.
2. The Company may amend these terms to the extent permitted by relevant laws and regulations.

(etc.)`,
};

const TermsPage = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <MainContent>
      <div className="max-w-2xl mx-auto py-16">
        <h2 className="font-bold text-3xl mb-8 text-gray-900 dark:text-white">{lang === 'ko' ? '이용약관' : 'Terms of Service'}</h2>
        <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-neutral-800 rounded-xl p-6 text-base leading-relaxed">
          {TERMS[lang]}
        </pre>
      </div>
    </MainContent>
  );
};

export default TermsPage; 