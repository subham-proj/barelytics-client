import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../pages/auth/authSlice';
import projectReducer from '../pages/projects/projectSlice';
import configReducer from '../pages/workspace/Configuration/configSlice';
import analyticsOverviewReducer from '../pages/workspace/Overview/analyticsOverviewSlice';
import analyticsReducer from '../pages/workspace/Analytics/analyticsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    config: configReducer,
    overview: analyticsOverviewReducer,
    analytics: analyticsReducer,  
  },
});

export default store; 