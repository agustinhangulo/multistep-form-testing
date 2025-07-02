import { DataSourceForm } from "@/features/multistepForm/components/DataSourceForm";
import { DataSourceFormRHF } from "@/features/multistepForm/components/DataSourceFormRHF";
import { FieldSelectionForm } from "@/features/multistepForm/components/FieldSelectionForm";
import { FieldSelectionFormRHF } from "@/features/multistepForm/components/FieldSelectionFormRHF";
import { PurposeForm } from "@/features/multistepForm/components/PurposeForm";
import { PurposeFormRHF } from "@/features/multistepForm/components/PurposeFormRHF";
import { FormBuilder } from "@/routes/FormBuilder";
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
      {
        path: "/form-builder/rhf",
        element: <FormBuilder />,
        children: [
          { path: "/form-builder/rhf/purpose", element: <PurposeFormRHF /> },
          {
            path: "/form-builder/rhf/data-source",
            element: <DataSourceFormRHF />,
          },
          {
            path: "/form-builder/rhf/field-selection",
            element: <FieldSelectionFormRHF />,
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
