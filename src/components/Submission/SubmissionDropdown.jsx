import { motion } from "framer-motion";
import {
  IoDocumentTextOutline,
  IoStatsChartOutline,
  IoPersonAddOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { TbGavel } from "react-icons/tb";
import { Link } from "react-router-dom";

const SubmissionDropdown = ({ submissionDropdownRef, submission }) => {
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

  const items = [
    {
      icon: <IoDocumentTextOutline className="w-4 h-4" />,
      title: "Submission details",
      link: `/my-challenges/view-submissions/1/details?id=${submission?.id}`,
    },
    {
      icon: <IoStatsChartOutline className="w-4 h-4" />,
      title: "Scoring details",
      link: "#",
    },
    {
      icon: <TbGavel className="w-4 h-4" strokeWidth="1.5" />,
      title: "Edit my score",
      link: "#",
    },
    {
      icon: <IoPersonAddOutline className="w-4 h-4" />,
      title: "Assign judge",
      link: "#",
    },
    {
      icon: <IoCloseCircleOutline className="w-4 h-4" />,
      title: "Reject submission",
      link: "#",
    },
  ];

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
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex items-center gap-2 px-4 hover:bg-slate-100 transition-all py-2"
          >
            {item.icon}
            <p className="whitespace-nowrap text-sm">{item.title}</p>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default SubmissionDropdown;
