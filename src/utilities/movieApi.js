// Movie API Configuration
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Debug: Check if API key is loaded
console.log('API_KEY loaded:', API_KEY ? 'Yes' : 'No');
console.log('API_KEY value:', API_KEY);

// Helper function to build API URLs
const buildUrl = (endpoint, params = {}) => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', API_KEY);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.append(key, value);
        }
    });

    return url.toString();
};

// Helper function to handle fetch errors
const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
};

// Get image URL with size
export const getImageUrl = (path, size = 'w500') => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Fetch popular movies
export const getPopularMovies = async (page = 1) => {
    const url = buildUrl('/movie/popular', { page });
    const response = await fetch(url);
    return handleResponse(response);
};

// Fetch now playing movies
export const getNowPlayingMovies = async (page = 1) => {
    const url = buildUrl('/movie/now_playing', { page });
    const response = await fetch(url);
    return handleResponse(response);
};

// Fetch upcoming movies
export const getUpcomingMovies = async (page = 1) => {
    const url = buildUrl('/movie/upcoming', { page });
    const response = await fetch(url);
    return handleResponse(response);
};

// Fetch top rated movies
export const getTopRatedMovies = async (page = 1) => {
    const url = buildUrl('/movie/top_rated', { page });
    const response = await fetch(url);
    return handleResponse(response);
};

// Fetch movie details by ID
export const getMovieDetails = async ({ params }) => {
    const url = buildUrl(`/movie/${params.id}`, {
        append_to_response: 'credits,videos,similar'
    });
    const response = await fetch(url);
    return handleResponse(response);
};

// Search movies
export const searchMovies = async (query, page = 1) => {
    const url = buildUrl('/search/movie', { query, page });
    const response = await fetch(url);
    return handleResponse(response);
};

// Fetch movie genres
export const getGenres = async () => {
    const url = buildUrl('/genre/movie/list');
    const response = await fetch(url);
    return handleResponse(response);
};

// Discover movies by genre
export const discoverMoviesByGenre = async (genreId, page = 1) => {
    const url = buildUrl('/discover/movie', {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc'
    });
    const response = await fetch(url);
    return handleResponse(response);
};
