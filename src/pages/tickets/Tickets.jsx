import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import './Tickets.css';

export default function Tickets() {
    const location = useLocation();
    const navigate = useNavigate();
    const { movieTitle, movieOverview, cinema, date, time, seats } = location.state || {};
    const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);

    // Generate order number
    const orderNumber = Math.floor(Math.random() * 9000000) + 1000000;

    // Format date
    const formatDate = (dateString) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '/');
    };

    // Format seat ID to readable format (e.g., "4-2" -> "E3")
    const formatSeat = (seatId) => {
        const [row, seat] = seatId.split('-');
        const rowLetter = String.fromCharCode(65 + parseInt(row)); // A, B, C, D...
        const seatNumber = parseInt(seat) + 1;
        return `${rowLetter}${seatNumber}`;
    };

    const handleDownload = () => {
        setShowDownloadSuccess(true);
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    if (!seats || seats.length === 0) {
        return (
            <div className="tickets-page">
                <div className="no-tickets text-white text-center" data-testid="bookings-list">
                    <p>No tickets found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="tickets-page">
            {/* Instructions */}
            <div className="instructions-section">
                <h2 className="text-white fs-xl font-bold mb-3">Instruction</h2>
                <p className="instructions-text text-gray">
                    Come to the cinema, show and scan the barcode to the space provided.
                    Continue to comply with health protocols.
                </p>
            </div>

            {/* Tickets Container - Swipeable */}
            <div className="tickets-scroll-container" data-testid="bookings-list">
                {seats.map((seatId) => (
                    <div key={seatId} className="ticket-card">
                        {/* Ticket Header */}
                        <div className="ticket-header">
                            <div className="ticket-title">
                                <span className="film-label text-dark">Film: </span>
                                <span className="film-name text-dark font-bold">{movieTitle || 'Movie Title'}</span>
                            </div>
                            <span className="eticket-label text-red">e-ticket</span>
                        </div>

                        {/* Ticket Details */}
                        <div className="ticket-details">
                            <div className="detail-row">
                                <div className="detail-item">
                                    <span className="detail-label text-gray">Date</span>
                                    <span className="detail-value text-dark font-bold">
                                        {date ? formatDate(date) : '06/09/2021'}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label text-gray">Seats</span>
                                    <span className="detail-value text-dark font-bold">
                                        {formatSeat(seatId)}
                                    </span>
                                </div>
                            </div>

                            <div className="detail-row">
                                <div className="detail-item">
                                    <span className="detail-label text-gray">Location</span>
                                    <span className="detail-value text-dark font-bold">
                                        {cinema || 'Viva Cinema'}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label text-gray">Time</span>
                                    <span className="detail-value text-dark font-bold">
                                        {time || '01.00 PM'}
                                    </span>
                                </div>
                            </div>

                            <div className="detail-row">
                                <div className="detail-item">
                                    <span className="detail-label text-gray">Payment</span>
                                    <span className="detail-value text-dark font-bold">Successful</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label text-gray">Order</span>
                                    <span className="detail-value text-dark font-bold">{orderNumber}</span>
                                </div>
                            </div>
                        </div>

                        {/* Dashed Separator */}
                        <div className="ticket-separator"></div>

                        {/* Barcode */}
                        <div className="barcode-container">
                            <svg className="barcode" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                                <rect x="5" y="0" width="3" height="60" fill="black" />
                                <rect x="12" y="0" width="2" height="60" fill="black" />
                                <rect x="18" y="0" width="4" height="60" fill="black" />
                                <rect x="26" y="0" width="2" height="60" fill="black" />
                                <rect x="32" y="0" width="3" height="60" fill="black" />
                                <rect x="39" y="0" width="2" height="60" fill="black" />
                                <rect x="45" y="0" width="4" height="60" fill="black" />
                                <rect x="53" y="0" width="2" height="60" fill="black" />
                                <rect x="59" y="0" width="3" height="60" fill="black" />
                                <rect x="66" y="0" width="4" height="60" fill="black" />
                                <rect x="74" y="0" width="2" height="60" fill="black" />
                                <rect x="80" y="0" width="3" height="60" fill="black" />
                                <rect x="87" y="0" width="2" height="60" fill="black" />
                                <rect x="93" y="0" width="4" height="60" fill="black" />
                                <rect x="101" y="0" width="3" height="60" fill="black" />
                                <rect x="108" y="0" width="2" height="60" fill="black" />
                                <rect x="114" y="0" width="4" height="60" fill="black" />
                                <rect x="122" y="0" width="2" height="60" fill="black" />
                                <rect x="128" y="0" width="3" height="60" fill="black" />
                                <rect x="135" y="0" width="2" height="60" fill="black" />
                                <rect x="141" y="0" width="4" height="60" fill="black" />
                                <rect x="149" y="0" width="3" height="60" fill="black" />
                                <rect x="156" y="0" width="2" height="60" fill="black" />
                                <rect x="162" y="0" width="4" height="60" fill="black" />
                                <rect x="170" y="0" width="2" height="60" fill="black" />
                                <rect x="176" y="0" width="3" height="60" fill="black" />
                                <rect x="183" y="0" width="4" height="60" fill="black" />
                                <rect x="191" y="0" width="2" height="60" fill="black" />
                            </svg>
                        </div>

                        {/* Ticket Notches */}
                        <div className="ticket-notch ticket-notch-left"></div>
                        <div className="ticket-notch ticket-notch-right"></div>
                    </div>
                ))}
            </div>

            {/* Download Button */}
            <button
                className="download-button bg-blue text-white font-bold"
                onClick={handleDownload}
            >
                Download E-Ticket
            </button>

            {/* Download Success Modal */}
            {showDownloadSuccess && (
                <div className="success-modal-overlay" onClick={() => setShowDownloadSuccess(false)}>
                    <div className="success-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="success-icon">
                            <div className="success-circle">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15L12 3M12 15L8 11M12 15L16 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 19H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="success-title text-white font-bold">
                            Your ticket has been downloaded
                        </h2>

                        <p className="success-description text-white">
                            {movieOverview || 'Adele is a Scottish heiress whose extremely wealthy family owns estates and grounds. When she was a teenager...'}
                        </p>

                        <button
                            className="see-ticket-btn text-white font-bold"
                            onClick={handleBackToHome}
                        >
                            Back To Home
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
