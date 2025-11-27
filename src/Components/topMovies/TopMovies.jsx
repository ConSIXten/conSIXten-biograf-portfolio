import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import StarRating from '../StarRating';
import { getNowPlayingMovies, getUpcomingMovies, getImageUrl } from '../../utilities/movieApi';
import './TopMovies.css';

export default function TopMovies({ type = 'now-showing' }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);

                const data = type === 'now-showing'
                    ? await getNowPlayingMovies()
                    : await getUpcomingMovies();

                setMovies(data.results.slice(0, 10));
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [type]);

    if (loading) {
        return <div className="text-center p-5 text-gray">Loading movies...</div>;
    }

    return (
        <section className="top-movies-section">
            <div className="top-movies-header">
                <h2 className="text-white fs-2xl font-bold m-0">Top Movies</h2>
                <Link to="#" className="see-more-link text-gray fs-sm">See more</Link>
            </div>

            <div className="top-movies-scroll">
                {movies.map((movie) => (
                    <Link
                        key={movie.id}
                        to={`/explore/${movie.id}`}
                        className="top-movie-card"
                        data-testid="movie-card"
                    >
                        <div className="top-movie-poster bg-dark-secondary">
                            <img
                                src={getImageUrl(movie.poster_path, 'w500')}
                                alt={movie.title}
                            />
                        </div>
                        <h3 className="movie-title text-white fs-base font-bold mt-2 mb-1">
                            {movie.title}
                        </h3>
                        <StarRating rating={movie.vote_average / 2} />
                    </Link>
                ))}
            </div>
        </section>
    );
}
