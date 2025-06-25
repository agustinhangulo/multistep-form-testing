import { Field } from "@/components/form/Field";
import { Input } from "@/components/form/Input";
import { Select } from "@/components/form/Select";
import { Textarea } from "@/components/form/Textarea";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  // We'll learn more about these options later
  fieldComponents: { Field, Input, Textarea, Select },
  formComponents: {},
});
