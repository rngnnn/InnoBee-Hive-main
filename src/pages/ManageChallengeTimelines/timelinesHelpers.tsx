import React from 'react';
import { MdOutlineAddLocation } from 'react-icons/md';
import { VscRefresh } from 'react-icons/vsc';
import { IoEyeOutline, IoSaveOutline } from 'react-icons/io5';
import { useTimelineData } from './TimelineContext';

export const useMenuItems = () => {
	const { initialData, setTimelineData, addNewItem } = useTimelineData();

	const resetTimelineData = initialData.map((item) => ({
		...item,
		date: '',
	}));

	const items = [
		{
			icon: <MdOutlineAddLocation className="text-2xl" />,
			key: 'add-event',
			label: 'Add Event',
			onClick: () => {
				addNewItem();
				setTimeout(() => {
					window.scrollTo({
						top: document.documentElement.scrollHeight,
						behavior: 'smooth',
					});
				}, 1000);
			},
			color: 'brown',
		},
		{
			icon: <VscRefresh className="text-xl" />,
			key: 're-generate',
			label: 'Re-generate New Timeline',
			onClick: () => {
				setTimelineData(resetTimelineData);
			},
			color: 'white',
		},
		{
			icon: <IoEyeOutline className="text-xl" />,
			key: 'view-challenge',
			label: 'View Challenge',
			onClick: () => {
				// TODO: implement re-generate
			},
			color: 'white',
		},
		{
			icon: <IoSaveOutline className="text-xl" />,
			key: 'save',
			label: 'Save',
			onClick: () => {
				// TODO: implement update
			},
			color: 'yellow',
		},
	];
	return items;
};

export const options = [
	{
		value: 'start',
		label: 'Start',
		description:
			'The Start Here Button, which allows users to begin the registration process, will appear on your challenge page at the date and time you set.',
	},
	{
		value: 'submission-deadline',
		label: 'Submission Deadline',
		description:
			'Accept button is removed so no new users can register; Paricipants are no longer able to submit entries',
	},
	{
		value: 'judging',
		label: 'Judging',
		description: 'Judging criteria are locked',
	},
	{
		value: 'other',
		label: 'Other',
		description:
			"You can add a custom event (such as an in-person meet up) that doesn't fit within any of the above options. Please note this will not automatically trigger any functionality on the page and is for informational purposes only.",
	},
	{
		value: 'other-no-countdown',
		label: 'Other (no countdown)',
		description:
			"Other (no countdown) - Same as 'Other' event. The difference is it will not display a countdown to this 'Other' event whereas the other one will.",
	},
	{
		value: 'judging-close',
		label: 'Judging Close',
		description:
			'Judges no longer able to evaluate submissions or revise their scores',
	},

	{
		value: 'won',
		label: 'Won',
		description:
			"When the winners will be announced (it's the end of a challenge). but the challenge creator can create post-winnner announcement events on the timeline.",
	},
	{
		value: 'registration-closed',
		label: 'Registration Closed',
		description:
			'The ability to register as a participant will be turned off at the date and time you set. Previously registered participants still will be able to continue to create their submissions',
	},
	{
		value: 'voting-open',
		label: 'Voting Open',
		description: 'Voting Open – Voting functionality enabled',
	},
	{
		value: 'voting-close',
		label: 'Voting Close',
		description: 'Voting functionality disabled ',
	},
];
