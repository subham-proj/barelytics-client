import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginForm from '@/pages/auth/LoginForm';
import SignupForm from '@/pages/auth/SignupForm';
import CreateProjectForm from '@/pages/projects/CreateProjectForm';
import Workspace from './pages/workspace/index.jsx';
import ProjectOrCreateRedirect from './pages/workspace/ProjectOrCreateRedirect.jsx';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeAuth } from '@/pages/auth/authSlice';
import { fetchProjects } from '@/pages/projects/projectSlice';
import Loading from '@/components/ui/loading';

function ProjectDashboard() {
  const dispatch = useDispatch();
  const { projects, currentProject, loading, fetched } = useSelector((state) => state.projects);
  const location = useLocation();
  const projectId = location.pathname.split('/')[1]; // Get project ID from URL

  useEffect(() => {
    if (!projects || projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projects && projects.length]);

  if (!fetched) {
    return <Loading text="Loading..." />;
  }

  // Find the current project
  const project = projects.find(p => String(p.id) === String(projectId)) || currentProject;

  if (projects.length === 0 && fetched) {
    return <Navigate to="/create-project" replace />;
  }

  if (!project && projects.length > 0 && fetched) {
    // If the projectId doesn't match any project, redirect to first project
    return <Navigate to={`/${projects[0].id}`} replace />;
  }

  return <Workspace project={project} />;
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
        <Route path="/dashboard" element={<PrivateRoute><ProjectOrCreateRedirect /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><ProjectOrCreateRedirect /></PrivateRoute>} />
        <Route path="/:projectId" element={<PrivateRoute><ProjectDashboard /></PrivateRoute>} />
        <Route path="*" element={<PrivateRoute><ProjectOrCreateRedirect /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
