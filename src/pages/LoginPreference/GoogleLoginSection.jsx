import React from "react";
import { Link } from "react-router-dom";
import GoogleLogo from "../../assets/icons/google-color-icon.svg"; // Mohammad: Replace logo with io5 IoLogoGoogle and see if it looks better, just a suggestion

const GoogleLoginSection = () => {
  return (
    <div className="max-w-[600px] flex pb-6 gap-6 max-lg:flex-col max-lg:pt-6">
      <div className="flex flex-col gap-2 mt-8">
        <div className=" py-2 rounded-lg border-2 border-gray-800 flex gap-3 justify-center items-center  cursor-pointer text-sm w-60 ">
          <img src={GoogleLogo} alt="Google logo" className="h-6 w-6" />
          <p>Switch to Google login</p>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginSection;