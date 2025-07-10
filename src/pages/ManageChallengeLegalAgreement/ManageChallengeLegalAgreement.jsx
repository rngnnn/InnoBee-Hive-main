import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DashboardHeader from "src/components/bee-interface/DashboardHeader";
import LegalAgreementMenuItems from "./LegalAgreementMenuItems";
import { motion } from "framer-motion"; // Import motion

const ManageChallengeLegalAgreement = () => {
  const [content, setContent] = useState(`
    <h2>Challenge-Specific Agreement</h2>
    <p><strong>PLEASE READ THIS CAREFULLY!</strong> You ("Innovator") and P&G Inc. ("Challenge Sponsor") are entering into this Challenge-Specific Agreement ("CSA") for this particular incentive-based competition ("Challenge") only.</p>
    <p>In order to participate in this Challenge, Innovator must accept these terms and should take the time to understand them.</p>
     <p>If Innovator clicks "Accept" and proceeds to register for this Challenge, this CSA will be a valid and binding agreement between Innovator and Challenge Sponsor...</p>
  `);

  const [showIPModal, setShowIPModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedIP, setSelectedIP] = useState("IP is Open Sourced");

  const handleReGenerate = () => {
    setContent(`
      <h2>Challenge-Specific Agreement</h2>
      <p>New agreement content...</p>
    `);
  };

  const handleUpdate = () => {
    alert("Agreement updated successfully!");
  };

  const handleSelection = (event) => {
    setSelectedIP(event.target.value);
  };

  const handleIPModalOpen = () => {
    setShowIPModal(true);
  };

  const handlePreviewModalOpen = () => {
    setShowPreviewModal(true);
  };

  const handleSave = () => {
    // Implement your save logic here
    alert("Agreement saved!");
  };

  const menuItems = LegalAgreementMenuItems({
    onReGenerate: handleReGenerate,
    onIPModalOpen: handleIPModalOpen,
    onPreviewModalOpen: handlePreviewModalOpen,
    onSave: handleSave,
  });

  return (
    <>
      <div>
      <DashboardHeader title="Manage Challenge" menuItems={menuItems} />
      <br />
      
      <h6 className="font-bold text-lg mt-2">Legal Agreement</h6>

      <p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
        Review and customize your Challenge-Specific Agreement (CSA) here. Every
        user who registers to participate in your challenge will need to accept
        this agreement. The Legal Agreement cannot be revised once the challenge
        goes into the Enter stage.
      </p>
      <div>
        {/* Intellectual Property Notice */}
        <br className="sm:hidden" />
        <div className="flex items-center mb-2 sm:mb-4">
          <span className="ml-2 text-gray-800 text-sm">Intellectual Property:</span>
          <span className="text-gray-800 font-semibold">{selectedIP}</span>
        </div>

        {showIPModal && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-brown bg-opacity-50 z-max"
            onClick={() => setShowIPModal(false)} // Close when clicking outside the modal
          >
            <div
              className="bg-white p-4 rounded-lg w-11/12 sm:w-1/3 shadow-lg relative animate-fadeInScale"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <h2 className="text-base font-semibold mb-3">
                Who owns the Intellectual Property?
              </h2>
              <ul className="space-y-1">
                {[
                  "IP is Open Sourced",
                  "Innovator Shares IP",
                  "IP is Transferred to Sponsor",
                  "Innovator Keeps IP",
                  /* "TBD", */
                ].map((option) => (
                  <li key={option}>
                    <label className="flex items-center cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="ip"
                        value={option}
                        checked={selectedIP === option}
                        onChange={handleSelection}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => setShowIPModal(false)}
                  className="bg-brown px-3 py-2 rounded-lg text-white hover:bg-pri-color transition duration-200 text-sm"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <motion.div // Added motion.div here
        className="relative flex flex-col w-full gap-2 sm:gap-4 bg-white rounded-lg p-4 sm:p-6 shadow-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 h-full w-1 rounded-lg rounded-r-none bg-linearGradientToBottom shadow-sm sm:w-2" /> 

        {/* Editor Title */}
        <h6 className="font-bold text-base mt-1 sm:mt-2">Legal Agreement</h6>

        {/* Quill Editor with Increased Height */}
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              [{ align: [] }],
              ["clean"],
            ],
          }}
          className="editor mobile-editor-height" // Applied external CSS class for mobile height
        />
      </motion.div>

      {showPreviewModal && (
        <div className="fixed inset-0 bg-brown bg-opacity-50 flex items-center justify-center z-max">
          <div className="bg-white p-4 rounded-lg w-11/12 sm:w-1/3 shadow-lg">
            <h2 className="text-base font-semibold mb-3">Preview CSA</h2>
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="border p-2"
              style={{ fontSize: '0.9rem' }}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="bg-brown hover:bg-pri-color px-3 py-2 rounded-lg text-white text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default ManageChallengeLegalAgreement;