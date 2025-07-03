import { FormLayout } from "./FormLayout";
import { useAppForm } from "@/lib/formContext";
import z from "zod";
import { formBuilderSchema } from "../api/schema";
import { Button, buttonVariants } from "@/components/ui/Button";
import { MoveRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Link, useNavigate } from "react-router";
import { useFormBuilderStore } from "../stores/Store";
import { useEffect } from "react";
import { Field } from "@/components/ui/FormV2";

const dataSourceSchema = formBuilderSchema.pick({
  airtableBase: true,
  targetTable: true,
});

export const DataSourceFormV2 = () => {
  const setData = useFormBuilderStore((state) => state.setData);
  const formName = useFormBuilderStore((state) => state.formName);
  const formDescription = useFormBuilderStore((state) => state.formDescription);
  const airtableBase = useFormBuilderStore((state) => state.airtableBase);
  const targetTable = useFormBuilderStore((state) => state.targetTable);
  const navigate = useNavigate();

  const defaultValues: z.infer<typeof dataSourceSchema> = {
    airtableBase: airtableBase || "",
    targetTable: targetTable || "",
  };

  const form = useAppForm({
    defaultValues: defaultValues,
    onSubmit: ({ value }) => {
      console.log(value);
      setData(value);
      navigate("/form-builder/v2/field-selection");
    },
    validators: {
      onSubmit: dataSourceSchema,
    },
  });

  useEffect(() => {
    if (formName === undefined || formDescription === undefined) {
      // Might be helpful to display something as we renavigate
      navigate("/form-builder/v2/purpose");
    }
  }, [formName, formDescription, navigate]);

  return (
    <FormLayout
      onSubmit={() => {
        form.handleSubmit();
      }}
    >
      <form.AppField
        name="airtableBase"
        children={(field) => (
          // In real examples, Select and SelectTrigger should be prebound
          <Field label="Airtable Base*">
            <Select
              onValueChange={(value) => field.handleChange(value)}
              value={field.state.value}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={!field.state.meta.isValid}
                aria-describedby={`${field.name}-errors`}
                aria-required
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="master">Master</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="football">Football</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )}
      />
      <form.AppField
        name="targetTable"
        children={(field) => (
          // In real examples, Select and SelectTrigger should be prebound
          <Field label="Target Table*">
            <Select
              onValueChange={(value) => field.handleChange(value)}
              value={field.state.value}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={!field.state.meta.isValid}
                aria-describedby={`${field.name}-errors`}
                aria-required
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="attendance">Attendance tracking</SelectItem>
                <SelectItem value="performance">
                  Performance tracking
                </SelectItem>
                <SelectItem value="example">Example</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )}
      />

      <div className="flex gap-2">
        <Link
          to="/form-builder/v2/purpose"
          className={buttonVariants({ variant: "outline" })}
        >
          Back
        </Link>
        <Button type="submit">
          Submit and Continue <MoveRight />
        </Button>
      </div>
    </FormLayout>
  );
};
