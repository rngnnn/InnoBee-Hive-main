import { createContext, useContext, useState } from "react";

export const PartnersContext = createContext(undefined);

export const PartnersProvider = ({ children }) => {
  const [partnersData, setPartnersData] = useState([]);

  const addNewItem = () => {
    const newItem = {
      uuid: crypto.randomUUID(),
      name: `Partner ${partnersData.length + 1}`,
      title: "Title",
      maxScore: "Max score",
      description: "Description",
    };

    setPartnersData((prev) => [...prev, newItem]);
  };

  return (
    <PartnersContext.Provider
      value={{
        partnersData,
        setPartnersData,
        addNewItem,
      }}
    >
      {children}
    </PartnersContext.Provider>
  );
};

export const usePartnersData = () => {
  const context = useContext(PartnersContext);
  if (!context) {
    throw new Error(
      "PartnersData must be used within a PartnersProvider"
    );
  }
  return context;
};
