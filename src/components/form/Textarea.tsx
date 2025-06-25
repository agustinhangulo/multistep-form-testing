import type { ComponentProps } from "react";
import { Textarea as ShadcnTextarea } from "../ui/Textarea";
import { Field, type FieldPassedProps } from "./Field";
import { useFieldContext } from "@/lib/formContext";

type TextareaProps = ComponentProps<typeof ShadcnTextarea> & FieldPassedProps;

export const Textarea = ({ label, description, ...props }: TextareaProps) => {
  const field = useFieldContext<string>();

  return (
    <Field label={label} description={description}>
      <ShadcnTextarea
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
