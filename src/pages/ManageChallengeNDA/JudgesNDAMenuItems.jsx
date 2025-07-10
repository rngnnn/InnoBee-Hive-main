import { IoEyeOutline, IoReloadOutline, IoSaveOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const JudgesNDAMenuItems = ({ onReGenerate, onPreviewModalOpen, onSave }) => {
  const navigate = useNavigate();

  return [
    {
      icon: <IoReloadOutline className="w-5 h-5 mr-1" />,
      key: "re-generate",
      label: "Re-Generate Agreement",
      color: "brown",
      onClick: onReGenerate,
    },
    {
      icon: <IoEyeOutline className="w-5 h-5 mr-1" />,
      key: "preview",
      label: "Preview NDA",
      color: "default",
      onClick: onPreviewModalOpen,
    },
    {
      icon: <IoSaveOutline className="w-5 h-5 mr-1" />,
      key: "save",
      label: "Save",
      color: "yellow",
      onClick: onSave,
    },
  ];
};

export default JudgesNDAMenuItems;