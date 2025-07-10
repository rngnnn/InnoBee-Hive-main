import DashboardHeader, {
	DashboardHeaderMenuItem,
} from 'src/components/bee-interface/DashboardHeader';
import usePressMenuItems from './PressMenuItems';
import PressCard from './PressCard';
import { usePressData } from './PressContext';
import { Reorder } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { PressProvider } from './PressContext';

const ManageChallengePress = () => {
	const { menuItems, PressItemsModal } = usePressMenuItems();
	const { pressItems, setPressItems } = usePressData();

	return (
		<div>
			<DashboardHeader
				title="Manage Challenge"
				menuItems={menuItems as DashboardHeaderMenuItem[]}
			/>
			<br />
			<h6 className="font-bold text-lg mt-2">Press</h6>
			<p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
				{/* Changed styling */}
				Create press link that will be posted to the press tab of your challenge
				page.
			</p>
			<Reorder.Group axis="y" values={pressItems} onReorder={setPressItems}>
				<div className="flex flex-col w-full gap-4">
					<AnimatePresence>
						{pressItems.map((item) => (
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
								<PressCard key={item.uuid} item={item} />
							</Reorder.Item>
						))}
					</AnimatePresence>
				</div>
			</Reorder.Group>
			<PressItemsModal /> {/* Render the modal component */}
			<br />{' '}
			{/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
			<br />{' '}
			{/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
		</div>
	);
};

const ManageChallengePressWithProvider = () => (
	<PressProvider>
		<ManageChallengePress />
	</PressProvider>
);

export default ManageChallengePressWithProvider;
