import React from 'react';
import { Calendar } from 'lucide-react';

const SearchHistory = ({ searchHistory, quickSearch }) => {
  if (searchHistory.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
        <Calendar className="w-4 h-4 mr-2" />
        Recent Searches
      </h3>
      <div className="space-y-2">
        {searchHistory.slice(0, 5).map((search, idx) => (
          <button
            key={idx}
            onClick={() => quickSearch(search.query, search.type)}
            className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm transition-colors"
          >
            <div className="font-medium text-gray-900 truncate">{search.query}</div>
            <div className="text-gray-500 text-xs">
              {search.type} • {search.results} results • {new Date(search.timestamp).toLocaleDateString()}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;