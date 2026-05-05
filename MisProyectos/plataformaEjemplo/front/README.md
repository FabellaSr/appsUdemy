# Frontend — Provider Showcase

React 18 + Vite + TypeScript + TailwindCSS + shadcn/ui + React Router + React Query.

## Run
```bash
cp .env.example .env
npm install
npm run dev
```
App: http://localhost:5173

## Architecture
```
src/
  main.tsx              # bootstrap
  ProviderApp.tsx       # global providers (Query, Auth, Theme, Toaster)
  router/
    app.router.tsx      # route table
    ProtectedRoute.tsx  # role guard
  context/AuthContext.tsx
  components/layout/    # Sidebar, Header
  components/ui/        # shadcn primitives
  pages/
    public/   HomePage, LoginPage, ProviderPublicPage
    provider/ Dashboard, MyProfile, MyWorks, MyPayments, MyNotifications
    admin/    Providers, Payments, Notifications, NotificationForm, NotificationHistory
  services/api.ts       # axios instance
  types/index.ts        # all shared types
  hooks/                # useAuth, useTheme
  lib/utils.ts
```

## Roles
visitor · provider · admin · superadmin — guarded by `ProtectedRoute`.

## Theme
CSS variables in `src/index.css` (HSL). Toggle via `useTheme`.
