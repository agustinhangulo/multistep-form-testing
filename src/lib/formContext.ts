import { Input } from "@/components/formv2/Input";
import { Textarea } from "@/components/formv2/Textarea";
import {
  FieldDescription,
  FieldErrors,
  FieldLabel,
} from "@/components/ui/FormV2";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  // We'll learn more about these options later
  fieldComponents: {
    Input,
    Textarea,
    FieldLabel,
    FieldDescription,
    FieldErrors,
  },
  formComponents: {},
});
