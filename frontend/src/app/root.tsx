import { createContext, useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import Layout from '../components/Layout';
import { Outlet } from 'react-router';

interface LanguageContextType {
  lang: 'ko' | 'en';
  setLang: Dispatch<SetStateAction<'ko' | 'en'>>;
}
interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
}

export const LanguageContext = createContext<LanguageContextType>({ lang: 'ko', setLang: () => {} });
export const ThemeContext = createContext<ThemeContextType>({ theme: 'light', setTheme: () => {} });

export default function Root() {
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Layout>
          <Outlet />
        </Layout>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
} 