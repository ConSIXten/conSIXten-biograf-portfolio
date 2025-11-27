export async function loginAsDemoUser(page) {
  await page.goto('/login');
  await page.fill('[data-testid="email-input"]', 'demo@example.com');
  await page.fill('[data-testid="password-input"]', 'demo');
  await page.click('[data-testid="login-button"]');
  await page.waitForURL('**/');
}

export async function waitForMoviesToLoad(page) {
  await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });
}

export async function selectFirstAvailableShowtime(page) {
  const showtimeButton = page.locator('[data-testid="showtime-button"]').first();
  await showtimeButton.click();
}

export async function selectSeats(page, seatIds = ['A1', 'A2']) {
  for (const seatId of seatIds) {
    await page.click(`[data-testid="seat-${seatId}"]`);
  }
}