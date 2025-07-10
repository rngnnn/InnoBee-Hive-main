import React from "react";
import { IoMdCheckmark } from "react-icons/io";

const HomeStepCard = ({
  progress,
  onToggle,
  isCompleted,
  stepsData,
  title,
}) => {
  return (
    <div className="xl:w-[48%] lg:w-[70%] md:w-[80%] w-full shadow py-3 px-2 sm:p-4 rounded-xl bg-white min-h-[200px] sm:min-h-80 flex flex-col justify-between">
      <div>
        <h6 className="font-semibold pb-2 sm:pb-4 text-sm sm:text-base">{title}</h6>
        <div className="w-full flex-center-between gap-2 sm:gap-3">
          <div className="relative w-full h-3 sm:h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-300 to-pri-color transition-width duration-500 ease-in-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-semibold text-sm sm:text-base">{progress}%</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 py-2 sm:py-4">
        {stepsData.map((step, index) => (
          <div className="flex items-center justify-between" key={index}>
            <div className="flex items-center">
              <button
                onClick={() => onToggle(index)}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${
                  isCompleted[index] ? "bg-yellow-500" : "bg-gray-300"
                }`}
              >
                {isCompleted[index] && (
                  <span className="text-white text-xs sm:text-sm">
                    <IoMdCheckmark />
                  </span>
                )}
              </button>
              <div className="ml-2 sm:ml-4">
                <div className="text-xs sm:text-sm">{step.description}</div>
              </div>
            </div>
            <div className="text-gray-500 text-xs sm:text-sm">{step.step}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeStepCard;