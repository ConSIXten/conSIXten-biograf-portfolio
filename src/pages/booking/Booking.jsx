import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { mockCinemas } from '../../utilities/mockCinemaData';
import { getMovieDetails } from '../../utilities/movieApi';
import './Booking.css';

export default function Booking() {
    const { id: movieId } = useParams();
    const navigate = useNavigate();

    // Movie data
    const [movie, setMovie] = useState(null);

    // Form state
    const [selectedCinema, setSelectedCinema] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Available options
    const [cinemas, setCinemas] = useState([]);
    const [dates, setDates] = useState([]);
    const [times, setTimes] = useState([]);

    // Fetch movie details
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieDetails({ params: { id: movieId } });
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
        fetchMovie();
    }, [movieId]);

    // Initialize cinemas from mock data
    useEffect(() => {
        setCinemas(mockCinemas);
        if (mockCinemas.length > 0) {
            setSelectedCinema(mockCinemas[0].name);
        }
    }, []);

    // Generate dates (next 7 days)
    useEffect(() => {
        const generateDates = () => {
            const dateArray = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date();
                date.setDate(date.getDate() + i);
                dateArray.push({
                    value: date.toISOString().split('T')[0],
                    label: date.toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    })
                });
            }
            return dateArray;
        };

        const availableDates = generateDates();
        setDates(availableDates);
        if (availableDates.length > 0) {
            setSelectedDate(availableDates[0].value);
        }
    }, []);

    // Generate time slots
    useEffect(() => {
        const timeSlots = [
            '10:00 AM', '01:00 PM', '04:00 PM', '07:00 PM', '10:00 PM'
        ];
        setTimes(timeSlots);
        if (timeSlots.length > 0) {
            setSelectedTime(timeSlots[1]); // Default to 01:00 PM
        }
    }, []);

    // Seat grid configuration (7 rows, 8 seats per row with aisle)
    const rows = 7;
    const seatsPerRow = 8;
    const aisleAfterSeat = 3; // Aisle after 3rd seat

    // Mock reserved seats (for demonstration)
    const reservedSeats = [
        '4-0', '4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7',
        '5-0', '5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7'
    ];

    const handleSeatClick = (seatId) => {
        if (reservedSeats.includes(seatId)) return; // Can't select reserved seats

        setSelectedSeats(prev => {
            if (prev.includes(seatId)) {
                return prev.filter(id => id !== seatId);
            } else {
                return [...prev, seatId];
            }
        });
    };

    const getSeatStatus = (seatId) => {
        if (selectedSeats.includes(seatId)) return 'selected';
        if (reservedSeats.includes(seatId)) return 'reserved';
        return 'available';
    };

    const handleCheckout = () => {
        if (selectedSeats.length === 0) {
            alert('Please select at least one seat');
            return;
        }

        // Navigate to payment page with booking data
        navigate('/payment', {
            state: {
                movieId,
                movieTitle: movie?.title,
                movieOverview: movie?.overview,
                cinema: selectedCinema,
                date: selectedDate,
                time: selectedTime,
                seats: selectedSeats
            }
        });
    };

    return (
        <div className="booking-page">
            {/* Cinema Selection */}
            <div className="booking-section">
                <label className="booking-label text-white">Cinema</label>
                <select
                    className="booking-select"
                    value={selectedCinema}
                    onChange={(e) => setSelectedCinema(e.target.value)}
                >
                    {cinemas.map((cinema) => (
                        <option key={cinema.id} value={cinema.name}>
                            {cinema.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Date and Time Selection */}
            <div className="booking-row">
                <div className="booking-section booking-half">
                    <label className="booking-label text-white">Date</label>
                    <select
                        className="booking-select"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    >
                        {dates.map((date) => (
                            <option key={date.value} value={date.value}>
                                {date.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="booking-section booking-half">
                    <label className="booking-label text-white">Time</label>
                    <select
                        className="booking-select"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                    >
                        {times.map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Cinema Screen */}
            <div className="screen-container">
                <div className="screen"></div>
            </div>

            {/* Seat Grid */}
            <div className="seats-container">
                {Array.from({ length: rows }, (_, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                            const seatId = `${rowIndex}-${seatIndex}`;
                            const status = getSeatStatus(seatId);

                            return (
                                <button
                                    key={seatId}
                                    className={`seat seat-${status} ${seatIndex === aisleAfterSeat ? 'seat-aisle-after' : ''
                                        }`}
                                    onClick={() => handleSeatClick(seatId)}
                                    disabled={status === 'reserved'}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="legend">
                <div className="legend-item">
                    <span className="legend-dot legend-dot-selected"></span>
                    <span className="legend-text text-white">Selected</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot legend-dot-reserved"></span>
                    <span className="legend-text text-white">Reserved</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot legend-dot-available"></span>
                    <span className="legend-text text-white">Available</span>
                </div>
            </div>

            {/* Checkout Button */}
            <button
                className="checkout-button bg-blue text-white font-bold"
                onClick={handleCheckout}
                disabled={selectedSeats.length === 0}
            >
                Checkout
            </button>
        </div>
    );
}
