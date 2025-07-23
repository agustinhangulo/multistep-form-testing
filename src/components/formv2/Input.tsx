import type { ComponentProps } from "react";
import { Input as ShadcnInput } from "../ui/Input";
import { useFieldContext } from "@/lib/formContext";

export const Input = ({ ...props }: ComponentProps<typeof ShadcnInput>) => {
  const field = useFieldContext<string>();

  return (
    <ShadcnInput
      // Tanstack Form registration
      // name={field.name}
      id={field.name}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      // Accessibility
      aria-invalid={field.state.meta.errors.length > 0}
      {...props}
    />
  );
};
