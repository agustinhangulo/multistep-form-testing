import { FormLayout } from "./FormLayout";
import { useAppForm } from "@/lib/formContext";
import { formOptions } from "@tanstack/react-form";
import z, { type ZodIssue } from "zod";
import { formBuilderSchema } from "../api/schema";
import { Button } from "@/components/ui/Button";
import { MoveRight } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { FieldError } from "@/components/form/Field";
import { useFormBuilderStore } from "../stores/store";

const fieldSelectionSchema = formBuilderSchema.pick({
  fieldSelection: true,
});

const defaultFieldSelection: z.infer<typeof fieldSelectionSchema> = {
  fieldSelection: [],
};

const formOpts = formOptions({
  defaultValues: defaultFieldSelection,
});

const options = [
  { id: "123", name: "field1" },
  { id: "456", name: "field2" },
  { id: "789", name: "field3" },
];

export const FieldSelectionForm = () => {
  const setData = useFormBuilderStore((state) => state.setData);

  const form = useAppForm({
    ...formOpts,
    onSubmit: ({ value }) => {
      console.log(value);
      setData(value);
      console.log(useFormBuilderStore.getState());
    },
    validators: {
      onSubmit: fieldSelectionSchema,
    },
  });

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
                <p>{option.name}</p>
              </div>
            ))}
            <FieldError
              errors={field.state.meta.errors as ZodIssue[] | undefined}
            />
          </>
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
