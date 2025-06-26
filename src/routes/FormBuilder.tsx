import { Stepper } from "@/features/multistepForm/components/Stepper";
import { Outlet } from "react-router";

export const FormBuilder = () => {
  return (
    <div className="flex flex-col gap-4 m-4">
      <Stepper />
      <Outlet />
    </div>
  );
};
