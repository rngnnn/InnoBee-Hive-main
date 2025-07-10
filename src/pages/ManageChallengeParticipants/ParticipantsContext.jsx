import { createContext, useContext, useState } from "react";

export const ParticipantsContext = createContext(undefined);

export const ParticipantsProvider = ({ children }) => {
  const [participantsData, setParticipantsData] = useState([]);

  return (
    <ParticipantsContext.Provider
      value={{
        participantsData,
        setParticipantsData,
      }}
    >
      {children}
    </ParticipantsContext.Provider>
  );
};

export const useParticipantsData = () => {
  const context = useContext(ParticipantsContext);
  if (!context) {
    throw new Error(
      "ParticipantsData must be used within a ParticipantsProvider"
    );
  }
  return context;
};