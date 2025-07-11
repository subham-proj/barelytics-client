import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LOGIN_ENDPOINT, SIGNUP_ENDPOINT } from '../../lib/constants';
import axios from 'axios';
import { saveSession, loadSession, clearSession } from './session';

const initialState = {
  user: null,
  token: null,
  session: null,
  loading: false,
  error: null,
};

// Try to load session from localStorage on app start
const persistedSession = loadSession();
if (persistedSession) {
  initialState.user = persistedSession.user;
  initialState.token = persistedSession.access_token;
  initialState.session = persistedSession;
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(LOGIN_ENDPOINT, { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Login failed');
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(SIGNUP_ENDPOINT, { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Signup failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.session = null;
      state.error = null;
      clearSession();
    },
    initializeAuth: (state) => {
      const session = loadSession();
      if (session) {
        state.user = session.user;
        state.token = session.access_token;
        state.session = session;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.session?.access_token;
        state.session = action.payload.session;
        state.error = null;
        // Save both user and session in localStorage for fallback
        saveSession({ user: action.payload.user, ...action.payload.session });
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Signup cases
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer; 