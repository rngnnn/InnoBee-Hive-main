import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";

import Logo from "../../assets/images/logo.png";

const ChallengeNavbar = ({ buttonTitle, buttonLink }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const notificationVariants = {
    closed: {
      x: 100,
    },
    open: {
      x: 0,
    },
  };

  const toggleMenu = () => {
    setOpenSidebar((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between padding-x md:py-6 py-2">
      <img src={Logo} alt="" className="md:w-28 w-20" />{" "}
      <ul className="flex items-center gap-6 max-lg:hidden">
        <li>
          <Link to="/challenges">Challenges</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing & FAQ</Link>
        </li>
        <li>
          <Link to="/partner">For Partners</Link>
        </li>
        <li>
          <Link to="/resources" className="flex-center gap-1">
            Resources <IoIosArrowDown />
          </Link>
        </li>
        <li>
          <Link to="/about-us" className="flex-center gap-1">
            About Us <IoIosArrowDown />
          </Link>
        </li>
        <li>
          <button className="flex-center gap-1">
            Log Out <FaLongArrowAltRight />
          </button>
        </li>
      </ul>
      <Link
        to={buttonLink}
        className="px-5 py-1 flex-center gap-2  bg-gradient-to-r from-yellow-300 to-pri-color rounded-full text-white font-bold  max-lg:hidden"
      >
        {buttonTitle}
      </Link>
      <button className="text-3xl lg:hidden" onClick={toggleMenu}>
        <HiMenuAlt3 />
      </button>
      <AnimatePresence>
        {openSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed h-screen w-full bg-h-transparent flex justify-end z-20 top-0 right-0 left-0 lg:hidden"
          >
            <AnimatePresence>
              <motion.div
                variants={notificationVariants}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ duration: 0.3 }}
                className=" bg-white md:w-96 w-[80%] h-full"
              >
                <button className=" text-3xl block  p-4" onClick={toggleMenu}>
                  <IoCloseOutline />
                </button>
                <ul className="flex flex-col  gap-6  p-4">
                  <li>
                    <Link to="/challenges">Challenges</Link>
                  </li>
                  <li>
                    <Link to="/pricing">Pricing & FAQ</Link>
                  </li>
                  <li>
                    <Link to="/partner">For Partners</Link>
                  </li>
                  <li>
                    <Link to="/resources" className="flex-center gap-1">
                      Resources <IoIosArrowDown />
                    </Link>
                  </li>
                  <li>
                    <Link to="/about-us" className="flex-center gap-1">
                      About Us <IoIosArrowDown />
                    </Link>
                  </li>
                  <li>
                    <button className="flex-center gap-1">
                      Log Out <FaLongArrowAltRight />
                    </button>
                  </li>
                </ul>
                <Link
                  to={buttonLink}
                  className="px-5 py-1 flex-center gap-2  bg-gradient-to-r from-yellow-300 to-pri-color rounded-full text-white font-bold  max-lg:hidden"
                >
                  {buttonTitle}
                </Link>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChallengeNavbar;
