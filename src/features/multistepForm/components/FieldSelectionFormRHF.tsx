import { FormLayout } from "./FormLayout";
import z from "zod";
import { formBuilderSchema } from "../api/schema";
import { Button, buttonVariants } from "@/components/ui/Button";
import { MoveRight } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { useFormBuilderStore, useFormBuilderStoreApi } from "../stores/Store";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormErrors,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/Form";

const fieldSelectionSchema = formBuilderSchema.pick({
  fieldSelection: true,
});

const options = [
  { id: "123", name: "Record ID" },
  { id: "456", name: "Name" },
  { id: "789", name: "Grade" },
];

export const FieldSelectionFormRHF = () => {
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

  const onSubmit = (value: z.infer<typeof fieldSelectionSchema>) => {
    console.log(value);
    setData(value);
    console.log(store.getState());
  };

  const form = useForm<z.infer<typeof fieldSelectionSchema>>({
    resolver: zodResolver(fieldSelectionSchema),
    defaultValues: defaultValues,
    criteriaMode: "all",
  });

  useEffect(() => {
    if (
      formName === undefined ||
      formDescription === undefined ||
      airtableBase === undefined ||
      targetTable === undefined
    ) {
      // Might be helpful to display something as we renavigate
      navigate("/form-builder/rhf/purpose");
    }
  }, [formName, formDescription, airtableBase, targetTable, navigate]);

  return (
    <Form {...form}>
      <FormLayout onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="fieldSelection"
          render={({ field }) => (
            <FormItem>
              {options.map((option) => (
                <FormItem
                  key={option.id}
                  className="flex flex-row items-center gap-2"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value.some(
                        (selected) => selected.id === option.id,
                      )}
                      onCheckedChange={() => {
                        if (
                          field.value.some(
                            (selected) => selected.id === option.id,
                          )
                        ) {
                          const newState = field.value.filter(
                            (selected) => selected.id !== option.id,
                          );
                          field.onChange(newState);
                        } else {
                          field.onChange([...field.value, option]);
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    {option.name}
                  </FormLabel>
                </FormItem>
              ))}
              <FormErrors></FormErrors>
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Link
            to="/form-builder/rhf/data-source"
            className={buttonVariants({ variant: "outline" })}
          >
            Back
          </Link>
          <Button type="submit">
            Submit Form <MoveRight />
          </Button>
        </div>
      </FormLayout>
    </Form>
  );
};
