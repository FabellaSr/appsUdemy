import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './auth/context/AuthContext';
import './styles.css';
import { appRouter } from './routes/app.router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RouterProvider router={appRouter} />
         {/*<App />*/}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
