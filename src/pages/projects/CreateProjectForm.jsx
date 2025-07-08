import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProject } from './projectSlice';
import { logout } from '@/pages/auth/authSlice';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, LogOut, User } from 'lucide-react';

const CreateProjectForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
  });
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setFormError('Project name is required.');
      return;
    }

    setFormError(null);
    const result = await dispatch(createProject(formData));
    
    if (result.meta.requestStatus === 'rejected' && result.payload) {
      setFormError(result.payload);
      return;
    }
    
    if (result.meta.requestStatus === 'fulfilled') {
      // Redirect to the project dashboard
      navigate(`/${result.payload.id}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative">
      {/* Top-right user info and logout */}
      <div className="absolute top-4 right-4 flex items-center space-x-3 z-10">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
          {user?.email ? (
            <span className="text-sm font-semibold text-primary">
              {user.email.charAt(0).toUpperCase()}
            </span>
          ) : (
            <User className="w-5 h-5 text-primary" />
          )}
        </div>
        <span className="text-sm text-gray-700 font-medium truncate max-w-[120px]">{user?.email || 'User'}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-gray-500 hover:text-gray-700"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
      <Card className="w-full max-w-lg mx-auto p-8 shadow-2xl border-0">
        <CardHeader className="flex flex-col items-center gap-2 mb-2">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <img src="/vite.svg" alt="Barelytics Logo" className="w-10 h-10" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create a Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                autoFocus
                placeholder="My Awesome Project"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>
            
            {(formError || error) && (
              <div className="text-red-600 text-center text-sm">
                {formError || error}
              </div>
            )}
            
            <div className="flex space-x-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleGoBack}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Creating Project...' : 'Create Project'}
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground text-center mt-4">
              Start by creating a project. You can add more projects anytime from your dashboard.
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProjectForm; 