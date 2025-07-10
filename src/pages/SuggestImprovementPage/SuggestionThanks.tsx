import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CorrectIcon from '../../assets/icons/correct-icon.svg'; // Assuming you have a similar icon

const SuggestionThanks = ({
	onStartNewSuggestion,
	message,
}: {
	onStartNewSuggestion: () => void;
	message: string;
}) => {
	// Placeholder function to generate a simple ticket ID
	const generateTicketId = () => {
		return Math.random().toString(36).substring(2, 15).toUpperCase();
	};

	const ticketId = generateTicketId();
	const helpCenterUrl = 'https://innobee.buzz/help-center'; // Update if needed
	const supportEmail = 'support@innobee.buzz'; // Update if needed

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 50 }}
				transition={{ duration: 0.5 }}
			>
				<div className="bg-white rounded-lg p-6 shadow-md text-center">
					<div className="mb-8">
						<img src={CorrectIcon} alt="" className="w-14 h-14 mx-auto" />
					</div>
					<h3 className="text-lg font-semibold mb-2">{message}</h3>
					<p className="text-sm text-gray-500 mb-4">
						Thank you for your feedback! Your suggestion/bug report has been
						submitted.
					</p>
					<div className="mb-4">
						<p className="text-sm font-semibold">Your Ticket ID:</p>
						<p className="text-lg font-bold text-pri-color">{ticketId}</p>
					</div>
					<p className="text-sm text-gray-500 mb-4">
						You can refer to this ID for any inquiries regarding your
						submission.
					</p>
					<p className="text-sm text-gray-500 mb-6">
						For more information or assistance, please visit our{' '}
						<a href={helpCenterUrl} className="text-pri-color hover:underline">
							Help Center
						</a>{' '}
						or contact our support team at{' '}
						<a
							href={`mailto:${supportEmail}`}
							className="text-pri-color hover:underline"
						>
							{supportEmail}
						</a>
						.
					</p>
					<button
						className="bg-brown hover:bg-pri-color text-white py-2 rounded-lg w-full md:w-auto md:min-w-[250px]"
						onClick={onStartNewSuggestion}
					>
						Suggest Another Improvement
					</button>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default SuggestionThanks;
