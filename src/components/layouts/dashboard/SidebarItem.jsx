import { AnimatePresence, motion } from "framer-motion";
import { GoClock } from "react-icons/go";
import GoldenBadge from "src/components/branding/GoldenBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "src/components/ui/tooltip";
import { twMerge } from "tailwind-merge";
import { useContext } from "react";
import { SideBarContext } from "../../../context/SideBarState";



const SidebarItem = ({
  icon,
  title,
  isActive,
  titleAnimate,
  px,
  className,
  comingSoon,
}) => {
  const isDisabled = (function () {
    if (comingSoon) return true;
    // TODO: add more cases
    return false;
  })();

  const { isSideBarActive } = useContext(SideBarContext);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={twMerge(
        `flex items-center gap-x-4 text-gray-700  py-3 whitespace-nowrap h-12 hover:bg-slate-100 w-full ${
          px === 2 ? "px-4" : "px-6"
        } ${title === "Settings" && "border-gray-300 border-y-1"}`,
        !isActive && "justify-center",
        comingSoon && !isActive && "hidden",
        isDisabled && "hover:bg-transparent",
        className
      )}
    >
      <span
        className={twMerge(
          "text-xl",
          !isSideBarActive && "flex-1",
          isDisabled && "opacity-25 select-none pointer-events-none"
        )}
      >
        {icon}
      </span>
      {isActive && (
        <AnimatePresence>
          <motion.span
            variants={titleAnimate}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={twMerge(
              "font-semibold",
              isDisabled && "!opacity-25 select-none pointer-events-none"
            )}
          >
            {title}
          </motion.span>
        </AnimatePresence>
      )}
      {comingSoon && (
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger>
              <GoldenBadge className="ml-auto">
                <GoClock />
              </GoldenBadge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Coming soon...</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </motion.div>
  );
};

export default SidebarItem;
