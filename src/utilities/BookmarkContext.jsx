import { useState, useEffect, useCallback, useMemo } from 'react';
import { BookmarkContext } from './bookmarkContext';

export const BookmarkProvider = ({ children }) => {
    const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

    // Load bookmarks from localStorage on mount
    useEffect(() => {
        const savedBookmarks = localStorage.getItem('bookmarkedMovies');
        if (savedBookmarks) {
            try {
                setBookmarkedMovies(JSON.parse(savedBookmarks));
            } catch (error) {
                console.error('Error loading bookmarks:', error);
                setBookmarkedMovies([]);
            }
        }
    }, []);

    // Save bookmarks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('bookmarkedMovies', JSON.stringify(bookmarkedMovies));
    }, [bookmarkedMovies]);

    const addBookmark = useCallback((movie) => {
        setBookmarkedMovies(prev => {
            // Avoid duplicates
            if (prev.find(m => m.id === movie.id)) {
                return prev;
            }
            return [...prev, movie];
        });
    }, []);

    const removeBookmark = useCallback((movieId) => {
        setBookmarkedMovies(prev => prev.filter(movie => movie.id !== movieId));
    }, []);

    const isBookmarked = useCallback((movieId) => {
        return bookmarkedMovies.some(movie => movie.id === movieId);
    }, [bookmarkedMovies]);

    const toggleBookmark = useCallback((movie) => {
        if (isBookmarked(movie.id)) {
            removeBookmark(movie.id);
        } else {
            addBookmark(movie);
        }
    }, [isBookmarked, removeBookmark, addBookmark]);

    const contextValue = useMemo(() => ({
        bookmarkedMovies,
        addBookmark,
        removeBookmark,
        isBookmarked,
        toggleBookmark
    }), [bookmarkedMovies, addBookmark, removeBookmark, isBookmarked, toggleBookmark]);

    return (
        <BookmarkContext.Provider value={contextValue}>
            {children}
        </BookmarkContext.Provider>
    );
};
