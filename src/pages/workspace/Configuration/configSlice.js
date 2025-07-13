import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAuthAxios, createAsyncThunkErrorHandler } from '@/lib/api';
import { CONFIG_ENDPOINT } from '@/lib/constants';

// Async thunk to fetch config
export const fetchConfig = createAsyncThunk(
  'config/fetchConfig',
  async (projectId, { rejectWithValue }) => {
    try {
      const authAxios = createAuthAxios();
      const response = await authAxios.get(CONFIG_ENDPOINT(projectId));
      return response.data;
    } catch (error) {
      return rejectWithValue(createAsyncThunkErrorHandler(error));
    }
  }
);

// Async thunk to save config
export const updateConfig = createAsyncThunk(
  'config/updateConfig',
  async ({ projectId, config }, { rejectWithValue }) => {
    try {
      const authAxios = createAuthAxios();
      const response = await authAxios.put(CONFIG_ENDPOINT(projectId), config);
      return response.data;
    } catch (error) {
      return rejectWithValue(createAsyncThunkErrorHandler(error));
    }
  }
);

const initialState = {
  config: null,
  loading: false,
  error: null,
  success: false,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    resetConfigSuccess(state) {
      state.success = false;
    },
    setConfig(state, action) {
      state.config = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload;
        state.error = null;
      })
      .addCase(fetchConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(updateConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetConfigSuccess, setConfig } = configSlice.actions;
export default configSlice.reducer; 