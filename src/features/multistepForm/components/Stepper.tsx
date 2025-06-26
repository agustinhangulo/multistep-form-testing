import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Info, Database, SquareCheck } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useFormBuilderStore } from "../stores/store";

type StepperLinkProps = ComponentProps<typeof Link> & {
  disabled?: boolean;
  current?: boolean;
};

const StepperLink = ({
  disabled = false,
  current = false,
  children,
  ...props
}: StepperLinkProps) => {
  return (
    <Link
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-stone-200",
        disabled ? "text-stone-500 pointer-events-none" : "",
        current ? "border-l-4 border-red-700 text-red-700 bg-stone-200" : "",
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

// This all feels pretty tightly coupled but it's just an example so whatevs
export const Stepper = () => {
  const formName = useFormBuilderStore((state) => state.formName);
  const formDescription = useFormBuilderStore((state) => state.formDescription);
  const airtableBase = useFormBuilderStore((state) => state.airtableBase);
  const targetTable = useFormBuilderStore((state) => state.targetTable);
  const location = useLocation();

  return (
    <div className="flex gap-3">
      <StepperLink
        to="/form-builder/purpose"
        current={location.pathname === "/form-builder/purpose"}
      >
        <Info className="size-4" />
        Basic information
      </StepperLink>
      <StepperLink
        to="/form-builder/data-source"
        disabled={formName === undefined || formDescription === undefined}
        current={location.pathname === "/form-builder/data-source"}
      >
        <Database className="size-4" />
        Data source
      </StepperLink>
      <StepperLink
        to="/form-builder/field-selection"
        disabled={
          formName === undefined ||
          formDescription === undefined ||
          airtableBase === undefined ||
          targetTable === undefined
        }
        current={location.pathname === "/form-builder/field-selection"}
      >
        <SquareCheck className="size-4" />
        Field Selection
      </StepperLink>
    </div>
  );
};
