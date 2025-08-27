import React, { useState, useEffect } from 'react';
import { Book, Filter, Grid, List, Search, Loader2 } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import BookRow from '../components/BookRow';
import FilterPanel from '../components/FilterPanel';
import SearchHistory from '../components/SearchHistory';
import QuickStats from '../components/QuickStats';
import QuickSearchButtons from '../components/QuickSearchButton';

const BookFinder = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('title');
    const [viewMode, setViewMode] = useState('grid');
    const [favorites, setFavorites] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [yearRange, setYearRange] = useState({ min: '', max: '' });
    const [showFilters, setShowFilters] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const buildSearchUrl = () => {
        let url = `https://openlibrary.org/search.json?${searchType}=${encodeURIComponent(searchQuery)}&limit=24&page=${page}`;

        // Add subject filters
        if (selectedSubjects.length > 0) {
            url += `&subject=${selectedSubjects.join(',')}`;
        }

        // Add language filters
        if (selectedLanguages.length > 0) {
            url += `&language=${selectedLanguages.join(',')}`;
        }

        // Add year range filters 
        if (yearRange.min || yearRange.max) {
            url += `&first_publish_year=${yearRange.min || yearRange.max}`;
        }


        return url;
    };

    const searchBooks = async () => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const url = buildSearchUrl();
            console.log("Search URL:", url);

            const response = await fetch(url);
            const data = await response.json();

            setBooks(data.docs || []);
            setTotalResults(data.numFound || 0);

            // Add to search history (only on first page, to avoid duplication)
            if (page === 1) {
                const newSearch = {
                    query: searchQuery,
                    type: searchType,
                    timestamp: new Date(),
                    results: data.numFound || 0,
                };
                setSearchHistory((prev) => [newSearch, ...prev.slice(0, 9)]);
            }
        } catch (error) {
            console.error("Search failed:", error);
            setBooks([]);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Handle page change
    const handlePageChange = (newPage) => {
        if (newPage < 1) return;
        if (newPage > Math.ceil(totalResults / 24)) return;
        setPage(newPage);
    };

    // 🔄 Re-run search when page changes
    useEffect(() => {
        if (searchQuery.trim()) {
            searchBooks();
        }
    }, [page]);

    // Favorites
    const toggleFavorite = (book) => {
        const bookId = book.key;
        setFavorites((prev) =>
            prev.find((fav) => fav.key === bookId)
                ? prev.filter((fav) => fav.key !== bookId)
                : [...prev, book]
        );
    };

    const isFavorite = (book) => favorites.some((fav) => fav.key === book.key);

    // Quick search (resets to page 1)
    const quickSearch = (query, type = 'title') => {
        setSearchQuery(query);
        setSearchType(type);
        setLoading(true);
        setPage(1); // reset page
        setTimeout(() => {
            const url = `https://openlibrary.org/search.json?${type}=${encodeURIComponent(query)}&limit=24&page=1`;
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setBooks(data.docs || []);
                    setTotalResults(data.numFound || 0);
                    const newSearch = {
                        query,
                        type,
                        timestamp: new Date(),
                        results: data.numFound || 0,
                    };
                    setSearchHistory((prev) => [newSearch, ...prev.slice(0, 9)]);
                })
                .catch((error) => {
                    console.error("Quick search failed:", error);
                    setBooks([]);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 100);
    };


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-4">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                                <Book className="w-8 h-8 mr-2 text-blue-600" />
                                BookFinder
                                <span className="text-sm font-normal text-gray-500 ml-2">for Students</span>
                            </h1>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${showFilters ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <Filter className="w-4 h-4 mr-1 inline" />
                                    Advanced Filters
                                </button>
                                <div className="flex rounded-md border border-gray-300">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        <Grid className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <SearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            searchType={searchType}
                            setSearchType={setSearchType}
                            searchBooks={searchBooks}
                            loading={loading}
                        />

                        <QuickSearchButtons quickSearch={quickSearch} />
                    </div>

                    <FilterPanel
                        showFilters={showFilters}
                        yearRange={yearRange}
                        setYearRange={setYearRange}
                        selectedSubjects={selectedSubjects}
                        setSelectedSubjects={setSelectedSubjects}
                        selectedLanguages={selectedLanguages}
                        setSelectedLanguages={setSelectedLanguages}
                        favorites={favorites}
                        setBooks={setBooks}
                        setSearchQuery={setSearchQuery}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <SearchHistory searchHistory={searchHistory} quickSearch={quickSearch} />
                        <QuickStats books={books} favorites={favorites} searchHistory={searchHistory} />
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                                <span className="ml-2 text-gray-600">Searching Open Library...</span>
                            </div>
                        ) : books.length > 0 ? (
                            <div>
                                <div className="mb-4 flex justify-between items-center">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Search Results ({books.length})
                                    </h2>
                                    <div className="text-sm text-gray-500">
                                        Showing results for "{searchQuery}" in {searchType}
                                    </div>
                                </div>

                                {viewMode === 'grid' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {books.map((book, idx) => (
                                            <BookCard
                                                key={`${book.key}-${idx}`}
                                                book={book}
                                                toggleFavorite={toggleFavorite}
                                                isFavorite={isFavorite}
                                                quickSearch={quickSearch}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {books.map((book, idx) => (
                                            <BookRow
                                                key={`${book.key}-${idx}`}
                                                book={book}
                                                toggleFavorite={toggleFavorite}
                                                isFavorite={isFavorite}
                                                quickSearch={quickSearch}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : searchQuery ? (
                            <div className="text-center py-12">
                                <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
                                <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
                                <div className="text-sm text-gray-500">
                                    Searched for "{searchQuery}" in {searchType}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to BookFinder</h3>
                                <p className="text-gray-600 mb-6">Search millions of books by title, author, subject, ISBN, publisher, and more</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-md mx-auto">
                                    {['React Programming', 'Data Science', 'History', 'Fiction'].map(term => (
                                        <button
                                            key={term}
                                            onClick={() => quickSearch(term, 'q')}
                                            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm transition-colors"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {books.length > 0 && totalResults > 1 && (
                <div className="flex justify-center items-center space-x-4 py-6">
                    <button
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="px-4 py-2">
                        Page {page} of {totalResults}
                    </span>

                    <button
                        onClick={() => setPage(prev => Math.min(prev + 1, totalResults))}
                        disabled={page === totalResults}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookFinder;