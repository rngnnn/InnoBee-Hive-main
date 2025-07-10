import { useState } from "react";
import DashboardHeader from "src/components/bee-interface/DashboardHeader";
import { useMenuItems } from "./Usemenuitems";
import ReactQuill from "react-quill";
import { motion } from "framer-motion";
import "react-quill/dist/quill.snow.css"; // Ensure Quill styles load
import "src/index.css"; // Import external CSS

const Guidelines = () => {
  const [description, setDescription] = useState("");

  const handleChange = (value) => {
    setDescription(value);
  };

  const menuItems = useMenuItems();
  return (
    <>
      <DashboardHeader title="Manage Challenge" menuItems={menuItems} />
      <br />

      {/* Editor Title */}
      <h6 className="font-bold text-lg mt-2">Guidelines</h6>

      <p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
        Use this section to clearly define the rules of your challenge. The problem statement, available solutions, pain points, the challenge rules and deadlines, the criteria for judging the submissions, and how the prize is won, can all be part of your challenge guidelines.
        </p>{" "}

      <motion.div
        className="relative flex flex-col w-full gap-4 bg-white rounded-lg p-6 shadow-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 h-full w-2 rounded-lg rounded-r-none bg-linearGradientToBottom shadow-sm" />

        {/* Editor Title */}
        <h6 className="font-bold text-lg mt-2">Guidelines</h6>

        {/* Quill Editor with Increased Height */}
        <ReactQuill
          value={description}
          onChange={handleChange}
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
          className="editor" // Applied external CSS class
        />
        {/* Checkbox with Increased Size */}
        <div className="flex items-center gap-2 text-gray-600">
          <input type="checkbox" id="enable" className="checkbox-custom" />
          <label htmlFor="enable" className="cursor-pointer select-none font-semibold text-sm">
            Enable guidelines
          </label>
          
        </div>   
      </motion.div>
      <br />
      <br />
    </>
  );
};

export default Guidelines;