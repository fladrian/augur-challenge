import axios from 'axios';

/**
 * Centralized Axios client for the application.
 * Configured with a base URL and default headers.
 */
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors here for auth, logging, etc.

export default api;
