import React, { useState } from "react";
import { useJudgesData } from "./JudgesContext";

const AddJudgeModal = ({ isOpen, onClose, onAdd }) => {
  const { setJudgesData } = useJudgesData();
  const [usernamesToAdd, setUsernamesToAdd] = useState("");
  const [message, setMessage] = useState(`Hi! You've been invited to be a judge for our challenge. Your expertise would be invaluable!`); // Default message

  const defaultInvitationMessage = `Hi! You've been invited to be a judge for our challenge. Your expertise would be invaluable!`;

  const fetchUserByUsername = async (username) => {
    console.log("Fetching user with username:", username);
    // Replace this with your actual API call to fetch a single user by username
    const users = [
      { id: "user-1", username: "john.doe", profilePictureUrl: "https://via.placeholder.com/50/FF0000", firstName: "John", lastName: "Doe" },
      { id: "user-2", username: "jane.smith", profilePictureUrl: "https://via.placeholder.com/50/00FF00", firstName: "Jane", lastName: "Smith" },
      { id: "user-3", username: "peter.jones", profilePictureUrl: "https://via.placeholder.com/50/0000FF", firstName: "Peter", lastName: "Jones" },
      { id: "user-4", username: "new.judge", profilePictureUrl: null, firstName: "New", lastName: "Judge" },
    ];
    return users.find(user => user.username.toLowerCase() === username.toLowerCase());
  };

  const handleUsernamesChange = (e) => {
    setUsernamesToAdd(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleAddJudges = async () => {
    if (usernamesToAdd.trim()) {
      const usernamesArray = usernamesToAdd.split(',').map(username => username.trim()).filter(username => username !== "");
      const addedJudges = [];

      for (const username of usernamesArray) {
        const user = await fetchUserByUsername(username);
        if (user) {
          const newJudge = {
            uuid: crypto.randomUUID(),
            username: user.username,
            profilePictureUrl: user.profilePictureUrl,
            firstName: user.firstName,
            lastName: user.lastName,
            invitationMessage: message,
          };
          addedJudges.push(newJudge);
        } else {
          console.log(`User with username "${username}" not found.`);
          // Optionally, you can display an error message to the user
        }
      }

      if (addedJudges.length > 0) {
        setJudgesData((prev) => [...prev, ...addedJudges]);
        onAdd();
        onClose();
        setUsernamesToAdd("");
        setMessage(defaultInvitationMessage);
      } else if (usernamesArray.length > 0) {
        // If no users were found from the provided usernames
        alert("No valid users found with the provided usernames.");
      }
    } else {
      alert("Please enter one or more usernames separated by commas.");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-brown bg-opacity-50 flex justify-center items-center z-max">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Add New Judges</h2>
        <div className="mb-4">
          <label htmlFor="add-usernames" className="block text-sm font-bold mb-2">
            Enter Usernames (comma-separated):
          </label>
          <input
            type="text"
            id="add-usernames"
            className="bg-gray-100 w-full px-4 py-2 rounded-lg outline-none focus:border-pri-color border-1"
            placeholder="e.g., john.doe, jane.smith"
            value={usernamesToAdd}
            onChange={handleUsernamesChange}
            style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px', width: '100%', outline: 'none' }}
          />
          <p className="text-xs text-gray-500 mt-1">Enter one or more usernames separated by commas.</p>
        </div>

        <div className="mb-4">
          <label htmlFor="invitation-message" className="block text-sm font-bold mb-2">
            Invitation Message:
          </label>
          <textarea
            id="invitation-message"
            className="bg-gray-100 w-full px-4 py-2 rounded-lg outline-none focus:border-pri-color border-1"
            placeholder="Write your personalized message here..."
            value={message}
            onChange={handleMessageChange}
            style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px', width: '100%', outline: 'none', minHeight: '80px' }}
          />
          <p className="text-xs text-gray-500 mt-1">You can customize this message for the judges.</p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-white hover:bg-gray-300 text-brown font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            onClick={handleAddJudges}
            disabled={!usernamesToAdd.trim()}
            className={`bg-brown hover:bg-pri-color-dark text-white hover:bg-pri-color font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!usernamesToAdd.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddJudgeModal;