# Biograf-ConSIXten: Movie Booking App

A modern, full-stack movie discovery and booking platform built with React and PHP.

## Features

- **Movie Discovery**: Search and browse movies using The Movie Database (TMDB) API
- **Cinema Listings**: View nearby cinemas with real-time data, ratings, and distances
- **User Authentication**: Secure login/registration with JWT-like tokens
- **Booking System**: Select cinemas, showtimes, seats, and complete payments
- **Responsive Design**: Mobile-first UI with dark theme
- **Security**: Content Security Policy, input sanitization, and production-safe logging

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

## Getting Started

### Prerequisites
- Node.js 18+
- PHP 8.0+
- MySQL
- TMDB API Key (free from [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ConSIXten/biograf-consixten.git
   cd biograf-consixten
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create `.env` file:
   ```
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_API_URL=http://localhost:8888/biograf-api/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Set up the backend (separate repository) and start it on port 8888.

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

## Contributing

This is a portfolio project. Feel free to fork and modify!

## License

MIT License - see LICENSE file for details.
