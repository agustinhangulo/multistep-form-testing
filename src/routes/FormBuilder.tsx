import { Stepper } from "@/features/multistepForm/components/Stepper";
import { FormBuilderStoreProvider } from "@/features/multistepForm/stores/Store";
import { Outlet } from "react-router";

export const FormBuilder = () => {
  return (
    <FormBuilderStoreProvider>
      <div className="flex flex-col gap-4 m-4">
        <Stepper />
        <Outlet />
      </div>
    </FormBuilderStoreProvider>
  );
};
