// import { MdOutlineAddLocation } from "react-icons/md";
// import { VscRefresh } from "react-icons/vsc";
import { IoEyeOutline, IoSaveOutline } from "react-icons/io5";

export const useMenuItems = () => [

  {
    icon: <IoEyeOutline className="text-xl" />,
    key: "view-challenge",
    label: "View Challenge",
    color: "default", // ✅ "default" instead of a generic string
    onClick: () => {},
  },
  {
    icon: <IoSaveOutline className="text-xl" />,
    key: "save",
    label: "Save",
    color: "yellow", // ✅ Ensuring correct type
    onClick: () => {},
  },
];
