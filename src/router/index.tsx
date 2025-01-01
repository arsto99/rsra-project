import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import EmailVerification from '../pages/auth/EmailVerification';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/reset-password/:token',
      element: <ResetPassword />,
    },
    {
      path: '/verify-email/:token',
      element: <EmailVerification />,
    },
  ],
  {
    basename: '/rsra-project', // هذا مهم لـ GitHub Pages
  }
);

export default router;
