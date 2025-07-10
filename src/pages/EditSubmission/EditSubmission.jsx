import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import Preview from "../ManageChallengeSubmissionForm/components/preview";
import DashboardHeader from "src/components/bee-interface/DashboardHeader";
import useMenuItems from "./useMenuItems";

const props = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const EditSubmission = () => {
  const menuItems = useMenuItems();
  return (
    <div className="flex flex-col gap-6 pb-10 ">
      <DashboardHeader
        title="Edit Submission"
        goBackLink="/my-submission"
        menuItems={menuItems}
      />

      <div className="w-full space-y-6 my-4">
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            className=" w-full bg-white h-11 outline-none px-2 rounded-lg focus:border-pri-color border-1"
          />
          <p className="text-xs text-gray-500">
            Give your submission idea a catch title that describes the idea and
            gets people interested.
          </p>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold">
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Short Description (Max 140 characters)"
            className=" w-full bg-white h-11 outline-none p-2 min-h-40  rounded-lg focus:border-pri-color border-1"
          />
          <p className="text-xs text-gray-500">
            Provide a brief description of your idea. Be clear and concise.
          </p>
        </div>
        <div className="flex flex-col gap-6 w-full mb-4">
          <label className="font-semibold">
            Image <span className="text-red-500">*</span>
          </label>
          <Upload {...props}>
            <Button
              className="rounded-2xl border-2 border-brown static"
              icon={<UploadOutlined />}
            >
              Click to Upload
            </Button>
          </Upload>
        </div>
        <Preview />
      </div>
    </div>
  );
};

export default EditSubmission;
