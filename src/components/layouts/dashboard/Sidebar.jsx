import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../../../assets/images/logo.png";
import LogoMinimized from "../../../assets/images/logohead.png";
import SidebarItem from "./SidebarItem";
import { IoArrowBackOutline, IoExitOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { SideBarContext } from "../../../context/SideBarState";
import { twMerge } from "tailwind-merge";
import { useAuth } from "src/context/useAuth";

const Sidebar = ({ links }) => {
  const { isSideBarActive, setIsSideBarActive } = useContext(SideBarContext);
  const { logout } = useAuth();

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
      className="sidebar bg-white h-screen pt-4 text-gray-700 fixed shadow-xl z-300"
    >
      <div className="w-full h-full relative flex flex-col">
        <div className="flex items-center justify-center px-4">
          {/* Conditional rendering of the logo */}
          <motion.div
            className={twMerge("mb-3", !isSideBarActive && "pt-14 pb-4")}
          >
            {isSideBarActive ? (
              <img src={Logo} alt="logo" className="h-28 w-44" />
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
            className="rounded-full absolute -right-3 outline-none bg-pri-color p-2 top-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </motion.button>
        </div>
        <div className="pb-4 flex-1 overflow-y-scroll hide-scroll flex flex-col">
          <div className="flex flex-col mb-6">
            {links[0]?.title === "Home" ? (
              <Link
                to="/create-challenge"
                className={twMerge(
                  "mx-4 mb-3",
                  !isSideBarActive && "flex items-center justify-center "
                )}
              >
                {" "}
                {/* Wrapped with Link for minimized click */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={twMerge(
                    "flex items-center space-x-4  bg-[#2D2D2D] p-2 rounded-full mx-1 mb-3 hover:bg-pri-color transition-colors duration-200",
                    !isSideBarActive && "justify-center flex-1"
                  )}
                >
                  <span
                    className={twMerge(
                      "text-xl text-white",
                      !isSideBarActive && "flex-1"
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                      />
                    </svg>
                  </span>

                  {isSideBarActive && (
                    <AnimatePresence>
                      <motion.span
                        variants={titleAnimate}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="block whitespace-nowrap text-white"
                      >
                        Create A Challenge
                      </motion.span>
                    </AnimatePresence>
                  )}
                </motion.div>
              </Link>
            ) : (
              <>
                {isSideBarActive ? (
                  <AnimatePresence>
                    <motion.div
                      variants={titleAnimate}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="flex-1"
                    >
                      <Link
                        to="/overview"
                        className="flex items-center gap-2 text-yellow-dark mx-4 mb-3 font-semibold whitespace-nowrap"
                      >
                        <IoArrowBackOutline />
                        Back to home
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <Link
                    to="/overview"
                    className="flex items-center justify-center mx-4 mb-3"
                  >
                    <IoIosArrowBack className="text-xl text-yellow-dark" />
                  </Link>
                )}
              </>
            )}
            {links.map((item, index) => {
              if (item.title === "Need Help?") {
                return (
                  <NavLink
                    key={index}
                    to="/need-help" // Define the route for your NeedHelpLayout
                    className={({ isActive }) =>
                      twMerge(
                        "opacity-50",
                        isActive && "opacity-100",
                        "hover:opacity-70 transition-opacity duration-200"
                      )
                    }
                  >
                    <SidebarItem
                      icon={item.icon}
                      title={item.title}
                      isActive={isSideBarActive}
                      titleAnimate={titleAnimate}
                    />
                  </NavLink>
                );
              }

              if (item.comingSoon) {
                return (
                  <SidebarItem
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    isActive={isSideBarActive}
                    titleAnimate={titleAnimate}
                    comingSoon={item.comingSoon}
                  />
                );
              }

              return (
                <NavLink
                  end
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
              );
            })}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={logout}
            className={twMerge(
              `flex items-center space-x-4 text-gray-700 h-12 py-3 mt-auto hover:bg-slate-100 px-6 cursor-pointer transition-colors duration-200`,
              !isSideBarActive && "justify-center "
            )}
          >
            <span className={twMerge(!isSideBarActive && "flex-1")}>
              <IoExitOutline className="text-xl" />
            </span>

            {isSideBarActive && (
              <AnimatePresence>
                <motion.p
                  variants={titleAnimate}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="font-semibold whitespace-nowrap"
                >
                  Logout
                </motion.p>
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;