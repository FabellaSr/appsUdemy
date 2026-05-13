import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { appRouter } from './router/appRouter';
import { AuthProvider } from './auth/AuthProvider';
import { ThemeProvider } from './hooks/useTheme';

export const ExpensesApp = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={appRouter} />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  );
};
