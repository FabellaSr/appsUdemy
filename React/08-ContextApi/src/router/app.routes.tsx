import { HeroesLayout } from "@/heroes/layout/HeroesLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { lazy } from "react";
import {  createHashRouter } from "react-router";

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'))
const AdminPage = lazy(()=> import('@/admin/pages/AdminPages'))
const AdminLayout = lazy(()=> import('@/admin/layout/AdminLayout'))

export const appRouter = createHashRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "heroes/:idSlug",
        element: <HeroPage />
      },
      {
        path: "search",
        element: <SearchPage />
      },
      {
        path: "*",
        element: <h1>Estamos trabajando para uste</h1>
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