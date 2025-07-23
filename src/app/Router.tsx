import { DataSourceFormV2 } from "@/features/multistepForm/components/DataSourceFormV2";
import { FieldSelectionFormV2 } from "@/features/multistepForm/components/FieldSelectionFormV2";
import { PurposeFormV2 } from "@/features/multistepForm/components/PurposeFormV2";
import { FormBuilderV2 } from "@/routes/FormBuilderV2";
import { Home } from "@/routes/Home";
import { Root } from "@/routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/form-builder/v2",
        element: <FormBuilderV2 />,
        children: [
          { path: "/form-builder/v2/purpose", element: <PurposeFormV2 /> },
          {
            path: "/form-builder/v2/data-source",
            element: <DataSourceFormV2 />,
          },
          {
            path: "/form-builder/v2/field-selection",
            element: <FieldSelectionFormV2 />,
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
