import { RouterProvider } from "react-router"
import { appRouter } from "./router/app.router";


export const proveedoresApp = () => {
  return (

    <RouterProvider router={appRouter} />

  );
};

