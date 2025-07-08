import { useState, useContext } from 'react';
import { LanguageContext } from '../App';
import MainContent from '../components/MainContent';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

const LoginPage = () => {
  const { lang } = useContext(LanguageContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'login' | 'signup' | 'reset'>('login');
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(lang === 'ko' ? '이메일 또는 비밀번호가 올바르지 않습니다.' : 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // 회원가입 성공 시 자동 로그인
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError(lang === 'ko' ? '이미 사용 중인 이메일입니다.' : 'Email already in use.');
      } else if (err.code === 'auth/weak-password') {
        setError(lang === 'ko' ? '비밀번호는 6자 이상이어야 합니다.' : 'Password should be at least 6 characters.');
      } else {
        setError(lang === 'ko' ? '회원가입에 실패했습니다.' : 'Sign up failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setResetSent(false);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err) {
      setError(lang === 'ko' ? '이메일을 찾을 수 없습니다.' : 'Email not found.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(lang === 'ko' ? '구글 로그인에 실패했습니다.' : 'Google login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContent>
      <div className="max-w-sm mx-auto py-16">
        <h2 className="font-bold text-3xl mb-6 text-gray-900 dark:text-white">{lang === 'ko' ? '로그인' : 'Login'}</h2>
        <div className="flex gap-2 mb-6">
          <button
            className={`flex-1 py-2 rounded-t-lg font-semibold text-base ${tab === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200'}`}
            onClick={() => setTab('login')}
          >{lang === 'ko' ? '로그인' : 'Login'}</button>
          <button
            className={`flex-1 py-2 rounded-t-lg font-semibold text-base ${tab === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200'}`}
            onClick={() => setTab('signup')}
          >{lang === 'ko' ? '회원가입' : 'Sign Up'}</button>
          <button
            className={`flex-1 py-2 rounded-t-lg font-semibold text-base ${tab === 'reset' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200'}`}
            onClick={() => setTab('reset')}
          >{lang === 'ko' ? '비밀번호 찾기' : 'Reset'}</button>
        </div>
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder={lang === 'ko' ? '이메일' : 'Email'}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
              required
            />
            <input
              type="password"
              placeholder={lang === 'ko' ? '비밀번호' : 'Password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
              required
            />
            {error && <div className="text-red-500 text-sm font-semibold mt-1">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-lg mt-2 disabled:opacity-60"
            >
              {loading ? (lang === 'ko' ? '로그인 중...' : 'Logging in...') : (lang === 'ko' ? '로그인' : 'Login')}
            </button>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 rounded-lg border border-gray-300 bg-white text-gray-800 font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors mt-2"
            >
              <img src="/google-logo.svg" alt="Google" className="w-5 h-5" />
              {lang === 'ko' ? '구글로 로그인' : 'Login with Google'}
            </button>
          </form>
        )}
        {tab === 'signup' && (
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder={lang === 'ko' ? '이메일' : 'Email'}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
              required
            />
            <input
              type="password"
              placeholder={lang === 'ko' ? '비밀번호(6자 이상)' : 'Password (min 6 chars)'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
              required
            />
            {error && <div className="text-red-500 text-sm font-semibold mt-1">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-lg mt-2 disabled:opacity-60"
            >
              {loading ? (lang === 'ko' ? '회원가입 중...' : 'Signing up...') : (lang === 'ko' ? '회원가입' : 'Sign Up')}
            </button>
          </form>
        )}
        {tab === 'reset' && (
          <form onSubmit={handleReset} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder={lang === 'ko' ? '이메일' : 'Email'}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
              required
            />
            {error && <div className="text-red-500 text-sm font-semibold mt-1">{error}</div>}
            {resetSent && <div className="text-green-600 text-sm font-semibold mt-1">{lang === 'ko' ? '비밀번호 재설정 메일이 발송되었습니다.' : 'Password reset email sent.'}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-lg mt-2 disabled:opacity-60"
            >
              {loading ? (lang === 'ko' ? '전송 중...' : 'Sending...') : (lang === 'ko' ? '비밀번호 재설정 메일 보내기' : 'Send Password Reset Email')}
            </button>
          </form>
        )}
      </div>
    </MainContent>
  );
};

export default LoginPage; 