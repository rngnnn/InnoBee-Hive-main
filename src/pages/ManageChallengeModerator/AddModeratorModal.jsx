import { useState } from "react";
import { useModeratorsData } from "./ModeratorsContext";

const AddModeratorModal = ({ isOpen, onClose }) => {
  const { setModeratorsData } = useModeratorsData();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async (query) => {
    console.log("Fetching users with query:", query);
    const users = [
      { id: "user-1", username: "john.doe", profilePictureUrl: "https://via.placeholder.com/50/FF0000", firstName: "John", lastName: "Doe" },
      { id: "user-2", username: "jane.smith", profilePictureUrl: "https://via.placeholder.com/50/00FF00", firstName: "Jane", lastName: "Smith" },
      { id: "user-3", username: "peter.jones", profilePictureUrl: "https://via.placeholder.com/50/0000FF", firstName: "Peter", lastName: "Jones" },
      { id: "user-4", username: "new.moderator", profilePictureUrl: null, firstName: "New", lastName: "Moderator" },
    ];
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.firstName.toLowerCase().includes(query.toLowerCase()) ||
      user.lastName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredUsers);
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      fetchUsers(query);
    } else {
      setSearchResults([]);
      setSelectedUser(null);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleAddModerator = () => {
    if (selectedUser) {
      const newModerator = {
        uuid: crypto.randomUUID(),
        username: selectedUser.username,
        profilePictureUrl: selectedUser.profilePictureUrl,
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        accessPermission: "view", // Default permission
      };
      setModeratorsData((prev) => [...prev, newModerator]);
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-brown bg-opacity-50 flex justify-center items-center z-max">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Add New Moderator</h2>
        <div className="mb-4">
          <label htmlFor="search-user" className="block text-sm font-bold mb-2">
            Search User:
          </label>
          <input
            type="text"
            id="search-user"
            className="bg-gray-100 w-full px-4 py-2 rounded-lg outline-none focus:border-pri-color border-1"
            placeholder="Enter username or name"
            value={searchQuery}
            onChange={handleSearchInputChange}
            style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px', width: '100%', outline: 'none' }}
          />
          {searchResults.length > 0 && (
            <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg">
              {searchResults.map((user) => (
                <li
                  key={user.id}
                  className={`p-2 cursor-pointer hover:bg-gray-200 ${selectedUser?.id === user.id ? 'bg-pri-color-light text-white' : ''}`}
                  onClick={() => handleSelectUser(user)}
                >
                  <div className="flex items-center gap-2">
                    {user.profilePictureUrl ? (
                      <img
                        src={user.profilePictureUrl}
                        alt={user.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span>{user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}</span>
                      </div>
                    )}
                    <span>{user.username || `${user.firstName} ${user.lastName}`}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {searchQuery.length > 2 && searchResults.length === 0 && <p className="mt-2 text-sm text-gray-500">No users found.</p>}
        </div>

        {selectedUser && (
          <div className="mb-4 p-4 border border-gray-300 rounded-lg">
            <h6 className="font-bold text-sm">Selected User:</h6>
            <div className="flex items-center gap-2 mt-2">
              {selectedUser.profilePictureUrl ? (
                <img
                  src={selectedUser.profilePictureUrl}
                  alt={selectedUser.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <span>{selectedUser.firstName?.[0]?.toUpperCase()}{selectedUser.lastName?.[0]?.toUpperCase()}</span>
                </div>
              )}
              <span>{selectedUser.username || `${selectedUser.firstName} ${selectedUser.lastName}`}</span>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-white hover:bg-gray-300 text-brown font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            onClick={handleAddModerator}
            disabled={!selectedUser}
            className={`bg-brown hover:bg-pri-color-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!selectedUser ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Add Moderator
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModeratorModal;