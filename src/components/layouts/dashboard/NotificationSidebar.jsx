import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { AiOutlineLike } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { IoCloseOutline, IoGiftOutline } from "react-icons/io5";
import PackageImage from "../../../assets/images/Screenshot 2024-07-26 at 5.58.35 AM.png";
import { BsThreeDots } from "react-icons/bs";

import { Button } from "src/components/buttons/Button"; // Using your custom Button
import Dropdown from "src/components/Dropdown";
import Delete from "src/assets/icons/delete.svg";
import Envelope from "src/assets/icons/envelope.svg";
import EnvelopeOpen from "src/assets/icons/envelope-open.svg";
import Cursor from "src/assets/icons/cursor.svg";
import { cn } from "src/helpers/utils";
import { useNavigate } from "react-router-dom";

const NotificationSidebar = ({ toggleNotificationSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // TODO: Fetch notifications from the backend once it's done

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Info",
      message: "Be the first to know when innovative challenges are posted",
      status: "unread",
      subscribe: true,
    },
    {
      id: 2,
      type: "Activity",
      status: "unread",
      activities: [
        {
          message: "P&G Inc. followed you",
          time: "08:30",
          icon: <AiOutlineLike />,
        },
        {
          message: "OpenAI messaged you",
          time: "17:30",
          icon: <FiHeart />,
        },
      ],
    },
    {
      id: 3,
      type: "Promo",
      message: "Get 10% OFF Today!",
      image: PackageImage,
    },
    {
      id: 4,
      type: "Rewards",
      message: "Congratulations! You have received a redeem code: NewPupa",
      icon: <IoGiftOutline />,
    },
  ]);

  const dropdownLinks = [
    {
      title: "Delete All",
      imgUrl: Delete,
      onClick: () => setNotifications([]),
    },
    {
      title: "Mark As All Read",
      imgUrl: Envelope,
      onClick: () => console.log("Mark As All Read"),
    },
    {
      title: "Mark As Unread",
      imgUrl: EnvelopeOpen,
      onClick: () => console.log("Mark As Unread"),
    },
    {
      title: "Recent Notifications",
      imgUrl: Cursor,
      onClick: () => console.log("Recent Notifications"),
    },
  ];

  const notificationVariants = {
    closed: {
      x: 100,
    },
    open: {
      x: 0,
    },
  };

  const handleRemoveNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSeeAllNotifications = () => {
    navigate("/notifications");
    toggleNotificationSidebar();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 h-screen w-full bg-brown bg-opacity-50 flex justify-end z-max"
      >
        <motion.div
          variants={notificationVariants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ duration: 0.3 }}
          className="bg-white rounded-l-xl w-96 h-full shadow-lg"
        >
          <div className="flex flex-col justify-between h-full overflow-y-scroll transition-all hide-scrollbar">
            <div className="border-b-1 border-gray-dark">
              <div className="px-4 py-5 bg-gray-100 rounded-tl-xl flex justify-between items-center">
                <h6 className="font-bold">Notifications</h6>
                <button
                  className="text-3xl"
                  onClick={toggleNotificationSidebar}
                >
                  <IoCloseOutline />
                </button>
              </div>

              <div className="mt-6 relative">
                <div className="px-6 flex justify-between mb-4">
                  <h6>All Notifications</h6>
                  <BsThreeDots
                    className="cursor-pointer "
                    onClick={toggleDropdown}
                  />
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <Dropdown dropdownLinks={dropdownLinks} />
                    )}
                  </AnimatePresence>
                </div>
                {notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={
                      (cn(""), // This cn usage seems incorrect; should be `cn("base-classes", { "conditional": condition })`
                      {
                        "bg-gray-100 rounded-none":
                          notification.status === "unread",
                      })
                    }
                    title={notification.type}
                    extra={
                      <CloseOutlined
                        onClick={() =>
                          handleRemoveNotification(notification.id)
                        }
                      />
                    }
                    styles={{
                      header: {
                        borderTop: "1px solid #BFBFBF",
                        borderRight: "1px solid #BFBFBF",
                        borderRadius: "0",
                      },
                      body: {
                        borderRight: "1px solid #BFBFBF",
                        borderRadius: "0",
                      },
                    }}
                  >
                    {notification.type === "Activity" ? (
                      notification.activities.map((activity, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center mb-2"
                        >
                          <div className="flex items-center text-2xl gap-2">
                            {activity.icon}
                            <p className="text-gray-brown text-sm">
                              {activity.message}
                            </p>
                          </div>
                          <p className="text-gray-brown text-sm">
                            {activity.time}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center">
                        {notification.icon && (
                          <div className="text-2xl mr-2">
                            {notification.icon}
                          </div>
                        )}
                        <div>
                          <p className="text-gray-brown text-sm">
                            {notification.message}
                          </p>

                          {/* Using native button for Subscribe */}
                          {notification.subscribe && (
                            <form className="flex items-center justify-between w-full h-10 shadow-md rounded-lg my-3"> {/* Corrected flex-center-between */}
                              <input
                                type="text"
                                className="flex-1 outline-none px-2 text-sm py-2"
                                placeholder="Enter your email"
                              />
                              <button type="submit" className="bg-[#2d2d2d] h-full text-white text-xs p-2 rounded"> {/* Added type="submit" */}
                                Subscribe
                              </button>
                            </form>
                          )}
                          {notification.image && (
                            <img
                              src={notification.image}
                              alt="Promo"
                              className="w-full mt-2"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
            {/* Refactored See All Notifications Button */}
            <Button
              className="w-11/12 mx-auto py-6 my-6 text-base"
               // Removed label prop
              onClick={handleSeeAllNotifications}
            >
              {/* Button text as children */}
              See all notifications
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationSidebar;