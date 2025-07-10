import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { fadeIn } from "../../anim";
import { IoSettingsOutline, IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineArrowDropDown, MdOutlineArrowRightAlt } from "react-icons/md";
import ChallengeDropdown from "./ChallengeDropdown";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import ShareChallengePopup from "../Modals/ShareChallengeModal"; // Import the modal

const ChallengeCard2 = ({ challenge, index }) => {
  const [showDropDown, setShowDropdown] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const challengeDropdownRef = useRef();
  const ref = useRef();
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false); // State for share popup
  const challengeUrl = `/challenge/${challenge.id}`; // Example URL, adjust as needed
  const challengeTitle = challenge.title; // Example title, adjust as needed

  const toggleDropdown = (index) => {
    setCurrentIndex(index);
    setShowDropdown((prev) => !prev);
  };

  const useOpenSharePopup = () => {
    setIsSharePopupOpen(true);
  };

  const useCloseSharePopup = () => {
    setIsSharePopupOpen(false);
  };

  useOnClickOutside([ref, challengeDropdownRef], () => setShowDropdown(false));

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
            src={challenge.logo}
            alt=""
            className="w-14 h-14 absolute -bottom-4 left-4 rounded-full object-cover"
          />
          <img
            src={challenge.challengeImg}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col  w-full sm:px-6 sm:py-8 px-3 py-5 rounded-b-lg gap-5">
          <div className="flex-center-between">
            <h4 className="font-semibold text-sm">P&G Innovation Lab</h4>{" "}
            <div className="relative" ref={ref}>
              <button
                className="flex-center gap-1"
                onClick={() => toggleDropdown(index)}
              >
                <IoSettingsOutline />
                <AnimatePresence>
                  <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: showDropDown ? 180 : 0 }}
                    exit={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MdOutlineArrowDropDown />
                  </motion.span>
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {showDropDown && index === currentIndex && (
                  <ChallengeDropdown
                    challengeDropdownRef={challengeDropdownRef}
                    challengeUrl={challengeUrl}
                    challengeTitle={challengeTitle}
                    onOpenSharePopup={useOpenSharePopup} // Pass the function to open the share popup
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
          <p>
            P&G Expiration Date Elongation For Dairy Products Challenge 2023
          </p>
          <div className="flex-center-between">
            <p className="flex-center gap-1 text-sm">
              <IoCalendarClearOutline /> Enter
            </p>
            <Link to="/challenge" className="flex-center gap-1">
              <p className="underline text-sm font-semibold">View Challenge</p>{" "}
              <MdOutlineArrowRightAlt />
            </Link>
          </div>
        </div>
      </div>
      {isSharePopupOpen && (
        <ShareChallengePopup
          challengeUrl={challengeUrl}
          challengeTitle={challengeTitle}
          onClose={useCloseSharePopup}
        />
      )}
    </motion.div>
  );
};

export default ChallengeCard2;