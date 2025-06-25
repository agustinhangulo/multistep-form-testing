import { useFieldContext } from "@/lib/formContext";
import { Field, type FieldPassedProps } from "./Field";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import type { ComponentProps } from "react";

type SelectProps = ComponentProps<typeof ShadcnSelect> &
  FieldPassedProps & {
    placeholder?: string;
  };

export const Select = ({
  label,
  description,
  placeholder,
  children,
  ...props
}: SelectProps) => {
  const field = useFieldContext<string>();

  return (
    <Field label={label} description={description} htmlFor={field.name}>
      <ShadcnSelect
        name={field.name}
        value={field.state.value}
        onValueChange={(value) => field.handleChange(value)}
        {...props}
      >
        <SelectTrigger
          id={field.name}
          className="w-full"
          aria-invalid={field.state.meta.errors.length > 0}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </ShadcnSelect>
    </Field>
  );
};
