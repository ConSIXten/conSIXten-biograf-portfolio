import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getUpcomingMovies, getImageUrl } from '../../utilities/movieApi';
import './ComingSoon.css';

export default function ComingSoon() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUpcomingMovies = async () => {
            try {
                setLoading(true);
                const data = await getUpcomingMovies();
                setMovies(data.results);
                setError(null);
            } catch (err) {
                setError('Failed to load upcoming movies');
                console.error('Error fetching upcoming movies:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUpcomingMovies();
    }, []);

    if (loading) {
        return (
            <section className="coming-soon">
                <h2 className="section-title">Coming Soon</h2>
                <div className="loading-message">Loading movies...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="coming-soon">
                <h2 className="section-title">Coming Soon</h2>
                <div className="error-message">{error}</div>
            </section>
        );
    }

    return (
        <section className="coming-soon">
            <h2 className="section-title">Coming Soon</h2>
            <div className="movies-scroll-container">
                {movies.map((movie) => (
                    <Link
                        key={movie.id}
                        to={`/explore/${movie.id}`}
                        className="movie-card"
                    >
                        <div className="coming-soon-poster">
                            {movie.poster_path ? (
                                <img
                                    src={getImageUrl(movie.poster_path, 'w500')}
                                    alt={movie.title}
                                />
                            ) : (
                                <div className="no-poster">No Image</div>
                            )}
                        </div>
                        <div className="movie-info">
                            <h3 className="movie-title">{movie.title}</h3>
                            <p className="movie-date">
                                {new Date(movie.release_date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}