import { DataSourceForm } from "@/features/multistepForm/components/DataSourceForm";
import { FieldSelectionForm } from "@/features/multistepForm/components/FieldSelectionForm";
import { PurposeForm } from "@/features/multistepForm/components/PurposeForm";
import { FormBuilder } from "@/routes/FormBuilder";
import { Root } from "@/routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  { path: "/", element: <Root /> },
  {
    path: "/form-builder",
    element: <FormBuilder />,
    children: [
      { path: "/form-builder/purpose", element: <PurposeForm /> },
      { path: "/form-builder/data-source", element: <DataSourceForm /> },
      {
        path: "/form-builder/field-selection",
        element: <FieldSelectionForm />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
