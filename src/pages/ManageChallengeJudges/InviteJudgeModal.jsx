import React, { useState } from "react";
import { useToast } from "src/hooks/use-toast"; // Import useToast

const InviteJudgeModal = ({ isOpen, onClose, onInvite }) => {
  const { toast } = useToast(); // Use the hook
  const [emails, setEmails] = useState("");
  const [message, setMessage] = useState(
    `Hi! You've been invited to be a judge for our challenge. Your expertise would be invaluable!`
  ); // Default message

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleInviteClick = () => {
    onInvite(emails, message); // Pass the message as well
    onClose();
    setEmails("");
    setMessage(
      `Hi! You've been invited to be a judge for our challenge. Your expertise would be invaluable!`
    ); // Reset message
    toast({
      title: "Invitation Sent!",
      description: (
        <pre>
          <b className="text-sm">
            The invitation has been sent successfully to the provided email
            addresses.
          </b>
        </pre>
      ),
      duration: 1500, // Adjust duration as needed
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-brown bg-opacity-50 flex justify-center items-center z-max">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Invite Judges by Email</h2>
        <div className="mb-4">
          <label
            htmlFor="invite-emails"
            className="block text-sm font-bold mb-2"
          >
            Email Addresses:
          </label>
          <textarea
            id="invite-emails"
            className="bg-gray-100 w-full px-4 py-2 rounded-lg outline-none focus:border-pri-color border-1"
            placeholder="Enter email addresses separated by commas"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              borderRadius: "4px",
              width: "100%",
              outline: "none",
              minHeight: "100px",
            }}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="invitation-message"
            className="block text-sm font-bold mb-2"
          >
            Invitation Message:
          </label>
          <textarea
            id="invitation-message"
            className="bg-gray-100 w-full px-4 py-2 rounded-lg outline-none focus:border-pri-color border-1"
            placeholder="Write your personalized message here..."
            value={message}
            onChange={handleMessageChange}
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              borderRadius: "4px",
              width: "100%",
              outline: "none",
              minHeight: "80px",
            }}
          />
          <p className="text-xs text-gray-500 mt-1">
            You can customize this message for the invited judges.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-white hover:bg-gray-300 text-brown font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            onClick={handleInviteClick}
            disabled={!emails.trim()}
            className={`bg-brown hover:bg-pri-color-dark text-white hover:bg-pri-color font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              !emails.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteJudgeModal;
