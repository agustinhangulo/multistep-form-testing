import { DataSourceForm } from "@/features/multistepForm/components/DataSourceForm";
import { DataSourceFormRHF } from "@/features/multistepForm/components/DataSourceFormRHF";
import { DataSourceFormV2 } from "@/features/multistepForm/components/DataSourceFormV2";
import { FieldSelectionForm } from "@/features/multistepForm/components/FieldSelectionForm";
import { FieldSelectionFormRHF } from "@/features/multistepForm/components/FieldSelectionFormRHF";
import { FieldSelectionFormV2 } from "@/features/multistepForm/components/FieldSelectionFormV2";
import { PurposeForm } from "@/features/multistepForm/components/PurposeForm";
import { PurposeFormRHF } from "@/features/multistepForm/components/PurposeFormRHF";
import { PurposeFormV2 } from "@/features/multistepForm/components/PurposeFormV2";
import { FormBuilder } from "@/routes/FormBuilder";
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
