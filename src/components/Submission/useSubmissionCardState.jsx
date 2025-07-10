import { useState } from "react";
import { Link } from "react-router-dom";
import Preview from "../../assets//icons/eye.svg";
import Delete from "../../assets/icons/delete.svg";
import Edit from "../../assets/icons/edit.svg";
import Leave from "../../assets/icons/leave.svg";
import Team from "../../assets/icons/team.svg";

export default function useSubmissionCardState() {
  const [showDropDown, setShowDropdown] = useState(false);

  const onDeleteSubmission = () => {
  //   TODO: send request to backend
  //   TODO: refresh submission cards list
  };
  const onLeaveChallenge = () => {
  //   TODO: send request to backend
  //   TODO: refresh submission cards list
  };

  // TODO: style items
  const items = [
    {
      label: (
        <Link
          to="/edit-submission"
          className="flex-center gap-2 px-0 hover:bg-slate-100 transition-all py-1"
        >
          <img src={Edit} alt="" className="h-4 w-4 object-contain" />{" "}
          <p className=" whitespace-nowrap text-sm">Edit submission</p>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link
          to="/preview-submission"
          className="flex-center gap-2 px-0 hover:bg-slate-100 transition-all py-1"
        >
          <img src={Preview} alt="" className="h-4 w-4 object-contain" />{" "}
          <p className=" whitespace-nowrap text-sm">Preview submission</p>
        </Link>
      ),
      key: "1",
    },
    {
     label: (
       <Link
         to="/my-submission/team-collaboration"
         className="flex-center gap-2 px-0 hover:bg-slate-100 transition-all py-1"
       >
         <img src={Team} alt="" className="h-4 w-4 object-contain" />{" "}
         <p className=" whitespace-nowrap text-sm">Team collaboration</p>
       </Link>
     ),
     key: "2",
    },
    {
      label: (
        <button
          onClick={onDeleteSubmission}
          className="flex-center gap-2 px-0 hover:bg-slate-100 transition-all py-1"
        >
          <img src={Delete} alt="" className="h-4 w-4 object-contain" />{" "}
          <p className=" whitespace-nowrap text-sm">Delete submission</p>
        </button>
      ),
      key: "3",
    },
    {
      label: (
        <button
          onClick={onLeaveChallenge}
          className="flex-center gap-2 px-0 hover:bg-slate-100 transition-all py-1"
        >
          <img src={Leave} alt="" className="h-4 w-4 object-contain" />{" "}
          <p className=" whitespace-nowrap text-sm">Leave challenge</p>
        </button>
      ),
      key: "4",
    },
  ];

  return { items, showDropDown, setShowDropdown };
}
