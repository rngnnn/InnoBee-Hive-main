import { PiDotsSixBold } from "react-icons/pi";
import { useModeratorsData } from "./ModeratorsContext";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const ModeratorsCard = ({ item }) => {
  const { setModeratorsData } = useModeratorsData();
  const [accessPermission, setAccessPermission] = useState(item?.accessPermission || "view"); // Default to 'view'

  const handleDeleteEvent = () => {
    setModeratorsData((prev) => prev.filter((i) => i.uuid !== item.uuid));
  };

  const handleAccessPermissionChange = (e) => {
    const newValue = e.target.value;
    setAccessPermission(newValue);
    setModeratorsData((prev) =>
      prev.map((i) =>
        i.uuid === item.uuid ? { ...i, accessPermission: newValue } : i
      )
    );
  };

  return (
    <div className="flex w-full gap-4">
      <div className="flex flex-col gap-4 bg-white rounded-lg relative p-6 w-full">
        <div
          className="absolute top-0 left-0 h-full w-2 rounded-lg rounded-r-none bg-linearGradientToBottom shadow-sm"
        />
        <PiDotsSixBold
          className="absolute left-1/2 transform -translate-x-1/2 text-2xl cursor-pointer"
        />
        <div className="flex items-center gap-4">
          {item?.profilePictureUrl ? (
            <img
              src={item.profilePictureUrl}
              alt="Moderator Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              {/* You might want to display an icon or initials here */}
              <span></span>
            </div>
          )}
          <div>
            <h6 className="font-bold text-lg">{item?.username || `${item?.firstName} ${item?.lastName}`}</h6>
            {item?.email && <p className="text-sm text-gray-500">{item.email}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold">Access Permission</label>
          <div className="flex gap-4">
            <div>
              <input
                type="radio"
                id={`full-access-${item.uuid}`}
                name={`access-permission-${item.uuid}`}
                value="full"
                checked={accessPermission === "full"}
                onChange={handleAccessPermissionChange}
              />
              <label htmlFor={`full-access-${item.uuid}`} className="ml-2">
                Full access
              </label>
            </div>
            <div>
              <input
                type="radio"
                id={`view-submissions-${item.uuid}`}
                name={`access-permission-${item.uuid}`}
                value="view"
                checked={accessPermission === "view"}
                onChange={handleAccessPermissionChange}
              />
              <label htmlFor={`view-submissions-${item.uuid}`} className="ml-2">
                View submissions only
              </label>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-white rounded-lg p-4 h-fit text-3xl text-brown cursor-pointer"
        onClick={handleDeleteEvent}
      >
        <FiTrash2 />
      </div>
    </div>
  );
};

export default ModeratorsCard;