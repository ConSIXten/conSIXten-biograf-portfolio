# E2E Testing Documentation

## Overview

This project uses **Playwright** for End-to-End (E2E) testing. All tests run successfully **without requiring the backend server** thanks to API mocking.

## Test Status

✅ **9 tests passing**  
⏭️ **4 tests skipped** (UI features not yet implemented)

### Passing Tests

- ✅ Movie Discovery
  - Homepage loads and displays movies
  - Navigate to explore page
  - Display movie details
- ✅ Cinema Listings
  - Display cinemas near you
  - Display cinema information
  - Filter cinemas by location
- ✅ User Authentication
  - Register new user
  - Login existing user
  - Validation for empty fields

### Skipped Tests (Requires Additional UI Implementation)

- ⏭️ **Booking Flow** (3 tests)
  - Complete full booking process - *Requires: showtime selection UI on details page*
  - Show booking history - *Requires: `data-testid="bookings-list"` on tickets page*
  - Prevent booking when no seats selected - *Requires: showtime selection UI*
- ⏭️ **User Authentication** (1 test)
  - Logout user - *Requires: `data-testid="logout-button"` on profile page*

## API Mocking

### Why Mock APIs?

Since the PHP backend is not hosted, tests would fail when trying to make real API calls. Instead, we **mock all backend responses** using Playwright's built-in route interception.

### How It Works

```javascript
// e2e/utils/mock-api.js
export async function setupApiMocks(page) {
    // Intercepts all API calls and returns mock data
    await page.route('**/api/auth/login.php', async route => {
        await route.fulfill({
            status: 200,
            body: JSON.stringify({ success: true, data: {...} })
        });
    });
}
```

### Mock Data Includes

- ✅ Authentication (login, register)
- ✅ Cinemas (listings, details)
- ✅ Showtimes (available times)
- ✅ Bookings (create, read)

## Running Tests

```bash
# Run all tests
npm run test:e2e

# Run with UI (interactive mode)
npm run test:e2e:ui

# Run with browser visible
npm run test:e2e:headed

# Debug mode
npm run test:e2e:debug
```

## Test Structure

```
e2e/
├── tests/
│   ├── movie-discovery.spec.js     # Homepage, explore, details
│   ├── cinema-listings.spec.js     # Cinema display & filtering
│   ├── user-authentication.spec.js # Login, register, logout
│   └── booking-flow.spec.js        # Full booking process (partial)
│
└── utils/
    ├── test-helpers.js             # Reusable test functions
    └── mock-api.js                 # API mocking setup
```

## Adding New Tests

1. **Import mock setup:**
```javascript
import { setupApiMocks } from '../utils/mock-api.js';
```

2. **Setup mocks in test:**
```javascript
test('my new test', async ({ page }) => {
    await setupApiMocks(page);  // Add this line
    // ... rest of test
});
```

3. **Use data-testid attributes:**
```jsx
// In React components
<button data-testid="my-button">Click me</button>

// In tests
await page.click('[data-testid="my-button"]');
```

## Enabling Skipped Tests

To enable the 4 skipped tests, implement these features:

### 1. Showtime Selection UI (Details Page)
```jsx
// src/pages/details/Details.jsx
<button data-testid="showtime-button" onClick={...}>
    {showtime.time}
</button>
```

### 2. Bookings List (Tickets Page)
```jsx
// src/pages/tickets/Tickets.jsx
<div data-testid="bookings-list">
    {bookings.map(booking => ...)}
</div>
```

### 3. Logout Button (Profile Page)
```jsx
// src/pages/profile/Profile.jsx
<button data-testid="logout-button" onClick={handleLogout}>
    Logout
</button>
```

Once these are added, remove `.skip` from the test names.

## CI/CD Integration

Tests run automatically on every push via **GitHub Actions**:

```yaml
# .github/workflows/ci.yml
- name: Run E2E tests
  run: npm run test:e2e
```

All tests use mocks, so **no backend server is needed** in CI/CD.

## Benefits

✅ **Fast:** No network delays, instant responses  
✅ **Reliable:** No flaky tests from network issues  
✅ **Portable:** Works anywhere (local, CI/CD, production)  
✅ **Controlled:** Predictable test data every time  
✅ **Independent:** Frontend tests don't depend on backend availability

## Best Practices

1. **Always setup mocks first:**
   ```javascript
   await setupApiMocks(page);
   await page.goto('/');
   ```

2. **Use data-testid for test selectors:**
   ```javascript
   // Good ✅
   await page.click('[data-testid="submit-button"]');
   
   // Avoid ❌
   await page.click('.btn.submit');
   ```

3. **Test user flows, not implementation:**
   ```javascript
   // Good ✅
   test('user can book a movie ticket', ...);
   
   // Avoid ❌
   test('clicking button calls API', ...);
   ```

## Troubleshooting

### Test times out
- Ensure `setupApiMocks(page)` is called before navigating
- Check that `data-testid` attributes exist in components
- Use Playwright UI mode to debug: `npm run test:e2e:ui`

### Mock not working
- Verify route pattern matches your API URL
- Check `mock-api.js` for correct endpoint paths
- Use `await page.route('**/*', route => console.log(route.request().url()))` to debug

### Tests pass locally but fail in CI
- Ensure no hardcoded localhost URLs
- Check CI timeout settings (may need adjustment)
- Verify all dependencies installed

## Future Improvements

- [ ] Add unit tests with Vitest
- [ ] Add integration tests with MSW
- [ ] Add accessibility tests with axe-core
- [ ] Add visual regression tests
- [ ] Implement remaining UI features to enable skipped tests
