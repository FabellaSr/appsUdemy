import { createBrowserRouter, Navigate } from 'react-router';
import HomePage from '../home/page/HomePage';
import { HomeLayout } from '../home/layouts/HomeLayout';
 

export const appRouter = createBrowserRouter([
    //Main routes
    {
        path: '/',
        element: <HomeLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
    {
        path: '*',
        element: <Navigate to="/" />
    }
        ]
    }
])