import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
    test('should register new user', async ({ page }) => {
        await page.goto('/register');

        await page.fill('[data-testid="name-input"]', `testuser${Date.now()}`);
        await page.fill('[data-testid="password-input"]', 'password123');
        // Fill confirm password field too
        await page.fill('[data-testid="confirm-password-input"]', 'password123');

        await page.click('[data-testid="register-button"]');

        // Should not show error message (registration successful)
        await expect(page.locator('.error-message')).not.toBeVisible();
    });

    test.skip('should login existing user', async ({ page }) => {
        await page.goto('/login');

        await page.fill('[data-testid="email-input"]', 'demo');
        await page.fill('[data-testid="password-input"]', 'demo');

        await page.click('[data-testid="login-button"]');

        // Should show logged in state
        await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
    });

    test('should show validation errors for empty fields', async ({ page }) => {
        await page.goto('/login');

        // Try to login without filling fields
        await page.click('[data-testid="login-button"]');

        // Should show error messages
        await expect(page.locator('text=Please fill in all fields')).toBeVisible();
    });

    test.skip('should logout user', async ({ page }) => {
        await page.goto('/login');

        // Login first
        await page.fill('[data-testid="email-input"]', 'demo@example.com');
        await page.fill('[data-testid="password-input"]', 'demo');
        await page.click('[data-testid="login-button"]');

        // Should be logged in
        await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();

        // Navigate to profile to logout
        await page.click('[data-testid="user-menu"]');

        // Click logout button
        await page.click('[data-testid="logout-button"]');

        // Should be logged out
        await expect(page.locator('[data-testid="user-menu"]')).not.toBeVisible();
    });
});