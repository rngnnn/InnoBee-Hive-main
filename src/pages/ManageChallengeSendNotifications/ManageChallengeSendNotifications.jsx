import DashboardHeader from "src/components/bee-interface/DashboardHeader";
import useMenuItems from "./SendNotificationMenuItems";
import SendNotificationCard from "./SendNotificationCard";
import { useSendNotificationData } from "./SendNotificationContext";
import { AnimatePresence } from "framer-motion";
import { NotificationProvider } from "./SendNotificationContext";

const ManageChallengeNotifications = () => {
  const { menuItems, NotificationListModal } = useMenuItems();
  const { notificationsData, setNotificationsData } = useSendNotificationData();

  return (
    <div>
        <DashboardHeader title="Manage Challenge" menuItems={menuItems} />
      <br />

      <h6 className="font-bold text-lg mt-2">Send Notifications</h6>

      <p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
        Send a notification to the inboxes of challenge participants by clicking the ‘Create new notification’ button. By clicking this button, you will be able to choose which participants to include or exclude. You can send the notification right away, save it as a draft, or schedule it to be sent automatically at a later date. This information includes a title, description, a document or image, a link, and the date the event happened.
      </p>
      <div className="flex flex-col w-full gap-4">
        <AnimatePresence>
          {notificationsData.map((item) => (
            <SendNotificationCard
              key={item.uuid}
              item={item}
            />
          ))}
        </AnimatePresence>
      </div>
      <NotificationListModal />
      <br /> {/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
      <br /> {/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
    </div>
  );
};

const ManageChallengeSendNotificationsWithProvider = () => (
  <NotificationProvider>
    <ManageChallengeNotifications />
  </NotificationProvider>
);

export default ManageChallengeSendNotificationsWithProvider;