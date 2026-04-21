import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import { createRoot } from 'react-dom/client'
import { appRouter } from './routes/app.router';
import { AuthProvider } from './auth/context/AuthContext';
import './index.css'
 

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <AuthProvider>
        <RouterProvider router={appRouter} />
         {/*<App />*/}
      </AuthProvider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
)
