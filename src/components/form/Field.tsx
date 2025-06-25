import { useFieldContext } from "@/lib/formContext";
import type { ReactNode } from "react";
import { type ZodIssue } from "zod";
import { TriangleAlert } from "lucide-react";

interface FieldErrorProps {
  errors?: ZodIssue[];
}

export const FieldError = ({ errors }: FieldErrorProps) => {
  return (
    <em className="text-red-600 not-italic text-xs">
      {errors &&
        errors.map((error) => (
          <div className="flex items-center gap-1">
            <TriangleAlert className="w-3 h-3" />
            <p key={`${error.path}-${error.message}`}>{error.message}</p>
          </div>
        ))}
    </em>
  );
};

interface FieldLabelProps {
  label?: string;
  htmlFor: string;
}

export const FieldLabel = ({ label, htmlFor }: FieldLabelProps) => {
  return (
    <label className="font-bold" htmlFor={htmlFor}>
      {label}
    </label>
  );
};

type FieldProps = FieldErrorProps &
  FieldLabelProps & { description?: string; children: ReactNode };

// This type is for our prebound components to use in their typing
export type FieldPassedProps = Omit<FieldProps, "htmlFor" | "children">;

// Component for all form fields with:
// Field label
// Small description/helper text
// The field itself (input, select, etc. etc.)
// Error info area (list of strings)
export const Field = ({
  label,
  description,
  htmlFor,
  children,
}: FieldProps) => {
  const field = useFieldContext();

  return (
    <div className="flex flex-col gap-1">
      <FieldLabel label={label} htmlFor={htmlFor} />
      <small className="text-gray-600">{description}</small>
      {children}
      <FieldError errors={field.state.meta.errors} />
    </div>
  );
};
