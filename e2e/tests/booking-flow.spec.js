import { test, expect } from '@playwright/test';
import { loginAsDemoUser, waitForMoviesToLoad, selectFirstAvailableShowtime, selectSeats } from '../utils/test-helpers.js';

test.describe.skip('Booking Flow', () => {
    test('should complete full booking process', async ({ page }) => {
        // Login first
        await loginAsDemoUser(page);

        // Navigate to explore
        await page.goto('/explore');

        // Wait for movies to load
        await waitForMoviesToLoad(page);

        // Click on first movie
        await page.click('[data-testid="movie-card"]:first-child');

        // Should be on movie details page
        await expect(page).toHaveURL(/\/explore\/\d+/);

        // Select showtime
        await selectFirstAvailableShowtime(page);

        // Should navigate to booking page
        await expect(page).toHaveURL(/\/booking\/\d+/);

        // Select seats
        await selectSeats(page, ['A1', 'A2']);

        // Proceed to payment
        await page.click('[data-testid="book-button"]');

        // Should navigate to payment page
        await expect(page).toHaveURL('/payment');

        // Complete payment
        await page.fill('[data-testid="card-number"]', '4111111111111111');
        await page.fill('[data-testid="expiry"]', '12/25');
        await page.fill('[data-testid="cvv"]', '123');
        await page.fill('[data-testid="name"]', 'Test User');

        await page.click('[data-testid="pay-button"]');

        // Verify booking confirmation
        await expect(page.locator('text=Booking confirmed')).toBeVisible();
    });

    test('should show booking history', async ({ page }) => {
        // Login first
        await loginAsDemoUser(page);

        // Navigate to tickets/bookings page
        await page.goto('/tickets');

        // Should show booking history or empty state
        await expect(page.locator('[data-testid="bookings-list"]')).toBeVisible();
    });

    test('should prevent booking when no seats selected', async ({ page }) => {
        // Login first
        await loginAsDemoUser(page);

        // Navigate to explore and select movie/showtime
        await page.goto('/explore');
        await waitForMoviesToLoad(page);
        await page.click('[data-testid="movie-card"]:first-child');
        await selectFirstAvailableShowtime(page);

        // Try to proceed without selecting seats
        await page.click('[data-testid="book-button"]');

        // Should show error message
        await expect(page.locator('text=Please select at least one seat')).toBeVisible();
    });
});