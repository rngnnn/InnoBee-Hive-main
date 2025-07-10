import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import { fadeIn } from "../../anim";
import { IoEyeOutline, IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { HiOutlineTag } from "react-icons/hi2";

const ChallengeCard = ({ challenge, index }) => {
  const [isSavedChallange, setIsSavedChallange] = useState(false);

  return (
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      initial="hidden"
      animate="show"
      className="p-2 xl:w-1/3 md:w-1/2 w-full "
      key={index}
    >
      <div className=" shadow rounded-lg bg-white h-full cursor-pointer group relative">
        <AnimatePresence>
          <motion.div className="h-2 w-full bg-gradient-to-r from-yellow-300 to-pri-color rounded group-hover:h-full group-hover:absolute top-0 left-0 group-hover:rounded-lg z-10" />
        </AnimatePresence>{" "}
        {/* show on hover */}
        <div className="absolute w-full h-full top-0 left-0 hidden group-hover:flex flex-col  justify-between sm:px-6 sm:py-8 px-3 py-5 rounded-b-lg gap-5 z-10">
          <div className="flex flex-col gap-5">
            <div className="flex-center-between">
              <Link
                to="/proof-of-concept"
                className="flex-center text-sm bg-brown text-white px-5 py-1 rounded-full w-fit"
              >
                Proof of Concept
              </Link>
              <button onClick={() => setIsSavedChallange((prev) => !prev)}>
                <svg className="w-12 h-12 -mr-4" viewBox="0 0 32 32">
                  <path
                    d="M21.3 28.3 16 23l-5.3 5.3c-.6.6-1.7.2-1.7-.7V5c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v22.6c0 .9-1.1 1.3-1.7.7z"
                    style={{
                      fill: isSavedChallange ? "#2d2d2d" : "none",
                      stroke: "#2d2d2d",
                      strokeWidth: 1.5,
                    }}
                  />
                </svg>
              </button>
            </div>
            <h5 className="font-bold text-lg">{challenge.title}</h5>
            <p>{challenge.SubTitle}</p>
            <ul className="flex-center gap-4 ">
              <li className="flex-center gap-2 text-2xl">
                <HiOutlineTag />

                <Link to="" className="text-sm underline">
                  Education
                </Link>
              </li>
              <li className="flex-center gap-2">
                <Link to="" className="text-sm underline">
                  Science
                </Link>
              </li>
              <li className="flex-center gap-2">
                <Link to="" className="text-sm underline">
                  Social Impact
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-end">
            <Link to="/challenge" className="flex-center gap-1">
              <p className="underline text-sm font-semibold">View Challenge</p>{" "}
              <MdOutlineArrowRightAlt />
            </Link>
          </div>
        </div>
        <div className="w-full h-52 relative">
          <img
            src={challenge.logo}
            alt=""
            className="w-14 h-14 absolute -bottom-4 left-4 rounded-full object-cover"
          />
          <img
            src={challenge.challengeImg}
            alt=""
            className="w-full h-full object-cover group-hover:hidden"
          />
        </div>
        <div className="flex flex-col  w-full sm:px-6 sm:py-8 px-3 py-5 rounded-b-lg gap-5">
          <div className="flex-center-between">
            <h4 className="font-semibold text-sm">P&G Innovation Lab</h4>{" "}
            <p className="flex-center gap-2 sm:px-6 px-3 py-1 rounded-full shadow cursor-pointer hover:font-semibold transition-all text-white bg-brown w-fit text-sm">
              <IoEyeOutline /> 3,594
            </p>
          </div>
          <p>
            P&G Expiration Date Elongation For Dairy Products Challenge 2023
          </p>
          <div className="flex-center-between">
            <p className="flex-center gap-1 text-sm">
              <IoCalendarClearOutline /> Judging
            </p>
            <p className="font-semibold">€1M Prize</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeCard;
