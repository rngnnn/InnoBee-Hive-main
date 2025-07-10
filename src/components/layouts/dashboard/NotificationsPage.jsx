import React, { useState, useEffect, useRef, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { IoBulbOutline, IoPersonOutline, IoScaleOutline, IoChatbubbleOutline, IoNotificationsOutline } from 'react-icons/io5';
import { Trash2 } from 'lucide-react';

const notificationIcons = {
  challenge: <IoBulbOutline className="text-pri-color text-xl h-10 w-10" />,
  account: <IoPersonOutline className="text-blue-light text-xl h-10 w-10" />,
  judging: <IoScaleOutline className="text-sec-color text-xl h-10 w-10" />,
  forum: <IoChatbubbleOutline className="text-gray-darker text-xl h-10 w-10" />,
  default: <IoNotificationsOutline className="text-gray-default text-xl h-10 w-10" />,
};

const itemsPerPage = 10;

const NotificationItem = ({ notification, markAsRead, handleDeleteNotification }) => (
  <li
    className={`notification-item flex justify-between items-center rounded-lg border border-gray-default bg-white shadow-subtle transition-shadow duration-150 hover:shadow-md mb-4 p-4 ${
      !notification.isRead ? 'border-l-4 border-l-pri-color bg-gray-light font-semibold' : ''
    }`}
  >
    <div className="flex items-center flex-grow">
      <span className="mr-4">{notificationIcons[notification.type] || notificationIcons.default}</span>
      <div className="flex-grow">
        <h4 className={`text-lg ${!notification.isRead ? 'text-brown' : 'text-gray-darker'} mb-1`}>
          {notification.title}
        </h4>
        <p className="text-sm text-gray-dark line-clamp-2">{notification.message}</p>
        <div className="text-xs text-gray-darker mt-1">
          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
        </div>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      {!notification.isRead && (
        <button onClick={() => markAsRead(notification.id)} className="mark-read-button text-green-dark hover:text-green-light transition-colors duration-150">
          Mark as Read
        </button>
      )}
      <button className="delete-button text-red-dark hover:text-red-light transition-colors duration-150" onClick={() => handleDeleteNotification(notification.id)}>
        <Trash2 size={28} />
      </button>
    </div>
  </li>
);

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const notificationsListRef = useRef(null);

  useEffect(() => {
    // Simulate fetching a larger set of notifications
    setTimeout(() => {
      const allNotifications = [
        { id: 1, type: 'challenge', title: 'New Update for "Innovation Challenge 2025"', message: 'A new guideline document has been added to the challenge.', timestamp: '2025-04-11T23:55:00.000Z', isRead: false },
        { id: 2, type: 'account', title: 'Welcome to InnoBee Hive!', message: 'Thank you for joining our community. Complete your profile to get started.', timestamp: '2025-04-10T10:30:00.000Z', isRead: true },
        { id: 3, type: 'judging', title: 'Invitation to Judge "Sustainable Solutions Challenge"', message: 'You have been invited to judge submissions for the "Sustainable Solutions Challenge".', timestamp: '2025-04-09T16:00:00.000Z', isRead: false },
        { id: 4, type: 'forum', title: 'New Post in "General Discussion" Forum', message: 'A new topic has been created in the "General Discussion" forum.', timestamp: '2025-04-08T09:15:00.000Z', isRead: true },
        { id: 5, type: 'challenge', title: 'Submission Deadline Approaching', message: 'Reminder: The submission deadline for "AI for Good" is in 2 days!', timestamp: '2025-04-12T01:00:00.000Z', isRead: false },
        { id: 6, type: 'account', title: 'Password Reset Successful', message: 'Your password has been successfully reset.', timestamp: '2025-04-07T14:20:00.000Z', isRead: true },
        { id: 7, type: 'challenge', title: 'Winner Announcement!', message: 'The winners of the "Clean Energy Innovation" challenge have been announced.', timestamp: '2025-04-06T18:45:00.000Z', isRead: true },
        { id: 8, type: 'judging', title: 'Judging Deadline Reminder', message: 'The deadline for judging submissions in "EdTech Challenge" is tomorrow.', timestamp: '2025-04-05T11:22:00.000Z', isRead: false },
        { id: 9, type: 'forum', title: 'New Reply in "Project Feedback"', message: 'Someone replied to your post in the "Project Feedback" forum.', timestamp: '2025-04-04T20:01:00.000Z', isRead: true },
        { id: 10, type: 'account', title: 'Profile Updated', message: 'Your profile information has been updated successfully.', timestamp: '2025-04-03T09:50:00.000Z', isRead: true },
        { id: 11, type: 'challenge', title: 'Challenge Approved', message: 'Your challenge "Future of Mobility" has been approved and is now published.', timestamp: '2025-04-02T14:33:00.000Z', isRead: true },
        { id: 12, type: 'judging', title: 'New Submissions to Review', message: 'New submissions are available for your review in the "Smart City Solutions" challenge.', timestamp: '2025-04-01T16:17:00.000Z', isRead: false },
        { id: 13, type: 'challenge', title: 'Another Update', message: 'This is another update for a challenge.', timestamp: '2025-03-31T10:00:00.000Z', isRead: false },
        { id: 14, type: 'account', title: 'Security Alert', message: 'Suspicious activity detected on your account. Please review your recent logins.', timestamp: '2025-03-30T12:00:00.000Z', isRead: false },
        { id: 15, type: 'judging', title: 'Feedback Received', message: 'The challenge poster has provided feedback on your judging scores.', timestamp: '2025-03-29T18:00:00.000Z', isRead: true },
        { id: 16, type: 'forum', title: 'Topic Closed', message: 'The topic "Brainstorming Session" has been closed by a moderator.', timestamp: '2025-03-28T09:00:00.000Z', isRead: true },
        { id: 17, type: 'challenge', title: 'Yet Another Update', message: 'More details about the upcoming webinar.', timestamp: '2025-03-27T11:00:00.000Z', isRead: false },
        { id: 18, type: 'account', title: 'Email Address Verified', message: 'Your email address has been successfully verified.', timestamp: '2025-03-26T15:00:00.000Z', isRead: true },
        { id: 19, type: 'judging', title: 'Results Published', message: 'The results for the first round of judging are now available.', timestamp: '2025-03-25T09:30:00.000Z', isRead: false },
        { id: 20, type: 'forum', title: 'New Poll Created', message: 'A new poll has been created in the "Community Lounge".', timestamp: '2025-03-24T17:45:00.000Z', isRead: true },
      ];
      setNotifications(allNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = filter === 'all'
      ? notifications
      : notifications.filter((n) => n.type === filter);

    const startIndex = 0;
    const endIndex = page * itemsPerPage;
    const currentVisible = filtered.slice(startIndex, endIndex);

    setVisibleNotifications(currentVisible);
    setHasMore(endIndex < filtered.length);
  }, [notifications, filter, page]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== notificationId)
    );
  };

  const markAsRead = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, loading]);

  const handleScroll = useCallback(() => {
    if (notificationsListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = notificationsListRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 20 && hasMore && !loading) {
        loadMore();
      }
    }
  }, [loadMore, hasMore, loading]);

  useEffect(() => {
    const listElement = notificationsListRef.current;
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
      return () => listElement.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  if (loading) {
    return <div className="text-center text-gray-darker py-6">Loading notifications...</div>;
  }

  if (error) {
    return <div className="text-center text-red-dark py-6">Error loading notifications: {error}</div>;
  }

  if (notifications.length === 0 && filter === 'all') {
    return <div className="text-center text-gray-dark py-6 italic">No notifications yet!</div>;
  }

  if (visibleNotifications.length === 0 && filter !== 'all') {
    return <div className="text-center text-gray-dark py-6 italic">No notifications match this filter.</div>;
  }

  return (
    <><h4 className="y-3 font-semibold text-xl">Notifications</h4>
    <p className="py-6">Here are your latest notifications. </p>
    <div className="p-0 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-2xl text-brown font-semibold"></h4>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <label htmlFor="filter" className="sr-only">
              Filter by:
            </label>
            <select
              value={filter}
              onChange={handleFilterChange}
              className="block appearance-none w-full bg-white border border-gray-default hover:border-gray-dark px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline-yellow focus:border-yellow-focus"
              id="filter"
            >
              <option value="all">All</option>
              <option value="challenge">Challenge</option>
              <option value="account">Account</option>
              <option value="judging">Judging</option>
              <option value="forum">Forum</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-darker">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          {notifications.some((n) => !n.isRead) && (
            <button onClick={markAllAsRead} className="bg-brown hover:bg-pri-color text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-yellow">
              Mark All as Read
            </button>
          )}
        </div>
      </div>

      <ul className="notifications-list overflow-y-auto" ref={notificationsListRef}>
        {visibleNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            markAsRead={markAsRead}
            handleDeleteNotification={handleDeleteNotification} />
        ))}
        {loading && <li className="text-center text-gray-darker py-3">Loading more notifications...</li>}
        {!hasMore && visibleNotifications.length > 0 && <li className="text-center text-gray-dark py-3">No more notifications.</li>}
      </ul>
    </div></>
  );
};

export default NotificationsPage;