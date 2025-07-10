import React, { useState } from 'react';
import DashboardHeader from "src/components/bee-interface/DashboardHeader";
import useMenuItems from "./JudgesMenuItems";
import JudgesCard from "./JudgesCard";
import { useJudgesData } from "./JudgesContext";
import { Reorder } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import AddJudgeModal from "./AddJudgeModal";
import InviteJudgeModal from "./InviteJudgeModal";
import JudgesModal from "./JudgesModal";

const ManageChallengeJudges = () => {
  const {
    menuItems,
    isAddJudgeModalOpen,
    setIsAddJudgeModalOpen,
    isInviteByEmailModalOpen,
    setIsInviteByEmailModalOpen,
    isManageInvitationsModalOpen,
    setIsManageInvitationsModalOpen,
  } = useMenuItems();
  const { judgesData, setJudgesData, invitations, updateInvitationStatus } = useJudgesData();
  const [usernameToAdd, setUsernameToAdd] = useState("");
  const [emailsToInvite, setEmailsToInvite] = useState("");

  const handleAddJudgeFromModal = (newJudge) => {
    console.log("Adding judge:", newJudge);
    // The new judge object now contains the invitation message
    setIsAddJudgeModalOpen(false);
  };

  const handleInviteByEmailFromModal = (emails, message) => {
    // Implement your logic to handle the invited email addresses and the message here
    console.log("Inviting emails:", emails, "with message:", message);
    setIsInviteByEmailModalOpen(false);
  };

  return (
    <div>
        <DashboardHeader title="Manage Challenge" menuItems={menuItems} />
      <br />

      <h6 className="font-bold text-lg mt-2">Judges</h6>
      
      <p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
        Use "Add Judge" to add a registered InnoBee user as a judge on your challenge,
        or you can use the "Invite by email" button to invite someone to be a judge.

      </p>

      <Reorder.Group
        axis="y"
        values={judgesData}
        onReorder={setJudgesData}
        className="flex flex-col w-full gap-4"
      >
        <AnimatePresence>
          {judgesData.map((item) => (
            <Reorder.Item
              key={item.uuid}
              value={item}
              initial={{ opacity: 0, x: -500 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 500 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <JudgesCard key={item.uuid} item={item} />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>

      <AddJudgeModal
        isOpen={isAddJudgeModalOpen}
        onClose={() => setIsAddJudgeModalOpen(false)}
        onAdd={handleAddJudgeFromModal} // Now passes the new judge object
      />

      <InviteJudgeModal
        isOpen={isInviteByEmailModalOpen}
        onClose={() => setIsInviteByEmailModalOpen(false)}
        onInvite={handleInviteByEmailFromModal} // Now receives emails and message
      />

      <JudgesModal
        open={isManageInvitationsModalOpen}
        onClose={() => setIsManageInvitationsModalOpen(false)}
        title="Manage Invitations"
      >
        {invitations.length === 0 ? (
          <p>No invitations sent yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {invitations.map((invitation) => (
              <li key={invitation.uuid} className="py-3">
                <div className="flex justify-between items-center">
                  <p>{invitation.email}</p>
                  <div className="flex gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${
                      invitation.status === "sent" ? "gray-100 text-gray-800" :
                      invitation.status === "accepted" ? "green-100 text-green-800" :
                      "red-100 text-red-800"
                    }`}>
                      {invitation.status.charAt(0).toUpperCase() + invitation.status.slice(1)}
                    </span>
                    {invitation.status === "sent" && (
                      <>
                        <button
                          onClick={() => updateInvitationStatus(invitation.uuid, "accepted")}
                          className="text-green-500 hover:text-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateInvitationStatus(invitation.uuid, "declined")}
                          className="text-red-500 hover:text-red-700"
                        >
                          Decline
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-gray-500 text-xs">Sent on: {new Date(invitation.sentAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </JudgesModal>
      <br /> {/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
      <br /> {/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
    </div>
  );
};

export default ManageChallengeJudges;