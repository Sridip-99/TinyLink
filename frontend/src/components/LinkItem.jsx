import React, { useState, useEffect } from 'react';
import {  Link } from 'react-router-dom';
import { Copy, Trash2, BarChart2, ExternalLink, CheckCircle, } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// --- CONFIGURATION ---
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LinkItem = ({ link, onDelete }) => {
  const [copied, setCopied] = useState(false);
  
  // LocalStorage check: Do I own this link?
  const myLinks = JSON.parse(localStorage.getItem('myLinks') || '[]');
  const isMine = myLinks.includes(link.short_code);

  const shortUrl = `${BACKEND_URL}/${link.short_code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <a 
            href={shortUrl} 
            target="_blank" 
            rel="noreferrer"
            className="text-indigo-600 font-medium hover:underline flex items-center gap-1"
          >
            /{link.short_code}
            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <button 
            onClick={handleCopy}
            className="text-gray-200 hover:text-gray-100 transition-colors dark:text-gray-400 dark:hover:text-gray-200"
            title="Copy to clipboard"
          >
            {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="max-w-xs truncate text-sm text-gray-500" title={link.original_url}>
          {link.original_url}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
          {link.clicks} clicks
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
        {link.last_clicked_at ? formatDistanceToNow(new Date(link.last_clicked_at), { addSuffix: true }) : '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-3">
          <Link to={`/code/${link.short_code}`} className="text-gray-400 hover:text-indigo-600 transition-colors" title="View Stats">
            <BarChart2 className="h-4 w-4" />
          </Link>
          {isMine && (
            <button 
              onClick={() => onDelete(link.short_code)}
              className="text-gray-400 hover:text-red-600 transition-colors"
              title="Delete Link"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default LinkItem