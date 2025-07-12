import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthToken } from '@/lib/auth';
import { 
  ANALYTICS_OVERVIEW_ENDPOINT, 
  ANALYTICS_TOP_PAGES_ENDPOINT, 
  ANALYTICS_TOP_REFERRERS_ENDPOINT 
} from '@/lib/constants';

// Create axios instance with auth header
const createAuthAxios = () => {
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

// Check if data is stale (older than 5 minutes)
const isDataStale = (lastFetched) => {
  if (!lastFetched) return true;
  const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
  return lastFetched < fiveMinutesAgo;
};

// Fetch overview analytics
export const fetchOverview = createAsyncThunk(
  'analytics/fetchOverview',
  async ({ projectId, from, to, force = false }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { overview, lastFetched, currentProjectId } = state.analytics;
      
      // Don't fetch if we have recent data for the same project and date range, unless forced
      if (
        !force &&
        overview && 
        currentProjectId === projectId &&
        !isDataStale(lastFetched)
      ) {
        return overview;
      }

      const authAxios = createAuthAxios();
      const response = await authAxios.get(ANALYTICS_OVERVIEW_ENDPOINT(projectId, from, to));
      return response.data;
    } catch (error) {
      if (error.message === 'No authentication token found') {
        return rejectWithValue('Authentication required. Please log in again.');
      }
      if (error.response?.status === 401) {
        return rejectWithValue('Invalid or expired token. Please log in again.');
      }
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch overview data');
    }
  }
);

// Fetch top pages
export const fetchTopPages = createAsyncThunk(
  'analytics/fetchTopPages',
  async ({ projectId, limit = 5, force = false }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { topPages, lastFetched, currentProjectId } = state.analytics;
      
      // Don't fetch if we have recent data for the same project, unless forced
      if (
        !force &&
        topPages.length > 0 && 
        currentProjectId === projectId &&
        !isDataStale(lastFetched)
      ) {
        return topPages;
      }

      const authAxios = createAuthAxios();
      const response = await authAxios.get(ANALYTICS_TOP_PAGES_ENDPOINT(projectId, limit));
      return response.data;
    } catch (error) {
      if (error.message === 'No authentication token found') {
        return rejectWithValue('Authentication required. Please log in again.');
      }
      if (error.response?.status === 401) {
        return rejectWithValue('Invalid or expired token. Please log in again.');
      }
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch top pages');
    }
  }
);

// Fetch top referrers
export const fetchTopReferrers = createAsyncThunk(
  'analytics/fetchTopReferrers',
  async ({ projectId, limit = 5, force = false }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { topReferrers, lastFetched, currentProjectId } = state.analytics;
      
      // Don't fetch if we have recent data for the same project, unless forced
      if (
        !force &&
        topReferrers.length > 0 && 
        currentProjectId === projectId &&
        !isDataStale(lastFetched)
      ) {
        return topReferrers;
      }

      const authAxios = createAuthAxios();
      const response = await authAxios.get(ANALYTICS_TOP_REFERRERS_ENDPOINT(projectId, limit));
      return response.data;
    } catch (error) {
      if (error.message === 'No authentication token found') {
        return rejectWithValue('Authentication required. Please log in again.');
      }
      if (error.response?.status === 401) {
        return rejectWithValue('Invalid or expired token. Please log in again.');
      }
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch top referrers');
    }
  }
);

const initialState = {
  overview: null,
  topPages: [],
  topReferrers: [],
  loading: false,
  error: null,
  lastFetched: null,
  currentProjectId: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearAnalytics: (state) => {
      state.overview = null;
      state.topPages = [];
      state.topReferrers = [];
      state.error = null;
      state.lastFetched = null;
      state.currentProjectId = null;
    },
    setCurrentProject: (state, action) => {
      state.currentProjectId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Overview
      .addCase(fetchOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload;
        state.error = null;
        state.lastFetched = Date.now();
      })
      .addCase(fetchOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Top Pages
      .addCase(fetchTopPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopPages.fulfilled, (state, action) => {
        state.loading = false;
        state.topPages = action.payload;
        state.error = null;
        state.lastFetched = Date.now();
      })
      .addCase(fetchTopPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Top Referrers
      .addCase(fetchTopReferrers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopReferrers.fulfilled, (state, action) => {
        state.loading = false;
        state.topReferrers = action.payload;
        state.error = null;
        state.lastFetched = Date.now();
      })
      .addCase(fetchTopReferrers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAnalytics, setCurrentProject } = analyticsSlice.actions;
export default analyticsSlice.reducer; 