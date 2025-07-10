import { createContext, useContext, useState } from "react";

export const JudgingCriteriaContext = createContext(undefined);

export const JudgingCriteriaProvider = ({ children }) => {
  const [criteriaData, setCriteriaData] = useState([]);

  const addNewItem = () => {
    const newItem = {
      uuid: crypto.randomUUID(),
      name: `Criteria ${criteriaData.length + 1}`,
      title: "Title",
      maxScore: "Max score",
      description: "Description",
      criteriaWeight: { id: criteriaData.length + 1, weight: "" },
    };

    setCriteriaData((prev) => [...prev, newItem]);
  };

  const updateWeight = (id, weight) => {
    setCriteriaData((prev) =>
      prev.map((item) =>
        item.criteriaWeight.id === id
          ? {
              ...item,
              criteriaWeight: {
                ...item.criteriaWeight,
                weight: weight === "" ? "" : Number(weight),
              },
            }
          : item
      )
    );
  };

  const totalWeight = criteriaData.reduce(
    (sum, item) =>
      sum +
      (item.criteriaWeight.weight === "" ? 0 : item.criteriaWeight.weight),
    0
  );

  return (
    <JudgingCriteriaContext.Provider
      value={{
        criteriaData,
        setCriteriaData,
        addNewItem,
        updateWeight,
        totalWeight,
      }}
    >
      {children}
    </JudgingCriteriaContext.Provider>
  );
};

export const useJudgingCriteriaData = () => {
  const context = useContext(JudgingCriteriaContext);
  if (!context) {
    throw new Error(
      "JudgingCriteriaData must be used within a JudgingCriteriaProvider"
    );
  }
  return context;
};
