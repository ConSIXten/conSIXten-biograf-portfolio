import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import './Payment.css';

export default function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const { movieId, cinema, date, time, seats, movieTitle, movieOverview } = location.state || {};

    // Form state
    const [email, setEmail] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    // Calculate total price ($20 per seat)
    const pricePerSeat = 20;
    const totalPrice = seats ? seats.length * pricePerSeat : 0;

    // Format card number with spaces
    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\s/g, '');
        if (value.length > 16) return;

        // Add space every 4 digits
        value = value.match(/.{1,4}/g)?.join(' ') || value;
        setCardNumber(value);
    };

    // Handle CVV input (max 3 digits)
    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 3) {
            setCvv(value);
        }
    };

    const handlePayment = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !cardholderName || !cardNumber || !expiryDate || !cvv) {
            alert('Please fill in all fields');
            return;
        }

        // Simulate payment processing
        setShowSuccess(true);
    };

    const handleSeeTicket = () => {
        navigate('/tickets', {
            state: {
                movieId,
                movieTitle,
                movieOverview,
                cinema,
                date,
                time,
                seats,
                totalPrice
            }
        });
    };

    return (
        <div className="payment-page">
            {/* Payment Method Section */}
            <div className="payment-method-section">
                <div className="section-header">
                    <h2 className="text-white fs-xl font-bold">Payment Method</h2>
                    <button className="change-btn text-gray">Change</button>
                </div>

                <div className="credit-card">
                    <div className="card-top">
                        <div className="card-logo">
                            <div className="mastercard-circle mastercard-red"></div>
                            <div className="mastercard-circle mastercard-orange"></div>
                        </div>
                        <span className="balance-label text-white">Balance</span>
                    </div>
                    <div className="card-balance text-white">$120,580.00</div>
                    <div className="card-bottom">
                        <div className="card-holder">
                            <span className="card-label text-white">Card Holder</span>
                            <span className="card-name text-white font-bold">Miles Morales</span>
                        </div>
                        <span className="card-number text-white">**** **** **** 51446</span>
                    </div>
                </div>
            </div>

            {/* Payment Details Form */}
            <form className="payment-details-section" onSubmit={handlePayment}>
                <h2 className="text-white fs-xl font-bold mb-4">Payment Details</h2>

                <div className="form-group">
                    <label className="form-label text-white">Your Email</label>
                    <input
                        type="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        required
                        data-testid="email-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label text-white">Cardholder Name</label>
                    <input
                        type="text"
                        className="form-input"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        placeholder="John Doe"
                        required
                        data-testid="name"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label text-white">Card Number</label>
                    <input
                        type="text"
                        className="form-input"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        data-testid="card-number"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group form-half">
                        <label className="form-label text-white">Date</label>
                        <input
                            type="text"
                            className="form-input"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            placeholder="MM/YY"
                            required
                            data-testid="expiry"
                        />
                    </div>

                    <div className="form-group form-half">
                        <label className="form-label text-white">CVV</label>
                        <input
                            type="text"
                            className="form-input"
                            value={cvv}
                            onChange={handleCvvChange}
                            placeholder="123"
                            required
                            data-testid="cvv"
                        />
                    </div>
                </div>

                <button type="submit" className="pay-button bg-blue text-white font-bold" data-testid="pay-button">
                    <span>Pay Now</span>
                    <span className="divider"></span>
                    <span>${totalPrice.toFixed(1)}</span>
                </button>
            </form>

            {/* Success Modal */}
            {showSuccess && (
                <div className="success-modal-overlay" onClick={() => setShowSuccess(false)}>
                    <div className="success-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="success-icon">
                            <div className="success-circle">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM16.3 9.61L11.43 15.61C11.3353 15.7291 11.2153 15.8252 11.0788 15.8915C10.9423 15.9578 10.7926 15.9927 10.6405 15.9937C10.4884 15.9947 10.3382 15.9618 10.2009 15.8973C10.0635 15.8328 9.94225 15.7382 9.846 15.62L7.706 13.11C7.61393 13.0026 7.54374 12.8779 7.49935 12.7428C7.45496 12.6078 7.43727 12.4651 7.44729 12.3229C7.45731 12.1807 7.49486 12.0418 7.55781 11.9139C7.62075 11.786 7.70787 11.6715 7.81441 11.5769C7.92095 11.4824 8.04488 11.4096 8.17913 11.3627C8.31337 11.3158 8.45541 11.2956 8.59777 11.3032C8.74013 11.3107 8.87998 11.3459 9.00917 11.4066C9.13836 11.4674 9.25445 11.5527 9.35 11.658L10.61 13.158L14.7 8.39C14.8986 8.15578 15.1856 8.01403 15.4909 8.00063C15.7962 7.98723 16.0941 8.10342 16.3111 8.31904C16.5281 8.53466 16.6457 8.83026 16.6357 9.13585C16.6256 9.44144 16.4889 9.72901 16.258 9.93L16.3 9.61Z" fill="white" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="success-title text-white font-bold">
                            Your payment was successful
                        </h2>
                        <p className="success-description text-white">
                            {movieOverview ? (
                                <>
                                    {movieOverview.substring(0, 120)}...{' '}
                                    <button
                                        className="read-more-link"
                                        onClick={() => navigate(`/explore/${movieId}`)}
                                    >
                                        Read More
                                    </button>
                                </>
                            ) : (
                                'Thank you for your purchase!'
                            )}
                        </p>
                        <button
                            className="see-ticket-btn text-white font-bold"
                            onClick={handleSeeTicket}
                        >
                            See E-Ticket
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
