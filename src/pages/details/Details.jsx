import { useState, useEffect } from 'react';
import { useLoaderData, useOutletContext, useNavigate } from 'react-router';
import { getImageUrl } from '../../utilities/movieApi';
import { useBookmarks } from '../../utilities/useBookmarks';
import './Details.css';

export default function Details() {
    const movie = useLoaderData();
    const navigate = useNavigate();
    const [showFullSynopsis, setShowFullSynopsis] = useState(false);
    const { toggleBookmark, isBookmarked } = useBookmarks();
    const { setBookmarkState } = useOutletContext();

    // Update header bookmark state when movie or bookmark status changes
    useEffect(() => {
        const handleToggle = () => {
            toggleBookmark({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
                release_date: movie.release_date
            });
        };

        setBookmarkState({
            isBookmarked: isBookmarked(movie.id),
            onToggle: handleToggle
        });
    }, [movie, isBookmarked, toggleBookmark, setBookmarkState]);

    // Get director from crew
    const director = movie.credits?.crew?.find(person => person.job === 'Director');

    // Format runtime to hours and minutes
    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m`;
    };

    // Get first 2-3 genres
    const displayGenres = movie.genres?.slice(0, 3) || [];

    return (
        <div className="details-page">
            {/* Movie Poster */}
            <div className="movie-poster-container mt-4">
                <img
                    src={getImageUrl(movie.poster_path, 'w780')}
                    alt={movie.title}
                    className="movie-poster"
                />
            </div>

            {/* Movie Info */}
            <div className="movie-info">
                <h1 className="movie-title text-white fs-3xl font-bold mb-3">
                    {movie.title}
                </h1>

                {/* Director and Rating */}
                <div className="director-rating mb-3">
                    <span className="text-gray">Director: {director?.name || 'Unknown'}</span>
                    <span className="rating">
                        <span className="star">⭐</span>
                        <span className="text-white font-bold">{movie.vote_average?.toFixed(1)}</span>
                    </span>
                </div>

                {/* Genres and Runtime */}
                <div className="genres-runtime mb-5">
                    {displayGenres.map((genre) => (
                        <span key={genre.id} className="genre-pill bg-dark-secondary text-white">
                            {genre.name}
                        </span>
                    ))}
                    <span className="runtime-pill bg-dark-secondary text-white">
                        {formatRuntime(movie.runtime)}
                    </span>
                </div>

                {/* Synopsis */}
                <div className="synopsis-section mb-5">
                    <h2 className="text-white fs-2xl font-bold mb-3">Synopsis</h2>
                    <p className="synopsis-text text-gray">
                        {showFullSynopsis
                            ? movie.overview
                            : `${movie.overview?.substring(0, 150)}...`}
                        {movie.overview?.length > 150 && (
                            <button
                                onClick={() => setShowFullSynopsis(!showFullSynopsis)}
                                className="read-more-btn text-blue"
                            >
                                {showFullSynopsis ? ' Show Less' : ' Read More'}
                            </button>
                        )}
                    </p>
                </div>

                {/* Book Ticket Button */}
                <button
                    className="book-ticket-btn bg-blue text-white font-bold"
                    onClick={() => navigate(`/booking/${movie.id}`)}
                >
                    Book Ticket
                </button>
            </div>
        </div>
    );
}