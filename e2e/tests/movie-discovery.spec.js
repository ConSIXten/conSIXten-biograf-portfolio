import { test, expect } from '@playwright/test';
import { waitForMoviesToLoad } from '../utils/test-helpers.js';
import { setupApiMocks } from '../utils/mock-api.js';

test.describe('Movie Discovery', () => {
    test('should load homepage and display movies', async ({ page }) => {
        // Setup API mocks
        await setupApiMocks(page);

        await page.goto('/');

        // Check if main elements are present - look for welcome text or login button
        await expect(page.locator('.welcome-text')).toBeVisible();

        // Wait for movies to load (either real API or mock data)
        await waitForMoviesToLoad(page);

        // Verify at least one movie is displayed
        const movieCards = page.locator('[data-testid="movie-card"]');
        const count = await movieCards.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should navigate to explore page', async ({ page }) => {
        // Setup API mocks
        await setupApiMocks(page);

        await page.goto('/');

        // Click explore link/button
        await page.click('a[href="/explore"]');

        // Should be on explore page
        await expect(page).toHaveURL('/explore');

        // Should show movies
        await waitForMoviesToLoad(page);
    });

    test('should display movie details', async ({ page }) => {
        // Setup API mocks
        await setupApiMocks(page);

        await page.goto('/explore');

        await waitForMoviesToLoad(page);

        // Click on first movie
        await page.click('[data-testid="movie-card"]:first-child');

        // Should navigate to details page
        await expect(page).toHaveURL(/\/explore\/\d+/);

        // Should show movie details
        await expect(page.locator('[data-testid="movie-title"]')).toBeVisible();
        await expect(page.locator('[data-testid="movie-overview"]')).toBeVisible();
    });
});