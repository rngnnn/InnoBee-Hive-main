import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Preview from "../../assets/icons/eye.svg";
import Delete from "../../assets/icons/delete.svg";
import Edit from "../../assets/icons/edit.svg";
import Leave from "../../assets/icons/leave.svg";
import Team from "../../assets/icons/team.svg";

const MySubmissionDropdown = ({
  submissionDropdownRef,
  onDeleteSubmission,
  onLeaveChallenge,
}) => {
  const dropdownAnimation = {
    closed: {
      opacity: 0,
      x: "100%",
    },
    open: {
      opacity: 1,
      x: "0",
    },
  };

  return (
    <motion.div
      ref={submissionDropdownRef}
      variants={dropdownAnimation}
      initial="closed"
      animate="open"
      exit="closed"
      transition={{
        duration: 0.3,
        ease: [0.61, 1, 0.88, 1],
      }}
      className="absolute top-6 right-0 bg-white rounded-lg shadow z-30"
    >
      <div className="flex flex-col py-2 w-48">
        <Link
          to="/edit-submission"
          className="flex items-center gap-2 px-4 hover:bg-slate-100 transition-all py-2"
        >
          <img src={Edit} alt="" className="h-4 w-4 object-contain" />
          <p className="whitespace-nowrap text-sm">Edit submission</p>
        </Link>
        <Link
          to="/preview-submission"
          className="flex items-center gap-2 px-4 hover:bg-slate-100 transition-all py-2"
        >
          <img src={Preview} alt="" className="h-4 w-4 object-contain" />
          <p className="whitespace-nowrap text-sm">Preview submission</p>
        </Link>
        <Link
          to="/my-submission/team-collaboration"
          className="flex items-center gap-2 px-4 hover:bg-slate-100 transition-all py-2"
        >
          <img src={Team} alt="" className="h-4 w-4 object-contain" />
          <p className="whitespace-nowrap text-sm">Team collaboration</p>
        </Link>
        <button
          onClick={onDeleteSubmission}
          className="flex items-center gap-2 px-4 hover:bg-slate-100 transition-all py-2 w-full text-left"
        >
          <img src={Delete} alt="" className="h-4 w-4 object-contain" />
          <p className="whitespace-nowrap text-sm">Delete submission</p>
        </button>
        <button
          onClick={onLeaveChallenge}
          className="flex items-center gap-2 px-4 hover:bg-slate-100 transition-all py-2 w-full text-left"
        >
          <img src={Leave} alt="" className="h-4 w-4 object-contain" />
          <p className="whitespace-nowrap text-sm">Leave challenge</p>
        </button>
      </div>
    </motion.div>
  );
};

export default MySubmissionDropdown;
