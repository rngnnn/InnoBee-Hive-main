import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import createdIcon from "../../assets/images/challenge-created.png";
import { Button } from "../../components/buttons/Button";

const ChallengeModal = ({ onCloseModal, openModal }) => {
  const navigate = useNavigate();

  const handleNavigateToEditChallenge = () => {
    navigate("/manage-challenge/overview");
  };

  const handleNavigateToPreviewChallenge = () => {
    navigate("/my-challenges");
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
            alt="Challenge Created"
            width={150}
            height={150}
          />
          <p className="text-lg font-bold mt-6">Challenge Created!</p>
          <div className="text-center text-base md:whitespace-nowrap ">
            Great job on creating a challenge! Preview your challenge page and
            <br className="hidden md:inline" />
            add more information to it by using the manage challenge submenus.
            <br />
            <div
              className="flex items-center gap-1 justify-center"
              onClick={handleNavigateToPreviewChallenge}
            >
              <span className="text-brown font-medium border-b-brown border-b-2 cursor-pointer">
                Preview challenge page
              </span>{" "}
              <HiOutlineArrowNarrowRight />
            </div>{" "}
          </div>
          <div className="flex flex-col gap-3 py-4"></div>

          <Button
            label="Manage the challenge"
            variant="neutral"
            className="w-full text-[1rem]"
            onClick={handleNavigateToEditChallenge}
          />
        </div>
      </Modal>
    </>
  );
};

export default ChallengeModal;
