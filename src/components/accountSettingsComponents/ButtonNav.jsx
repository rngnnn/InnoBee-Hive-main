import React from "react";

import { IoEyeOutline } from "react-icons/io5";
import { LiaShareAltSolid } from "react-icons/lia";
import { FiHeart } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";

const ButtonNav = ({ view }) => {
  return (
    <div className="flex-center gap-3 text-sm">
      {view && (
        <p className="flex-center gap-1">
          <IoEyeOutline /> 3,594
        </p>
      )}
      <button className="flex-center  bg-white text-brown px-2 py-1 rounded-full">
        <LiaShareAltSolid /> Share
      </button>
      <button className="flex-center gap-1 bg-pri-color text-brown px-2 py-1 rounded-full">
        <FiHeart /> Follow 2
      </button>
      <button className="flex-center  bg-pri-color text-brown px-2 py-1 rounded-full">
        <CiEdit /> Edit
      </button>
    </div>
  );
};

export default ButtonNav;
