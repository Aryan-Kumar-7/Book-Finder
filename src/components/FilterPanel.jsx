import React from 'react';

const FilterPanel = ({ 
  showFilters, 
  yearRange, 
  setYearRange, 
  selectedSubjects, 
  setSelectedSubjects,
  selectedLanguages,
  setSelectedLanguages,
  favorites, 
  setBooks,
  setSearchQuery 
}) => {
  const popularSubjects = [
    'fiction', 'science', 'history', 'biography', 'mystery', 'romance', 
    'fantasy', 'philosophy', 'psychology', 'computer_science', 'mathematics',
    'literature', 'poetry', 'drama', 'education', 'self_help', 'business',
    'art', 'music', 'medicine', 'law', 'engineering', 'chemistry', 'physics'
  ];

  const popularLanguages = [
    { code: 'eng', name: 'English' },
    { code: 'spa', name: 'Spanish' },
    { code: 'fre', name: 'French' },
    { code: 'ger', name: 'German' },
    { code: 'ita', name: 'Italian' },
    { code: 'por', name: 'Portuguese' },
    { code: 'rus', name: 'Russian' },
    { code: 'jpn', name: 'Japanese' },
    { code: 'chi', name: 'Chinese' },
    { code: 'ara', name: 'Arabic' }
  ];

  if (!showFilters) return null;

  return (
    <div className="border-t bg-gray-50 px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Publication Year</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={yearRange.min}
              onChange={(e) => setYearRange(prev => ({ ...prev, min: e.target.value }))}
              placeholder="From"
              min="1000"
              max="2025"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="number"
              value={yearRange.max}
              onChange={(e) => setYearRange(prev => ({ ...prev, max: e.target.value }))}
              placeholder="To"
              min="1000"
              max="2025"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subjects ({selectedSubjects.length})
          </label>
          <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
            {popularSubjects.slice(0, 12).map(subject => (
              <button
                key={subject}
                onClick={() => {
                  setSelectedSubjects(prev => 
                    prev.includes(subject) 
                      ? prev.filter(s => s !== subject)
                      : [...prev, subject]
                  );
                }}
                className={`px-2 py-1 text-xs rounded ${
                  selectedSubjects.includes(subject)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {subject.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Languages ({selectedLanguages.length})
          </label>
          <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
            {popularLanguages.slice(0, 6).map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  setSelectedLanguages(prev => 
                    prev.includes(lang.code) 
                      ? prev.filter(l => l !== lang.code)
                      : [...prev, lang.code]
                  );
                }}
                className={`px-2 py-1 text-xs rounded ${
                  selectedLanguages.includes(lang.code)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            My Collection ({favorites.length})
          </label>
          <button
            onClick={() => {
              setBooks(favorites);
              setSearchQuery('My Favorites');
            }}
            className="px-3 py-2 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 w-full"
            disabled={favorites.length === 0}
          >
            Show Favorites
          </button>
          <div className="mt-2">
            <button
              onClick={() => {
                setSelectedSubjects([]);
                setSelectedLanguages([]);
                setYearRange({ min: '', max: '' });
              }}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 w-full"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;