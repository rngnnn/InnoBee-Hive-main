import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type TimelineItem = {
	id: string;
	title: string;
	date: string;
};

type TimelineContextType = {
	initialData: TimelineItem[];
	timelineData: TimelineItem[];
	setTimelineData: React.Dispatch<React.SetStateAction<TimelineItem[]>>;
	addNewItem: () => void;
};

export const TimelineContext = createContext<TimelineContextType | undefined>(
	undefined
);

export const TimelineProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const initialData = [
		{ id: 'start', title: 'Start', date: '2025-01-11T00:00:00Z' },
		{
			id: 'submission-deadline',
			title: 'Submission Deadline',
			date: '2025-02-15T00:00:00Z',
		},
		{ id: 'judging', title: 'Judging', date: '2025-02-20T00:00:00Z' },

		{
			id: 'judging-close',
			title: 'Judging Close',
			date: '2025-03-10T00:00:00Z',
		},
		{ id: 'won', title: 'Won', date: '2025-03-15T00:00:00Z' },
	];
	const [timelineData, setTimelineData] = useState(initialData);

	const addNewItem = () => {
		setTimelineData((prev) => [
			...prev,
			{ id: uuidv4(), title: 'Custom Event', date: '' },
		]);
	};

	return (
		<TimelineContext.Provider
			value={{
				initialData,
				timelineData,
				setTimelineData,
				addNewItem,
			}}
		>
			{children}
		</TimelineContext.Provider>
	);
};

export const useTimelineData = () => {
	const context = useContext(TimelineContext);
	if (!context) {
		throw new Error('TimelineData must be used within a TimelineProvider');
	}
	return context;
};
