import { PiDotsSixBold } from "react-icons/pi";
import { useJudgesData } from "./JudgesContext";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const JudgesCard = ({ item }) => {
  const { setJudgesData } = useJudgesData();
  const [accessPermission, setAccessPermission] = useState(item?.accessPermission || "view");

  const handleDeleteEvent = () => {
    setJudgesData((prev) => prev.filter((i) => i.uuid !== item.uuid));
  };

  const handleAccessChange = (e) => {
    const newPermission = e.target.value;
    setAccessPermission(newPermission);
    setJudgesData((prev) =>
      prev.map((i) =>
        i.uuid === item.uuid ? { ...i, accessPermission: newPermission } : i
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
          <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
            {item?.profilePicture ? (
              <img src={item.profilePicture} alt="Judge Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                {item?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h6 className="font-bold text-lg">{item?.name || "N/A"}</h6>
            <p className="text-gray-500 text-sm">{item?.username || "N/A"}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-bold">Access Permission</p>
          <div className="flex items-center gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`access-${item?.uuid}`}
                value="full"
                checked={accessPermission === "full"}
                onChange={handleAccessChange}
              />
              Full access
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`access-${item?.uuid}`}
                value="view"
                checked={accessPermission === "view"}
                onChange={handleAccessChange}
              />
              View submissions only
            </label>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-400 text-xs">
            Accepted NDA: {item?.ndaAcceptedDate || "N/A"}
          </p>
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

export default JudgesCard;