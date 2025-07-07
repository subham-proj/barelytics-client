import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './authSlice';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(null);

  const handleSubmit = (e) => {
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
    dispatch(login({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (user) {
    return (
      <Card className="w-full max-w-lg mx-auto p-8 text-center shadow-2xl border-0">
        <CardHeader className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <span className="text-3xl font-bold text-primary">{user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}</span>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome, {user.name || user.email || 'User'}!</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLogout} className="w-full mt-4">Logout</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto p-8 shadow-2xl border-0">
      <CardHeader className="flex flex-col items-center gap-2 mb-2">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <img src="/vite.svg" alt="Barelytics Logo" className="w-10 h-10" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">Sign in to Barelytics</CardTitle>
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
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <div className="text-xs text-muted-foreground text-center mt-4">
            By signing in, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm; 