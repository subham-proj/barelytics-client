import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from './authSlice';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setFormError('All fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }
    setFormError(null);
    const result = await dispatch(signup({ email, password }));
    if (result.meta.requestStatus === 'rejected' && result.payload) {
      setFormError(result.payload);
      return;
    }
    if (result.meta.requestStatus === 'fulfilled') {
      setSuccess(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFormError(null);
    }
  };

  if (user || success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Card className="w-full max-w-lg mx-auto p-8 text-center shadow-2xl border-0">
          <CardHeader className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <img src="/vite.svg" alt="Barelytics Logo" className="w-10 h-10" />
            </div>
            <CardTitle className="text-2xl font-bold">Signup successful!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground mb-4">You can now log in with your new account.<br/>Redirecting to login...</div>
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
            <img src="/vite.svg" alt="Barelytics Logo" className="w-10 h-10" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Sign up for Barelytics</CardTitle>
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
                placeholder="john@barelytics.app"
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            {(formError || error) && (
              <div className="text-red-600 text-center text-sm">
                {formError || error}
              </div>
            )}
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
            <div className="text-center mt-6">
              <span className="text-sm text-muted-foreground">Already have an account?{' '}
                <Link to="/login" className="text-primary underline">Log in</Link>
              </span>
            </div>
            <div className="text-xs text-muted-foreground text-center mt-4">
              By signing up, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm; 