const API_BASE_URL = 'http://localhost:8888/biograf-api/api';

// ============================================
// CINEMAS
// ============================================

export async function getCinemas() {
    try {
        const response = await fetch(`${API_BASE_URL}/cinemas/read.php`);
        const data = await response.json();

        if (data.success) {
            return data.data;
        }
        throw new Error('Failed to fetch cinemas');
    } catch (error) {
        console.error('Error fetching cinemas:', error);
        throw error;
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
        throw error;
    }
}

// ============================================
// AUTHENTICATION
// ============================================

export async function registerUser(name, email, password) {
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
        throw error;
    }
}

export async function loginUser(email, password) {
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
        throw error;
    }
}

// ============================================
// BOOKINGS
// ============================================

export async function createBooking(userId, showtimeId, seats, totalPrice) {
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
        throw error;
    }
}

export async function getUserBookings(userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/read.php?user_id=${userId}`);
        const data = await response.json();

        if (data.success) {
            return data.data;
        }
        throw new Error('Failed to fetch bookings');
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
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
