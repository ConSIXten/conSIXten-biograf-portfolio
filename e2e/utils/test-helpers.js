import { setupApiMocks } from './mock-api.js';

export async function loginAsDemoUser(page) {
    // Setup API mocks before login
    await setupApiMocks(page);

    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');

    // Wait for navigation to home or profile
    await page.waitForURL(/\/(home|profile|explore)?/, { timeout: 10000 });
}

export async function waitForMoviesToLoad(page) {
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });
}

export async function selectFirstAvailableShowtime(page) {
    const showtimeButton = page.locator('[data-testid="showtime-button"]').first();
    await showtimeButton.click();
}

export async function selectSeats(page, seatIds = ['0-0', '0-1']) {
    for (const seatId of seatIds) {
        await page.click(`[data-testid="seat-${seatId}"]`);
    }
}