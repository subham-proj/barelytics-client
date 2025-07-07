import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginForm from '@/pages/auth/LoginForm';
import SignupForm from '@/pages/auth/SignupForm';
import CreateProjectForm from '@/pages/projects/CreateProjectForm';
import Dashboard from './pages/dashboard/index.jsx';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeAuth } from '@/pages/auth/authSlice';

function ProjectDashboard() {
  const { projects, currentProject } = useSelector((state) => state.projects);
  const location = useLocation();
  const projectId = location.pathname.split('/')[1]; // Get project ID from URL
  
  // Find the current project
  const project = projects.find(p => p.id === projectId) || currentProject;
  
  if (!project) {
    return <Navigate to="/create-project" replace />;
  }
  
  return <Dashboard project={project} />;
}

function PrivateRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function PublicRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize auth state from localStorage on app start
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupForm /></PublicRoute>} />
        <Route path="/create-project" element={<PrivateRoute><CreateProjectForm /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/:projectId" element={<PrivateRoute><ProjectDashboard /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
