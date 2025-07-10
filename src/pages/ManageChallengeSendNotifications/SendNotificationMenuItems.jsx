import { IoAdd, IoMenu, IoSaveOutline } from 'react-icons/io5';
import { useToast } from 'src/hooks/use-toast';
import { useSendNotificationData } from './SendNotificationContext';
import { useState } from 'react';
import { Modal, Table, Button } from 'antd';

const useMenuItems = () => {
	const { toast } = useToast();
	const {
		addNewNotification,
		notificationsData,
		deleteNotification,
		updateNotification,
	} = useSendNotificationData();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedNotification, setSelectedNotification] = useState(null);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedNotification(null);
	};

	const handleSendNow = (record) => {
		updateNotification(record.uuid, { status: 'sent' });
		toast({
			title: 'Notification sent!',
			description: (
				<pre>
					<b className="text-sm">
						The notification has been sent successfully.
					</b>
				</pre>
			),
			duration: 1500,
		});
	};

	const handleSaveDraft = (record) => {
		updateNotification(record.uuid, { status: 'draft' });
		toast({
			title: 'Notification saved as draft!',
			duration: 1500,
		});
	};

	const handleSchedule = (record) => {
		if (record.scheduledTime) {
			updateNotification(record.uuid, { status: 'scheduled' });
			toast({
				title: 'Notification scheduled!',
				description: (
					<pre>
						<b className="text-sm">
							The notification has been scheduled for{' '}
							{new Date(record.scheduledTime).toLocaleString()}.
						</b>
					</pre>
				),
				duration: 1500,
			});
		} else {
			toast({
				title: 'Please select a schedule time!',
				duration: 1500,
			});
		}
	};

	const handleDelete = (record) => {
		deleteNotification(record.uuid);
		toast({
			title: 'Notification deleted!',
			duration: 1500,
		});
	};

	const columns = [
		{
			title: 'Subject', // Changed title
			dataIndex: 'subject', // Changed dataIndex
			key: 'subject', // Changed key
			responsive: ['md'], // Hide on smaller screens
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Scheduled Time',
			dataIndex: 'scheduledTime',
			key: 'scheduledTime',
			render: (text) => (text ? new Date(text).toLocaleString() : '-'),
			responsive: ['lg'], // Hide on smaller screens
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (_, record) => (
				<div className="flex gap-2">
					<Button size="small">Edit</Button> {/* Implement edit logic */}
					{record.status === 'draft' && (
						<Button size="small" onClick={() => handleSendNow(record)}>
							Send Now
						</Button>
					)}{' '}
					{/* Changed button text */}
					{record.status === 'draft' && (
						<Button size="small" onClick={() => handleSchedule(record)}>
							Schedule
						</Button>
					)}
					<Button size="small" danger onClick={() => handleDelete(record)}>
						Delete
					</Button>
				</div>
			),
		},
	];

	const menuItems = [
		{
			icon: <IoAdd className="text-xl" />,
			key: 'add-notification',
			label: 'Create New Notification',
			onClick: () => {
				addNewNotification();
				setTimeout(() => {
					window.scrollTo({
						top: document.documentElement.scrollHeight,
						behavior: 'smooth',
					});
				}, 300);
			},
			color: 'brown',
			style: { color: 'white' },
		},
		{
			icon: <IoMenu className="text-xl" />,
			key: 'view-notifications',
			label: 'View Notification List',
			onClick: showModal,
			color: 'white',
			style: { color: 'brown' },
		},
		{
			icon: <IoSaveOutline className="text-xl" />,
			key: 'save',
			label: 'Save',
			onClick: () => {
				// Logic to handle saving all notifications (e.g., saving all drafts)
				toast({
					title: 'Notifications saved!',
					description: (
						<pre>
							<b className="text-sm">All notifications have been processed.</b>
						</pre>
					),
					duration: 1500,
				});
			},
			color: 'yellow',
		},
	];

	return {
		menuItems,
		NotificationListModal: () => (
			// Changed component name
			<Modal
				title="Notifications List"
				open={isModalOpen}
				onCancel={handleCancel}
				width="95%" // Make the modal responsive using percentage width
				footer={null}
				bodyStyle={{ padding: '20px' }} // Add some padding to the modal body
				zIndex={99999}
			>
				<Table
					dataSource={notificationsData}
					columns={columns}
					rowKey="uuid"
					scroll={{ x: 'max-content' }}
				/>{' '}
				{/* Enable horizontal scrolling for the table */}
			</Modal>
		),
	};
};

export default useMenuItems;
