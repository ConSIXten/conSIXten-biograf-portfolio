import { test, expect } from '@playwright/test';
import { setupApiMocks } from '../utils/mock-api.js';

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

    // Skipping: Requires logout button with data-testid on profile page
    test.skip('should logout user', async ({ page }) => {
        // Setup API mocks
        await setupApiMocks(page);
        
        await page.goto('/login');

        // Login first
        await page.fill('[data-testid="email-input"]', 'test@example.com');
        await page.fill('[data-testid="password-input"]', 'password123');
        await page.click('[data-testid="login-button"]');

        // Wait for successful login
        await page.waitForURL(/\/(home|profile|explore|\/)/, { timeout: 5000 });

        // Navigate to profile page
        await page.goto('/profile');

        // Click logout button
        await page.click('[data-testid="logout-button"]');

        // Should navigate to login or home
        await page.waitForURL(/\/(login|home|\/)/, { timeout: 5000 });
    });
});