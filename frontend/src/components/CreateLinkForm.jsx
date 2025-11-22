import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

// --- CONFIGURATION ---
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// --- API HELPER ---
const api = axios.create({ baseURL: BACKEND_URL });

const CreateLinkForm = ({ onLinkCreated }) => {
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = { url };
      if (customCode) payload.shortCode = customCode;

      const res = await api.post('/api/links', payload);
      
      // Save ownership to localStorage
      const myLinks = JSON.parse(localStorage.getItem('myLinks') || '[]');
      myLinks.push(res.data.short_code);
      localStorage.setItem('myLinks', JSON.stringify(myLinks));

      setSuccess(`Link created! ${res.data.short_code}`);
      setUrl('');
      setCustomCode('');
      if (onLinkCreated) onLinkCreated();
    } catch (err) {
      if (err.response?.status === 409) {
        setError('That custom code is already taken.');
      } else {
        setError(err.response?.data?.error || 'Failed to create link.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 dark:bg-gray-900 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 dark:text-gray-100">Create New Link</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Destination URL</label>
            <input
              type="url"
              required
              placeholder="https://example.com/very-long-url"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Custom Code (Optional)</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">/</span>
              <input
                type="text"
                placeholder="my-link"
                pattern="[A-Za-z0-9]{6,8}"
                title="6-8 alphanumeric characters"
                className="flex-1 w-full px-4 py-2 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg animate-pulse">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
        
        {success && (
          <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg">
            <CheckCircle className="h-4 w-4" />
            {success}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-gray-200 hover:text-gray-100 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all dark:text-gray-200 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Creating...
              </>
            ) : (
              'Shorten URL'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLinkForm