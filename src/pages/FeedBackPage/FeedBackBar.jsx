import React, { useState, useEffect } from "react";

import { Slider } from "antd";
import { AnimatePresence, motion } from "framer-motion";

const FeedbackBar = ({ onNextStep, updateFeedbackData, initialRating }) => {
  const [rating, setRating] = useState(initialRating !== undefined ? initialRating : null); // Initialize rating to null
  const [ratingError, setRatingError] = useState(""); // State for the rating error message

  useEffect(() => {
    // Update feedback data whenever the rating changes
    if (rating !== null) {
      updateFeedbackData({ rating });
    }
  }, [rating, updateFeedbackData]);

  const handleNextClick = () => {
    if (rating !== null) {
      onNextStep();
    } else {
      // Set the rating error message
      setRatingError("Please select a rating before proceeding.");
    }
  };

  const handleNumberClick = (value) => {
    setRating(value);
    // Clear the error message when the user interacts with the slider
    setRatingError("");
  };

  const handleSliderChange = (value) => {
    setRating(value);
    // Clear the error message when the user interacts with the slider
    setRatingError("");
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
          <h2 className="font-bold mb-4">
            How has your overall experience been using InnoBee today?
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            If you’re seeking help instead of providing feedback, please reach
            out to our support team by exiting this window.
          </p>

          <div className="relative mb-4 max-w-[600px]">
            <Slider
              step={1}
              min={1}
              max={5}
              value={rating}
              onChange={handleSliderChange} // Use handleSliderChange to clear error
              defaultColor="#FFB000"
              strokeColor={{
                from: "#FFB000",
                to: "#F9DB28",
                direction: "right",
              }}
              trailColor="#FFB000"
            />
          </div>

          <div className="flex justify-between text-sm text-gray-400 mb-4 max-w-[600px] ">
            <p
              className="relative cursor-pointer"
              onClick={() => handleNumberClick(1)}
            >
              1
              <br />
              <span className="block absolute -left-3 top-5">Poor</span>
            </p>
            <p className="cursor-pointer" onClick={() => handleNumberClick(2)}>
              2
            </p>
            <p className="cursor-pointer" onClick={() => handleNumberClick(3)}>
              3
            </p>
            <p className="cursor-pointer" onClick={() => handleNumberClick(4)}>
              4
            </p>
            <h6
              className="relative cursor-pointer"
              onClick={() => handleNumberClick(5)}
            >
              5
              <br />
              <span className="block absolute -right-3 top-5">Excellent</span>
            </h6>
          </div>
          {ratingError && <p className="text-red-500 text-sm mt-8 max-w-[300px]">{ratingError}</p>}

          <button
            className="bg-brown hover:bg-pri-color text-white py-2 rounded-lg w-48 mt-8"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeedbackBar;