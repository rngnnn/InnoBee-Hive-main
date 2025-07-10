import React from "react";

import { motion } from "framer-motion";
import { FaWpforms } from "react-icons/fa";
import { GoTrophy } from "react-icons/go";
import { IoMedalOutline, IoDiamondOutline, IoRibbonOutline, IoSparklesOutline, IoTrophyOutline } from "react-icons/io5";

import { fadeIn } from "../../anim";

const Awards = () => {
  return (
    <div className="flex gap-2 flex-wrap justify-center md:px-12">
      <motion.div
        variants={fadeIn("right", "spring", 0 * 0.5, 0.75)}
        initial="hidden"
        animate="show"
        className="w-48   shadow h-52"
      >
        <div className="h-2 w-full bg-gradient-to-r from-yellow-300 to-pri-color rounded" />
        <div className="flex-center justify-center flex-col flex-1 h-full gap-2">
          <div className="text-8xl">
            <FaWpforms />
          </div>
          <p className="text-xs text-center">Supreme Leader</p>
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn("right", "spring", 1 * 0.5, 0.75)}
        initial="hidden"
        animate="show"
        className="w-48   shadow h-52"
      >
        <div className="h-2 w-full bg-gradient-to-r from-yellow-300 to-pri-color rounded" />
        <div className="flex-center justify-center flex-col flex-1 h-full gap-2">
          <div className="text-8xl">
            <IoMedalOutline />
          </div>
          <p className="text-xs text-center">Innovation Mastermind</p>
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn("right", "spring", 2 * 0.5, 0.75)}
        initial="hidden"
        animate="show"
        className="w-48   shadow h-52"
      >
        <div className="h-2 w-full bg-gradient-to-r from-yellow-300 to-pri-color rounded" />
        <div className="flex-center justify-center flex-col flex-1 h-full gap-2">
          <div className="text-8xl">
            <IoDiamondOutline />
          </div>
          <p className="text-xs text-center">Idea Magnet</p>
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn("right", "spring", 3 * 0.5, 0.75)}
        initial="hidden"
        animate="show"
        className="w-48   shadow h-52"
      >
        <div className="h-2 w-full bg-gray-400  rounded" />
        <div className="flex-center justify-center flex-col flex-1 h-full gap-2">
          <div className="text-8xl text-gray-400 ">
            <IoSparklesOutline />
          </div>
          <p className="text-xs text-center text-gray-300 ">
            Top 1000 Innovators
          </p>
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn("right", "spring", 4 * 0.5, 0.75)}
        initial="hidden"
        animate="show"
        className="w-48   shadow h-52"
      >
        <div className="h-2 w-full bg-gray-400 rounded" />
        <div className="flex-center justify-center flex-col flex-1 h-full gap-2">
          <div className="text-8xl text-gray-400 ">
            <IoTrophyOutline />
          </div>
          <p className="text-xs text-center text-gray-300 ">
            Won €10,000 Prize Rewards
          </p>
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn("right", "spring", 5 * 0.5, 0.75)}
        initial="hidden"
        animate="show"
        className="w-48   shadow h-52"
      >
        <div className="h-2 w-full bg-gray-400 rounded" />
        <div className="flex-center justify-center flex-col flex-1 h-full gap-2">
          <div className="text-8xl text-gray-400 ">
            <IoRibbonOutline />
          </div>
          <p className="text-xs text-center text-gray-300 ">
            Participated In 10 Challenges
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Awards;
