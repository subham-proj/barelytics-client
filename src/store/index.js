import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../pages/auth/authSlice';
import projectReducer from '../pages/projects/projectSlice';
import configReducer from '../pages/workspace/Configuration/configSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    config: configReducer,
  },
});

export default store; 