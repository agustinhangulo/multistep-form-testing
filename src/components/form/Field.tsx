import { useFieldContext } from "@/lib/formContext";
import type { ReactNode } from "react";

interface FieldErrorProps {
  fieldName: string;
  errors?: string[];
}

const FieldError = ({ fieldName, errors }: FieldErrorProps) => {
  return (
    <em className="text-red-600 not-italic text-xs">
      {errors &&
        errors.map((error) => <p key={`${fieldName}-${error}`}>*{error}</p>)}
    </em>
  );
};

interface FieldProps {
  label?: string;
  description?: string;
  htmlFor?: string;
  children: ReactNode;
}

export type FieldPassedProps = Omit<FieldProps, "children">;

// Component for all form fields with:
// Field label
// Small description/helper text
// The field itself (input, select, etc. etc.)
// Error info area (list of strings)
const Field = ({ label, description, htmlFor, children }: FieldProps) => {
  const field = useFieldContext();

  return (
    <div className="flex flex-col gap-1">
      <label className="font-bold" htmlFor={htmlFor}>
        {label}
      </label>
      <small className="text-gray-600">{description}</small>

      {children}
      <FieldError fieldName={field.name} errors={field.state.meta.errors} />
    </div>
  );
};

export { Field };
