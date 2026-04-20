import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './routes/App';
import { AuthProvider } from './context/AuthContext';
import './styles.css';
import { RouterProvider } from 'react-router';
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
