import { FormLayout } from "./FormLayout";
import { useAppForm } from "@/lib/formContext";
import { formOptions } from "@tanstack/react-form";
import z from "zod";
import { formBuilderSchema } from "../api/schema";
import { Button } from "@/components/ui/Button";
import { MoveRight } from "lucide-react";
import { SelectItem } from "@/components/ui/Select";
import { useNavigate } from "react-router";
import { useFormBuilderStore } from "../stores/store";

const dataSourceSchema = formBuilderSchema.pick({
  airtableBase: true,
  targetTable: true,
});

const defaultDataSource: z.infer<typeof dataSourceSchema> = {
  airtableBase: "",
  targetTable: "",
};

const formOpts = formOptions({
  defaultValues: defaultDataSource,
});

export const DataSourceForm = () => {
  const setData = useFormBuilderStore((state) => state.setData);

  const navigate = useNavigate();
  const form = useAppForm({
    ...formOpts,
    onSubmit: ({ value }) => {
      console.log(value);
      setData(value);
      navigate("/form-builder/field-selection");
    },
    validators: {
      onSubmit: dataSourceSchema,
    },
  });

  return (
    <FormLayout
      onSubmit={() => {
        form.handleSubmit();
      }}
    >
      <form.AppField
        name="airtableBase"
        children={(field) => (
          <field.Select label="Airtable Base" required>
            <SelectItem value="master">Master</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="football">Football</SelectItem>
          </field.Select>
        )}
      />
      <form.AppField
        name="targetTable"
        children={(field) => (
          <field.Select label="Target Table" required>
            <SelectItem value="attendance">Attendance tracking</SelectItem>
            <SelectItem value="performance">Performance tracking</SelectItem>
            <SelectItem value="example">Example</SelectItem>
          </field.Select>
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
