import { useState } from "react";
import { Trash } from "lucide-react";

const challengePermissions = [
  "view:overview",
  "edit:guidelines",
  "edit:timelines",
  "edit:faq",
  "edit:updates",
  "edit:press",
  "view:participants",
  "send:notifications",
  "manage:moderators",
  "edit:submission-form",
  "edit:judging-criteria",
  "manage:judges",
  "edit:nda-for-judges",
  "edit:legal-agreement",
  "manage:partners",
  "view:submissions",
  "view:submission-details",
  "view:judges-scoring",
  "view:judges-activity",
];

const ManageUserRolesModal = ({ isOpen, onClose }) => {
  const [newRole, setNewRole] = useState("");
  const [roles, setRoles] = useState([
    { name: "Full Access", permissions: challengePermissions },
    { name: "Spectator", permissions: ["view:submissions", "view:submission-details", "view:judges-scoring"] },
  ]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [isAddingNewRole, setIsAddingNewRole] = useState(false);

  const handleInputChange = (e) => {
    setNewRole(e.target.value);
  };

  const handlePermissionChange = (permission) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permission));
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const handleAddRoleClick = () => {
    setIsAddingNewRole(true);
    setNewRole("");
    setSelectedPermissions([]);
  };

  const handleSaveNewRole = () => {
    if (newRole && selectedPermissions.length > 0) {
      const newRoleObject = { name: newRole.toLowerCase(), permissions: selectedPermissions };
      setRoles([...roles, newRoleObject]);
      setNewRole("");
      setSelectedPermissions([]);
      setIsAddingNewRole(false);
    }
  };

  const handleDeleteRole = (roleToDelete) => {
    setRoles(roles.filter((role) => role.name !== roleToDelete));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-brown bg-opacity-50 flex justify-center items-center z-max">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Manage User Roles</h2>

        <div className="mb-4">
          {!isAddingNewRole ? (
            <button
              onClick={handleAddRoleClick}
              className="bg-brown hover:bg-pri-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add New Role
            </button>
          ) : (
            <div>
              <label htmlFor="new-role" className="block text-sm font-bold mb-2">
                New Role Name:
              </label>
              <input
                type="text"
                id="new-role"
                className="bg-gray-100 w-full px-4 py-2 rounded-lg outline-none focus:border-pri-color border-1 mb-2"
                placeholder="Enter new role name"
                value={newRole}
                onChange={handleInputChange}
              />
              <h6 className="font-bold text-sm mb-2">Permissions:</h6>
              <div className="grid grid-cols-2 gap-2 mb-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2">
                {challengePermissions.map((permission) => (
                  <label key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      value={permission}
                      checked={selectedPermissions.includes(permission)}
                      onChange={() => handlePermissionChange(permission)}
                    />
                    {permission.replace(":", " ")}
                  </label>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveNewRole}
                  disabled={!newRole || selectedPermissions.length === 0}
                  className={`bg-pri-color hover:bg-pri-color-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${(!newRole || selectedPermissions.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Save Role
                </button>
                <button
                  onClick={() => setIsAddingNewRole(false)}
                  className="bg-white hover:bg-gray-300 text-brown font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <h6 className="font-bold text-sm mb-2">Current Roles:</h6>
          <ul>
            {roles.map((role) => (
              <li key={role.name} className="flex items-center justify-between py-1">
                <span>{role.name}</span>
                <button
                  onClick={() => handleDeleteRole(role.name)}
                  className="text-red-500 hover:text-red-700 focus:outline-none flex items-center gap-1"
                >
                  Delete
                  <Trash className="text-red-500" size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-brown hover:bg-pri-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUserRolesModal;