import { useFieldContext } from "@/lib/formContext";
// import * as LabelPrimitive from "@radix-ui/react-label";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import type { StandardSchemaV1Issue } from "@tanstack/react-form";

// * NOTES ON THIS APPROACH
// ** PROS:
// - More granular/flexible-- can pick and choose what we want
// ** CONS:
//

/**
 * Label component for a form field. By default, `htmlFor` is set to `{field.name}`.
 *
 *
 * @param props
 */
export const FieldLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof Label>) => {
  const field = useFieldContext();

  return (
    <Label
      data-slot="form-label"
      data-error={!field.state.meta.isValid}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={field.name}
      {...props}
    />
  );
};

/**
 * Description component for a form field. By default, the `id` to be used in
 * `aria-describedby` is `{field.name}-description`.
 *
 * @param props Accepts the same props of a `<p/>` element
 */
export const FieldDescription = ({
  className,
  ...props
}: ComponentProps<"p">) => {
  const field = useFieldContext();

  return (
    <p
      data-slot="form-description"
      id={`${field.name}-description`}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
};

/**
 * Displays multiple errors from Tanstack. By default, the `id` to be used in
 * `aria-describedby` is `{field.name}-errors`
 *
 * Because of this component, all errors should have a `error.path` and `error.message`
 *
 * @param props Accepts the same props of a `<div/>` element
 */
export const FieldErrors = ({ className, ...props }: ComponentProps<"div">) => {
  const field = useFieldContext();

  return (
    <div
      className={cn("text-destructive text-sm", className)}
      id={`${field.name}-errors`}
      aria-live="polite" // For accessibility/aria-live, the parent container should always be rendered
      {...props}
    >
      {!field.state.meta.isValid &&
        field.state.meta.errors.map((error: StandardSchemaV1Issue) => (
          <div
            className="flex items-center gap-1"
            key={`${error.path}-${error.message}`}
          >
            <TriangleAlert className="w-3 h-3" />
            <p>{error.message}</p>
          </div>
        ))}
    </div>
  );
};

/**
 * Basic layout for when using FieldLabel, FieldDescription, and FieldErrors with an input individually
 * @param props Accepts the same props of a `<div/>` element
 */
export const FieldLayout = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
};

type FieldProps = {
  label?: string;
  description?: string;
  children: ReactNode;
};

/**
 * Wrapper containing components for a field's label, description, and error messages
 *
 * When using this, remember to use `aria-describedby` on the field input element for accessibility
 * with its description (`{field.name}-description`) and error messages (`{field.name}-errors`).
 *
 * __NOTE__: only use `aria-describedby` for the description if a `description` is actually passed
 *
 * @param label Field label
 * @param description Field description
 * @param children The field input element (e.g. <input/>, <select/>, etc.)
 * @returns
 */
export const Field = ({ label, description, children }: FieldProps) => {
  return (
    <FieldLayout>
      {label && <FieldLabel>{label}</FieldLabel>}
      {description && <FieldDescription>{description}</FieldDescription>}
      {children}
      <FieldErrors />
    </FieldLayout>
  );
};
