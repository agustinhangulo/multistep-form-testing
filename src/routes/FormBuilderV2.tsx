import { StepperV2 } from "@/features/multistepForm/components/StepperV2";
import { FormBuilderStoreProvider } from "@/features/multistepForm/stores/Store";
import { Outlet } from "react-router";

export const FormBuilderV2 = () => {
  return (
    <FormBuilderStoreProvider>
      <div className="flex flex-col gap-4 m-4">
        <StepperV2 />
        <Outlet />
      </div>
    </FormBuilderStoreProvider>
  );
};
