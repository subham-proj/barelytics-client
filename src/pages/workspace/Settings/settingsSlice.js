import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ACCOUNT_SETTINGS_ENDPOINT } from '@/lib/constants';
import { createAuthAxios, createAsyncThunkErrorHandler } from '@/lib/api';

export const fetchAccountSettings = createAsyncThunk(
  'settings/fetchAccountSettings',
  async (user_id, { rejectWithValue }) => {
    try {
      const authAxios = createAuthAxios();
      const response = await authAxios.get(`${ACCOUNT_SETTINGS_ENDPOINT}?user_id=${user_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(createAsyncThunkErrorHandler(error));
    }
  }
);

export const updateAccountSettings = createAsyncThunk(
  'settings/updateAccountSettings',
  async ({ user_id, full_name, company }, { rejectWithValue }) => {
    try {
      const authAxios = createAuthAxios();
      const response = await authAxios.post(ACCOUNT_SETTINGS_ENDPOINT, {
        user_id,
        full_name,
        company,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(createAsyncThunkErrorHandler(error));
    }
  }
);

const initialState = {
  id: '',
  full_name: '',
  email: '',
  company: '',
  loading: false,
  error: null,
  success: null,
  fetched: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clearSettingsSuccess: (state) => {
      state.success = null;
    },
    clearSettingsError: (state) => {
      state.error = null;
    },
    resetSettings: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchAccountSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.error = null;
        state.success = null;
        state.id = action.payload.id;
        state.full_name = action.payload.full_name;
        state.email = action.payload.email;
        state.company = action.payload.company;
      })
      .addCase(fetchAccountSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAccountSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateAccountSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = 'Account settings updated successfully.';
        state.full_name = action.payload.full_name;
        state.company = action.payload.company;
      })
      .addCase(updateAccountSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      });
  },
});

export const { clearSettingsSuccess, clearSettingsError, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer; 