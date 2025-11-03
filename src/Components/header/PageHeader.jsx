import { useNavigate } from 'react-router';
import './PageHeader.css';

export default function PageHeader({
    title,
    showBack = true,
    showSearch = true,
    showBookmark = false,
    isBookmarked = false,
    onBookmarkClick
}) {
    const navigate = useNavigate();

    return (
        <header className="page-header">
            <div className="page-header-content">
                {showBack && (
                    <button
                        className="back-button"
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )}

                <h1 className="page-title">{title}</h1>

                {showSearch && !showBookmark && (
                    <button
                        className="search-button"
                        aria-label="Search"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )}

                {showBookmark && (
                    <button
                        className="bookmark-button"
                        onClick={onBookmarkClick}
                        aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )}
            </div>
        </header>
    );
}
