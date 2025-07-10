import { createContext, useContext, useState } from "react";

export const JudgesContext = createContext(undefined);

export const JudgesProvider = ({ children }) => {
  const [judgesData, setJudgesData] = useState([]);
  const [invitations, setInvitations] = useState([]); // State to manage invitations

  const addNewJudge = (judge) => {
    setJudgesData((prev) => [...prev, { ...judge, uuid: crypto.randomUUID() }]);
  };

  const inviteJudge = (email) => {
    // In a real application, you would send an invitation to this email.
    const newInvitation = {
      uuid: crypto.randomUUID(),
      email,
      status: "sent", // Possible statuses: sent, accepted, declined
      sentAt: new Date().toISOString(),
    };
    setInvitations((prev) => [...prev, newInvitation]);
    console.log(`Invitation sent to: ${email}`); // Placeholder for actual email sending
  };

  const updateInvitationStatus = (invitationId, status) => {
    setInvitations((prev) =>
      prev.map((invitation) =>
        invitation.uuid === invitationId ? { ...invitation, status } : invitation
      )
    );
  };

  return (
    <JudgesContext.Provider
      value={{
        judgesData,
        setJudgesData,
        addNewJudge,
        invitations,
        inviteJudge,
        updateInvitationStatus,
      }}
    >
      {children}
    </JudgesContext.Provider>
  );
};

export const useJudgesData = () => {
  const context = useContext(JudgesContext);
  if (!context) {
    throw new Error(
      "JudgesData must be used within a JudgesProvider"
    );
  }
  return context;
};