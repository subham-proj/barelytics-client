import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from './authSlice';
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

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setFormError('All fields are required.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }
    setFormError(null);
    
    try {
      const signupResult = await dispatch(signup({ name: formData.name, email: formData.email, password: formData.password }));
      
      if (signupResult.meta && signupResult.meta.requestStatus === 'rejected' && signupResult.payload) {
        setFormError(signupResult.payload);
        return;
      }
      
      if (signupResult.meta && signupResult.meta.requestStatus === 'fulfilled') {
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setFormError(null);
        
        // Add a small delay to ensure localStorage is updated
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check for projects after successful signup
        const projectsResult = await dispatch(fetchProjects());
        console.log(projectsResult);
        
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Card className="w-full max-w-lg mx-auto p-8 shadow-2xl border-0">
        <CardHeader className="flex flex-col items-center gap-2 mb-2">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <img src="/vite.svg" alt="Barelytics Logo" className="w-10 h-10" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                autoFocus
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@barelytics.app"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  tabIndex={-1}
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            {(formError || error) && (
              <div className="text-red-600 text-center text-sm">
                {formError || error}
              </div>
            )}
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
            <div className="text-center mt-6">
              <span className="text-sm text-muted-foreground">Already have an account?{' '}
                <Link to="/login" className="text-primary underline">Sign in</Link>
              </span>
            </div>
            <div className="text-xs text-muted-foreground text-center mt-4">
              By creating an account, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm; 