/**
 * Mock API responses for E2E tests
 * This allows tests to run without the backend server
 */

export const mockApiResponses = {
    // Authentication
    login: {
        success: true,
        message: 'Login successful',
        data: {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            token: 'mock-jwt-token-123'
        }
    },
    
    register: {
        success: true,
        message: 'User registered successfully',
        data: {
            id: '2',
            name: 'New Test User',
            email: 'newuser@example.com'
        }
    },

    // Cinemas
    cinemas: {
        success: true,
        data: [
            {
                id: '1',
                name: 'Grand Cinema Downtown',
                address: '123 Main Street',
                city: 'Copenhagen',
                total_seats: '150',
                rating: '4.5',
                images: [
                    { url: 'https://via.placeholder.com/300x200/667788/FFFFFF?text=Grand+Cinema' }
                ]
            },
            {
                id: '2',
                name: 'CinemaX Vesterbro',
                address: '456 Vesterbro Street',
                city: 'Copenhagen',
                total_seats: '200',
                rating: '4.7',
                images: [
                    { url: 'https://via.placeholder.com/300x200/667788/FFFFFF?text=CinemaX' }
                ]
            }
        ]
    },

    // Showtimes
    showtimes: {
        success: true,
        data: [
            {
                id: '1',
                cinema_id: '1',
                movie_id: '550',
                showtime: '2025-12-02 14:00:00',
                price: '120',
                available_seats: '45'
            },
            {
                id: '2',
                cinema_id: '1',
                movie_id: '550',
                showtime: '2025-12-02 18:00:00',
                price: '140',
                available_seats: '32'
            }
        ]
    },

    // Bookings
    createBooking: {
        success: true,
        message: 'Booking created successfully',
        data: {
            id: '1',
            user_id: '1',
            showtime_id: '1',
            seats: 'A1,A2',
            total_price: '240',
            booking_date: new Date().toISOString(),
            movie_id: '550'
        }
    },

    userBookings: {
        success: true,
        data: [
            {
                id: '1',
                user_id: '1',
                showtime_id: '1',
                seats: 'A1,A2',
                total_price: '240',
                booking_date: '2025-11-28 10:00:00',
                movie_id: '550'
            }
        ]
    }
};

/**
 * Setup API mocking for a Playwright page
 * Intercepts all backend API calls and returns mock data
 */
export async function setupApiMocks(page) {
    const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8888/biograf-api/api';

    // Mock login endpoint
    await page.route(`${API_BASE_URL}/auth/login.php`, async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockApiResponses.login)
        });
    });

    // Mock register endpoint
    await page.route(`${API_BASE_URL}/auth/register.php`, async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockApiResponses.register)
        });
    });

    // Mock cinemas endpoint
    await page.route(`${API_BASE_URL}/cinemas/read.php`, async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockApiResponses.cinemas)
        });
    });

    // Mock showtimes endpoint
    await page.route(`${API_BASE_URL}/showtimes/read.php*`, async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockApiResponses.showtimes)
        });
    });

    // Mock create booking endpoint
    await page.route(`${API_BASE_URL}/bookings/create.php`, async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockApiResponses.createBooking)
        });
    });

    // Mock user bookings endpoint
    await page.route(`${API_BASE_URL}/bookings/read.php*`, async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockApiResponses.userBookings)
        });
    });
}

/**
 * Setup API mocks that simulate errors
 * Useful for testing error handling
 */
export async function setupApiErrorMocks(page) {
    const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8888/biograf-api/api';

    await page.route(`${API_BASE_URL}/auth/login.php`, async route => {
        await route.fulfill({
            status: 401,
            contentType: 'application/json',
            body: JSON.stringify({
                success: false,
                message: 'Invalid credentials'
            })
        });
    });

    await page.route(`${API_BASE_URL}/cinemas/read.php`, async route => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({
                success: false,
                message: 'Server error'
            })
        });
    });
}
