import { createContext, useContext, useState } from "react";

export const ModeratorsContext = createContext(undefined);

export const ModeratorsProvider = ({ children }) => {
  const [moderatorsData, setModeratorsData] = useState([]);

  return (
    <ModeratorsContext.Provider
      value={{
        moderatorsData,
        setModeratorsData,
      }}
    >
      {children}
    </ModeratorsContext.Provider>
  );
};

export const useModeratorsData = () => {
  const context = useContext(ModeratorsContext);
  if (!context) {
    throw new Error(
      "ModeratorsData must be used within a ModeratorsProvider"
    );
  }
  return context;
};