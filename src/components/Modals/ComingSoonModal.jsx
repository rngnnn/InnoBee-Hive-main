import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import createdIcon from "../../assets/images/ComingSoonModal.png";
import { Button } from "../buttons/Button";

const ComingSoonModal = ({ onCloseModal, openModal }) => {
  const navigate = useNavigate();

  const handleNavigateToSuggestImprovement = () => {
    navigate('/need-help/improvement');
  };

  const handleNavigateToGiveFeedback = () => {
    navigate('/need-help/feedback');
  };

  return (
    <>
      <Modal
        open={openModal}
        onCancel={onCloseModal}
        centered
        mask={false}
        footer={null}
        closable={false}
      >
        <div className="flex flex-col items-center p-4 gap-2 max-sm:p-0 w-full">
          <img
            src={createdIcon}
            alt="Something awesome is coming!"
            width={150}
            height={150}
          />
          <p className="text-lg font-bold mt-6">Something awesome is coming!</p>
          <div className="text-center text-base md:whitespace-nowrap ">
          We're working hard like bees to bring you something amazing!
            <br className="hidden md:inline" />
            Bee positive and help us improve InnoBee!
            <br />
            <div
              className="flex items-center gap-1 justify-center"
              onClick={handleNavigateToSuggestImprovement}
            >
              <span className="text-brown font-medium border-b-brown border-b-2 cursor-pointer">
              Suggest improvement
              </span>{" "}
              <HiOutlineArrowNarrowRight />
            </div>{" "}
          </div>
          <div className="flex flex-col gap-3 py-4"></div>

          <Button
            label="Give Feedback"
            variant="neutral"
            className="w-full text-[1rem]"
            onClick={handleNavigateToGiveFeedback}
          />
        </div>
      </Modal>
    </>
  );
};

export default ComingSoonModal;
