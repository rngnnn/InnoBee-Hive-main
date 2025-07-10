import { useState } from "react";
import { Link } from "react-router-dom";

import { Modal } from "antd";

import Man from "../../assets/images/man.jpg";
import Checkbox from "../Checkbox";
import { FaPlus } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

const CreateTeamModal = ({ onCloseModal, openModal }) => {
  const [checked, setChecked] = useState(false);

  const onChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Modal
      onCancel={onCloseModal}
      open={openModal}
      width={1000}
      footer={null}
      className="p-0"
    >
      <div className="flex items-center pb-2">
        <h2 className="sm:text-2xl font-bold">Create a team</h2>
      </div>
      <div className="flex gap-5 max-md:flex-col mt-8">
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img
              src={Man}
              alt="profile-pic"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="">
              <button className="btnn">Update</button>
            </div>{" "}
            <button className="flex items-center gap-1">
              <FiTrash2 />
              Remove
            </button>
          </div>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="teamName" className="font-semibold">
                Team Name <span className="text-red-400">*</span>
              </label>
              <input
                name="teamName"
                id="teamName"
                className="rounded-lg shadow focus:border-pri-color focus:border-1 transition-all duration-300 outline-none p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="font-semibold">
                Request Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Tell us about yourself"
                rows={5}
                className="rounded-lg shadow focus:border-pri-color focus:border-1 transition-all duration-300 outline-none p-2"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="teamLoacation" className="font-semibold">
                Team Location <span className="text-red-400">*</span>
              </label>
              <input
                name="teamLoacation"
                id="teamLoacation"
                className="rounded-lg shadow focus:border-pri-color focus:border-1 transition-all duration-300 outline-none p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="teamMotto" className="font-semibold">
                Team Motto <span className="text-red-400">*</span>
              </label>
              <input
                name="teamMotto"
                id="teamMotto"
                className="rounded-lg shadow focus:border-pri-color focus:border-1 transition-all duration-300 outline-none p-2"
              />
            </div>
            <div className="flex items-center gap-1">
              <Checkbox checked={checked} onChange={onChange} />
              <Link to="/">Team Agreement</Link>
            </div>
          </form>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="font-semibold">
            Type in your team member’s email address to invite them to your
            team:
          </h2>
          <input
            name="username"
            id="username"
            placeholder="Enter user name to invite users to your team."
            className="rounded-lg shadow focus:border-pri-color focus:border-1 transition-all duration-300 outline-none p-2"
          />
          <input
            name="email"
            id="email"
            placeholder="Enter user email to invite users to your team."
            className="rounded-lg shadow focus:border-pri-color focus:border-1 transition-all duration-300 outline-none p-2"
          />
          <textarea
            name="bulk"
            id="bulk"
            placeholder="Bulk add: Separate email addresses with a comma ( , ) and invite multiple people to your
team."
            rows={5}
            className="rounded-lg shadow focus:border-pri-color focus:border-1 transition-all duration-300 outline-none p-2"
          ></textarea>
          <button className="flex items-center gap-1 font-bold underline">
            <FaPlus /> Add more
          </button>
        </div>
      </div>
      <div className="mt-14 flex justify-end">
        <button className="px-6 py-2 bg-brown text-white font-bold rounded">
          Create Team
        </button>
      </div>
    </Modal>
  );
};

export default CreateTeamModal;
