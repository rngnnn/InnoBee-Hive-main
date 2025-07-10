import { DataType } from "../lib/types/formdata";
import { createContext, useContext, useState } from "react";

interface FormDataContextType {
  formData: DataType[];
  setFormData: React.Dispatch<React.SetStateAction<DataType[]>>;
  addNewItem: () => void;
}

export const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined
);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<DataType[]>([]);
  const addNewItem = () => {
    const newItem: DataType = {
      uuid: crypto.randomUUID(),
      name: "text_" + crypto.randomUUID().split("-")[0],
      label: "Where did you hear about this challenge?",
      type: "textarea",
      placeholder: "",
      required: true,
    };

    setFormData((prev) => [...prev, newItem]);
  };

  return (
    <FormDataContext.Provider value={{ formData, setFormData, addNewItem }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormProvider");
  }
  return context;
};
