import { Navigate, createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { RequireAuth } from '@/auth/RequireAuth';

import { DashboardPage } from '@/pages/DashboardPage';
import { InstallationsPage } from '@/pages/InstallationsPage';
import { InstallationDetailPage } from '@/pages/InstallationDetailPage';
import { NewInstallationPage } from '@/pages/NewInstallationPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';
import { MembersPage } from '@/pages/MembersPage';
import { MonthlyClosePage } from '@/pages/MonthlyClosePage';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'installations', element: <InstallationsPage /> },
          { path: 'installations/new', element: <NewInstallationPage /> },
          { path: 'installations/:type/:number/:seq', element: <InstallationDetailPage /> },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/auth/login" /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/admin',
    element: <RequireAuth roles={['ADMIN']} />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: 'members', element: <MembersPage /> },
          { path: 'monthly-close', element: <MonthlyClosePage /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" /> },
]);
