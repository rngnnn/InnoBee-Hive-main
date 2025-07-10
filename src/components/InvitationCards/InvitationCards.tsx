import Logo from "../../assets/images/chatgpt-icon.webp";

import { motion } from "framer-motion";

import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { createNDA } from "src/constants/nda-agreements";
import { fadeIn } from "../../anim";
import BaseModal, {
  useBaseModal,
  useHasScrolledBaseModal,
} from "../bee-ui/BaseModal";

type Props = {
  index: number;
  judgeInvitation?: boolean;
};

const InvitationCards: React.FC<Props> = ({ index, judgeInvitation }) => {
  const agreementText = (function () {
    if (judgeInvitation) {
      const judgeName = "Judge"; // TODO: this needs to become a prop, or read from a state that holds the current user full name
      const challengeSponsor = "Challenge Sponsor"; // TODO: this needs to become a prop
      const ndaText = createNDA(challengeSponsor, judgeName);
      return ndaText;
    } else {
      // TODO: handle case of NOT judge invitation (generate a different contract?)
      return "";
    }
  })();

  const { open, toggleModal, onOk, onClose, onCancel } = useBaseModal();
  const navigate = useNavigate();

  const onAcceptAgreement = () => {
    // TODO: send request to backend
    // ...
    // TODO: remove from list of invitations (after request)

    // then redirect to my-tasks
    navigate("/judging/my-tasks");
  };

  const onDeclineAgreement = () => {
    // TODO: send request to backend
    // ...
    // TODO: remove from list of invitations (after request)
  };

  const { bodyRef, hasScrolled } = useHasScrolledBaseModal();
  const okButtonDisabled = !hasScrolled;

  const challengeName = "Elongating food expiration date for dairy products"; // TODO: this needs to become a prop
  const modalTitle = `Solutions for ${challengeName} Agreement`;

  const openModal = () => toggleModal(true);

  return (
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      initial="hidden"
      animate="show"
      key={index}
    >
      <div className="p-2 w-full">
        <BaseModal
          open={open}
          onOk={onAcceptAgreement}
          onClose={onClose}
          onCancel={onCancel}
          title={modalTitle}
          bodyRef={bodyRef}
          okButtonProps={{ disabled: okButtonDisabled }}
        >
          <h1 className="font-bold text-xl mb-4">Agreement</h1>
          <div
            className="whitespace-break-spaces"
            dangerouslySetInnerHTML={{
              // NOTE: Make sure the html is clean and safe!
              __html: agreementText,
            }}
          />
        </BaseModal>
        <div className=" shadow rounded-lg bg-white h-full group relative">
          <div className="h-2 w-full bg-gradient-to-r from-yellow-300 to-pri-color rounded" />

          <div className="w-full relative py-6 sm:px-4 px-2">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <img
                  src={Logo}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex flex-col text-xs">
                  <h6 className="font-bold text-sm">FoodTech Aces</h6>
                  <p>Ghent, Belgium</p>
                  <p>Artificial Intelligence Foundation</p>
                </div>
              </div>
              <button className="bg-gray-900 text-white rounded-full h-7 px-4 text-sm">
                {" "}
                Follow
              </button>
            </div>
            <p className="text-xs py-3 text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              molestiae vitae aut? Voluptatibus accusamus tempora expedita
              distinctio vel quidem dolores ducimus corrupti blanditiis sunt,
              unde veniam itaque aspernatur nam! A?
            </p>
            <div className="flex-center-between">
              <Link to="/" className="flex-center gap-1 text-sm">
                <span className="underline">View challenge</span>
                <span>
                  <FaLongArrowAltRight />
                </span>
              </Link>
              <div className="flex-center text-xs">
                <button
                  className="h-7 rounded-full hover:border-1 hover:border-gray-900 transition-all duration-300 px-2"
                  onClick={onDeclineAgreement}
                >
                  Decline
                </button>
                <button
                  onClick={openModal}
                  className="h-7 rounded-full hover:border-1 hover:border-gray-900 transition-all duration-300  px-2"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InvitationCards;
