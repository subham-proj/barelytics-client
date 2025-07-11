import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, clearProjects } from '@/pages/projects/projectSlice';
import { logout } from '@/pages/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/ui/loading';

const ProjectOrCreateRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, fetched, error } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchProjects());
    } else if (
      error &&
      (String(error).toLowerCase().includes('token') || String(error).toLowerCase().includes('auth')) &&
      !user // Only log out if user is not present
    ) {
      dispatch(logout());
      dispatch(clearProjects());
      navigate('/login', { replace: true });
    } else {
      if (projects && projects.length > 0) {
        navigate(`/${projects[0].id}`, { replace: true });
      } else {
        navigate('/create-project', { replace: true });
      }
    }
    // eslint-disable-next-line
  }, [fetched, projects && projects.length, error, user]);

  return <Loading text="Loading..." />;
};

export default ProjectOrCreateRedirect; 