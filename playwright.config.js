import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: false, // Disable parallel in CI to avoid conflicts
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0, // Reduce retries in CI
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? 'github' : 'html', // Use GitHub reporter in CI
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'retain-on-failure', // Keep traces on failure
        screenshot: 'only-on-failure', // Take screenshots on failure
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ], // Only run Chromium in CI for speed
    webServer: process.env.CI ? undefined : {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: true,
    },
    timeout: process.env.CI ? 60000 : 30000, // Increase timeout in CI
});