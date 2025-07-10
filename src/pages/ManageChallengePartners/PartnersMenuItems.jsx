import { useToast } from "src/hooks/use-toast";
import { usePartnersData } from "./PartnersContext";
import { IoAdd, IoSaveOutline } from "react-icons/io5";

const useMenuItems = () => {
  const { toast } = useToast();
  const { addNewItem } = usePartnersData();
  const menuItems = [
    {
      icon: <IoAdd className="text-xl" />,
      key: "add-partner",
      label: "Add Partner",
      onClick: () => {
        addNewItem();
        setTimeout(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }, 300);
      },
      color: "white",
    },

    {
      icon: <IoSaveOutline className="text-xl" />,
      key: "save",
      label: "Save",
      onClick: () => {
        toast({
          title: "Partners Tab updated!",
          description: (
            <pre>
              <b className="text-sm">
              Partners Tab is updated and saved successfully
              </b>
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
