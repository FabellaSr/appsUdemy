import { Outlet } from 'react-router-dom';
export const AuthLayout = () => (
  <div className="min-h-screen flex items-center justify-center bg-background px-4">
    <div className="w-full max-w-md">
      <Outlet />
    </div>
  </div>
);
