import { Root } from "@/routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([{ path: "/", element: <Root /> }]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
