import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DashboardHeader from "src/components/bee-interface/DashboardHeader";
import JudgesNDAMenuItems from "./JudgesNDAMenuItems";
import { motion } from "framer-motion"; // Import motion

const ManageChallengeJudgesNDA = () => {
  const [content, setContent] = useState(`
    <h2>Non-Disclosure Agreement</h2>
    <p><strong>PLEASE READ THIS CAREFULLY!</strong> You ("Judge") and P&G Inc. ("Challenge Sponsor") are entering into this Non-Disclosure Agreement ("NDA") for this particular incentive-based competition ("Challenge") only.</p>
    <p>In order to participate in this Challenge, Judge must accept these terms and should take the time to understand them.</p>
      <p>If Judge clicks "Accept" and proceeds to register for this Challenge, this NDA will be a valid and binding agreement between Judge and Challenge Sponsor...</p>
  `);

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showUpdateModal, setshowUpdateModal] = useState(false);

  const handleReGenerate = () => {
    setContent(`
      <h2>Non-Disclosure Agreement</h2>
      <p>New agreement content...</p>
    `);
  };

  const handleSave = () => {
    // Implement your save logic here
    setshowUpdateModal(true);
    setTimeout(() => {
      setshowUpdateModal(false);
    }, 2000);
  };

  const menuItems = JudgesNDAMenuItems({
    onReGenerate: handleReGenerate,
    onPreviewModalOpen: () => setShowPreviewModal(true),
    onSave: handleSave,
  });

  return (
    <>
      <DashboardHeader title="Manage Challenge" menuItems={menuItems} />
      <br />
      <div className="font-bold text-lg mt-2">
        {" "}
        NDA for judges
      </div>

      {/* Subheader */}
      <p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
        {" "}
        Review and customize your NDA for judges. If you enable this option for
        your challenge, every expert you invite as a judges will need to accept
        this agreement. The Non-disclosure Agreement cannot be revised once the
        challenge goes into the judging stage.
      </p>
      <div></div>
      <motion.div
        className="relative flex flex-col w-full gap-4 bg-white rounded-lg p-4 sm:p-6 shadow-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 h-full w-1 sm:w-2 rounded-lg rounded-r-none bg-linearGradientToBottom shadow-sm" />{" "}

        {/* Editor Title */}
        <h6 className="font-bold text-lg mt-2">NDA</h6>

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
          className="editor"
        />
        <div className="flex items-center gap-2 text-gray-600">
          <input type="checkbox" id="enable" className="checkbox-custom" />
          <label
            htmlFor="enable"
            className="cursor-pointer select-none font-semibold text-sm"
          >
            Enable NDA for Judges
          </label>
        </div>
      </motion.div>
      <br />

      {showPreviewModal && (
        <div className="fixed inset-0 bg-brown bg-opacity-50 flex items-center justify-center z-max">
          <div className="bg-white p-4 rounded-lg w-11/12 sm:w-1/3 shadow-lg">
            {" "}
            <h2 className="text-lg font-semibold mb-2 sm:mb-4">
              Preview NDA
            </h2>{" "}
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="border p-2 sm:p-4"
            />{" "}
            <div className="flex justify-end mt-2 sm:mt-4">
              {" "}

              <button
                onClick={() => setShowPreviewModal(false)}
                className="bg-brown hover:bg-pri-color px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white text-sm"
              >
                Close
              </button>{" "}
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="fixed inset-0 bg-brown bg-opacity-50 flex items-center justify-center z-max">
          <div className="bg-white p-4 rounded-lg w-11/12 sm:w-1/3 shadow-lg">
            {" "}
            <h2 className="text-lg font-semibold mb-2 sm:mb-4">
              Update Status
            </h2>{" "}
            <div className="border p-2 sm:p-4 text-center text-gray-800 font-medium text-sm">
              {" "}
              Update successfully
            </div>
            <div className="flex justify-end mt-2 sm:mt-4">
              {" "}
              <button
                onClick={() => setshowUpdateModal(false)}
                className="bg-brown hover:bg-pri-color px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white text-sm"
              >
                {" "}
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageChallengeJudgesNDA;
