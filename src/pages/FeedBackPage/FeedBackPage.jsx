import React, { useState } from "react";

import FeedbackBar from "./FeedBackBar";
import FeedBackInput from "./FeedBackInput";
import FeedBackInterest from "./FeedBackInterest";
import FeedBackThanks from "./FeedBackThanks";

const FeedBackPage = () => {
  const [feedbackState, setFeedbackState] = useState(1);
  const [feedbackData, setFeedbackData] = useState({
    rating: null,
    improvementText: "",
    interestedInResearch: null,
    email: "",
  });
  const [progress, setProgress] = useState(0); // Basic progress indicator
  const totalSteps = 3; // Corrected total number of interactive steps

  const updateFeedbackData = (data) => {
    setFeedbackData((prevData) => ({ ...prevData, ...data }));
  };

  const handleNext = () => {
    if (feedbackState < totalSteps) {
      setFeedbackState((prevState) => prevState + 1);
      setProgress(((feedbackState + 1) / totalSteps) * 100); // Corrected progress calculation
    } else if (feedbackState === totalSteps) {
      // Move to the thank you page after the last interactive step
      setFeedbackState(4);
      setProgress(100);
    }
  };

  const handlePrevious = () => {
    if (feedbackState > 1) {
      setFeedbackState((prevState) => prevState - 1);
      setProgress(((feedbackState - 2) / totalSteps) * 100); // Corrected progress calculation
    }
  };

  const handleFinish = () => {
    // In a real application, you would submit the feedback here
    console.log("Feedback Data:", feedbackData);
    setFeedbackState(4); // Move to the thank you page
    setProgress(100);
  };

  const handleStartNewFeedback = () => {
    setFeedbackState(1);
    setFeedbackData({
      rating: null,
      improvementText: "",
      interestedInResearch: null,
      email: "",
    });
    setProgress(0);
  };

  return (
    <div>
      <h4 className="y-3 font-semibold text-xl">Give feedback</h4>
      <p className="py-6">Help us improve InnoBee for everyone.</p>
      <div className="max-w-sm md:max-w-none mx-auto">
        {/* Progress Indicator */}
        {feedbackState < 4 && feedbackState >= 1 && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-gradient-to-r from-yellow-300 to-pri-color h-2 rounded-full"
              style={{ width: `${(feedbackState / totalSteps) * 100}%` }}>
            </div>
          </div>
        )}

        {feedbackState === 1 && (
          <FeedbackBar
            onNextStep={handleNext}
            updateFeedbackData={updateFeedbackData}
            initialRating={feedbackData.rating} // Pass down the current rating if going back
          />
        )}
        {feedbackState === 2 && (
          <FeedBackInput
            onNextStep={handleNext}
            onPreviousStep={handlePrevious}
            updateFeedbackData={updateFeedbackData}
            initialText={feedbackData.improvementText} // Pass down the current text if going back
          />
        )}
        {feedbackState === 3 && (
          <FeedBackInterest
            onFinish={handleFinish}
            onPreviousStep={handlePrevious}
            updateFeedbackData={updateFeedbackData}
            initialInterest={feedbackData.interestedInResearch} // Pass down the current interest if going back
          />
        )}
        {feedbackState === 4 && (
          <FeedBackThanks onStartNewFeedback={handleStartNewFeedback} />
        )}
      </div>
    </div>
  );
};

export default FeedBackPage;