import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: () => import('../pages/UserLogin.vue')
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('../pages/AdminLogin.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register.vue')
  },
  {
    path: '/verify-email',
    name: 'EmailVerification',
    component: () => import('../pages/EmailVerification.vue')
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('../pages/PrivacyPolicy.vue')
  },
  {
    path: '/terms-of-service',
    name: 'TermsOfService',
    component: () => import('../pages/TermsOfService.vue')
  },
  {
    path: '/data-deletion',
    name: 'DataDeletion',
    component: () => import('../pages/DataDeletion.vue')
  },
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: () => import('../pages/AuthCallback.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../pages/ForgotPassword.vue')
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: () => import('../pages/ResetPassword.vue')
  },
  {
    path: '/verify-reset-code',
    name: 'VerifyResetCode',
    component: () => import('../pages/VerifyResetCode.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// حماية المسارات
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/admin/login', '/register', '/privacy-policy', '/terms-of-service', '/data-deletion', '/auth/callback', '/forgot-password', '/verify-reset-code', '/verify-email'];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem('token');

  if (authRequired && !token) {
    return next('/login');
  }

  next();
});

export default router;
