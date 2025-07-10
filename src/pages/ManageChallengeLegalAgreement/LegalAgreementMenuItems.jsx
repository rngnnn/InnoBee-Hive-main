import React from "react";
import { FilePenLine } from "lucide-react";
import { IoEyeOutline, IoReloadOutline, IoSaveOutline } from "react-icons/io5";

const LegalAgreementMenuItems = ({
  onReGenerate,
  onIPModalOpen,
  onPreviewModalOpen,
  onSave,
}) => {
  return [
    {
      icon: <IoReloadOutline className="w-5 h-5 mr-1" />,
      key: "re-generate",
      label: "Re-Generate Agreement",
      color: "brown", // Changed color to "brown"
      onClick: onReGenerate,
    },
    {
      icon: <FilePenLine className="w-5 h-5 mr-1" />,
      key: "change-ip",
      label: "Change IP Clause",
      color: "default",
      onClick: onIPModalOpen,
    },
    {
      icon: <IoEyeOutline className="w-5 h-5 mr-1" />,
      key: "preview",
      label: "Preview CSA",
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

export default LegalAgreementMenuItems;