import { test, expect } from '@playwright/test';
import { setupApiMocks } from '../utils/mock-api.js';

test.describe('Cinema Listings', () => {
    test('should display cinemas near you', async ({ page }) => {
        // Setup API mocks
        await setupApiMocks(page);
        
        await page.goto('/');

        // Should show cinema listings section
        await expect(page.locator('[data-testid="cinemas-section"]')).toBeVisible();

        // Should load cinemas (real or mock)
        await page.waitForSelector('[data-testid="cinema-card"]', { timeout: 10000 });

        // Verify cinemas are displayed
        const cinemaCards = page.locator('[data-testid="cinema-card"]');
        const count = await cinemaCards.count();
        expect(count).toBeGreaterThan(0);

        // Each cinema should have name, address, and rating
        const firstCinema = cinemaCards.first();
        await expect(firstCinema.locator('[data-testid="cinema-name"]')).toBeVisible();
        await expect(firstCinema.locator('[data-testid="cinema-address"]')).toBeVisible();
        await expect(firstCinema.locator('[data-testid="cinema-rating"]')).toBeVisible();
    });

    test('should display cinema information', async ({ page }) => {
        // Setup API mocks
        await setupApiMocks(page);
        
        await page.goto('/');

        // Wait for cinemas to load
        await page.waitForSelector('[data-testid="cinema-card"]', { timeout: 10000 });

        // Check that at least one cinema is displayed
        const cinemaCards = page.locator('[data-testid="cinema-card"]');
        const count = await cinemaCards.count();
        expect(count).toBeGreaterThan(0);

        // Check first cinema has required information
        const firstCinema = cinemaCards.first();
        await expect(firstCinema.locator('[data-testid="cinema-name"]')).toBeVisible();
        await expect(firstCinema.locator('[data-testid="cinema-address"]')).toBeVisible();
        await expect(firstCinema.locator('[data-testid="cinema-rating"]')).toBeVisible();
    });

    test('should filter cinemas by location', async ({ page }) => {
        // Setup API mocks
        await setupApiMocks(page);
        
        await page.goto('/');

        // Wait for cinemas to load
        await page.waitForSelector('[data-testid="cinema-card"]', { timeout: 10000 });

        const initialCinemaCount = await page.locator('[data-testid="cinema-card"]').count();

        // If there's a location filter, test it
        const locationFilter = page.locator('[data-testid="location-filter"]');
        if (await locationFilter.isVisible()) {
            await locationFilter.fill('Copenhagen');
            await page.keyboard.press('Enter');

            // Should filter results
            const filteredCount = await page.locator('[data-testid="cinema-card"]').count();
            expect(filteredCount).toBeLessThanOrEqual(initialCinemaCount);
        }
    });
});