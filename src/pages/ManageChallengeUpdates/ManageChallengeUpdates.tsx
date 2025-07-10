import DashboardHeader from 'src/components/bee-interface/DashboardHeader';
import { type DashboardHeaderMenuItem } from 'src/components/bee-interface/DashboardHeader';
import useMenuItems from './UpdateMenuItems';
import UpdateCard from './UpdateCard';
import { useUpdateData } from './UpdateContext';
import { Reorder } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { UpdateProvider } from './UpdateContext'; // Import the provider

const ManageChallengeUpdates = () => {
	const { menuItems, UpdatesListModal } = useMenuItems();
	const { updatesData, setUpdatesData } = useUpdateData();

	return (
		<div>
			<DashboardHeader
				title="Manage Challenge"
				menuItems={menuItems as DashboardHeaderMenuItem[]}
			/>
			<br />
			<h6 className="font-bold text-lg mt-2">Updates</h6>
			<p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
				{' '}
				{/* Changed styling */}
				Create and manage updates for your challenge. You can draft, schedule,
				or publish updates immediately.
			</p>
			<div className="flex flex-col w-full gap-4">
				<Reorder.Group axis="y" values={updatesData} onReorder={setUpdatesData}>
					<AnimatePresence>
						{updatesData.map((item) => (
							<Reorder.Item
								key={item.uuid}
								value={item}
								initial={{ opacity: 0, x: -500 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 500 }}
								transition={{
									duration: 0.5,
									ease: 'easeOut',
								}}
							>
								<UpdateCard key={item.uuid} item={item} />
							</Reorder.Item>
						))}
					</AnimatePresence>
				</Reorder.Group>
			</div>
			<UpdatesListModal /> {/* Render the modal component */}
			<br />{' '}
			{/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
			<br />{' '}
			{/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
		</div>
	);
};

const ManageChallengeUpdatesWithProvider = () => (
	<UpdateProvider>
		<ManageChallengeUpdates />
	</UpdateProvider>
);

export default ManageChallengeUpdatesWithProvider;
