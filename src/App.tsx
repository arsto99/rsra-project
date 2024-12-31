import React from 'react'
import { useRoutes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import EmailVerification from './pages/auth/EmailVerification'
import './index.css'

const App: React.FC = () => {
  const routes = useRoutes([
    { path: '/', element: <Login /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/reset-password/:token', element: <ResetPassword /> },
    { path: '/verify-email/:token', element: <EmailVerification /> },
  ])

  return (
    <div className="font-cairo" dir="rtl">
      {routes}
    </div>
  )
}

export default App
