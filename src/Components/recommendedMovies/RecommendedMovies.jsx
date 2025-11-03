import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getTopRatedMovies, getImageUrl } from '../../utilities/movieApi';
import './RecommendedMovies.css';

export default function RecommendedMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const data = await getTopRatedMovies();
                setMovies(data.results.slice(0, 10));
            } catch (error) {
                console.error('Error fetching recommended movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return <div className="text-center p-5 text-gray">Loading movies...</div>;
    }

    return (
        <section className="recommended-movies-section">
            <div className="recommended-movies-header">
                <h2 className="text-white fs-2xl font-bold m-0">Recommended</h2>
                <Link to="#" className="see-more-link text-gray fs-sm">See more</Link>
            </div>

            <div className="recommended-movies-scroll">
                {movies.map((movie) => (
                    <Link
                        key={movie.id}
                        to={`/explore/${movie.id}`}
                        className="recommended-movie-card"
                    >
                        <div className="recommended-movie-poster bg-dark-secondary">
                            <img
                                src={getImageUrl(movie.poster_path, 'w500')}
                                alt={movie.title}
                            />
                        </div>
                        <h3 className="recommended-movie-title text-white fs-base font-bold mt-2">
                            {movie.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}
