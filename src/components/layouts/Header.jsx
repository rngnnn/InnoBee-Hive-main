import { useContext, useState, useRef } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { GoBell } from "react-icons/go";
import { MdArrowDropDown } from "react-icons/md";
import { PiCrownSimpleFill } from "react-icons/pi";
import Man from "../../assets/images/man.jpg";
import { onboardingPopups } from "../../constants";

import { SideBarContext } from "../../context/SideBarState";
import TakeLookAroundModal from "../Modals/TakeLookAroundModal";
import HeaderDropdown from "./dashboard/HeaderDropdown";
import NotificationSidebar from "./dashboard/NotificationSidebar";
import useOnClickOutside from "src/hooks/useOnClickOutside";
import { BiHive } from "react-icons/bi";
import ReferFriendPopup from "src/components/Modals/ReferFriendModal.jsx"; // Corrected import path
import { TbBeta } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";

const Header = ({ showUpgrade }) => {
  const { isSideBarActive, isLargeScreen } = useContext(SideBarContext);
  const [isOpen, setIsOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const profileRef = useRef();
  const profileDropdownRef = useRef();
  const [isReferPopupOpen, setIsReferPopupOpen] = useState(false); // State for the referral popup
  const userInviteLink = 'www.InnoBee.ir/join/your-unique-code'; // Your referral link

  const toggleNotificationSidebar = () => {
    setOpenNotification((prev) => !prev);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenReferPopup = (event) => {
    event.stopPropagation();
    setIsReferPopupOpen(true);
  };

  const handleCloseReferPopup = () => {
    setIsReferPopupOpen(false);
  };

  useOnClickOutside([profileRef, profileDropdownRef], () => setIsOpen(false));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={
        isLargeScreen
          ? { paddingLeft: isSideBarActive ? "250px" : "80px", opacity: 1 }
          : { paddingLeft: "80px", opacity: 1 }
      }
    >
      <div className="w-full py-8 padding-x flex-center-between gap-4 relative">
        <div className="md:block hidden">
          <h6 className="font-bold text-xl">Hi, Mohammad</h6>
          <p className="text-s">Welcome Back, Let’s Bee Innovative!</p>
        </div>
        <div className="flex flex-col items-start gap-1 md:hidden">
          <h6 className="font-bold text-lg">Hi, Mohammad</h6>
          <p className="text-xs">Welcome Back!</p>
        </div>
        <div className="flex-center-between gap-4">
          {showUpgrade ? (
            <div className="max-xl:hidden md:flex hidden">
              <div className="px-3 py-1 flex-center gap-2 text-brown bg-gradient-to-r from-yellow-300 to-pri-color rounded-full">
                <TbBeta classname= "font-bold text-xl" strokeWidth="3" />
                <div className="">
                  <p className="font-bold text-sm whitespace-nowrap">Beta Version</p>
                  <p className="text-xs whitespace-nowrap">Continual Improvement</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-xl:hidden md:flex hidden w-0"> {/* Empty div to maintain flow */}
              {/* You could also render null or an empty fragment here */}
            </div>
          )}
          <form className="max-w-[500px] w-[500px] min-w-[300px] bg-white shadow-md rounded-full flex-1 flex-row flex-center-between p-2.5 text-gray-400 max-lg:hidden ">
            {" "}
            <input
              type="search"
              placeholder="Search Dashboard"
              className="flex-1 outline-none border-none"
            />{" "}
            <button type="submit" className="bg-white text-gray-400 p-0 m-0">
              <IoSearchOutline />
            </button>
          </form>
          <div
            className="look-around p-3 rounded-full cursor-pointer border-1 border-brown flex-center gap-1 bg-white max-xl:hidden md:flex hidden"
            onClick={() => setOpenModal(true)}
          >
            <BiHive />
            <p className="text-xs">Take a look around</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="bg-white p-3 rounded-full text-[#2d2d2d] text-lg relative"
              onClick={toggleNotificationSidebar}
            >
              <GoBell />
              <span className="text-white bg-red-600 absolute -top-1 -right-1 h-2 w-2 rounded-full"></span>
            </button>
            <div
              className="flex-center gap-2 cursor-pointer relative"
              onClick={() => setIsOpen((prev) => !prev)}
              ref={profileRef}
            >
              <img
                src={Man}
                alt=""
                className="profile-img h-10 w-10 rounded-full object-cover"
              />
              <MdArrowDropDown />
              <AnimatePresence>
                {isOpen && (
                  <HeaderDropdown
                    profileDropdownRef={profileDropdownRef}
                    onOpenReferPopup={handleOpenReferPopup} // Pass the open handler
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        {openNotification && (
          <AnimatePresence>
            <NotificationSidebar
              toggleNotificationSidebar={toggleNotificationSidebar}
            />
          </AnimatePresence>
        )}

        <TakeLookAroundModal
          onCloseModal={onCloseModal}
          openModal={openModal}
          onboardingPopups={onboardingPopups}
        />
        {isReferPopupOpen && (
          <ReferFriendPopup
            invitationLink={userInviteLink}
            onClose={handleCloseReferPopup}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Header;