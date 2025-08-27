import React from 'react';
import { Book, Star, ExternalLink } from 'lucide-react';

const BookCard = ({ book, toggleFavorite, isFavorite, quickSearch }) => {
  const getCoverUrl = (book, size = 'M') => {
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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200">
      <div className="flex">
        <div className="w-24 h-32 bg-gray-100 flex-shrink-0">
          {getCoverUrl(book) ? (
            <img 
              src={getCoverUrl(book)} 
              alt={book.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="w-full h-full flex items-center justify-center" style={{display: getCoverUrl(book) ? 'none' : 'flex'}}>
            <Book className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight">
              {book.title}
            </h3>
            <button
              onClick={() => toggleFavorite(book)}
              className={`ml-2 p-1 rounded hover:bg-gray-100 ${isFavorite(book) ? 'text-red-500' : 'text-gray-400'}`}
            >
              <Star className={`w-4 h-4 ${isFavorite(book) ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-1 cursor-pointer hover:text-blue-600"
             onClick={() => book.author_name && quickSearch(book.author_name[0], 'author')}>
            {formatAuthors(book.author_name)}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Published: {formatYear(book.first_publish_year)}</span>
            <span>{book.edition_count || 1} edition{(book.edition_count || 1) !== 1 ? 's' : ''}</span>
          </div>

          {book.language && (
            <div className="mb-2">
              <span className="text-xs text-gray-500">Languages: </span>
              {book.language.slice(0, 3).map((lang, idx) => (
                <span key={idx} className="text-xs bg-green-100 text-green-700 px-1 rounded mr-1">
                  {lang}
                </span>
              ))}
            </div>
          )}
          
          {book.subject && book.subject.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {book.subject.slice(0, 3).map((subject, idx) => (
                <button 
                  key={idx}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs cursor-pointer hover:bg-blue-200 transition-colors"
                  onClick={() => quickSearch(subject, 'subject')}
                >
                  {subject}
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center">
            {book.publisher && book.publisher.length > 0 && (
              <button
                onClick={() => quickSearch(book.publisher[0], 'publisher')}
                className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer"
              >
                {book.publisher[0]}
              </button>
            )}
            <a
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-xs flex items-center transition-colors"
            >
              View Details <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;