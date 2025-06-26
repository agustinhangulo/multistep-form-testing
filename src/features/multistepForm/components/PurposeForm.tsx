import { FormLayout } from "./FormLayout";
import { useAppForm } from "@/lib/formContext";
import { formOptions } from "@tanstack/react-form";
import z from "zod";
import { formBuilderSchema } from "../api/schema";
import { Button } from "@/components/ui/Button";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useFormBuilderStore } from "../stores/store";

const purposeSchema = formBuilderSchema.pick({
  formName: true,
  formDescription: true,
});

const defaultPurpose: z.infer<typeof purposeSchema> = {
  formName: "",
  formDescription: "",
};

const formOpts = formOptions({
  defaultValues: defaultPurpose,
});

export const PurposeForm = () => {
  const setData = useFormBuilderStore((state) => state.setData);
  const navigate = useNavigate();
  const form = useAppForm({
    ...formOpts,
    onSubmit: ({ value }) => {
      console.log(value);
      setData(value);
      navigate("/form-builder/data-source");
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
        children={(field) => <field.Input label="Form name" required />}
      />
      <form.AppField
        name="formDescription"
        children={(field) => (
          <field.Textarea label="Form description" required />
        )}
      />

      <div className="flex gap-2">
        <Button variant="outline">Back</Button>
        <Button type="submit">
          Next <MoveRight />
        </Button>
      </div>
    </FormLayout>
  );
};
