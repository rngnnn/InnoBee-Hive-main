import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoArrowBackOutline } from 'react-icons/io5';
import { IoMdCheckmark } from 'react-icons/io';

// Define props interface
interface ReportDetailsProps {
	onSubmit: () => void;
	onPreviousStep: () => void;
	updateReportData: (data: { violatesEULaws: boolean | null }) => void;
	initialDetails: boolean | null;
}

const ReportDetails: React.FC<ReportDetailsProps> = ({
	onSubmit,
	onPreviousStep,
	updateReportData,
	initialDetails,
}) => {

	const [violatesEU, setViolatesEU] = useState<boolean | null>(initialDetails);

	useEffect(() => {
		updateReportData({ violatesEULaws: violatesEU });
	}, [violatesEU, updateReportData]);

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 50 }}
				transition={{ duration: 0.5 }}
			>
				<div className="bg-white rounded-lg p-6 shadow-md">
					<div className="flex justify-start items-center mb-2">
						<button
							className="text-pri-color hover:text-pri-color flex items-center gap-2"
							onClick={onPreviousStep}
						>
							<IoArrowBackOutline />{' '}
							<span style={{ color: '#ffb000' }}>Back</span>
						</button>
					</div>
					<h5 className="font-bold mb-6">Tell us more about this content</h5>
					<div className="flex flex-col gap-4 mb-6">
						<h5 className="font-bold mb-2">
							Do you think this content violates any European Union (EU) local
							laws?
						</h5>
						<div className="flex gap-2">
							<button
								onClick={() => setViolatesEU(true)}
								className={`w-6 h-6 rounded-full flex items-center justify-center ${
									violatesEU === true
										? 'bg-pri-color'
										: 'bg-white border border-gray-300' // Fixed border style
								}`}
							>
								{violatesEU === true && (
									<span className="text-white">
										<IoMdCheckmark />
									</span>
								)}
							</button>
							<div>
								<p className="text-sm py-1">Yes</p>
							</div>
						</div>
						<div className="flex gap-2">
							<button
								onClick={() => setViolatesEU(false)}
								className={`w-6 h-6 rounded-full flex items-center justify-center ${
									violatesEU === false
										? 'bg-pri-color'
										: 'bg-white border border-gray-300' // Fixed border style
								}`}
							>
								{violatesEU === false && (
									<span className="text-white">
										<IoMdCheckmark />
									</span>
								)}
							</button>
							<div>
								<p className="text-sm py-1">No (or I'm not sure)</p>
							</div>
						</div>
					</div>
					<button
						className="w-full md:w-auto md:min-w-[200px] bg-brown hover:bg-pri-color text-white py-2 rounded-lg mt-4"
						onClick={onSubmit}
					>
						Submit Report
					</button>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default ReportDetails;
