import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/pages/layouts/MainLayout';
import AuthLayout from '@/pages/layouts/AuthLayout';
import AdminLayout from '@/pages/layouts/AdminLayout';
import DashboardPage from '@/pages/DashboardPage'; 
import ReportsPage from '@/pages/reports/page/ReportsPage';
import LoginPage from '@/pages/auth/page/LoginPage';
import RegisterPage from '@/pages/auth/page/RegisterPage';
import AdminDashboardPage from '@/pages/admin/page/AdminDashboardPage';
import MembersPage from '@/pages/members/page/MembersPage';
import MonthlyClosePage from '@/pages/MonthlyClosePage';
import { ProtectedRoute } from '@/auth/ProtectedRoute';
import { ExpensesPage } from '@/pages/expenses/page/ExpensesPage';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'expenses', element: <ExpensesPage /> },
      { path: 'reports', element: <ReportsPage /> },
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
    element: <ProtectedRoute roles={['ADMIN']} />,
    children: [
      {
        path: '',
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
