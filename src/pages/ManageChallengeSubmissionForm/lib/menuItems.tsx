import { DashboardHeaderMenuItem } from "../../../components/bee-interface/DashboardHeader";
import { IoAdd, IoEyeOutline, IoSaveOutline } from "react-icons/io5";
import { useFormData } from "../context/formdata";
import { useToast } from "src/hooks/use-toast";

const useMenuItems = () => {
  const { addNewItem } = useFormData();
  const { toast } = useToast();
  const menuItems: DashboardHeaderMenuItem[] = [
    {
      icon: <IoAdd className="text-xl" />,
      key: "add-new-form",
      label: "Add New Field to Form",
      onClick: () => {
        addNewItem();
        setTimeout(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }, 300);
      },
      color: "brown",
    },

    {
      icon: <IoEyeOutline className="text-xl" />,
      key: "prview-form",
      label: "Preview Form",
      onClick: () => {
        // TODO: implement re-generate
      },
      color: "default",
    },
    {
      icon: <IoSaveOutline className="text-xl" />,
      key: "save-form",
      label: "Save Form",
      onClick: () => {
        toast({
          title: "Form updated!",
          description: (
            <pre>
              <b className="text-sm">Form is updated and saved successfully</b>
            </pre>
          ),
          duration: 1500,
        });
      },
      color: "yellow",
    },
  ];
  return menuItems;
};

export default useMenuItems;
