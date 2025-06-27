import { FormLayout } from "./FormLayout";
import { useAppForm } from "@/lib/formContext";
import z, { type ZodIssue } from "zod";
import { formBuilderSchema } from "../api/schema";
import { Button, buttonVariants } from "@/components/ui/Button";
import { MoveRight } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { FieldError } from "@/components/form/Field";
import { useFormBuilderStore, useFormBuilderStoreApi } from "../stores/Store";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

const fieldSelectionSchema = formBuilderSchema.pick({
  fieldSelection: true,
});

const options = [
  { id: "123", name: "Record ID" },
  { id: "456", name: "Name" },
  { id: "789", name: "Grade" },
];

export const FieldSelectionForm = () => {
  const setData = useFormBuilderStore((state) => state.setData);
  const store = useFormBuilderStoreApi();
  const formName = useFormBuilderStore((state) => state.formName);
  const formDescription = useFormBuilderStore((state) => state.formDescription);
  const airtableBase = useFormBuilderStore((state) => state.airtableBase);
  const targetTable = useFormBuilderStore((state) => state.targetTable);
  const fieldSelection = useFormBuilderStore((state) => state.fieldSelection);
  const navigate = useNavigate();

  const defaultValues: z.infer<typeof fieldSelectionSchema> = {
    fieldSelection: fieldSelection || [],
  };

  const form = useAppForm({
    defaultValues: defaultValues,
    onSubmit: ({ value }) => {
      console.log(value);
      setData(value);
      console.log(store.getState());
    },
    validators: {
      onSubmit: fieldSelectionSchema,
    },
  });

  useEffect(() => {
    if (
      formName === undefined ||
      formDescription === undefined ||
      airtableBase === undefined ||
      targetTable === undefined
    ) {
      // Might be helpful to display something as we renavigate
      navigate("/form-builder/purpose");
    }
  }, [formName, formDescription, airtableBase, targetTable, navigate]);

  return (
    <FormLayout
      onSubmit={() => {
        form.handleSubmit();
      }}
    >
      <form.Field
        name="fieldSelection"
        mode="array"
        children={(field) => (
          <>
            {options.map((option) => (
              <div className="flex items-center gap-2" key={option.id}>
                <Checkbox
                  checked={field.state.value.includes(option)}
                  onCheckedChange={() => {
                    if (field.state.value.includes(option)) {
                      const newState = field.state.value.filter(
                        (selected) => selected != option,
                      );
                      field.handleChange(newState);
                    } else {
                      field.handleChange([...field.state.value, option]);
                    }
                  }}
                />
                <p className="text-sm">{option.name}</p>
              </div>
            ))}
            <FieldError
              errors={field.state.meta.errors as ZodIssue[] | undefined}
            />
          </>
        )}
      />

      <div className="flex gap-2">
        <Link
          to="/form-builder/data-source"
          className={buttonVariants({ variant: "outline" })}
        >
          Back
        </Link>
        <Button type="submit">
          Submit Form <MoveRight />
        </Button>
      </div>
    </FormLayout>
  );
};
