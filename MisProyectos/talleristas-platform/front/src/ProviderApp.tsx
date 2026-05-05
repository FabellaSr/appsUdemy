import { RouterProvider } from 'react-router';
import { appRouter } from './routes/app.router';
import { AuthProvider } from './auth/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

export const ProviderApp = () => {
  return (

    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={appRouter} />;
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
