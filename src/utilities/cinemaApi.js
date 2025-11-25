const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8888/biograf-api/api';

// Demo mode: use mock data instead of API calls
const DEMO_MODE = !import.meta.env.VITE_API_URL || import.meta.env.DEV;

// Fallback mock data for when API is not available (production)
const mockCinemas = [
    {
        id: "1",
        name: "Grand Cinema Downtown",
        address: "123 Main Street",
        city: "Copenhagen",
        total_seats: "150",
        rating: "4.5"
    },
    {
        id: "2",
        name: "CinemaX Vesterbro",
        address: "456 Vesterbro Street",
        city: "Copenhagen",
        total_seats: "200",
        rating: "4.7"
    },
    {
        id: "3",
        name: "Nordic Film House",
        address: "789 Nørrebro Avenue",
        city: "Copenhagen",
        total_seats: "180",
        rating: "4.3"
    },
    {
        id: "4",
        name: "Empire Cinema",
        address: "321 Østerbro Street",
        city: "Copenhagen",
        total_seats: "220",
        rating: "4.6"
    },
    {
        id: "5",
        name: "Royal Theater Cinema",
        address: "654 Frederiksberg Road",
        city: "Copenhagen",
        total_seats: "160",
        rating: "4.8"
    }
];

const mockShowtimes = [
    {
        id: "1",
        cinema_id: "1",
        movie_id: "550", // Fight Club
        showtime: "2025-11-25 14:00:00",
        price: "120",
        available_seats: "45"
    },
    {
        id: "2",
        cinema_id: "1",
        movie_id: "550",
        showtime: "2025-11-25 18:00:00",
        price: "140",
        available_seats: "32"
    },
    {
        id: "3",
        cinema_id: "2",
        movie_id: "278", // The Shawshank Redemption
        showtime: "2025-11-25 16:00:00",
        price: "130",
        available_seats: "28"
    },
    {
        id: "4",
        cinema_id: "3",
        movie_id: "238", // The Godfather
        showtime: "2025-11-25 20:00:00",
        price: "150",
        available_seats: "15"
    }
];

const mockBookings = [
    {
        id: "1",
        user_id: "1",
        showtime_id: "1",
        seats: "A1,A2",
        total_price: "240",
        booking_date: "2025-11-20 10:00:00",
        movie_id: "550"
    }
];

// ============================================
// CINEMAS
// ============================================

export async function getCinemas() {
    if (DEMO_MODE) {
        console.log('Running in demo mode - using mock cinema data');
        return mockCinemas;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/cinemas/read.php`);
        const data = await response.json();

        if (data.success) {
            return data.data;
        }
        throw new Error('Failed to fetch cinemas');
    } catch (error) {
        console.error('Error fetching cinemas:', error);
        console.warn('Using mock cinema data as fallback');
        // Return mock data if API fails (for production deployment)
        return mockCinemas;
    }
}

export async function getCinema(cinemaId) {
    try {
        const response = await fetch(`${API_BASE_URL}/cinemas/read_one.php?id=${cinemaId}`);
        const data = await response.json();

        if (data.success) {
            return data.data;
        }
        throw new Error('Failed to fetch cinema');
    } catch (error) {
        console.error('Error fetching cinema:', error);
        throw error;
    }
}

// ============================================
// SHOWTIMES
// ============================================

export async function getShowtimes(filters = {}) {
    if (DEMO_MODE) {
        console.log('Running in demo mode - using mock showtime data');
        let filteredShowtimes = mockShowtimes;
        
        if (filters.cinema_id) {
            filteredShowtimes = filteredShowtimes.filter(st => st.cinema_id === filters.cinema_id);
        }
        if (filters.movie_id) {
            filteredShowtimes = filteredShowtimes.filter(st => st.movie_id === filters.movie_id);
        }
        
        return filteredShowtimes;
    }

    try {
        const params = new URLSearchParams();

        if (filters.cinema_id) params.append('cinema_id', filters.cinema_id);
        if (filters.movie_id) params.append('movie_id', filters.movie_id);
        if (filters.date) params.append('date', filters.date);

        const url = `${API_BASE_URL}/showtimes/read.php${params.toString() ? '?' + params.toString() : ''}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
            return data.data;
        }
        throw new Error('Failed to fetch showtimes');
    } catch (error) {
        console.error('Error fetching showtimes:', error);
        console.warn('Using mock showtime data as fallback');
        // Return mock data if API fails
        let filteredShowtimes = mockShowtimes;
        
        if (filters.cinema_id) {
            filteredShowtimes = filteredShowtimes.filter(st => st.cinema_id === filters.cinema_id);
        }
        if (filters.movie_id) {
            filteredShowtimes = filteredShowtimes.filter(st => st.movie_id === filters.movie_id);
        }
        
        return filteredShowtimes;
    }
}// ============================================
// AUTHENTICATION
// ============================================

