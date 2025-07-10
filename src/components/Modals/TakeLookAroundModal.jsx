import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { IoMdCheckmark } from "react-icons/io";

const TakeLookAroundModal = ({ onCloseModal, openModal, onboardingPopups }) => {
  const navigate = useNavigate();

  const handleNavigateToHelpCenter = () => {
    navigate("/help-center");
  };
  const handleContentClick = () => {
    onCloseModal();
  };

  return (
    <>
      <Modal onCancel={onCloseModal} open={openModal} centered footer={null}>
        <div className="flex flex-col pb-2 gap-2">
          <p className="text-base font-semibold">Take a look around</p>
          <p>
            Select one of the options below to learn more about the dashboard.{" "}
            <br />
            You can also check the{" "}
            <span
              onClick={handleNavigateToHelpCenter}
              className="text-yellow-dark font-medium border-b-yellow-dark border-b-2 cursor-pointer"
            >
              Help Center
            </span>{" "}
            for more information.
          </p>
          <div className="flex flex-col gap-3 py-4">
            {onboardingPopups.map(({ description, completed, step }, index) => (
              <div className="flex items-center justify-between" key={index}>
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      completed ? "bg-yellow-dark" : "bg-gray-300"
                    }`}
                  >
                    {completed && (
                      <span className="text-white">
                        <IoMdCheckmark />
                      </span>
                    )}
                  </div>
                  <div
                    onClick={handleContentClick}
                    className="ml-4 border-b-brown border-b leading-4 cursor-pointer"
                  >
                    <div>{description}</div>
                  </div>
                </div>
                <div>{step}</div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TakeLookAroundModal;
