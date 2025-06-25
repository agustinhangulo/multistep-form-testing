import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export const FormLayout = ({
  onSubmit,
  className,
  children,
  ...props
}: ComponentProps<"form">) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) {
          onSubmit(e);
        }
      }}
      className={cn(
        "flex flex-col px-4 py-6 border border-stone-300 rounded-md gap-3 shadow-sm w-full",
        className,
      )}
      {...props}
    >
      {children}
    </form>
  );
};
