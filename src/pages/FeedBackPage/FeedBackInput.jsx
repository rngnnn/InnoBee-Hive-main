import React, { useState, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { IoArrowBackOutline, IoArrowBackSharp } from "react-icons/io5"; // Import left arrow icon

const FeedBackInput = ({ onNextStep, onPreviousStep, updateFeedbackData, initialText }) => {
  const [improvementText, setImprovementText] = useState(initialText || "");

  useEffect(() => {
    updateFeedbackData({ improvementText });
  }, [improvementText, updateFeedbackData]);

  const handleNextClick = () => {
    onNextStep();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-lg px-6 py-5 border-4 border-gray-200">
          <div className="flex justify-start items-center mb-2">
            <button className="text-pri-color hover:text-pri-color flex items-center gap-2" onClick={onPreviousStep}>
              <IoArrowBackOutline /> <span style={{ color: '#ffb000' }}>Back</span>
            </button>
          </div>
          <h2 className="font-bold mb-4">
            What could InnoBee do, if anything, to improve your overall
            experience?
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Feel free to be as specific as possible below.
          </p>

          <div className="max-w-[600px] relative mb-4 w-full">
            <textarea
              name="improvementText"
              id="improvementText"
              placeholder="InnoBee could..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={5}
              value={improvementText}
              onChange={(e) => setImprovementText(e.target.value)}
            ></textarea>
          </div>

          {/* Adjusted button width */}
          <button
            className="bg-brown hover:bg-pri-color text-white py-2 rounded-lg mt-4 w-48"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeedBackInput;