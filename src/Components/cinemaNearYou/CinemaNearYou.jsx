import { useState, useEffect } from 'react';
import { getCinemas } from '../../utilities/cinemaApi';
import './CinemaNearYou.css';

export default function CinemaNearYou() {
    const [cinemas, setCinemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                setLoading(true);
                const data = await getCinemas();
                // Add mock data for display (status) - distance and rating come from database
                const cinemasWithExtras = data.map(cinema => ({
                    ...cinema,
                    distance: cinema.distance_km ? `${cinema.distance_km} km` : '2.5 km', // Use real distance from API
                    status: 'Open',
                    closingTime: 'Until 11:00 PM',
                    rating: parseFloat(cinema.rating) || 4.5 // Use database rating or fallback
                }));
                setCinemas(cinemasWithExtras);
            } catch (err) {
                console.error('Error fetching cinemas:', err);
                setError('Failed to load cinemas');
            } finally {
                setLoading(false);
            }
        };

        fetchCinemas();
    }, []);

    if (loading) {
        return (
            <section className="cinema-near-you">
                <div className="section-header">
                    <h2 className="section-title">Cinema Near You</h2>
                </div>
                <div className="cinema-list">
                    <p className="text-white">Loading cinemas...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="cinema-near-you">
                <div className="section-header">
                    <h2 className="section-title">Cinema Near You</h2>
                </div>
                <div className="cinema-list">
                    <p className="text-red">{error}</p>
                </div>
            </section>
        );
    }

    // Show only 5 cinemas initially, or all if "See all" is clicked
    const displayedCinemas = showAll ? cinemas : cinemas.slice(0, 5);

    return (
        <section className="cinema-near-you" data-testid="cinemas-section">
            <div className="section-header">
                <h2 className="section-title">Cinema Near You</h2>
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="see-all-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    data-testid="see-all-button"
                >
                    {showAll ? 'Show less' : 'See all'}
                </button>
            </div>

            <div className="cinema-list">
                {displayedCinemas.map((cinema) => {
                    // Get first valid image (prefer external URLs that start with https://)
                    let imageUrl = null;
                    if (cinema.images && cinema.images.length > 0) {
                        // Try to find an external URL first
                        const externalImage = cinema.images.find(img => img && img.url && img.url.startsWith('https://'));
                        // If no external URL, try localhost
                        const localImage = cinema.images.find(img => img && img.url);
                        imageUrl = externalImage ? externalImage.url : (localImage ? localImage.url : null);
                    }

                    return (
                        <div key={cinema.id} className="cinema-card" data-testid="cinema-card">
                            <div className="cinema-logo">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={cinema.name}
                                        className="cinema-image"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', objectPosition: 'center' }}
                                        onError={(e) => {
                                            console.log('Image failed to load:', e.target.src);
                                            // Hide image and show placeholder on error
                                            e.target.style.display = 'none';
                                            const placeholder = e.target.nextElementSibling;
                                            if (placeholder) placeholder.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div
                                    className="logo-placeholder"
                                    style={{ display: imageUrl ? 'none' : 'flex' }}
                                >
                                    {cinema.name.charAt(0)}
                                </div>
                            </div>

                            <div className="cinema-details">
                                <div className="cinema-location">
                                    <svg className="location-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 8.5C8.82843 8.5 9.5 7.82843 9.5 7C9.5 6.17157 8.82843 5.5 8 5.5C7.17157 5.5 6.5 6.17157 6.5 7C6.5 7.82843 7.17157 8.5 8 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8 14C10 11 13 8.98528 13 7C13 4.23858 10.7614 2 8 2C5.23858 2 3 4.23858 3 7C3 8.98528 6 11 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="distance">{cinema.distance}</span>
                                </div>

                                <h3 className="cinema-name" data-testid="cinema-name">{cinema.name}</h3>
                                <p className="cinema-address" data-testid="cinema-address">{cinema.address}, {cinema.city}</p>

                                <p className="cinema-status">{cinema.status} {cinema.closingTime}</p>
                            </div>

                            <div className="cinema-rating">
                                <svg className="star-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 1L12.5 7.5H19L14 11.5L16.5 18L10 14L3.5 18L6 11.5L1 7.5H7.5L10 1Z" fill="#FFA500" stroke="#FFA500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="rating-value" data-testid="cinema-rating">{cinema.rating.toFixed(1)}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
