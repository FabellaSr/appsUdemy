import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router/AppRouter';
import { ThemeProvider } from './components/theme/ThemeProvider';

export const ExpensesApp = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  );
};
