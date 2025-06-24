import { useRef, useState } from 'react';
import MainContent from '../components/MainContent';
import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { LanguageContext } from '../App';
import { useContext } from 'react';

const LANGUAGES = ['한국어', '영어', '일본어', '중국어'];
const LANGUAGE_CODES = { '한국어': 'ko', '영어': 'en', '일본어': 'ja', '중국어': 'zh' };

const EditorPage = () => {
  const { lang } = useContext(LanguageContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [sourceLang, setSourceLang] = useState(LANGUAGES[0]);
  const [targetLang, setTargetLang] = useState(LANGUAGES[1]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setResult('');
    setError('');
  };

  const handleTranslate = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setResult('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('source_lang', LANGUAGE_CODES[sourceLang as keyof typeof LANGUAGE_CODES]);
      formData.append('dest_lang', LANGUAGE_CODES[targetLang as keyof typeof LANGUAGE_CODES]);
      const res = await fetch('http://localhost:8000/api/v1/translate', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      setResult(data.translated_content);
    } catch (e: any) {
      setError(lang === 'ko' ? '번역 중 오류가 발생했습니다.' : 'An error occurred during translation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContent>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[70vh] w-full">
        {/* 파일 업로드 영역 */}
        {!file && (
          <div
            className={`w-full max-w-xl flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 transition-all duration-200 cursor-pointer bg-white/80 dark:bg-neutral-900/80 shadow-md ${dragActive ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-900/60' : 'border-gray-300 dark:border-neutral-700'}`}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <CloudArrowUpIcon className="w-14 h-14 text-blue-500 mb-4" />
            <div className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">{lang === 'ko' ? '여기에 .srt, .ass 파일을 끌어다 놓거나 클릭하여 업로드하세요' : 'Drag & drop .srt, .ass files here or click to upload'}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{lang === 'ko' ? '최대 100MB, 자막 파일만 지원' : 'Max 100MB, subtitle files only'}</div>
            <input
              type="file"
              accept=".srt,.ass"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        )}
        {/* 파일 업로드 후 상태(설정/실행 등은 추후 구현) */}
        {file && (
          <div className="w-full max-w-xl flex flex-col gap-8 items-center bg-white/80 dark:bg-neutral-900/80 rounded-2xl shadow-md p-8 animate-fade-in">
            <div className="flex items-center gap-4 w-full">
              <CloudArrowUpIcon className="w-8 h-8 text-blue-500" />
              <div className="flex-1 truncate font-semibold text-gray-800 dark:text-gray-100">{file.name}</div>
              <button
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                onClick={handleRemoveFile}
                aria-label={lang === 'ko' ? '파일 제거' : 'Remove file'}
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            {/* 언어 선택(세그먼티드 컨트롤) */}
            <div className="w-full flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Source</span>
                <div className="flex gap-1 flex-wrap">
                  {LANGUAGES.slice(0, 4).map(lang => (
                    <button
                      key={lang}
                      className={`px-3 py-1 rounded-full text-sm font-semibold border transition-colors ${sourceLang === lang ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-blue-900'}`}
                      onClick={() => setSourceLang(lang)}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Target</span>
                <div className="flex gap-1 flex-wrap">
                  {LANGUAGES.slice(0, 4).map(lang => (
                    <button
                      key={lang}
                      className={`px-3 py-1 rounded-full text-sm font-semibold border transition-colors ${targetLang === lang ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-neutral-700 hover:bg-indigo-50 dark:hover:bg-indigo-900'}`}
                      onClick={() => setTargetLang(lang)}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* 번역 실행 버튼 */}
            <button
              className="w-full mt-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-700 shadow-lg hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all text-lg"
              onClick={handleTranslate}
              disabled={loading}
            >
              {loading ? (lang === 'ko' ? '번역 중...' : 'Translating...') : (lang === 'ko' ? '번역 시작하기' : 'Start Translating')}
            </button>
            {error && <div className="text-red-500 text-sm font-semibold mt-2">{error}</div>}
            {result && (
              <textarea
                className="w-full mt-4 p-4 rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white text-sm font-mono resize-y min-h-[180px]"
                value={result}
                readOnly
              />
            )}
          </div>
        )}
      </div>
    </MainContent>
  );
};

export default EditorPage; 