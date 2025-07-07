import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '@/pages/auth/LoginForm';
import SignupForm from '@/pages/auth/SignupForm';
import React from 'react';

function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-2xl font-bold">Dashboard (Protected)</div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
