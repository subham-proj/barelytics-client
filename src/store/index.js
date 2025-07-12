import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../pages/auth/authSlice';
import projectReducer from '../pages/projects/projectSlice';
import configReducer from '../pages/workspace/Configuration/configSlice';
import analyticsReducer from '../pages/workspace/Overview/analyticsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    config: configReducer,
    analytics: analyticsReducer,
  },
});

export default store; 