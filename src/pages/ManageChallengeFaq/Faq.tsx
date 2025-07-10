import DashboardHeader from 'src/components/bee-interface/DashboardHeader';
import { useMenuItems } from './FaqMenuItems';
import { Reorder, AnimatePresence } from 'framer-motion';
import FaqCard from './FaqCard';
import { useFaqs } from './FaqProvider';

const Faq = () => {
	const { faqs, updateFaq, deleteFaq } = useFaqs(); // Get functions from context
	const menuItems = useMenuItems();

	return (
		<div>
			<DashboardHeader title="Manage Challenge" menuItems={menuItems} />
			<br />
			<h6 className="font-bold text-lg mt-2">FAQ</h6>
			<p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
				Create a Frequently Asked Question (FAQ) section that will be displayed
				on the FAQ tab of your challenge page. Simply click "Add FAQ item" and
				enter the question and the answer for each item you add.
			</p>
			<Reorder.Group
				axis="y"
				values={faqs}
				onReorder={() => {}} // Optional: Implement drag reordering later
			>
				<div className="flex flex-col w-full gap-4">
					<AnimatePresence>
						{faqs.map((faq, index) => (
							<Reorder.Item
								key={faq.id}
								value={faq}
								initial={{ opacity: 0, x: -500 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 500 }}
								transition={{ duration: 0.5, ease: 'easeOut' }}
							>
								<FaqCard
									faq={faq}
									index={index}
									updateFaq={updateFaq}
									deleteFaq={deleteFaq}
								/>
							</Reorder.Item>
						))}
					</AnimatePresence>
				</div>
			</Reorder.Group>
			<br />{' '}
			{/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
			<br />{' '}
			{/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
		</div>
	);
};

export default Faq;
