import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import createdIcon from "../../assets/images/FreemiumBabyeeModal.png";
import { Button } from "../buttons/Button";

const FreemiumBaybee = ({ onCloseModal, openModal }) => {
  const navigate = useNavigate();

  const handleNavigateToBillingPage = () => {
    navigate("/account/billing");
  };

  const handleNavigateToPricing = () => {
    navigate("/pricing");
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
            alt="You’re on freemium plan BayBee!"
            width={150}
            height={150}
          />
          <p className="text-lg font-bold mt-6">You’re on freemium plan BayBee!</p>
          <div className="text-center text-base md:whitespace-nowrap ">
            You need to upgrade your account to one of the paid plans to
            <br className="hidden md:inline" />
            access this service.
            <br />
            <div
              className="flex items-center gap-1 justify-center"
              onClick={handleNavigateToEditChallenge}
            >
              <span className="text-brown font-medium border-b-brown border-b-2 cursor-pointer">
              Compare features by category
              </span>{" "}
              <HiOutlineArrowNarrowRight />
            </div>{" "}
          </div>
          <div className="flex flex-col gap-3 py-4"></div>

          <Button
            label="Upgrade Now"
            variant="neutral"
            className="w-full text-[1rem]"
            onClick={handleNavigateToPreviewChallenge}
          />
        </div>
      </Modal>
    </>
  );
};

export default FreemiumBaybeeModal;
