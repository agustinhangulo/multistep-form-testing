import { FormLayout } from "./FormLayout";
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
import {
  Form,
  FormControl,
  FormErrors,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const dataSourceSchema = formBuilderSchema.pick({
  airtableBase: true,
  targetTable: true,
});

export const DataSourceFormRHF = () => {
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

  const onSubmit = (value: z.infer<typeof dataSourceSchema>) => {
    console.log(value);
    setData(value);
    navigate("/form-builder/rhf/field-selection");
  };

  const form = useForm<z.infer<typeof dataSourceSchema>>({
    resolver: zodResolver(dataSourceSchema),
    defaultValues: defaultValues,
    criteriaMode: "all",
  });

  useEffect(() => {
    if (formName === undefined || formDescription === undefined) {
      // Might be helpful to display something as we renavigate
      navigate("/form-builder/rhf/purpose");
    }
  }, [formName, formDescription, navigate]);

  return (
    <Form {...form}>
      <FormLayout onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="airtableBase"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an Airtable Base" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="master">Master</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="football">Football</SelectItem>
                </SelectContent>
              </Select>
              <FormErrors />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetTable"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Table</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an Airtable Base" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="attendance">
                    Attendance tracking
                  </SelectItem>
                  <SelectItem value="performance">
                    Performance tracking
                  </SelectItem>
                  <SelectItem value="example">Example</SelectItem>
                </SelectContent>
              </Select>
              <FormErrors />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Link
            to="/form-builder/rhf/purpose"
            className={buttonVariants({ variant: "outline" })}
          >
            Back
          </Link>
          <Button type="submit">
            Submit and Continue <MoveRight />
          </Button>
        </div>
      </FormLayout>
    </Form>
  );
};
