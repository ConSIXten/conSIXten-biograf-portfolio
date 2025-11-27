import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import MovieCard from '../MovieCard';
import { getTopRatedMovies } from '../../utilities/movieApi';
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
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        variant="recommended"
                    />
                ))}
            </div>
        </section>
    );
}
