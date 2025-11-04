import { useState, useEffect } from 'react';
import { mockCinemas } from '../../utilities/mockCinemaData';
import './CinemaNearYou.css';

export default function CinemaNearYou() {
    const [cinemas, setCinemas] = useState([]);

    useEffect(() => {
        // Simulate fetching cinema data
        setCinemas(mockCinemas);
    }, []);

    return (
        <section className="cinema-near-you">
            <div className="section-header">
                <h2 className="section-title">Cinema Near You</h2>
                <a href="#" className="see-all-link">See all</a>
            </div>

            <div className="cinema-list">
                {cinemas.map((cinema) => (
                    <div key={cinema.id} className="cinema-card">
                        <div className="cinema-logo">
                            {/* Placeholder for cinema logo */}
                            <div className="logo-placeholder">
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

                            <h3 className="cinema-name">{cinema.name}</h3>

                            <p className="cinema-status">{cinema.status} {cinema.closingTime}</p>
                        </div>

                        <div className="cinema-rating">
                            <svg className="star-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 1L12.5 7.5H19L14 11.5L16.5 18L10 14L3.5 18L6 11.5L1 7.5H7.5L10 1Z" fill="#FFA500" stroke="#FFA500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="rating-value">{cinema.rating.toFixed(1)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
