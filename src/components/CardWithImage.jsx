import { Link } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import { fadeIn } from "../anim";
import { IoCalendarClearOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineArrowDropDown, MdOutlineArrowRightAlt } from "react-icons/md";

const CardWithImage = ({
  dropdown,
  showDropDwon,
  currentIndex,
  toggleDropdown,
  data,
  index,
  link,
  linkTitle,
  title,
}) => {
  return (
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      initial="hidden"
      animate="show"
      className="p-2 xl:w-1/3 md:w-1/2 w-full "
      key={index}
    >
      <div className=" shadow rounded-lg bg-white h-full group relative">
        <div className="h-2 w-full bg-gradient-to-r from-yellow-300 to-pri-color rounded" />

        <div className="w-full h-52 relative">
          <img
            src={data.logo}
            alt=""
            className="w-14 h-14 absolute -bottom-4 left-4 rounded-full object-cover"
          />
          <img
            src={data.challengeImg}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col  w-full sm:px-6 sm:py-8 px-3 py-5 rounded-b-lg gap-5">
          <div className="flex-center-between">
            <h4 className="font-semibold text-sm">P&G Innovation Lab</h4>{" "}
            <div className="relative">
              <button
                className="flex-center gap-1"
                onClick={() => toggleDropdown(index)}
              >
                <IoSettingsOutline />
                <AnimatePresence>
                  <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: showDropDwon ? 180 : 0 }}
                    exit={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MdOutlineArrowDropDown />
                  </motion.span>
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {showDropDwon && index === currentIndex && <>{dropdown}</>}
              </AnimatePresence>
            </div>
          </div>
          <p>
            P&G Expiration Date Elongation For Dairy Products Challenge 2023
          </p>
          <div className="flex-center-between">
            <p className="flex-center gap-1 text-sm font-semibold">
              <IoCalendarClearOutline /> {title && title}
            </p>
            <Link to={link} className="flex-center gap-1">
              <p className="underline text-sm font-semibold">{linkTitle}</p>{" "}
              <MdOutlineArrowRightAlt />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CardWithImage;
