import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import Layout from "./components/Layout";
import { createContext, useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

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

function App() {
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
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/editor" element={<EditorPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App; 