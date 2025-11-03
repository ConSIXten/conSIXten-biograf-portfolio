import { useState, useEffect } from 'react';
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

    const addBookmark = (movie) => {
        setBookmarkedMovies(prev => {
            // Avoid duplicates
            if (prev.find(m => m.id === movie.id)) {
                return prev;
            }
            return [...prev, movie];
        });
    };

    const removeBookmark = (movieId) => {
        setBookmarkedMovies(prev => prev.filter(movie => movie.id !== movieId));
    };

    const isBookmarked = (movieId) => {
        return bookmarkedMovies.some(movie => movie.id === movieId);
    };

    const toggleBookmark = (movie) => {
        if (isBookmarked(movie.id)) {
            removeBookmark(movie.id);
        } else {
            addBookmark(movie);
        }
    };

    return (
        <BookmarkContext.Provider value={{
            bookmarkedMovies,
            addBookmark,
            removeBookmark,
            isBookmarked,
            toggleBookmark
        }}>
            {children}
        </BookmarkContext.Provider>
    );
};
