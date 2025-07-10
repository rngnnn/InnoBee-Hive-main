import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import CorrectIcon from "../../../src/assets/icons/correct-icon.svg";

const FeedBackThanks = ({ onStartNewFeedback }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-lg px-6 py-20 border-4 border-gray-200 text-center">
          <div className="mb-8">
            <img src={CorrectIcon} alt="" className="w-14 h-14 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Thanks for your feedback!
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Your input helps us improve InnoBee.
          </p>
          {/* Adjusted button width */}
          <button
            className="bg-brown hover:bg-pri-color text-white py-2 rounded-lg w-64"
            onClick={onStartNewFeedback}
          >
            Submit Another Feedback
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeedBackThanks;