import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import CreateLinkForm from './CreateLinkForm.jsx';
import LinkItem from './LinkItem.jsx';
import Hero from './Hero.jsx';
import FAQ from './FAQ.jsx';

// --- CONFIGURATION ---
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// --- API HELPER ---
const api = axios.create({ baseURL: BACKEND_URL });

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchLinks();
  }, [refreshKey]);

  const fetchLinks = async () => {
    try {
      const res = await api.get('/api/links');
      setLinks(res.data);
    } catch (err) {
      console.error("Failed to fetch links");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (code) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;
    try {
      await api.delete(`/api/links/${code}`);
      
      // Remove from localStorage
      const myLinks = JSON.parse(localStorage.getItem('myLinks') || '[]');
      const newMyLinks = myLinks.filter(c => c !== code);
      localStorage.setItem('myLinks', JSON.stringify(newMyLinks));
      
      fetchLinks();
    } catch (err) {
      alert('Failed to delete link');
    }
  };

  return (
    <>
    <Hero />
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CreateLinkForm onLinkCreated={() => setRefreshKey(k => k + 1)} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden dark:bg-gray-900 dark:border-gray-700 ">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Recent Links</h3>
          <button onClick={fetchLinks} className="text-xs text-gray-200 hover:text-gray-100 font-medium dark:text-gray-200 dark:hover:text-gray-100">Refresh</button>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short Link</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Clicked</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-indigo-500" />
                    Loading links...
                  </td>
                </tr>
              ) : links.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No links created yet. Be the first!
                  </td>
                </tr>
              ) : (
                links.map((link) => (
                  <LinkItem key={link.id} link={link} onDelete={handleDelete} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <FAQ />
    </>
  );
};

export default Dashboard