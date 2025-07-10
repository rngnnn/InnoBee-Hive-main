import { useState } from "react";
import { Link } from "react-router-dom";

import { Modal } from "antd";

import Man from "../../assets/images/man.jpg";
import Checkbox from "../Checkbox";

const SeekTeamModal = ({ onCloseModal, openModal }) => {
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
        <h2 className="sm:text-2xl font-bold">Seek a team</h2>
      </div>
      <div className="flex gap-5 max-md:flex-col mt-8">
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex gap-3">
            <img
              src={Man}
              alt="profile-pic"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h6 className="font-bold text-brown underline">Adam Smith</h6>
              <p className="text-xs">London, UK</p>
              <p className="text-xs">Innovation Management Expert</p>
            </div>
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
          <div className="flex items-center gap-1">
            <Checkbox checked={checked} onChange={onChange} />
            <Link to="/">Team Agreement</Link>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4"></div>
      </div>
      <div className="mt-14 flex justify-end">
        <button className="px-6 py-2 bg-brown text-white font-bold rounded">
          Seek Team
        </button>
      </div>
    </Modal>
  );
};

export default SeekTeamModal;
