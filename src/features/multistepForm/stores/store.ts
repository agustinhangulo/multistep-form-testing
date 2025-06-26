import { create } from "zustand";
import type { FormBuilderSchema } from "../api/schema";

type FormBuilderState = Partial<FormBuilderSchema> & {
  setData: (data: Partial<FormBuilderSchema>) => void;
};

export const useFormBuilderStore = create<FormBuilderState>((set) => ({
  setData: (data) => set(data),
}));
