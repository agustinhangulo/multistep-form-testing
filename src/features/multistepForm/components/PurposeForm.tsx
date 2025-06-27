import { FormLayout } from "./FormLayout";
import { useAppForm } from "@/lib/formContext";
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

export const PurposeForm = () => {
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
        <Button type="submit">
          Submit and Continue <MoveRight />
        </Button>
      </div>
    </FormLayout>
  );
};
