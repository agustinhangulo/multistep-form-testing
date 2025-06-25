import { z } from "zod";

export const formBuilderSchema = z.object({
  formName: z.string().min(1, "Form name is required."),
  formDescription: z.string().min(1, "Form description is required."),
  airtableBase: z.string().min(1, "Airtable Base is required."),
  targetTable: z.string().min(1, "Target Table is required."),
  fieldSelection: z
    .array(z.unknown())
    .min(1, "At least one field must be selected."), // Unknown in this example, but this will be some field logic in the future
});

// TODO:
// Some fields are only available after fetching
// from the database (field selection, configuration, search builder)
// How do we handle them?

export type FormBuilderSchema = z.infer<typeof formBuilderSchema>;
