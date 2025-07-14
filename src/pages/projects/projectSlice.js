import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAuthAxios, createAsyncThunkErrorHandler } from '@/lib/api';
import { PROJECTS_ENDPOINT, PROJECT_DELETE_ENDPOINT } from '@/lib/constants';

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const authAxios = createAuthAxios();
      const response = await authAxios.get(PROJECTS_ENDPOINT);
      return response.data;
    } catch (error) {
      return rejectWithValue(createAsyncThunkErrorHandler(error));
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
      return rejectWithValue(createAsyncThunkErrorHandler(error));
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId, { rejectWithValue }) => {
    try {
      const authAxios = createAuthAxios();
      await authAxios.post(PROJECT_DELETE_ENDPOINT, { project_id: projectId });
      return projectId;
    } catch (error) {
      return rejectWithValue(createAsyncThunkErrorHandler(error));
    }
  }
);

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
  fetched: false, 
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
      })
      // Delete project
      .addCase(deleteProject.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.projects = state.projects.filter(p => p.id !== deletedId);
        if (state.currentProject && state.currentProject.id === deletedId) {
          state.currentProject = state.projects.length > 0 ? state.projects[0] : null;
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setCurrentProject, clearProjects } = projectSlice.actions;
export default projectSlice.reducer; 