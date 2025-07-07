import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchProjects, setCurrentProject } from './projectSlice';
import { Button } from '@/components/ui/button';
import { ChevronDown, Plus } from 'lucide-react';
import Loading from '@/components/ui/loading';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ProjectSelector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { projects, loading } = useSelector((state) => state.projects);
  const [isOpen, setIsOpen] = useState(false);

  // Get current project ID from URL
  let currentProjectId = location.pathname.split('/')[1];

  useEffect(() => {
    currentProjectId = location.pathname.split('/')[1];
  }, [location.pathname]);

  useEffect(() => {
    // Fetch projects if not already loaded
    if (projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projects.length]);

  const currentProject = projects.find(p => p.id == currentProjectId);

  const handleProjectSelect = (project) => {
    dispatch(setCurrentProject(project));
    navigate(`/${project.id}`);
    setIsOpen(false);
  };

  const handleCreateProject = () => {
    navigate('/create-project');
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2">
        <Loading size="sm" text="Loading projects..." />
      </div>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 px-3 py-2 h-auto"
        >
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">
              {currentProject?.name || 'Select Project'}
            </span>
          </div>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        {projects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            onClick={() => handleProjectSelect(project)}
            className="flex flex-col items-start p-3 cursor-pointer"
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">{project.name}</span>
              {project.id === currentProjectId && (
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onClick={handleCreateProject}
          className="flex items-center space-x-2 p-3 cursor-pointer border-t"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Project</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectSelector; 