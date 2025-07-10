import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";

import Logo from "../../assets/images/logo.png";
import LogoMinimized from "../../assets/images/logohead.png";

import { manageChallengeLinks, manageChallengeSubLinks } from "../../constants";
import { SideBarContext } from "../../context/SideBarState";

import SidebarItem from "../layouts/dashboard/SidebarItem";
import { twMerge } from "tailwind-merge";
import { IoArrowBackOutline } from "react-icons/io5";

const ManageChallengeSidebar = () => {
  const { isSideBarActive, setIsSideBarActive } = useContext(SideBarContext);

  const toggleSidebar = () => {
    setIsSideBarActive(!isSideBarActive);
  };

  const titleAnimate = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ width: isSideBarActive ? "250px" : "80px", opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: [0.61, 1, 0.88, 1],
      }}
      className="pt-4 bg-white h-screen text-gray-700 fixed shadow-xl z-max"
    >
      <div className="w-full h-full relative flex flex-col">
        <div className="flex items-center justify-center mt-4 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={twMerge("mb-3", !isSideBarActive && "pt-9 pb-9")}
          >
            {isSideBarActive ? (
              <img src={Logo} alt="" className="h-28 w-44" />
            ) : (
              <img
                src={LogoMinimized}
                alt="logo-minimized"
                className="h-10 w-10"
              />
            )}
          </motion.div>
          <motion.button
            initial={{ rotate: 0 }}
            animate={{ rotate: isSideBarActive ? 0 : 180 }}
            onClick={toggleSidebar}
            className="rounded-full absolute -right-5 outline-none bg-pri-color p-2 top-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </motion.button>
        </div>

        <div className="pb-4 flex flex-col flex-1 overflow-y-scroll hide-scroll">
          <div className="flex flex-col">
            {/* Back to home link */}
            <AnimatePresence>
              <motion.div
                variants={titleAnimate}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Link
                  to="/overview"
                  className="flex items-center gap-2 text-yellow-dark mx-4 mb-3 font-semibold whitespace-nowrap"
                >
                  <span
                    className={twMerge(!isSideBarActive && "text-xl ml-2 mb-1")}
                  >
                    <IoArrowBackOutline />
                  </span>

                  {isSideBarActive && "Back to home"}
                </Link>
              </motion.div>
            </AnimatePresence>
            {manageChallengeLinks.map((item, index) => (
              <NavLink
                className={({ isActive }) =>
                  twMerge(
                    "opacity-50",
                    isActive && "opacity-100",
                    "hover:opacity-70 transition-opacity duration-200"
                  )
                }
                to={item.link}
                key={index}
              >
                <SidebarItem
                  icon={item.icon}
                  title={item.title}
                  isActive={isSideBarActive}
                  titleAnimate={titleAnimate}
                />
              </NavLink>
            ))}
          </div>

          <div className="flex flex-col mx-2 rounded-lg mt-6">
            {manageChallengeSubLinks?.map((link, index) => (
              <div className="flex flex-col" key={index}>
                {isSideBarActive && (
                  <AnimatePresence>
                    <motion.p
                      variants={titleAnimate}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="text-gray-400 px-4 py-2"
                    >
                      {link?.title}
                    </motion.p>
                  </AnimatePresence>
                )}
                <div className="flex flex-col">
                  {link?.subLinks?.map((item, index) => (
                    <NavLink
                      className={({ isActive }) =>
                        twMerge(
                          "opacity-50",
                          isActive && "opacity-100",
                          "hover:opacity-70 transition-opacity duration-200"
                        )
                      }
                      to={item.link}
                      key={index}
                    >
                      <SidebarItem
                        icon={item.icon}
                        title={item.title}
                        isActive={isSideBarActive}
                        titleAnimate={titleAnimate}
                        px={2}
                      />
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ManageChallengeSidebar;
