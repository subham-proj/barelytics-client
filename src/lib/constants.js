export const BASE_URL = import.meta.env.VITE_BASE_URL;

// Auth endpoints
export const LOGIN_ENDPOINT = `${BASE_URL}/auth/login`;
export const SIGNUP_ENDPOINT = `${BASE_URL}/auth/signup`;

// Project endpoints
export const PROJECTS_ENDPOINT = `${BASE_URL}/projects`;

// Add more endpoints here as needed