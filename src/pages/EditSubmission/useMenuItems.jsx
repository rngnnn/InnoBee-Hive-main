import { AiOutlineSave } from "react-icons/ai";
import { IoEyeOutline, IoPaperPlaneOutline } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import { useToast } from "src/hooks/use-toast";

const useMenuItems = () => {
  const { toast } = useToast();
  const menuItems = [
    {
      icon: <IoPaperPlaneOutline className="text-xl" />,
      key: "submit-solution",
      label: "Submit Solution",
      onClick: () => {
        // TODO: implement submit-solution
      },
      color: "brown",
    },

    {
      icon: <IoEyeOutline className="text-xl" />,
      key: "prview-submssion",
      label: "Preview Submission",
      onClick: () => {
        // TODO: implement prview-submssion
      },
      color: "default",
    },
    {
      icon: <LuDownload className="text-xl" />,
      key: "export",
      label: "Export",
      onClick: () => {
        // TODO: implement export
      },
      color: "default",
    },
    {
      icon: <AiOutlineSave className="text-xl" />,
      key: "update-form",
      label: "Update Form",
      onClick: () => {
        // TODO: implement update form
      },
      color: "yellow",
    },
  ];
  return menuItems;
};

export default useMenuItems;
