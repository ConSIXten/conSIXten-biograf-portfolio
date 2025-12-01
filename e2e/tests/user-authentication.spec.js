import { test, expect } from '@playwright/test';
import { setupApiMocks } from '../utils/mock-api.js';
import { loginAsDemoUser } from '../utils/test-helpers.js';

test.describe('User Authentication', () => {
    test('should register new user', async ({ page }) => {
        // Setup API mocks
        await setupApiMocks(page);

        await page.goto('/register');

        await page.fill('[data-testid="name-input"]', `testuser${Date.now()}`);
        await page.fill('[data-testid="password-input"]', 'password123');
        // Fill confirm password field too
        await page.fill('[data-testid="confirm-password-input"]', 'password123');

        await page.click('[data-testid="register-button"]');

        // Should navigate away from register page after success
        await page.waitForURL(/\/(home|profile|explore|\/)/, { timeout: 5000 });
    });

    test('should login existing user', async ({ page }) => {
        // Setup API mocks
        await setupApiMocks(page);

        await page.goto('/login');

        await page.fill('[data-testid="email-input"]', 'test@example.com');
        await page.fill('[data-testid="password-input"]', 'password123');

        await page.click('[data-testid="login-button"]');

        // Should navigate away from login page after success
        await page.waitForURL(/\/(home|profile|explore|\/)/, { timeout: 5000 });
    });

    test('should show validation errors for empty fields', async ({ page }) => {
        await page.goto('/login');

        // Try to login without filling fields
        await page.click('[data-testid="login-button"]');

        // Should show error messages
        await expect(page.locator('text=Please fill in all fields')).toBeVisible();
    });

    test('should logout user', async ({ page }) => {
        // Setup API mocks first
        await setupApiMocks(page);

        // Navigate to login page
        await page.goto('/login');

        // Fill login form
        await page.fill('[data-testid="email-input"]', 'test@example.com');
        await page.fill('[data-testid="password-input"]', 'password123');
        await page.click('[data-testid="login-button"]');

        // Wait for navigation after login
        await page.waitForURL(/\/(home|profile|explore)?/, { timeout: 10000 });

        // Wait a moment for auth state to settle
        await page.waitForTimeout(500);

        // Navigate to profile page by clicking the footer link (preserves app state)
        await page.click('a[href="/profile"]');

        // Wait for profile page to fully load
        await page.waitForLoadState('networkidle');

        // Wait for and verify logout button exists
        const logoutButton = page.locator('[data-testid="logout-button"]');
        await expect(logoutButton).toBeVisible({ timeout: 10000 });

        // Click logout button and wait for navigation
        await Promise.all([
            page.waitForURL((url) => url.pathname === '/', { timeout: 5000 }),
            logoutButton.click()
        ]);

        // Verify user is logged out (localStorage cleared)
        const isLoggedOut = await page.evaluate(() => {
            return localStorage.getItem('currentUser') === null;
        });
        expect(isLoggedOut).toBeTruthy();
    });
});