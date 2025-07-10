import { options } from './timelinesHelpers';
import Select from 'src/components/ui/Select.jsx';
import dayjs from 'dayjs';
import { PiDotsSixBold } from 'react-icons/pi';
import { useTimelineData, TimelineItem } from './TimelineContext';
import { useCallback } from 'react';
import { useAnimate } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

const TimelineEvent = ({ event }: { event: TimelineItem }) => {
	const { initialData, timelineData, setTimelineData } = useTimelineData();
	const [scope, animate] = useAnimate();

	const eventOption = options?.filter((option) => option.value === event.id);

	const availableOptions = options?.filter(
		(option) =>
			!timelineData.some((item) => item.id === option.value) ||
			option.value === event.id
	);

	const isPredefinedEvent = initialData.some((item) => item.id === event.id);

	const selectOptions = isPredefinedEvent
		? eventOption
		: [{ value: '', label: 'Please select event' }, ...availableOptions];

	const isEventStarted = dayjs(event?.date).isBefore(dayjs());

	const currentDateTime = dayjs().format('YYYY-MM-DDTHH:mm');

	const handleSelectChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const newId = e.target.value;
			setTimelineData((prevData) => {
				return prevData.map((item) => {
					if (item.id === event.id && item.id !== newId) {
						return {
							...item,
							id: newId,
							title:
								options.find((option) => option.value === newId)?.label ||
								'Unknown Event',
						};
					}
					return item;
				});
			});
		},
		[event.id, setTimelineData]
	);

	const handleDateChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newDate = e.target.value;

			setTimelineData((prevData) =>
				prevData.map((item) =>
					item.id === event.id ? { ...item, date: newDate } : item
				)
			);
		},
		[event.id, setTimelineData]
	);

	const handleDeleteEvent = useCallback(() => {
		setTimelineData((prevData) => {
			const date = prevData.find((item) => item.id === event.id)?.date;
			const isEventStarted = dayjs(date).isBefore(dayjs());
			if (isEventStarted) return prevData;

			animate(
				scope.current,
				{ opacity: 0, x: 500 },
				{ duration: 0.5, ease: 'easeInOut' }
			).then(() => {
				setTimelineData((currentData) =>
					currentData.filter((item) => item.id !== event.id)
				);
			});
			return prevData;
		});
	}, [setTimelineData, animate, scope, event.id]);

	return (
		<div className="flex sm:flex-row flex-col w-full gap-4" ref={scope}>
			<div className="flex flex-col gap-4 bg-white rounded-lg relative p-4 sm:p-6 w-full">
				<div className="absolute top-0 left-0 h-full w-1.5 sm:w-2 rounded-lg rounded-r-none bg-linearGradientToBottom shadow-sm" />
				<PiDotsSixBold className="absolute left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl cursor-pointer top-2 sm:top-3" />
				<h6 className="font-bold text-lg mt-6 sm:mt-2">{event?.title}</h6>
				<div className="flex sm:flex-row flex-col gap-4">
					<div className="flex flex-col gap-4 sm:gap-6 sm:w-1/2 w-full">
						<input
							className="bg-gray-100 w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl outline-none focus:border-pri-color border-1 cursor-pointer text-sm sm:text-base"
							value={
								dayjs(event?.date).isValid()
									? dayjs(event?.date).format('YYYY-MM-DDTHH:mm')
									: ''
							}
							onChange={handleDateChange}
							type="datetime-local"
							onClick={(e) => (e.target as HTMLInputElement).showPicker()}
							disabled={isEventStarted}
							min={currentDateTime}
						/>
						<Select
							value={event.id}
							onChange={handleSelectChange}
							options={selectOptions}
						/>
						<p className="leading-5 text-sm sm:text-base">
							{options.find((item) => item.value === event?.id)?.description}
						</p>
					</div>
					<textarea
						className="bg-gray-100 p-3 sm:p-4 w-full sm:w-1/2 rounded-xl resize-none outline-none focus:border-pri-color border-1 text-sm sm:text-base"
						placeholder="Description"
					></textarea>
				</div>
			</div>
			<div
				className="bg-white rounded-lg p-3 sm:p-4 h-fit text-2xl cursor-pointer sm:w-auto flex items-center justify-center"
				onClick={handleDeleteEvent}
			>
				<FiTrash2 />
			</div>
		</div>
	);
};

export default TimelineEvent;
