import { memo } from 'react';
import { Link } from 'react-router';
import { getImageUrl } from '../utilities/movieApi';
import StarRating from './StarRating';
import './MovieCard.css';

const MovieCard = memo(({ movie, variant = 'default', onRemoveBookmark }) => {
    const imageUrl = getImageUrl(movie.poster_path, 'w500');

    const cardContent = (
        <>
            <div className={`movie-poster bg-dark-secondary ${variant}`}>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={movie.title}
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <div className="no-image-placeholder">
                        <span>No Image</span>
                    </div>
                )}
            </div>
            <div className="movie-info">
                <h3 className={`movie-title text-white fs-base font-bold ${variant}`}>
                    {movie.title}
                </h3>
                <StarRating rating={movie.vote_average / 2} />
            </div>
        </>
    );

    if (variant === 'saved') {
        return (
            <div className="saved-movie-card">
                <Link to={`/explore/${movie.id}`} className="saved-movie-link">
                    {cardContent}
                </Link>
                {onRemoveBookmark && (
                    <button
                        className="remove-bookmark-btn"
                        onClick={() => onRemoveBookmark(movie.id)}
                        aria-label="Remove bookmark"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )}
            </div>
        );
    }

    return (
        <Link
            to={`/explore/${movie.id}`}
            className={`movie-card ${variant}`}
            data-testid="movie-card"
        >
            {cardContent}
        </Link>
    );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;