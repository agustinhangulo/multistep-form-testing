import type { ComponentProps } from "react";
import { Input as ShadcnInput } from "../ui/Input";
import { useFieldContext } from "@/lib/formContext";
import { Field, type FieldPassedProps } from "./Field";

type InputProps = ComponentProps<typeof ShadcnInput> & FieldPassedProps;

export const Input = ({ label, description, ...props }: InputProps) => {
  const field = useFieldContext<string>();

  return (
    <Field label={label} description={description} htmlFor={field.name}>
      <ShadcnInput
        name={field.name}
        id={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={field.state.meta.errors.length > 0}
        {...props}
      />
    </Field>
  );
};
