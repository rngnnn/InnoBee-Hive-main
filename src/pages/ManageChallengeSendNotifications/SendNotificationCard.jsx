import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSendNotificationData } from './SendNotificationContext';
import SelectField from 'src/components/ui/SelectField'; // Import SelectField
import { FilterCountries } from 'src/constants'; // Import FilterCountries
import { FiTrash2 } from 'react-icons/fi';

const participantFilters = [
	'All members',
	'Participants',
	'Followers',
	'Submission started',
	'Submission submitted',
	'Submission eligible',
	'Submission ineligible',
	'Winners',
	'1st place',
	'2nd place',
	'3rd place',
	'People’s choice',
	'Grand prize winner',
	'Finalists',
	'Judges',
	'Moderators',
];

const FilterParticipantsOptions = participantFilters.map((filter) => ({
	value: filter,
	label: filter,
}));

const SendNotificationCard = ({ item }) => {
	const { updateNotification, deleteNotification } = useSendNotificationData();
	const [localScheduledTime, setLocalScheduledTime] = useState(
		item.scheduledTime ? new Date(item.scheduledTime) : null
	);

	const handleDeleteEvent = () => {
		deleteNotification(item.uuid);
	};

	const handleSubjectChange = (e) => {
		updateNotification(item.uuid, { subject: e.target.value });
	};

	const handleMessageChange = (content) => {
		updateNotification(item.uuid, { message: content });
	};

	const handleFilterParticipantsChange = (value) => {
		// Updated to receive value directly
		updateNotification(item.uuid, { filterParticipants: value });
	};

	const handleExcludeGroupsChange = (value) => {
		// Updated to receive value directly
		updateNotification(item.uuid, { excludeGroups: value });
	};

	const handleLocationChange = (value) => {
		// Updated to receive value directly
		updateNotification(item.uuid, { location: value });
	};

	const handleScheduleNotificationChange = (date) => {
		setLocalScheduledTime(date);
		updateNotification(item.uuid, {
			scheduledTime: date ? date.toISOString() : null,
		});
	};

	const handleShowRecipients = () => {
		// Implement logic to show recipients
		console.log('Show recipients clicked for:', item.uuid);
	};

	const handleSaveDraft = () => {
		updateNotification(item.uuid, { status: 'draft' });
		console.log('Save draft clicked for:', item.uuid);
	};

	const handleSendToMyself = () => {
		// Implement logic to send a test notification
		console.log('Send to myself clicked for:', item.uuid);
	};

	const handleSendToAll = () => {
		// Implement logic to send to all selected recipients
		console.log('Send to all clicked for:', item.uuid);
	};

	const recipientCount = 0; // Replace with actual logic to count recipients

	return (
		<div className="flex sm:flex-row flex-col w-full gap-4">
			<div className="flex flex-col gap-4 bg-white rounded-lg relative p-4 sm:p-6 w-full">
				<div className="absolute top-0 left-0 h-full w-1.5 sm:w-2 rounded-lg rounded-r-none bg-linearGradientToBottom shadow-sm" />
				<h6 className="font-bold text-lg mt-6 sm:mt-2">
					{item?.subject || 'New Notification'}
				</h6>

				<div className="flex flex-col gap-2 w-full">
					<label className="text-sm font-bold" htmlFor="subject">
						Subject <span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl outline-none focus:border-pri-color border-1 mb text-sm sm:text-base"
						placeholder="Subject"
						id="subject"
						value={item && item.subject ? item.subject : ''}
						onChange={handleSubjectChange}
					/>
				</div>

				<div className="flex flex-col gap-2 w-full">
					<label className="text-sm font-bold">
						Message <span className="text-red-500">*</span>
					</label>
					<ReactQuill
						value={item && item.message ? item.message : ''}
						onChange={handleMessageChange}
						className="bg-gray-100 rounded-xl outline-none focus:border-pri-color border-1 text-sm"
						style={{ fontSize: '0.875rem' }}
					/>
				</div>

				<div className="flex flex-col gap-2 w-full">
					<SelectField
						label="Filter Participants"
						options={FilterParticipantsOptions}
						value={item?.filterParticipants || []}
						onChange={handleFilterParticipantsChange}
						mode="multiple"
						className="text-sm sm:text-base"
					/>
				</div>

				<div className="flex flex-col gap-2 w-full">
					<SelectField
						label="Select groups to exclude"
						options={FilterParticipantsOptions}
						value={item?.excludeGroups || []}
						onChange={handleExcludeGroupsChange}
						mode="multiple"
						className="text-sm sm:text-base"
					/>
				</div>

				<div className="flex flex-col gap-2 w-full">
					<SelectField
						label="Location"
						options={FilterCountries} // Using FilterCountries from index.jsx
						value={item?.location || []}
						onChange={handleLocationChange}
						mode="multiple"
						className="text-sm sm:text-base"
					/>
				</div>

				<div className="flex flex-col gap-2 w-full">
					<label className="text-sm font-bold">Schedule Notification</label>
					<DatePicker
						selected={localScheduledTime}
						onChange={handleScheduleNotificationChange}
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={15}
						dateFormat="MMMM d, <0xE1><0x9E><0x9F> h:mm aa"
						placeholderText="Schedule for later (optional)"
						className="bg-gray-100 w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl outline-none focus:border-pri-color border-1 text-sm sm:text-base"
					/>
				</div>

				{/* Add the status display here */}
				<div className="mt-2">
					<span className="text-sm font-semibold">Status:</span>
					<span className="ml-2 text-gray-600 text-sm sm:text-base">
						{item?.status}
					</span>
				</div>

				{/* Action buttons */}
				<div className="flex sm:flex-row flex-col sm:items-start items-stretch gap-2 mt-4">
					<button
						className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg text-sm sm:text-base"
						onClick={handleShowRecipients}
					>
						Show recipients
					</button>
					<button
						className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg text-sm sm:text-base"
						onClick={handleSaveDraft}
					>
						Save draft
					</button>
					<button
						className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg text-sm sm:text-base"
						onClick={handleSendToMyself}
					>
						Send to myself (test)
					</button>
					<button
						className="bg-brown hover:bg-pri-color text-white font-semibold py-2 px-4 rounded-lg text-sm sm:text-base"
						onClick={handleSendToAll}
					>
						Send to all ({recipientCount})
					</button>
				</div>
			</div>
			<div
				className="bg-white rounded-lg p-3 sm:p-4 h-fit text-2xl cursor-pointer flex items-center justify-center"
				onClick={handleDeleteEvent}
				style={{ color: 'black' }}
			>
				<FiTrash2 />
			</div>
		</div>
	);
};

export default SendNotificationCard;
