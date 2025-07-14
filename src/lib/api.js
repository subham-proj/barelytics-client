import axios from 'axios';
import { getAuthToken } from '@/lib/auth';

// Create axios instance with auth header
export const createAuthAxios = () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token found');
  }
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Helper function to handle API errors
export const handleApiError = (error) => {
  if (error.message === 'No authentication token found') {
    throw new Error('Authentication required. Please log in again.');
  }
  if (error.response?.status === 401 || (error.response?.status === 400 && error.response?.data?.error === 'JWT expired')) {
    throw new Error('Invalid or expired token. Please log in again.');
  }
  if (error.response?.status === 404) {
    throw new Error('No data found for the specified parameters.');
  }
  if (error.response?.status === 500) {
    throw new Error('Server error. Please try again later.');
  }
  if (error.response?.status === 403) {
    throw new Error('Access denied. You do not have permission to perform this action.');
  }
  if (error.response?.status === 422) {
    throw new Error('Invalid data provided. Please check your input and try again.');
  }
  if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
    throw new Error('Network error. Please check your connection and try again.');
  }
  throw new Error(error.response?.data?.error || 'Failed to fetch data');
};

// Generic API call wrapper with error handling
export const apiCall = async (apiFunction, ...args) => {
  try {
    const authAxios = createAuthAxios();
    return await apiFunction(authAxios, ...args);
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw errorMessage;
  }
};

// Common API response handler
export const handleApiResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new Error(`HTTP ${response.status}: ${response.statusText}`);
};

// Check if data is stale (older than specified minutes)
export const isDataStale = (lastFetched, minutes = 5) => {
  if (!lastFetched) return true;
  const staleTime = Date.now() - (minutes * 60 * 1000);
  return lastFetched < staleTime;
};

// Common async thunk error handler for Redux
export const createAsyncThunkErrorHandler = (error) => {
  try {
    handleApiError(error);
  } catch (e) {
    return e.message;
  }
  return 'Unknown error';
};

// Helper function to create a simple API call with caching
export const createCachedApiCall = (endpoint, cacheKey, staleMinutes = 5) => {
  return async (params, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const cachedData = state[cacheKey]?.data;
      const lastFetched = state[cacheKey]?.lastFetched;
      const currentProjectId = state[cacheKey]?.currentProjectId;
      
      // Check if we have cached data and it's not stale
      if (
        cachedData && 
        currentProjectId === params.projectId &&
        !isDataStale(lastFetched, staleMinutes)
      ) {
        return cachedData;
      }

      const authAxios = createAuthAxios();
      const response = await authAxios.get(endpoint(params));
      return response.data;
    } catch (error) {
      return rejectWithValue(createAsyncThunkErrorHandler(error));
    }
  };
};