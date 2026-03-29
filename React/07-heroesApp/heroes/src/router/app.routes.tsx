import { HeroesLayout } from "@/heroes/layout/HeroesLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'))
const AdminPage = lazy(()=> import('@/admin/pages/AdminPages'))
const AdminLayout = lazy(()=> import('@/admin/layout/AdminLayout'))

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "heroe/1",
        element: <HeroPage />
      },
      {
        path: "search",
        element: <SearchPage />
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />
      }
    ]
  },
]);