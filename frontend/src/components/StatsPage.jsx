import { useState, useEffect, useContext} from 'react';
import { Link, useParams } from 'react-router-dom';
import { ExternalLink, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { AppContext } from '../context/context.js';


const StatsPage = () => {
  const { code } = useParams();
  // const navigate = useNavigate();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const BACKEND_URL = useContext(AppContext).BACKEND_URL; 
  const api = useContext(AppContext).api;
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get(`/api/links/${code}`);
        setLink(res.data);
      } catch (err) {
        setError('Link not found');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [code]);

  if (loading) return <div className="min-h-screen flex justify-center pt-20"><Loader2 className="h-8 w-8 animate-spin text-indigo-600" /></div>;
  if (error) return (
    <div className="text-center pt-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">404</h2>
      <p className="text-gray-600 mb-4">{error}</p>
      <Link to="/" className="text-indigo-600 hover:underline">Back to Dashboard</Link>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-10">
      <div className="mb-6">
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-4">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Link Statistics</h1>
        <p className="text-gray-500 mt-1 dark:text-gray-300">Detailed insights for your short link</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden dark:bg-gray-900 dark:border-gray-700">
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 dark:text-gray-200">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1 dark:text-gray-400">Short Code</h3>
            <div className="text-2xl font-mono font-bold text-indigo-600 flex items-center gap-2 dark:text-indigo-400">
              {link.short_code}
              <a href={`${BACKEND_URL}/${link.short_code}`} target="_blank" rel="noreferrer">
                <ExternalLink className="h-5 w-5 text-gray-400 hover:text-indigo-600 cursor-pointer dark:text-gray-400 dark:hover:text-indigo-400" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1 dark:text-gray-400">Total Clicks</h3>
            <div className="text-4xl font-bold text-gray-900 dark:text-gray-200">{link.clicks}</div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1 dark:text-gray-400">Destination URL</h3>
            <div className="bg-gray-50 p-3 rounded-lg break-all text-gray-700 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
              {link.original_url}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1 dark:text-gray-400">Created At</h3>
            <div className="text-gray-900 dark:text-gray-200">{new Date(link.created_at).toLocaleDateString()}</div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1 dark:text-gray-400">Last Clicked</h3>
            <div className="text-gray-900 dark:text-gray-200">
              {link.last_clicked_at ? formatDistanceToNow(new Date(link.last_clicked_at), { addSuffix: true }) : 'Never'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default StatsPage