import { useFieldContext } from "@/hooks/formContext";
import { Field, type FieldPassedProps } from "./Field";
import { type ComponentProps } from "react";
import { Input as ShadCNInput } from "@/components/ui/Input";

// InputProps extends boths these props; <input> props + Field props
type InputProps = ComponentProps<"input"> & FieldPassedProps;

const Input = ({ label, description, type = "text", ...props }: InputProps) => {
  const field = useFieldContext<string>();

  return (
    <Field label={label} description={description} htmlFor={field.name}>
      <ShadCNInput
        type={type}
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

export { Input };
