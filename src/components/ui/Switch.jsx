import { motion } from "framer-motion";
import { cn } from "../../helpers/utils";

const Switch = ({ size, checked, onClick }) => {
  const spring = {
    type: "spring",
    stiffness: 400,
    damping: 30,
  };

  return (
    <div
      className={cn(
        "w-16 h-7 px-[1px] rounded-full flex-center cursor-pointer transition-all duration-500",
        {
          "w-10 h-5": size === "small",
          "bg-pri-color justify-end": checked,
          "bg-brown justify-start": !checked,
        }
      )}
      onClick={onClick}
    >
      <motion.div
        layout
        transition={spring}
        className={cn(
          "toggle-button h-6 w-6 rounded-full bg-white shadow-brown",
          {
            "h-4 w-4": size === "small",
          }
        )}
      />
    </div>
  );
};

export default Switch;
