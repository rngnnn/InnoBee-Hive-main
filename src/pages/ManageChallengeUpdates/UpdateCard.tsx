import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useUpdateData } from './UpdateContext';
import { FiTrash2 } from 'react-icons/fi';

const UpdateCard = ({ item }: { item: any }) => {
	const { updateUpdate, deleteUpdate } = useUpdateData();
	const [localScheduledTime, setLocalScheduledTime] = useState(
		item.scheduledTime ? new Date(item.scheduledTime) : null
	);

	const handleDeleteEvent = () => {
		deleteUpdate(item.uuid);
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateUpdate(item.uuid, { title: e.target.value });
	};

	const handleContentChange = (content: string) => {
		updateUpdate(item.uuid, { content });
	};

	const handleDateTimeChange = (date: Date | null) => {
		setLocalScheduledTime(date);
		updateUpdate(item.uuid, {
			scheduledTime: date ? date.toISOString() : null,
		});
	};

	return (
		<div className="w-full flex flex-col sm:flex-row gap-4">
			<div className="flex flex-col gap-4 bg-white rounded-lg relative p-3 sm:p-4 w-full">
				<div className="absolute top-0 left-0 h-full w-1.5 sm:w-2 rounded-lg rounded-r-none bg-linearGradientToBottom shadow-sm" />
				<h6 className="font-bold text-lg mt-2 pl-2">
					{item?.title || 'New Update'}
				</h6>
				<div className="flex flex-col gap-2 w-full pl-2">
					<label className="text-sm font-bold" htmlFor="title">
						Title <span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 w-full px-2 py-2 sm:px-3 sm:py-3 rounded-xl outline-none focus:border-pri-color border-1 mb text-sm sm:text-base"
						placeholder="Title"
						id="title"
						value={item?.title || ''}
						onChange={handleTitleChange}
					/>
				</div>
				<div className="flex flex-col gap-2 w-full pl-2">
					<label className="text-sm font-bold">
						Content <span className="text-red-500">*</span>
					</label>
					<div className="w-full">
						<ReactQuill
							value={item?.content || ''}
							onChange={handleContentChange}
							className="bg-gray-100 rounded-xl outline-none focus:border-pri-color border-1 text-sm"
							style={{ fontSize: '0.875rem' }}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2 w-full pl-2">
					<label className="text-sm font-bold">Schedule Update</label>
					<DatePicker
						selected={localScheduledTime}
						onChange={handleDateTimeChange}
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={15}
						dateFormat="MMMM d, <0xE1><0x9E><0x9F> h:mm aa"
						placeholderText="Schedule for later (optional)"
						className="bg-gray-100 w-full px-2 py-2 sm:px-3 sm:py-3 rounded-xl outline-none focus:border-pri-color border-1 text-sm sm:text-base"
					/>
				</div>
				<div className="mt-2 pl-2">
					<span className="text-sm font-semibold">Status:</span>
					<span className="ml-2 text-gray-600 text-sm sm:text-base">
						{item?.status}
					</span>
				</div>
			</div>
			<div
				className="bg-white rounded-lg p-3 sm:p-4 h-fit text-2xl cursor-pointer sm:w-auto flex items-center justify-center"
				onClick={handleDeleteEvent}
				style={{ color: 'black' }}
			>
				<FiTrash2 />
			</div>
		</div>
	);
};

export default UpdateCard;
