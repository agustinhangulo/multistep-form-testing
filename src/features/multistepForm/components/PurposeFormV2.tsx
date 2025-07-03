import { FormLayout } from "./FormLayout";
import { useAppForm } from "@/lib/formContext";
import z from "zod";
import { formBuilderSchema } from "../api/schema";
import { Button } from "@/components/ui/Button";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useFormBuilderStore } from "../stores/Store";
import { Input } from "@/components/formv2/Input";
import { Textarea } from "@/components/formv2/Textarea";
import { Field, FieldLayout } from "@/components/ui/FormV2";

const purposeSchema = formBuilderSchema.pick({
  formName: true,
  formDescription: true,
});

export const PurposeFormV2 = () => {
  const setData = useFormBuilderStore((state) => state.setData);
  const formName = useFormBuilderStore((state) => state.formName);
  const formDescription = useFormBuilderStore((state) => state.formDescription);
  const navigate = useNavigate();

  const defaultValues: z.infer<typeof purposeSchema> = {
    formName: formName || "",
    formDescription: formDescription || "",
  };

  const form = useAppForm({
    defaultValues: defaultValues,
    onSubmit: ({ value }) => {
      console.log(value);
      setData(value);
      navigate("/form-builder/v2/data-source");
    },
    validators: {
      onSubmit: purposeSchema,
    },
  });

  return (
    <FormLayout
      onSubmit={() => {
        form.handleSubmit();
      }}
    >
      <form.AppField
        name="formName"
        validators={
          {
            // onSubmit: () => ({ path: "test", message: "testing errors" }),
          }
        }
        children={(field) => (
          <FieldLayout>
            <field.FieldLabel>Form name*</field.FieldLabel>
            <field.FieldDescription>
              Enter the name of the form
            </field.FieldDescription>
            {/* Need to register this component for proper typing/autocomplete but this still
            works as is because of React Context  */}
            <Input
              aria-describedby={`${field.name}-description ${field.name}-errors`}
              aria-required
            />
            <field.FieldErrors />
          </FieldLayout>
        )}
      />
      <form.AppField
        name="formDescription"
        children={(field) => (
          <Field label="Form description*">
            {/* TODO: This should be bound but I already have another one there lol */}
            <Textarea aria-describedby={`${field.name}-errors`} aria-required />
          </Field>
        )}
      />

      <div className="flex gap-2">
        <Button type="submit">
          Submit and Continue <MoveRight />
        </Button>
      </div>
    </FormLayout>
  );
};
