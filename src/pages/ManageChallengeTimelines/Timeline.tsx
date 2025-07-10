import React from 'react';
import dayjs from 'dayjs';
import { useTimelineData } from './TimelineContext';

const Timeline = () => {
	const { timelineData } = useTimelineData();

	const sortedEvents = [...timelineData].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	return (
		<div className="hidden sm:block bg-brown h-56 p-6 rounded-lg text-white">
			<h3 className="mb-16 text-white">Timeline Preview</h3>
			<div className="relative flex items-center pl-2 mr-10">
				{sortedEvents.length === 0 && <p>No events added yet</p>}
				{sortedEvents.map((event, index) => (
					<React.Fragment key={event.id}>
						<div className="flex items-center">
							<div
								className={`flex items-center justify-center text-2xl w-10 h-10 rounded-full shadow-brown bg-linearGradientToBottom text-white`}
							/>
							<p className="text-sm absolute top-[-40px] whitespace-nowrap">
								{event.date ? dayjs(event.date).format('MMM D') : 'Select date'}
							</p>
							<p className="text-sm absolute top-14 min-w-24 max-w-[13ch]">
								{event.title}
							</p>
						</div>
						{index < sortedEvents.length - 1 && (
							<div className="flex-grow h-1 bg-linearGradientToBottom" />
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default Timeline;
