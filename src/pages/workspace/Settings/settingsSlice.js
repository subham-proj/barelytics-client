import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ACCOUNT_SETTINGS_ENDPOINT, CHANGE_PASSWORD_ENDPOINT, DELETE_ACCOUNT_ENDPOINT } from '@/lib/constants';
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

export const changePassword = createAsyncThunk(
  'settings/changePassword',
  async ({ user_id, email, current_password, new_password }, { rejectWithValue }) => {
    try {
      const authAxios = createAuthAxios();
      const response = await authAxios.post(CHANGE_PASSWORD_ENDPOINT, {
        user_id,
        email,
        current_password,
        new_password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(createAsyncThunkErrorHandler(error));
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'settings/deleteAccount',
  async (userId, { rejectWithValue }) => {
    try {
      const authAxios = createAuthAxios();
      await authAxios.post(DELETE_ACCOUNT_ENDPOINT, { user_id: userId });
      return userId;
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
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = 'Password changed successfully.';
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        Object.assign(state, initialState);
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearSettingsSuccess, clearSettingsError, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer; 