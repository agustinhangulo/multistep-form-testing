import { Outlet } from "react-router";

export const FormBuilder = () => {
  return (
    <div className="flex flex-col gap-4 m-4">
      <p className="p-2 border border-stone-800">
        In the future this will be a stepper/progress component
      </p>
      <Outlet />
    </div>
  );
};
