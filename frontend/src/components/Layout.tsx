import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  // 번역기 앱 경로에서만 Sidebar 노출
  const showSidebar = location.pathname.startsWith('/editor');
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300">
      <Header />
      <div className="flex flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-8 gap-0">
        {showSidebar && <Sidebar />}
        <main className="flex-1 overflow-auto p-4 sm:p-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout; 