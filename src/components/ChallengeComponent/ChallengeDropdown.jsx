import { Link } from "react-router-dom";
import React from "react"; // Import React
import ShareChallengePopup from "../Modals/ShareChallengeModal"; // Corrected import path (you can remove this here)

import Edit from "../../assets/icons/edit.svg";
import Perform from "../../assets/icons/perform.svg";
import Promote from "../../assets/icons/promote.svg";
import Share from "../../assets/icons/share.svg";
import View from "../../assets/icons/view.svg";

import { motion } from "framer-motion";

const ChallengeDropdown = ({ challengeDropdownRef, challengeUrl, challengeTitle, onOpenSharePopup }) => {
  const id = 1; // TODO: make this a prop
  // const [isSharePopupOpen, setIsSharePopupOpen] = useState(false); // Removed state

  const profileDropddownAnimation = {
    closed: {
      opacity: 0,
      x: "100%",
    },
    open: {
      opacity: 1,
      x: "0",
    },
  };

  // const openSharePopup = () => { // Removed function
  //   setIsSharePopupOpen(true);
  // };

  // const closeSharePopup = () => { // Removed function
  //   setIsSharePopupOpen(false);
  // };

  const handleShareClick = () => {
    onOpenSharePopup(); // Call the function passed from the parent
  };

  return (
    <motion.div
      ref={challengeDropdownRef}
      variants={profileDropddownAnimation}
      initial="closed"
      animate="open"
      exit="closed"
      transition={{
        duration: 0.3,
        ease: [0.61, 1, 0.88, 1],
      }}
      className="absolute top-6 right-0 bg-white rounded-lg shadow  z-30"
    >
      <div className="flex flex-col py-2 w-48">
        <Link
          to="/manage-challenge/overview"
          className="flex-center gap-2 px-4 hover:bg-slate-100 transition-all py-2"
        >
          <img src={Edit} alt="" className="h-4 w-4 object-contain" />{" "}
          <p className=" whitespace-nowrap text-sm">Manage challenge</p>
        </Link>
        <Link
          to={`/my-challenges/view-submissions/${id}`}
          className="flex-center gap-2 px-4 hover:bg-slate-100 transition-all py-2"
        >
          <img src={View} alt="" className="h-4 w-4 object-contain" />{" "}
          <p className=" whitespace-nowrap text-sm">View submissions</p>
        </Link>
        <Link
          to="/manage-challenge/performance"
          className="flex-center gap-2 px-4 hover:bg-slate-100 transition-all py-2"
        >
          <img src={Perform} alt="" className="h-4 w-4 object-contain" />{" "}
          <p className=" whitespace-nowrap text-sm">Performance</p>
        </Link>
        <div
          onClick={handleShareClick} // Use the new handler
          className="flex-center gap-2 px-4 hover:bg-slate-100 transition-all py-2 cursor-pointer"
        >
          <img src={Share} alt="" className="h-4 w-4 object-contain" />{" "}
          <p className=" whitespace-nowrap text-sm">Share</p>
        </div>
      </div>
      {/* ShareChallengePopup is no longer rendered here */}
    </motion.div>
  );
};

export default ChallengeDropdown;