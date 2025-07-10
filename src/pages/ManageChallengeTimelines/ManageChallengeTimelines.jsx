import DashboardHeader from 'src/components/bee-interface/DashboardHeader';
import Timeline from './Timeline';
import { useMenuItems } from './timelinesHelpers';
import { motion, AnimatePresence } from 'framer-motion';
import TimelineEvent from './TimelineEvent';
import { useTimelineData } from './TimelineContext';

const ManageChallengeTimelines = () => {
	const { timelineData } = useTimelineData();
	const menuItems = useMenuItems();

	return (
		<div>
			<DashboardHeader title="Manage Challenge" menuItems={menuItems} />
			<br />
			<h6 className="font-bold text-lg mt-2">Timelines</h6>
			<p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
				Add milestones to your challenge by defining new event on the challenge
				timeline. Check out our guides on managing the challenge
				<span className="font-semibold underline cursor-pointer">here</span>
			</p>{' '}
			<motion.div
				className="flex flex-col gap-4"
				initial={{ opacity: 0, y: 80 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Timeline />
				<div className="flex flex-col w-full gap-4">
					<AnimatePresence mode="popLayout">
						{timelineData.map((event) => (
							<TimelineEvent key={event.id} event={event} />
						))}
					</AnimatePresence>
				</div>
			</motion.div>
			<br />{' '}
			{/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
			<br />{' '}
			{/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
		</div>
	);
};

export default ManageChallengeTimelines;
