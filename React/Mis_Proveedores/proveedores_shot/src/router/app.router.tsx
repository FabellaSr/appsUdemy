import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

import { ShopLayout, ProveedorPage, GenderPage, HomePage } from '../shop';
import { AdminDashboardPage, AdminLayout, AdminProductPage, AdminProductsPage } from '../admin';


const AuthLayout = lazy(() => import('../auth/layouts/AuthLayout'))
const LoginPage = lazy(() => import('../auth/pages/login/LoginPage'))
const RegistrerPage = lazy(() => import('../auth/pages/registrer/RegistrerPage'))

export const appRouter = createBrowserRouter([
    //Main routes
  {
    path: '/',
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'product/:idSlug',
        element: <ProveedorPage />,
      },
      {
        path: 'gender/:gender',
        element: <GenderPage />,
      },
    ],
  },
    //Auth Routes
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { 
                index: true, 
                element: <Navigate to="/auth/login" /> },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegistrerPage />
            }
        ]
    },
    //Admin Routes
    {
        path: '/admin',
        element: <AdminLayout />,
            children: [ 
                {
                    index: true,
                    element: <AdminDashboardPage />
                },
                {
                    path: 'product',
                    element: <AdminProductPage />
                },
                {
                    path: 'products/:id',
                    element: <AdminProductsPage />
                }
            ]
    },
    {
        path: '*',
        element: <Navigate to="/" />
    }
]);