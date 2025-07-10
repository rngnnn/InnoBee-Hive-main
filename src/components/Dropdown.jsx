import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Dropdown = ({ dropdownLinks }) => {
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

  return (
    <motion.div
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
        {dropdownLinks?.map((link, index) =>
          link?.link ? (
            <Link
              to={link?.link}
              key={index}
              className="flex-center gap-2 px-4 hover:bg-slate-100 transition-all py-2"
            >
              <img
                src={link?.imgUrl && link?.imgUrl}
                alt={link?.title}
                className="h-4 w-4 object-contain"
              />
              <p className="whitespace-nowrap text-sm">{link?.title}</p>
            </Link>
          ) : (
            <button
              key={index}
              onClick={link?.onClick}
              className="flex-center gap-2 px-4 hover:bg-slate-100 transition-all py-2 text-left w-full"
            >
              {link?.imgUrl && (
                <img
                  src={link?.imgUrl}
                  alt={link?.title}
                  className="h-4 w-4 object-contain"
                />
              )}
              <p className="whitespace-nowrap text-sm">{link?.title}</p>
            </button>
          )
        )}
      </div>
    </motion.div>
  );
};

export default Dropdown;
