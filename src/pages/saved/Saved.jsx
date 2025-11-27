import { Link } from 'react-router';
import MovieCard from '../../Components/MovieCard';
import { useBookmarks } from '../../utilities/useBookmarks';
import './Saved.css';

export default function Saved() {
    const { bookmarkedMovies, removeBookmark } = useBookmarks();

    if (bookmarkedMovies.length === 0) {
        return (
            <div className="saved-page-empty">
                <div className="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h2 className="text-white fs-2xl font-bold mt-4 mb-2">No Saved Movies</h2>
                    <p className="text-gray">Start bookmarking movies to see them here!</p>
                    <Link to="/explore" className="btn-explore bg-blue text-white font-bold mt-4">
                        Explore Movies
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="saved-page">
            <div className="saved-movies-grid">
                {bookmarkedMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        variant="saved"
                        onRemoveBookmark={removeBookmark}
                    />
                ))}
            </div>
        </div>
    );
}
