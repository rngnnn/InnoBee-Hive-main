import { createContext, useContext, useState, ReactNode } from "react";

// Define the FAQ item structure
interface Faq {
  id: number;
  question: string;
  answer: string;
}

// Define the FAQ context type
interface FaqContextType {
  faqs: Faq[];
  addFaq: () => void;
  updateFaq: (id: number, field: "question" | "answer", value: string) => void;
  deleteFaq: (id: number) => void;
}

// Create the context
const FaqContext = createContext<FaqContextType | undefined>(undefined);

// ✅ Provider Component
export const FaqProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [faqs, setFaqs] = useState<Faq[]>([
    {
      id: 1,
      question: "What is an FAQ?",
      answer: "Chances are someone else might have the same question as you.",
    },
  ]);

  // Function to add a new FAQ
  const addFaq = () => {
    setFaqs((prevFaqs) => [
      ...prevFaqs,
      { id: Date.now(), question: "", answer: "" },
    ]);
  };

  // Function to update an FAQ's question or answer
  const updateFaq = (id: number, field: "question" | "answer", value: string) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq))
    );
  };

  // Function to delete an FAQ
  const deleteFaq = (id: number) => {
    setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== id));
  };

  return (
    <FaqContext.Provider value={{ faqs, addFaq, updateFaq, deleteFaq }}>
      {children}
    </FaqContext.Provider>
  );
};

// ✅ Custom hook for using the FAQ context
export const useFaqs = () => {
  const context = useContext(FaqContext);
  if (!context) {
    throw new Error("useFaqs must be used within a FaqProvider");
  }
  return context;
};
