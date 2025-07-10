import { lazy } from 'react';
import { Route } from 'react-router-dom';
import AuthLayout from '../components/layouts/auth/AuthLayout';

const Login = lazy(() => import('../pages/Login/Login'));
const RegistrationPage = lazy(() => import('../pages/RegistrationPage/RegistrationPage'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage/ForgotPasswordPage'));

const authRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<RegistrationPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
  </Route>
);

export default authRoutes;
