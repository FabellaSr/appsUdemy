import { Navigate } from 'react-router';
import { createBrowserRouter } from 'react-router';

import LoginPage from '../auth/page/LoginPage';
import ProtectedRoute from './ProtectedRoute';

import HomePage from '../home/page/HomePage';

import { ProviderPublicPage } from '../provider';

import {
    DashboardPage,
    MyProfilePage,
    MyWorksPage,
    MyPaymentsPage,
    MyNotificationsPage
} from '../panel';

import {
    AdminNotificationsPage,
    AdminPaymentsPage,
    AdminProvidersPage
} from '../admin'
import { CustomMenu } from '../navigation/pages/CustomMenu';
import { AdminNotificationFormPage } from '@/admin/pages/notification/AdminNotificationFormPage';
import { AdminNotificationHistoryPage } from '@/admin/pages/notification/AdminNotificationHistoryPage';

export const appRouter = createBrowserRouter([
    //Main routes
    {
        path: '/',
        element: <CustomMenu />,
        children: [       
        { 
            children: [
                { index: true, element: <HomePage /> },
                { path: 'providers/:id', element: <ProviderPublicPage /> },
                { path: 'login', element: <LoginPage /> },
                { path: '*', element: <Navigate to="/" /> }
            ]
        },
        //Privadas/Proveedor
        {
            element: <ProtectedRoute roles={['provider']} />,
            children: [
                { 
                    children: [
                        { path: 'dashboard', element: <DashboardPage /> },
                        { path: 'me/profile', element: <MyProfilePage /> },
                        { path: 'me/works', element: <MyWorksPage /> },
                        { path: 'me/payments', element: <MyPaymentsPage /> },
                        { path: 'me/notifications', element: <MyNotificationsPage /> },
                    ],
                },
            ],
        },
        //Privadas/Admin
        {
            element: <ProtectedRoute roles={['admin']} />,
            children: [
                { 
                    children: [
                        { path: '/admin/providers', element: <AdminProvidersPage /> },
                        { path: '/admin/payments', element: <AdminPaymentsPage /> },
                        { path: '/admin/notifications', element: <AdminNotificationsPage /> }, 
                        { path: "/admin/notifications/new", element: <AdminNotificationFormPage />},
                        { path: "/admin/notifications/history", element: <AdminNotificationHistoryPage />}
                    ],
                },
            ],
        },
        {
            path: '*',
            element: <Navigate to="/" />
        },
    ]}
])