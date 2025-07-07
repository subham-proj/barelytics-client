import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../pages/auth/authSlice';
import projectReducer from '../pages/projects/projectSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
  },
});

export default store; 