import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { fetchProjects } from '../projects/projectSlice';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError('Email and password are required.');
      return;
    }
    if (!validateEmail(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormError(null);
    
    try {
      const loginResult = await dispatch(login({ email, password }));
      
      if (loginResult.meta && loginResult.meta.requestStatus === 'rejected' && loginResult.payload) {
        setFormError(loginResult.payload);
        return;
      }
      
      if (loginResult.meta && loginResult.meta.requestStatus === 'fulfilled') {
        setEmail('');
        setPassword('');
        setFormError(null);
        
        // Add a small delay to ensure localStorage is updated
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Check for projects after successful login
        const projectsResult = await dispatch(fetchProjects());

        if (projectsResult.meta.requestStatus === 'fulfilled') {
          if (projectsResult.payload && projectsResult.payload.length > 0) {
            // User has projects, redirect to first project dashboard
            navigate(`/${projectsResult.payload[0].id}`);
          } else {
            // No projects, redirect to create project form
            navigate('/create-project');
          }
        } else if (projectsResult.meta.requestStatus === 'rejected') {
          // If project fetch fails, still redirect to create project
          navigate('/create-project');
        }
      }
    } catch (error) {
      setFormError('An unexpected error occurred. Please try again.');
    }
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Card className="w-full max-w-lg mx-auto p-8 text-center shadow-2xl border-0">
          <CardHeader className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <span className="text-3xl font-bold text-primary">{user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}</span>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome, {user.name || user.email || 'User'}!</CardTitle>
          </CardHeader>
          <CardContent>
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? 'Logging in...' : 'Logout'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Card className="w-full max-w-lg mx-auto p-8 shadow-2xl border-0">
        <CardHeader className="flex flex-col items-center gap-2 mb-2">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <img src="/vite.svg" alt="PageMetrics Logo" className="w-10 h-10" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Sign in to PageMetrics</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                placeholder="john@pagemetrics.xyz"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            {(formError || error) && (
              <div className="text-red-600 text-center text-sm">
                {formError || error}
              </div>
            )}
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <div className="text-center mt-6">
              <span className="text-sm text-muted-foreground">Don&apos;t have an account?{' '}
                <Link to="/signup" className="text-primary underline">Sign up</Link>
              </span>
            </div>
            <div className="text-xs text-muted-foreground text-center mt-4">
              By signing in, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm; 