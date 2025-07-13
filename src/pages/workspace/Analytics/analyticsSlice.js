import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAuthAxios, createAsyncThunkErrorHandler } from '@/lib/api';
import {
  ANALYTICS_NEW_VS_RETURNING_ENDPOINT,
  ANALYTICS_CONVERSION_RATE_ENDPOINT,
  ANALYTICS_GLOBAL_REACH_ENDPOINT,
  ANALYTICS_DEVICE_TYPES_ENDPOINT,
  ANALYTICS_TOP_LOCATIONS_ENDPOINT,
  ANALYTICS_BROWSER_ANALYTICS_ENDPOINT
} from '@/lib/constants';

// Check if data is stale (older than 5 minutes)
const isDataStale = (lastFetched) => {
  if (!lastFetched) return true;
  const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
  return lastFetched < fiveMinutesAgo;
};

// Fetch new vs returning users
export const fetchNewVsReturning = createAsyncThunk(
  'analytics/fetchNewVsReturning',
  async ({ projectId, from, to, force = false }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { newVsReturning, lastFetched, currentProjectId } = state.analytics;
      
      if (
        !force &&
        newVsReturning && 
        currentProjectId === projectId &&
        !isDataStale(lastFetched)
      ) {
        return newVsReturning;
      }

      const authAxios = createAuthAxios();
      const response = await authAxios.get(ANALYTICS_NEW_VS_RETURNING_ENDPOINT(projectId, from, to));
      return response.data;
    } catch (error) {
      return rejectWithValue(createAsyncThunkErrorHandler(error));
    }
  }
);

// Fetch conversion rate
export const fetchConversionRate = createAsyncThunk(
  'analytics/fetchConversionRate',
  async ({ projectId, from, to, force = false }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { conversionRate, lastFetched, currentProjectId } = state.analytics;
      
      if (
        !force &&
        conversionRate && 
        currentProjectId === projectId &&
        !isDataStale(lastFetched)
      ) {
        return conversionRate;
      }

      const authAxios = createAuthAxios();
      const response = await authAxios.get(ANALYTICS_CONVERSION_RATE_ENDPOINT(projectId, from, to));
      return response.data;
    } catch (error) {
      return rejectWithValue(createAsyncThunkErrorHandler(error));
    }
  }
);

// Fetch global reach
export const fetchGlobalReach = createAsyncThunk(
  'analytics/fetchGlobalReach',
  async ({ projectId, from, to, force = false }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { globalReach, lastFetched, currentProjectId } = state.analytics;
      
      if (
        !force &&
        globalReach && 
        currentProjectId === projectId &&
        !isDataStale(lastFetched)
      ) {
        return globalReach;
      }

      const authAxios = createAuthAxios();
      const response = await authAxios.get(ANALYTICS_GLOBAL_REACH_ENDPOINT(projectId, from, to));
      return response.data;
    } catch (error) {
      return rejectWithValue(createAsyncThunkErrorHandler(error));
    }
  }
);

// Fetch device types
export const fetchDeviceTypes = createAsyncThunk(
  'analytics/fetchDeviceTypes',
  async ({ projectId, from, to, force = false }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { deviceTypes, lastFetched, currentProjectId } = state.analytics;
      
      if (
        !force &&
        deviceTypes && 
        currentProjectId === projectId &&
        !isDataStale(lastFetched)
      ) {
        return deviceTypes;
      }

      const authAxios = createAuthAxios();
      const response = await authAxios.get(ANALYTICS_DEVICE_TYPES_ENDPOINT(projectId, from, to));
      return response.data;
    } catch (error) {
      return rejectWithValue(createAsyncThunkErrorHandler(error));
    }
  }
);

// Fetch top locations
export const fetchTopLocations = createAsyncThunk(
  'analytics/fetchTopLocations',
  async ({ projectId, from, to, force = false }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { topLocations, lastFetched, currentProjectId } = state.analytics;
      
      if (
        !force &&
        topLocations && 
        currentProjectId === projectId &&
        !isDataStale(lastFetched)
      ) {
        return topLocations;
      }

      const authAxios = createAuthAxios();
      const response = await authAxios.get(ANALYTICS_TOP_LOCATIONS_ENDPOINT(projectId, from, to));
      return response.data;
    } catch (error) {
      return rejectWithValue(createAsyncThunkErrorHandler(error));
    }
  }
);

// Fetch browser analytics
export const fetchBrowserAnalytics = createAsyncThunk(
  'analytics/fetchBrowserAnalytics',
  async ({ projectId, from, to, force = false }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { browserAnalytics, lastFetched, currentProjectId } = state.analytics;
      
      if (
        !force &&
        browserAnalytics && 
        currentProjectId === projectId &&
        !isDataStale(lastFetched)
      ) {
        return browserAnalytics;
      }

      const authAxios = createAuthAxios();
      const response = await authAxios.get(ANALYTICS_BROWSER_ANALYTICS_ENDPOINT(projectId, from, to));
      return response.data;
    } catch (error) {
      return rejectWithValue(createAsyncThunkErrorHandler(error));
    }
  }
);

