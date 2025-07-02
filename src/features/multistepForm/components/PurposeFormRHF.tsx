import { FormLayout } from "./FormLayout";
import z from "zod";
import { formBuilderSchema } from "../api/schema";
import { Button } from "@/components/ui/Button";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useFormBuilderStore } from "../stores/Store";
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
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

const purposeSchema = formBuilderSchema.pick({
  formName: true,
  formDescription: true,
});

export const PurposeFormRHF = () => {
  const setData = useFormBuilderStore((state) => state.setData);
  const formName = useFormBuilderStore((state) => state.formName);
  const formDescription = useFormBuilderStore((state) => state.formDescription);
  const navigate = useNavigate();

  const defaultValues: z.infer<typeof purposeSchema> = {
    formName: formName || "",
    formDescription: formDescription || "",
  };

  const onSubmit = (value: z.infer<typeof purposeSchema>) => {
    console.log(value);
    setData(value);
    navigate("/form-builder/rhf/data-source");
  };

  const form = useForm<z.infer<typeof purposeSchema>>({
    resolver: zodResolver(purposeSchema),
    defaultValues: defaultValues,
    criteriaMode: "all",
  });

  return (
    <Form {...form}>
      <FormLayout onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="formName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Form name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormErrors />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="formDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Form name</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormErrors />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit">
            Submit and Continue <MoveRight />
          </Button>
        </div>
      </FormLayout>
    </Form>
  );
};
