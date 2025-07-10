import HeroBanner from "../../assets/images/hero.png";
import BeeTrail from "../../assets/trails/bee-trail-16-horizontal.png";

import { HiOutlineTrophy } from "react-icons/hi2";
import { TbCards } from "react-icons/tb";
import { Link } from "react-router-dom";
import ButtonNav from "../../components/accountSettingsComponents/ButtonNav";
import { IoCalendarClearOutline } from "react-icons/io5";

const Challenge = () => {
  return (
    <div
      style={{
        backgroundImage: `url('/boxes/box-1.png')`,
        backgroundSize: "auto 200%",
        backgroundPosition: "65% 0%",
      }}
      className="bg-cover min-h-[80vh] pt-10 relative"
    >
      <img
        src={BeeTrail}
        alt=""
        className="absolute z-10 h-[3.5rem] w-[20rem] left-0 ml-auto right-0 mr-auto top-3 select-none pointer-events-none"
      />
      <div className="flex-center-between text-white gap-6 pt-6 padding-x flex-wrap">
        <div className="flex center gap-2">
          <h4 className="font-semibold">P&G Innovation Lab</h4>
        </div>
        <ButtonNav view={true} />
      </div>
      <div className="flex justify-center gap-4 max-lg:flex-col py-6 padding-x">
        <div className="flex-1 w-full">
          <img
            src={HeroBanner}
            alt="banner"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 w-full flex flex-col gap-6 text-white">
          <Link
            to="/proof-of-concept"
            className="flex-center  bg-pri-color text-brown px-5 py-1 rounded-full w-fit"
          >
            Proof of Concept
          </Link>
          <h1 className="sm:text-4xl text-2xl font-bold">
            Solutions for elongating food expiration date for dairy products
          </h1>
          <p className=" sm:text-lg  text-[#BFBFBF]">
            At P&G Innovation Lab, we are looking for the best solution to
            increase the expiry date of dairy products up to 10 percent and win
            a $1,000,000 prize! Submit your solution now and compete with other
            innovative teams for a $1,000,000 prize!
          </p>
          <ul className="flex-center gap-4 text-[#BFBFBF]">
            <li className="flex-center gap-2">
              <TbCards />
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
          <div className="flex md:gap-16 gap-8 flex-wrap">
            <div className="flex gap-2">
              <div className="sm:text-6xl text-4xl">
                <IoCalendarClearOutline />
              </div>
              <div className="">
                <p className="text-[#BFBFBF]">Stage:</p>
                <p className="font-semibold">Registration Open</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="sm:text-6xl text-4xl">
                <HiOutlineTrophy />
              </div>
              <div className="">
                <p className="text-[#BFBFBF]">Stage:</p>
                <p className="font-semibold">Registration Open</p>
              </div>
            </div>
          </div>
          <button className=" py-2 flex-center justify-center gap-2  bg-gradient-to-r from-yellow-300 to-pri-color text-brown rounded-full font-bold text-center">
            Solve this challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
