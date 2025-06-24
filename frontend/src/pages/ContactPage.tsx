import { useContext, useState } from 'react';
import { LanguageContext } from '../App';
import MainContent from '../components/MainContent';

const ContactPage = () => {
  const { lang } = useContext(LanguageContext);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true); // 실제 전송 기능은 추후 구현
  };

  return (
    <MainContent>
      <div className="max-w-lg mx-auto py-16">
        <h2 className="font-bold text-3xl mb-8 text-gray-900 dark:text-white">{lang === 'ko' ? '문의하기' : 'Contact Us'}</h2>
        {submitted ? (
          <div className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-xl p-6 text-center font-semibold">
            {lang === 'ko' ? '문의가 정상적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.' : 'Your message has been received. We will get back to you soon!'}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-gray-700 dark:text-gray-200">{lang === 'ko' ? '이름' : 'Name'}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-gray-700 dark:text-gray-200">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium text-gray-700 dark:text-gray-200">{lang === 'ko' ? '메시지' : 'Message'}</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-700 shadow-lg hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all text-lg"
            >
              {lang === 'ko' ? '문의 보내기' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </MainContent>
  );
};

export default ContactPage; 