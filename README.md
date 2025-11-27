# Biograf-ConSIXten: Movie Booking App

[![CI](https://github.com/ConSIXten/conSIXten-biograf-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/ConSIXten/conSIXten-biograf-portfolio/actions/workflows/ci.yml)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-purple)](https://vitejs.dev/)

A modern, full-stack movie discovery and booking platform built with React and PHP.

## Features

- **Movie Discovery**: Search and browse movies using The Movie Database (TMDB) API
- **Cinema Listings**: View nearby cinemas with real-time data, ratings, and distances
- **User Authentication**: Secure login/registration with JWT-like tokens
- **Booking System**: Select cinemas, showtimes, seats, and complete payments
- **Responsive Design**: Mobile-first UI with dark theme
- **Security**: Content Security Policy, input sanitization, and production-safe logging
- **Demo Mode**: Fully functional without backend - uses mock data for portfolio demonstration
- **Testing**: Comprehensive E2E tests with Playwright covering all user flows

## Tech Stack

### Frontend
- React 19 with Hooks and Context API
- Vite for build tooling
- React Router for navigation
- CSS Modules for styling
- TMDB API for movie data

### Backend
- PHP with RESTful API
- MySQL database
- CORS-enabled endpoints
- Authentication and booking logic

## Project Structure

```
src/
├── Components/          # Reusable UI components
├── pages/              # Route-based pages
├── utilities/          # API calls, contexts, and helpers
├── Layout.jsx          # App layout with navigation
└── main.jsx            # App entry point
```

## Security Features

- Content Security Policy (CSP) to prevent XSS
- Input validation and output sanitization
- Production-safe logging (no console leaks)
- HTTPS enforcement in production

## Testing

This project includes comprehensive E2E (End-to-End) tests using Playwright that cover:

- **Movie Discovery**: Homepage loading, movie display, and navigation
- **User Authentication**: Registration, login, logout, and validation
- **Booking Flow**: Complete ticket booking process with seat selection
- **Cinema Listings**: Cinema display and information

### Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run tests in interactive UI mode
npm run test:e2e:ui

# Run tests with browser visible
npm run test:e2e:headed

# Run tests in debug mode
npm run test:e2e:debug
```

Tests run automatically on every push via GitHub Actions CI/CD pipeline.
