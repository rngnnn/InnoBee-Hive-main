import React, { useState } from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Man from "../assets/images/man.jpg";
import { fadeIn } from "../anim";
import RequestTeamModal from "./Modals/RequestTeamModal";
import { IoTrophyOutline } from "react-icons/io5";

const TeamCollaborationCard = ({ index, currentLink }) => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      initial="hidden"
      animate="show"
      className="p-1 xl:w-1/3 md:w-1/2 w-full "
      key={index}
    >
      <div className=" shadow rounded-lg bg-white">
        <div className="h-2 w-full bg-gradient-to-r from-yellow-300 to-pri-color rounded" />
        <div className="flex justify-between md:p-3 p-2">
          <div className="flex gap-3">
            <img
              src={Man}
              alt="profile-pic"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h6 className="font-bold text-brown">Adam Smith</h6>
              <p className="text-xs">London, UK</p>
              <p className="text-xs">Innovation Management Expert</p>
            </div>
          </div>
          <button className="w-fit h-fit px-4 py-1 text-white bg-brown rounded-full font-semibold">
            Follow
          </button>
        </div>
        <p className="md:p-3 p-2 text-xs text-gray-500">
          I can write scripts, edit videos, and create digital illustrations and
          animations. I love getting to create great stuff and getting to be a
          part of great collaborations. One more thing I think you should know
          about me is that I always craft my piece of work with care! I’ll
          always give my best! Thanks!
        </p>
        <div className="flex-center-between md:p-3 p-2">
          <div className="flex-center gap-2">
            <p className="text-3xl">
              {" "}
              <IoTrophyOutline />
            </p>

            <p className="text-gray-400 text-xs">1 challenge won</p>
          </div>
          {currentLink === "Innovators" ? (
            <Link
              to="/"
              className="text-brown flex-center gap-1 border-1 border-brown px-3 py-0.5 rounded-full"
            >
              Message
            </Link>
          ) : (
            <button
              className="text-brown flex-center gap-1 border-1 border-brown px-3 py-0.5 rounded-full"
              onClick={toggleModal}
            >
              Request to join
            </button>
          )}
        </div>
      </div>
      <RequestTeamModal onCloseModal={onCloseModal} openModal={openModal} />
    </motion.div>
  );
};

export default TeamCollaborationCard;
