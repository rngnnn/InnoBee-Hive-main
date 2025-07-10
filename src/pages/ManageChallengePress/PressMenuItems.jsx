import { IoAdd, IoMenu } from 'react-icons/io5';
import { useToast } from 'src/hooks/use-toast';
import { usePressData } from './PressContext';
import { useState } from 'react';
import { Modal, Table, Button } from 'antd';

const usePressMenuItems = () => {
	const { toast } = useToast();
	const { addNewPressItem, pressItems, deletePressItem } = usePressData();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedPressItem, setSelectedPressItem] = useState(null);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedPressItem(null);
	};

	const handleDelete = (record) => {
		deletePressItem(record.uuid);
		toast({
			title: 'Press item deleted!',
			duration: 1500,
		});
	};

	const columns = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
			responsive: ['md'],
		},
		{
			title: 'Source URL',
			dataIndex: 'sourceUrl',
			key: 'sourceUrl',
		},
		{
			title: 'Date Created',
			dataIndex: 'dateCreated',
			key: 'dateCreated',
			render: (text) => (text ? new Date(text).toLocaleDateString() : '-'),
			responsive: ['sm'],
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (_, record) => (
				<div className="flex gap-2">
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
			key: 'add-press-item',
			label: 'Add Press Item',
			onClick: () => {
				addNewPressItem();
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
			key: 'view-press-items',
			label: 'View Press Items',
			onClick: showModal,
			color: 'white',
			style: { color: 'brown' },
		},
	];

	return {
		menuItems,
		PressItemsModal: () => (
			<Modal
				title="Press Items List"
				open={isModalOpen}
				onCancel={handleCancel}
				width="95%"
				footer={null}
				bodyStyle={{ padding: '16px' }}
			>
				<Table
					dataSource={pressItems}
					columns={columns}
					rowKey="uuid"
					size="small"
					responsive
				/>
			</Modal>
		),
	};
};

export default usePressMenuItems;
