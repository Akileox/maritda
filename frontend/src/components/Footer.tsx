import { useContext } from 'react';
import { LanguageContext, ThemeContext } from '../App';

const Footer = () => {
  const { lang, setLang } = useContext(LanguageContext);

  const toggleLang = () => {
    setLang(lang === 'ko' ? 'en' : 'ko');
  };

  return (
    <footer className="w-full py-6 flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-neutral-900 border-t border-gray-100 dark:border-neutral-800 transition-colors">
      <div>
        © {new Date().getFullYear()} Maritda. All rights reserved.
      </div>
      <div className="flex items-center gap-4 mt-2">
        <a href="https://github.com/Akileox" target="_blank" rel="noopener noreferrer" aria-label="Github" className="hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
          Github
        </a>
        <a href="https://www.linkedin.com/in/seungmin-lee-akileo/" target="_blank" rel="noopener noreferrer" aria-label="Linkedin" className="hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
          Linkedin
        </a>
        <button
          className="px-3 py-1 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 font-semibold text-sm font-pretendard-rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
          onClick={toggleLang}
        >
          {lang === 'ko' ? 'EN' : 'KO'}
        </button>
      </div>
    </footer>
  );
};

export default Footer; 