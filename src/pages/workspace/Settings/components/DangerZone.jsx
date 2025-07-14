import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject } from '@/pages/projects/projectSlice';
import { deleteAccount } from '../settingsSlice';
import { logout } from '@/pages/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const DangerZone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const projects = useSelector((state) => state.projects.projects);
  const currentProject = useSelector((state) => state.projects.currentProject);
  const user = useSelector((state) => state.auth.user);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [deletedProjectId, setDeletedProjectId] = useState(null);

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;
    setLoading(true);
    const result = await dispatch(deleteProject(projectToDelete.id));
    setLoading(false);
    setShowProjectModal(false);
    setDeletedProjectId(projectToDelete.id);
    setProjectToDelete(null);
    if (result.meta.requestStatus === 'fulfilled') {
      toast({ title: 'Project deleted', description: 'Project was deleted successfully.' });
    } else {
      toast({ title: 'Error', description: result.payload || 'Failed to delete project', variant: 'destructive' });
    }
  };

  // After deletion, navigate to next project or /create-project
  useEffect(() => {
    if (!deletedProjectId) return;
    const stillExists = projects.some(p => p.id === deletedProjectId);
    if (!stillExists) {
      if (projects.length > 0) {
        navigate(`/${projects[0].id}`);
      } else {
        navigate('/create-project');
      }
      setDeletedProjectId(null);
    }
  }, [projects, deletedProjectId, navigate]);

  const handleDeleteAccount = async () => {
    if (!user) return;
    setLoading(true);
    const result = await dispatch(deleteAccount(user.id));
    setLoading(false);
    setShowAccountModal(false);
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(logout());
      toast({ title: 'Account deleted', description: 'Your account was deleted.' });
      navigate('/login');
    } else {
      toast({ title: 'Error', description: result.payload || 'Failed to delete account', variant: 'destructive' });
    }
  };

  return (
    <Card className="mb-10 border-red-300">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Trash2 className="w-6 h-6 text-red-500" />
          <CardTitle className="text-xl md:text-2xl font-bold text-red-600">Danger Zone</CardTitle>
        </div>
        <CardDescription className="mb-6 text-red-500">Irreversible and destructive actions</CardDescription>
        <div className="divide-y divide-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-2">
            <div>
              <div className="font-semibold">Delete Project</div>
              <div className="text-muted-foreground text-sm">Permanently delete this project and all associated data</div>
            </div>
            <Button
              variant="destructive"
              className="w-full md:w-auto"
              onClick={() => {
                const fallbackProject = currentProject || projects[0] || null;
                setProjectToDelete(fallbackProject);
                setShowProjectModal(true);
              }}
            >
              Delete Project
            </Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-2">
            <div>
              <div className="font-semibold">Delete Account</div>
              <div className="text-muted-foreground text-sm">Permanently delete your account and all projects</div>
            </div>
            <Button variant="destructive" className="w-full md:w-auto" onClick={() => setShowAccountModal(true)}>
              Delete Account
            </Button>
          </div>
        </div>
        <ConfirmModal
          isOpen={showProjectModal}
          onClose={() => { setShowProjectModal(false); setProjectToDelete(null); }}
          onConfirm={handleDeleteProject}
          title="Delete Project?"
          description={`Are you sure you want to delete the project "${projectToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete Project"
          loading={loading}
        />
        <ConfirmModal
          isOpen={showAccountModal}
          onClose={() => setShowAccountModal(false)}
          onConfirm={handleDeleteAccount}
          title="Delete Account?"
          description="Are you sure you want to delete your account? This action cannot be undone."
          confirmText="Delete Account"
          loading={loading}
        />
      </CardContent>
    </Card>
  );
};

export default DangerZone; 