const initialState = {
  newVsReturning: null,
  conversionRate: null,
  globalReach: null,
  deviceTypes: null,
  topLocations: null,
  browserAnalytics: null,
  loading: false,
  error: null,
  lastFetched: null,
  currentProjectId: null,
  // Individual loading states for better UX
  individualLoading: {
    newVsReturning: false,
    conversionRate: false,
    globalReach: false,
    deviceTypes: false,
    topLocations: false,
    browserAnalytics: false,
  },
  // Individual errors for granular error handling
  individualErrors: {
    newVsReturning: null,
    conversionRate: null,
    globalReach: null,
    deviceTypes: null,
    topLocations: null,
    browserAnalytics: null,
  },
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearAnalytics: (state) => {
      state.newVsReturning = null;
      state.conversionRate = null;
      state.globalReach = null;
      state.deviceTypes = null;
      state.topLocations = null;
      state.browserAnalytics = null;
      state.error = null;
      state.lastFetched = null;
      state.currentProjectId = null;
      state.individualErrors = {
        newVsReturning: null,
        conversionRate: null,
        globalReach: null,
        deviceTypes: null,
        topLocations: null,
        browserAnalytics: null,
      };
    },
    setCurrentProject: (state, action) => {
      state.currentProjectId = action.payload;
    },
    clearIndividualError: (state, action) => {
      const { key } = action.payload;
      if (state.individualErrors[key] !== undefined) {
        state.individualErrors[key] = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // New vs Returning
      .addCase(fetchNewVsReturning.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.individualLoading.newVsReturning = true;
        state.individualErrors.newVsReturning = null;
      })
      .addCase(fetchNewVsReturning.fulfilled, (state, action) => {
        state.loading = false;
        state.newVsReturning = action.payload;
        state.error = null;
        state.lastFetched = Date.now();
        state.individualLoading.newVsReturning = false;
        state.individualErrors.newVsReturning = null;
      })
      .addCase(fetchNewVsReturning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.individualLoading.newVsReturning = false;
        state.individualErrors.newVsReturning = action.payload;
      })
      // Conversion Rate
      .addCase(fetchConversionRate.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.individualLoading.conversionRate = true;
        state.individualErrors.conversionRate = null;
      })
      .addCase(fetchConversionRate.fulfilled, (state, action) => {
        state.loading = false;
        state.conversionRate = action.payload;
        state.error = null;
        state.lastFetched = Date.now();
        state.individualLoading.conversionRate = false;
        state.individualErrors.conversionRate = null;
      })
      .addCase(fetchConversionRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.individualLoading.conversionRate = false;
        state.individualErrors.conversionRate = action.payload;
      })
      // Global Reach
      .addCase(fetchGlobalReach.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.individualLoading.globalReach = true;
        state.individualErrors.globalReach = null;
      })
      .addCase(fetchGlobalReach.fulfilled, (state, action) => {
        state.loading = false;
        state.globalReach = action.payload;
        state.error = null;
        state.lastFetched = Date.now();
        state.individualLoading.globalReach = false;
        state.individualErrors.globalReach = null;
      })
      .addCase(fetchGlobalReach.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.individualLoading.globalReach = false;
        state.individualErrors.globalReach = action.payload;
      })
      // Device Types
      .addCase(fetchDeviceTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.individualLoading.deviceTypes = true;
        state.individualErrors.deviceTypes = null;
      })
      .addCase(fetchDeviceTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.deviceTypes = action.payload;
        state.error = null;
        state.lastFetched = Date.now();
        state.individualLoading.deviceTypes = false;
        state.individualErrors.deviceTypes = null;
      })
      .addCase(fetchDeviceTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.individualLoading.deviceTypes = false;
        state.individualErrors.deviceTypes = action.payload;
      })
      // Top Locations
      .addCase(fetchTopLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.individualLoading.topLocations = true;
        state.individualErrors.topLocations = null;
      })
      .addCase(fetchTopLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.topLocations = action.payload;
        state.error = null;
        state.lastFetched = Date.now();
        state.individualLoading.topLocations = false;
        state.individualErrors.topLocations = null;
      })
      .addCase(fetchTopLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.individualLoading.topLocations = false;
        state.individualErrors.topLocations = action.payload;
      })
      // Browser Analytics
      .addCase(fetchBrowserAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.individualLoading.browserAnalytics = true;
        state.individualErrors.browserAnalytics = null;
      })
      .addCase(fetchBrowserAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.browserAnalytics = action.payload;
        state.error = null;
        state.lastFetched = Date.now();
        state.individualLoading.browserAnalytics = false;
        state.individualErrors.browserAnalytics = null;
      })
      .addCase(fetchBrowserAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.individualLoading.browserAnalytics = false;
        state.individualErrors.browserAnalytics = action.payload;
      });
  },
});

export const { clearAnalytics, setCurrentProject, clearIndividualError } = analyticsSlice.actions;
export default analyticsSlice.reducer; 