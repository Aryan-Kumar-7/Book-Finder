import React from 'react';

const QuickStats = ({ books, favorites, searchHistory }) => (
  <div className="bg-white rounded-lg shadow-sm p-4">
    <h3 className="font-semibold text-gray-900 mb-3">Quick Stats</h3>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span>Books Found:</span>
        <span className="font-medium text-blue-600">{books.length}</span>
      </div>
      <div className="flex justify-between">
        <span>Favorites:</span>
        <span className="font-medium text-red-600">{favorites.length}</span>
      </div>
      <div className="flex justify-between">
        <span>Searches Today:</span>
        <span className="font-medium text-green-600">{searchHistory.length}</span>
      </div>
    </div>
  </div>
);

export default QuickStats;