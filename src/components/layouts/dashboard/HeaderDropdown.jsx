import React from 'react';
import { Link } from 'react-router-dom';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import { IoBriefcaseOutline, IoBusinessOutline, IoExitOutline, IoFemaleOutline, IoGiftOutline, IoGitPullRequestOutline, IoManOutline, IoMoonOutline, IoRocketOutline } from 'react-icons/io5';
import { SlUserFemale } from 'react-icons/sl';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useAuth } from 'src/context/useAuth';

const HeaderDropdown = ({ profileDropdownRef, onOpenReferPopup }) => {
  const { logout } = useAuth();

  const handleReferFriendClick = (event) => {
    event.stopPropagation();
    onOpenReferPopup(event); // Pass the event object here
  };

  const profileDropddownAnimation = {
    closed: {
      opacity: 0,
      x: '100%',
    },
    open: {
      opacity: 1,
      x: '0',
    },
  };

  return (
    <motion.div
      ref={profileDropdownRef}
      variants={profileDropddownAnimation}
      initial="closed"
      animate="open"
      exit="closed"
      transition={{
        duration: 0.3,
        ease: [0.61, 1, 0.88, 1],
      }}
      className="absolute top-12 right-0 bg-white rounded-lg shadow w-52 z-max"
    >
      <div className="py-3 px-4 border-b-1 border-gray-300">
        <h6 className="font-bold">Account Settings</h6>
        <p className="text-xs font-semibold">
          Free Plan <span className="text-pri-color ">Upgrade now</span>
        </p>
      </div>
      <div className="py-3 border-b-1 border-gray-300 flex flex-col ">
        <Link
          to="/account/profile"
          className="flex items-center gap-2 hover:bg-slate-100 transition-all px-4 py-1"
        >
          <SlUserFemale />
          <p className="text-sm font-semibold">Profile details</p>
        </Link>
        <Link
          to="/public-profile"
          className="flex items-center gap-2 hover:bg-slate-100 transition-all px-4 py-1"
        >
          <IoBriefcaseOutline />
          <p className="text-sm font-semibold">My Public Profile</p>
        </Link>
        <div className="flex items-center gap-2 hover:bg-slate-100 transition-all px-4 py-1">
          <IoMoonOutline />
          <p className="text-sm font-semibold">Dark mode</p>
          <div className="w-14 h-6 bg-[#2d2d2d] rounded-full flex items-center px-1">
            <button className="h-5 w-5 rounded-full bg-white"></button>
          </div>
        </div>
        <Link
          to="/account/profile"
          className="flex items-center gap-2 hover:bg-slate-100 transition-all px-4 py-1"
        >
          <BsThreeDotsVertical />
          <p className="text-sm font-semibold">All settings</p>
        </Link>
      </div>
      <div className="py-3  border-b-1 border-gray-300 flex flex-col ">
        <div className="flex items-center gap-2 hover:bg-slate-100 transition-all px-4 py-1">
          <IoRocketOutline />
          <p className="text-sm font-semibold">What’s new</p>
        </div>
        <div
          className="flex-center-between hover:bg-slate-100 transition-all px-4 py-1 cursor-pointer"
          onClick={handleReferFriendClick}
        >
          <div className="flex-center gap-2">
            <AiOutlineUserAdd />
            <p className="text-sm font-semibold">Refer a friend</p>
          </div>
          <IoGiftOutline />
        </div>
      </div>
      <div
        className="flex items-center gap-2 py-3 px-4 cursor-pointer"
        onClick={() => logout()}
      >
        <IoExitOutline />
        <p className="text-sm font-semibold">Logout</p>
      </div>
    </motion.div>
  );
};

export default HeaderDropdown;