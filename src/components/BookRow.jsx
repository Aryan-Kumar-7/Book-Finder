import React from 'react';
import { Book, Star, ExternalLink } from 'lucide-react';

const BookRow = ({ book, toggleFavorite, isFavorite, quickSearch }) => {
  const getCoverUrl = (book, size = 'S') => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-${size}.jpg`;
    }
    return null;
  };

  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return 'Unknown Author';
    return authors.slice(0, 2).join(', ') + (authors.length > 2 ? '...' : '');
  };

  const formatYear = (year) => {
    if (Array.isArray(year)) return year[0];
    return year || 'Unknown';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 flex items-center space-x-4 border border-gray-200">
      <div className="w-12 h-16 bg-gray-100 flex-shrink-0 rounded">
        {getCoverUrl(book) ? (
          <img 
            src={getCoverUrl(book)} 
            alt={book.title}
            className="w-full h-full object-cover rounded"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="w-full h-full flex items-center justify-center rounded" style={{display: getCoverUrl(book) ? 'none' : 'flex'}}>
          <Book className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{book.title}</h3>
        <p className="text-sm text-gray-600 cursor-pointer hover:text-blue-600"
           onClick={() => book.author_name && quickSearch(book.author_name[0], 'author')}>
          {formatAuthors(book.author_name)}
        </p>
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <span>{formatYear(book.first_publish_year)}</span>
          <span>{book.edition_count || 1} editions</span>
          {book.language && book.language.length > 0 && (
            <span className="bg-green-100 text-green-700 px-1 rounded">
              {book.language[0]}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => toggleFavorite(book)}
          className={`p-2 rounded hover:bg-gray-100 ${isFavorite(book) ? 'text-red-500' : 'text-gray-400'}`}
        >
          <Star className={`w-4 h-4 ${isFavorite(book) ? 'fill-current' : ''}`} />
        </button>
        <a
          href={`https://openlibrary.org${book.key}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 p-2"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default BookRow;