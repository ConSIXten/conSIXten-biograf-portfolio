import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { searchMovies, getImageUrl } from '../utilities/movieApi';
import './SearchBar.css';

export default function SearchBar({ onClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Debounced search
    useEffect(() => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        const timeoutId = setTimeout(async () => {
            try {
                setLoading(true);
                const data = await searchMovies(searchQuery);
                setResults(data.results.slice(0, 8)); // Show top 8 results
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setLoading(false);
            }
        }, 500); // Wait 500ms after user stops typing

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleMovieClick = (movieId) => {
        navigate(`/explore/${movieId}`);
        if (onClose) onClose();
    };

    return (
        <div className="search-bar-container">
            <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
                <div className="search-input-wrapper">
                    <svg className="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search your favourite movie"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="clear-search"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </form>

            {/* Search Results */}
            {loading && <div className="search-loading">Searching...</div>}

            {results.length > 0 && (
                <div className="search-results">
                    {results.map((movie) => (
                        <div
                            key={movie.id}
                            className="search-result-item"
                            onClick={() => handleMovieClick(movie.id)}
                        >
                            <img
                                src={getImageUrl(movie.poster_path, 'w92')}
                                alt={movie.title}
                                className="search-result-poster"
                            />
                            <div className="search-result-info">
                                <h4 className="search-result-title">{movie.title}</h4>
                                <p className="search-result-year">
                                    {movie.release_date?.split('-')[0] || 'N/A'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {searchQuery && !loading && results.length === 0 && (
                <div className="no-results">No movies found</div>
            )}
        </div>
    );
}
