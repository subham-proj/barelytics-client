import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PROJECTS_ENDPOINT } from '../../lib/constants';
import { getAuthToken } from '../../lib/auth';
import axios from 'axios';

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

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const authAxios = createAuthAxios();
      const response = await authAxios.get(PROJECTS_ENDPOINT);
      return response.data;
    } catch (error) {
      if (error.message === 'No authentication token found') {
        return rejectWithValue('Authentication required. Please log in again.');
      }
      if (error.response?.status === 401) {
        return rejectWithValue('Invalid or expired token. Please log in again.');
      }
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch projects');
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const authAxios = createAuthAxios();
      const response = await authAxios.post(PROJECTS_ENDPOINT, projectData);
      return response.data;
    } catch (error) {
      if (error.message === 'No authentication token found') {
        return rejectWithValue('Authentication required. Please log in again.');
      }
      if (error.response?.status === 401) {
        return rejectWithValue('Invalid or expired token. Please log in again.');
      }
      return rejectWithValue(error.response?.data?.error || 'Failed to create project');
    }
  }
);

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
  fetched: false, // <-- add this
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    clearProjects: (state) => {
      state.projects = [];
      state.currentProject = null;
      state.error = null;
      state.fetched = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.error = null;
        state.fetched = true;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fetched = true;
      })
      // Create project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
        state.currentProject = action.payload;
        state.error = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentProject, clearProjects } = projectSlice.actions;
export default projectSlice.reducer; 