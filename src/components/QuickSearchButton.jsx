import React from 'react';  

const QuickSearchButtons = ({ quickSearch }) => {
  const quickSearches = [
    { query: 'computer science', type: 'subject', label: 'Computer Science' },
    { query: 'python programming', type: 'q', label: 'Python' },
    { query: 'data structures', type: 'subject', label: 'Data Structures' },
    { query: 'artificial intelligence', type: 'subject', label: 'AI' },
    { query: 'mathematics', type: 'subject', label: 'Mathematics' },
    { query: 'physics', type: 'subject', label: 'Physics' },
    { query: 'history', type: 'subject', label: 'History' },
    { query: 'philosophy', type: 'subject', label: 'Philosophy' }
  ];

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {quickSearches.map(search => (
        <button
          key={search.query}
          onClick={() => quickSearch(search.query, search.type)}
          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
        >
          {search.label}
        </button>
      ))}
    </div>
  );
};

export default QuickSearchButtons;