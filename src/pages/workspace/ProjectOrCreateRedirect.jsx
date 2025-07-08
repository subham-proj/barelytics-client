import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '@/pages/projects/projectSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/ui/loading';

const ProjectOrCreateRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, fetched } = useSelector((state) => state.projects);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchProjects());
    } else {
      if (projects && projects.length > 0) {
        navigate(`/${projects[0].id}`, { replace: true });
      } else {
        navigate('/create-project', { replace: true });
      }
    }
    // eslint-disable-next-line
  }, [fetched, projects && projects.length]);

  return <Loading text="Loading..." />;
};

export default ProjectOrCreateRedirect; 