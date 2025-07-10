import { createContext, useContext, useState } from 'react';

export const SendNotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
	const [notificationsData, setNotificationsData] = useState([]);

	const addNewNotification = () => {
		const newNotification = {
			uuid: crypto.randomUUID(),
			subject: 'New Notification',
			message: '',
			filterParticipants: [],
			excludeGroups: [],
			location: [],
			document: null,
			image: null,
			dateCreated: null,
			description: '',
			scheduledTime: null,
			status: 'draft',
		};
		setNotificationsData((prev) => [...prev, newNotification]);
	};

	const updateNotification = (uuid, newData) => {
		// Changed function name
		setNotificationsData((prev) =>
			prev.map(
				(
					notification // Changed variable name
				) =>
					notification.uuid === uuid
						? { ...notification, ...newData }
						: notification // Changed variable name
			)
		);
	};

	const deleteNotification = (uuid) => {
		// Changed function name
		setNotificationsData((prev) =>
			prev.filter((notification) => notification.uuid !== uuid)
		); // Changed variable name
	};

	return (
		<SendNotificationContext.Provider // Changed context name
			value={{
				notificationsData, // Changed variable name
				setNotificationsData, // Changed variable name
				addNewNotification, // Changed function name
				updateNotification, // Changed function name
				deleteNotification, // Changed function name
			}}
		>
			{children}
		</SendNotificationContext.Provider>
	);
};

export const useSendNotificationData = () => {
	// Changed function name
	const context = useContext(SendNotificationContext); // Changed context name
	if (!context) {
		throw new Error(
			'NotificationData must be used within a NotificationProvider'
		); // Changed error message
	}
	return context;
};
