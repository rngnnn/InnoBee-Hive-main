import React from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GoTrophy } from "react-icons/go";

import Man from "../../assets/images/man.jpg";
import { fadeIn } from "../../anim";
import { IoTrophyOutline } from "react-icons/io5";

const UserCard = ({ index }) => {
  return (
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      initial="hidden"
      animate="show"
      className="p-1 md:w-1/2 w-full"
      key={index}
    >
      <div className=" shadow rounded-lg ">
        <div className="h-2 w-full bg-gradient-to-r from-yellow-300 to-pri-color rounded" />
        <div className="flex justify-between md:p-6 p-3">
          <div className="flex gap-3">
            <img
              src={Man}
              alt="profile-pic"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h6 className="font-bold text-brown">Adam Smith</h6>
              <p className="text-sm">London, UK</p>
              <p className="text-sm">Innovation Management Expert</p>
            </div>
          </div>
          <button className="w-fit h-fit px-4 py-1 text-white bg-brown rounded-full font-semibold">
            Follow
          </button>
        </div>
        <div className="flex-center-between md:p-6 p-3">
          <div className="flex-center gap-2">
            <p className="text-3xl">
              {" "}
              <IoTrophyOutline />
            </p>

            <p className="text-gray-400 text-xs">1 challenge won</p>
          </div>
          <Link to="/" className="text-brown flex-center gap-1">
            <p className="undeline text-sm">View Profile</p>{" "}
            <FaLongArrowAltRight />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