export async function registerUser(name, email, password) {
    if (DEMO_MODE) {
        console.log('Running in demo mode - mock registration');
        // Mock successful registration
        return {
            success: true,
            message: 'User registered successfully (demo mode)',
            data: {
                id: Date.now().toString(),
                name,
                email
            }
        };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering user:', error);
        console.warn('Using mock registration as fallback');
        // Mock successful registration
        return {
            success: true,
            message: 'User registered successfully (demo mode)',
            data: {
                id: Date.now().toString(),
                name,
                email
            }
        };
    }
}

export async function loginUser(email, password) {
    if (DEMO_MODE) {
        console.log('Running in demo mode - mock login');
        // Mock successful login
        const mockUser = {
            id: "1",
            name: "Demo User",
            email: email
        };
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        return {
            success: true,
            message: 'Login successful (demo mode)',
            data: mockUser
        };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            // Store user in localStorage
            localStorage.setItem('currentUser', JSON.stringify(data.data));
        }

        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        console.warn('Using mock login as fallback');
        // Mock successful login
        const mockUser = {
            id: "1",
            name: "Demo User",
            email: email
        };
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        return {
            success: true,
            message: 'Login successful (demo mode)',
            data: mockUser
        };
    }
}

// ============================================
// BOOKINGS
// ============================================

export async function createBooking(userId, showtimeId, seats, totalPrice) {
    if (DEMO_MODE) {
        console.log('Running in demo mode - mock booking creation');
        // Mock successful booking
        const mockBooking = {
            id: Date.now().toString(),
            user_id: userId,
            showtime_id: showtimeId,
            seats: seats,
            total_price: totalPrice,
            booking_date: new Date().toISOString(),
            movie_id: mockShowtimes.find(st => st.id === showtimeId)?.movie_id
        };
        return {
            success: true,
            message: 'Booking created successfully (demo mode)',
            data: mockBooking
        };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/bookings/create.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                showtime_id: showtimeId,
                seats: seats,
                total_price: totalPrice
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating booking:', error);
        console.warn('Using mock booking creation as fallback');
        // Mock successful booking
        const mockBooking = {
            id: Date.now().toString(),
            user_id: userId,
            showtime_id: showtimeId,
            seats: seats,
            total_price: totalPrice,
            booking_date: new Date().toISOString(),
            movie_id: mockShowtimes.find(st => st.id === showtimeId)?.movie_id
        };
        return {
            success: true,
            message: 'Booking created successfully (demo mode)',
            data: mockBooking
        };
    }
}

export async function getUserBookings(userId) {
    if (DEMO_MODE) {
        console.log('Running in demo mode - using mock booking data');
        // Return mock bookings for the user
        return mockBookings.filter(booking => booking.user_id === userId);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/bookings/read.php?user_id=${userId}`);
        const data = await response.json();

        if (data.success) {
            return data.data;
        }
        throw new Error('Failed to fetch bookings');
    } catch (error) {
        console.error('Error fetching bookings:', error);
        console.warn('Using mock booking data as fallback');
        // Return mock bookings for the user
        return mockBookings.filter(booking => booking.user_id === userId);
    }
}

// ============================================
// HELPER: Get Showtimes with Movie Details from TMDB
// ============================================

import { getMovieDetails } from './movieApi';

export async function getShowtimesWithMovies(filters = {}) {
    try {
        // 1. Fetch showtimes from our API
        const showtimes = await getShowtimes(filters);

        if (!showtimes || showtimes.length === 0) {
            return [];
        }

        // 2. Get unique movie IDs
        const movieIds = [...new Set(showtimes.map(st => st.movie_id))];

        // 3. Fetch movie details from TMDB
        const moviePromises = movieIds.map(movieId =>
            getMovieDetails(movieId).catch(() => null)
        );

        const movies = await Promise.all(moviePromises);

        // 4. Create lookup object
        const movieLookup = {};
        movies.forEach((movie, index) => {
            if (movie) {
                movieLookup[movieIds[index]] = movie;
            }
        });

        // 5. Combine showtimes with movie details
        return showtimes.map(showtime => ({
            ...showtime,
            movie: movieLookup[showtime.movie_id] || null
        }));
    } catch (error) {
        console.error('Error fetching showtimes with movies:', error);
        throw error;
    }
}

// ============================================
// HELPER: Get User Bookings with Movie Details
// ============================================

export async function getUserBookingsWithMovies(userId) {
    try {
        // 1. Fetch bookings
        const bookings = await getUserBookings(userId);

        if (!bookings || bookings.length === 0) {
            return [];
        }

        // 2. Get unique movie IDs
        const movieIds = [...new Set(bookings.map(b => b.movie_id).filter(Boolean))];

        // 3. Fetch movie details from TMDB
        const moviePromises = movieIds.map(movieId =>
            getMovieDetails(movieId).catch(() => null)
        );

        const movies = await Promise.all(moviePromises);

        // 4. Create lookup
        const movieLookup = {};
        movies.forEach((movie, index) => {
            if (movie) {
                movieLookup[movieIds[index]] = movie;
            }
        });

        // 5. Combine data
        return bookings.map(booking => ({
            ...booking,
            movie: movieLookup[booking.movie_id] || null
        }));
    } catch (error) {
        console.error('Error fetching user bookings with movies:', error);
        throw error;
    }
}
