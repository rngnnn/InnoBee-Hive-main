import { useState } from 'react';
import { IoAdd, IoMenu, IoSaveOutline } from 'react-icons/io5';
import { useToast } from 'src/hooks/use-toast';
import { useUpdateData } from './UpdateContext';
import { Modal, Table, Button } from 'antd';
import type { TableProps } from 'antd';

// Define the UpdateType interface
interface UpdateType {
	uuid: string;
	title?: string;
	status: 'draft' | 'scheduled' | 'published';
	scheduledTime?: string | number | Date;
}

const useMenuItems = () => {
	const { toast } = useToast();
	const { addNewUpdate, updatesData, deleteUpdate, updateUpdate } =
		useUpdateData();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedUpdate, setSelectedUpdate] = useState<UpdateType | null>(null);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedUpdate(null);
	};

	const handleUpdateNow = (record: UpdateType) => {
		updateUpdate(record.uuid, { status: 'published' });
		toast({
			title: 'Update published!',
			duration: 1500,
		});
	};

	const handleSaveDraft = (record: UpdateType) => {
		updateUpdate(record.uuid, { status: 'draft' });
		toast({
			title: 'Update saved as draft!',
			duration: 1500,
		});
	};

	const handleSchedule = (record: UpdateType) => {
		if (record.scheduledTime) {
			updateUpdate(record.uuid, { status: 'scheduled' });
			toast({
				title: 'Update scheduled!',
				description: (
					<pre>
						<b className="text-sm">
							The update has been scheduled for{' '}
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

	const handleDelete = (record: UpdateType) => {
		deleteUpdate(record.uuid);
		toast({
			title: 'Update deleted!',
			duration: 1500,
		});
	};

	const columns: TableProps<UpdateType>['columns'] = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
			responsive: ['md'],
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
			render: (text: string | number | Date | undefined) =>
				text ? new Date(text).toLocaleString() : '-',
			responsive: ['lg'],
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (_, record: UpdateType) => (
				<div className="flex flex-wrap gap-2">
					<Button size="small">Edit</Button>
					{record.status === 'draft' && (
						<Button size="small" onClick={() => handleUpdateNow(record)}>
							Publish Now
						</Button>
					)}
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
			key: 'add-update',
			label: 'Add Update',
			onClick: () => {
				addNewUpdate();
				setTimeout(() => {
					window.scrollTo({
						top: document.documentElement.scrollHeight,
						behavior: 'smooth',
					});
				}, 300);
			},
			color: 'brown', // Correct type
			// style: { color: 'white' }, // Removed
		},
		{
			icon: <IoMenu className="text-xl" />,
			key: 'view-updates',
			label: 'View Updates List',
			onClick: showModal,
			color: undefined, // Correct type (default)
			// style: { color: 'brown' }, // Removed
		},
		{
			icon: <IoSaveOutline className="text-xl" />,
			key: 'save',
			label: 'Save',
			onClick: () => {
				toast({
					title: 'Updates saved!',
					description: (
						<pre>
							<b className="text-sm">All updates have been processed.</b>
						</pre>
					),
					duration: 1500,
				});
			},
			color: 'yellow', // Correct type
		},
	];

	return {
		menuItems,
		UpdatesListModal: () => (
			<Modal
				title="Updates List"
				open={isModalOpen}
				onCancel={handleCancel}
				width={1000}
				footer={null}
				zIndex={1000}
			>
				<Table
					dataSource={updatesData as UpdateType[]}
					columns={columns}
					rowKey="uuid"
					scroll={{ x: 'max-content' }}
				/>
			</Modal>
		),
	};
};

export default useMenuItems;
