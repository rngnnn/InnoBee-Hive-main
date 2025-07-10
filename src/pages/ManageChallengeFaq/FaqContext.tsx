import { createContext, useContext, useState, ReactNode } from "react";

interface Faq {
  id: number;
  question: string;
  answer: string;
}

interface FaqContextType {
  faqs: Faq[];
  addFaq: () => void;
  updateFaq: (id: number, field: "question" | "answer", value: string) => void;
  deleteFaq: (id: number) => void;
}

const FaqContext = createContext<FaqContextType | undefined>(undefined);

export const FaqProvider = ({ children }: { children: ReactNode }) => {
  const [faqs, setFaqs] = useState<Faq[]>([
    {
      id: 1,
      question: "What is an FAQ?",
      answer:
        "Chances are someone else might have the same question as you. Look here for answers and ideas.",
    },
  ]);

  const addFaq = () => {
    setFaqs([...faqs, { id: Date.now(), question: "", answer: "" }]);
  };

  const updateFaq = (id: number, field: "question" | "answer", value: string) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq))
    );
  };

  const deleteFaq = (id: number) => {
    setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== id));
  };

  return (
    <FaqContext.Provider value={{ faqs, addFaq, updateFaq, deleteFaq }}>
      {children}
    </FaqContext.Provider>
  );
};

export const useFaqs = () => {
  const context = useContext(FaqContext);
  if (!context) {
    throw new Error("useFaqs must be used within a FaqProvider");
  }
  return context;
};
