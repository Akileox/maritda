import { PlusCircleIcon, DocumentTextIcon, FolderOpenIcon } from '@heroicons/react/24/outline';

const recentFiles = [
  { name: 'lecture_01.srt', date: '2024-06-23' },
  { name: 'movie_subs.ass', date: '2024-06-22' },
  { name: 'webinar_final.srt', date: '2024-06-20' },
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-60 min-w-[180px] max-w-[240px] h-full bg-gray-100 dark:bg-neutral-800 border-r border-gray-200 dark:border-neutral-700 p-6 transition-colors duration-300 gap-8">
      {/* 새 파일 업로드 */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold shadow-sm transition-all text-base focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600">
        <PlusCircleIcon className="w-5 h-5" />
        새 파일 업로드
      </button>
      {/* 최근 작업 */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          <FolderOpenIcon className="w-4 h-4" /> 최근 파일
        </div>
        <ul className="space-y-2">
          {recentFiles.map((file) => (
            <li key={file.name} className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer group transition-colors">
              <DocumentTextIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <span className="flex-1 truncate text-gray-800 dark:text-gray-100 group-hover:underline">{file.name}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">{file.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar; 