import { useFaqs } from "./FaqProvider";  // Import the context
import { IoAdd, IoSaveOutline } from "react-icons/io5";

export const useMenuItems = () => {
  const { addFaq } = useFaqs();

  return [
    {
      icon: <IoAdd className="text-xl" />,
      key: "add-faq",
      label: "Add FAQ",
      onClick: () => {
        addFaq();
        setTimeout(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }, 300);
      },
      color: "default" as const,
    },
    {
      icon: <IoSaveOutline className="text-xl" />,
      key: "save",
      label: "Save",
      color: "yellow" as const,
      onClick: () => {
        console.log("Update clicked"); // Placeholder for actual functionality
      },
    },
  ];
};
