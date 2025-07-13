export const BASE_URL = import.meta.env.VITE_BASE_URL;

// Auth endpoints
export const LOGIN_ENDPOINT = `${BASE_URL}/auth/login`;
export const SIGNUP_ENDPOINT = `${BASE_URL}/auth/signup`;

// Project endpoints
export const PROJECTS_ENDPOINT = `${BASE_URL}/projects`;

// Config endpoint for a given project
export const CONFIG_ENDPOINT = (projectId) => `${BASE_URL}/projects/${projectId}/config`;

// Analytics endpoints
export const ANALYTICS_OVERVIEW_ENDPOINT = (projectId, from, to) => 
  `${BASE_URL}/analytics/overview?project_id=${projectId}&from=${from}&to=${to}`;

export const ANALYTICS_TOP_PAGES_ENDPOINT = (projectId, limit = 5) => 
  `${BASE_URL}/analytics/top-pages?project_id=${projectId}&limit=${limit}`;

export const ANALYTICS_TOP_REFERRERS_ENDPOINT = (projectId, limit = 5) => 
  `${BASE_URL}/analytics/top-referrers?project_id=${projectId}&limit=${limit}`;

// Analytics page endpoints
export const ANALYTICS_NEW_VS_RETURNING_ENDPOINT = (projectId, from, to) => 
  `${BASE_URL}/analytics/new-vs-returning?project_id=${projectId}&from=${from}&to=${to}`;

export const ANALYTICS_CONVERSION_RATE_ENDPOINT = (projectId, from, to) => 
  `${BASE_URL}/analytics/conversion-rate?project_id=${projectId}&from=${from}&to=${to}`;

export const ANALYTICS_GLOBAL_REACH_ENDPOINT = (projectId, from, to) => 
  `${BASE_URL}/analytics/global-reach?project_id=${projectId}&from=${from}&to=${to}`;

export const ANALYTICS_DEVICE_TYPES_ENDPOINT = (projectId, from, to) => 
  `${BASE_URL}/analytics/device-types?project_id=${projectId}&from=${from}&to=${to}`;

export const ANALYTICS_TOP_LOCATIONS_ENDPOINT = (projectId, from, to) => 
  `${BASE_URL}/analytics/top-locations?project_id=${projectId}&from=${from}&to=${to}`;

export const ANALYTICS_BROWSER_ANALYTICS_ENDPOINT = (projectId, from, to) => 
  `${BASE_URL}/analytics/browser-analytics?project_id=${projectId}&from=${from}&to=${to}`;