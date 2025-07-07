import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from '@/pages/auth/LoginForm'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <LoginForm />
    </div>
  )
}

export default App
