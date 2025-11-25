import { Link } from 'react-router-dom';
import { Link as LinkIcon } from 'lucide-react';

const Header = () => (
  <header className="border-b border-gray-200 sticky top-0 z-10 dark:border-gray-700 shadow-sm">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors">
        <LinkIcon className="h-6 w-6" />
        <span className="font-bold text-xl tracking-tight">TinyLink</span>
      </Link>
      <nav>
        <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">Dashboard</Link>
      </nav>
    </div>
  </header>
);

export default Header