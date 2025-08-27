import React from 'react';
import { Book, User, Filter, Hash, Building, Globe, Search, Loader2 } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery, searchType, setSearchType, searchBooks, loading }) => {
  // Open Library API search parameters
  const searchTypes = [
    { value: 'title', label: 'Title', icon: Book, placeholder: 'e.g., The Great Gatsby' },
    { value: 'author', label: 'Author', icon: User, placeholder: 'e.g., F. Scott Fitzgerald' },
    { value: 'subject', label: 'Subject', icon: Filter, placeholder: 'e.g., fiction, science' },
    { value: 'isbn', label: 'ISBN', icon: Hash, placeholder: 'e.g., 9780743273565' },
    { value: 'publisher', label: 'Publisher', icon: Building, placeholder: 'e.g., Penguin Books' },
    { value: 'place', label: 'Place', icon: Globe, placeholder: 'e.g., New York' },
    { value: 'person', label: 'Person', icon: User, placeholder: 'e.g., Shakespeare' },
    { value: 'language', label: 'Language', icon: Globe, placeholder: 'e.g., eng, spa, fre' },
    { value: 'q', label: 'General Search', icon: Search, placeholder: 'Search everything...' }
  ];

  const currentSearchType = searchTypes.find(t => t.value === searchType);

  return (
    <div className="flex space-x-2">
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-32"
      >
        {searchTypes.map(type => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      <div className="flex-1 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchBooks()}
          placeholder={currentSearchType?.placeholder || 'Search books...'}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
      </div>
      <button
        onClick={searchBooks}
        disabled={loading || !searchQuery.trim()}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        Search
      </button>
    </div>
  );
};

export default SearchBar;