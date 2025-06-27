import { createStore, useStore, type StoreApi } from "zustand";
import type { FormBuilderSchema } from "../api/schema";
import { createContext, useContext, useState, type ReactNode } from "react";

export type FormBuilderState = Partial<FormBuilderSchema> & {
  setData: (data: Partial<FormBuilderSchema>) => void;
};

// I'm using a context to prevent this from being a completely global store
// This store should only really be used for the form builder, so saving its state beyond that
// isn't necessary. In other words, this store only exists when this context is mounted.
const FormBuilderStoreContext = createContext<
  StoreApi<FormBuilderState> | undefined
>(undefined);

type FormBuilderStoreProviderProps = {
  children: ReactNode;
};

export const FormBuilderStoreProvider = ({
  children,
}: FormBuilderStoreProviderProps) => {
  const [store] = useState(() =>
    createStore<FormBuilderState>((set) => ({
      setData: (data) => set(data),
    })),
  );

  return (
    <FormBuilderStoreContext.Provider value={store}>
      {children}
    </FormBuilderStoreContext.Provider>
  );
};

// Get access to the usual store hooks
export const useFormBuilderStore = <T,>(
  selector: (state: FormBuilderState) => T,
) => {
  const store = useContext(FormBuilderStoreContext);
  if (!store) {
    throw new Error("Missing FormBuilderProvider");
  }

  return useStore(store, selector);
};

// Get direct access to the store for things like store.getState()
export const useFormBuilderStoreApi = () => {
  const store = useContext(FormBuilderStoreContext);
  if (!store) {
    throw new Error("Missing FormBuilderProvider");
  }
  return store;
};
