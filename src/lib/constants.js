export const BASE_URL = import.meta.env.VITE_BASE_URL;

// Auth endpoints
export const LOGIN_ENDPOINT = `${BASE_URL}/auth/login`;
export const SIGNUP_ENDPOINT = `${BASE_URL}/auth/signup`;

// Project endpoints
export const PROJECTS_ENDPOINT = `${BASE_URL}/projects`;

// Config endpoint for a given project
export const CONFIG_ENDPOINT = (projectId) => `${BASE_URL}/projects/${projectId}/config`;

// Add more endpoints here as needed