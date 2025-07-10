import { useToast } from "src/hooks/use-toast";
import { useJudgingCriteriaData } from "./JudgingCriteriaContext";
import { IoAdd, IoSaveOutline } from "react-icons/io5";

const useMenuItems = () => {
  const { toast } = useToast();
  const { addNewItem } = useJudgingCriteriaData();
  const menuItems = [
    {
      icon: <IoAdd className="text-xl" />,
      key: "add-criterion",
      label: "Add Criterion",
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
          title: "Judging criteria updated!",
          description: (
            <pre>
              <b className="text-sm">
                Judging criteria is updated and saved successfully
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
