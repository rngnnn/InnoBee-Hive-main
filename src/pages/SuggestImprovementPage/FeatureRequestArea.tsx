import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoArrowBackOutline } from 'react-icons/io5';
import { IoMdCheckmark } from 'react-icons/io';

interface FeatureRequestAreaProps {
	onNextStep: () => void;
	onPreviousStep: () => void;
	updateReportData: (data: { featureRequestArea: string | null }) => void;
	initialArea: string | null;
}

const FeatureRequestArea: React.FC<FeatureRequestAreaProps> = ({
	onNextStep,
	onPreviousStep,
	updateReportData,
	initialArea,
}) => {
	const [selectedArea, setSelectedArea] = useState<string | null>(initialArea);
	const areas = [
		'Creating a challenge',
		'Managing a challenge',
		'Participating in a challenge',
		'Judging a challenge',
		'Profile Settings',
		'Other',
	];

	useEffect(() => {
		updateReportData({ featureRequestArea: selectedArea });
	}, [selectedArea, updateReportData]);

	const handleNextClick = () => {
		if (selectedArea) {
			onNextStep();
		} else {
			alert(
				'Please select the part of the dashboard the requested feature is for.'
			);
		}
	};

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
					<h5 className="font-bold mb-6">
						Which part of the dashboard is this feature for?
					</h5>
					<div className="flex flex-col gap-4 mb-6">
						{areas.map((area, index) => (
							<div className="flex gap-2" key={index}>
								<button
									onClick={() => setSelectedArea(area)}
									className={`w-6 h-6 rounded-full flex items-center justify-center ${
										selectedArea === area
											? 'bg-pri-color'
											: 'bg-white border border-gray-200'
									}`}
								>
									{selectedArea === area && (
										<span className="text-white">
											<IoMdCheckmark />
										</span>
									)}
								</button>
								<div>
									<h6 className="font-semibold text-sm">{area}</h6>
								</div>
							</div>
						))}
					</div>
					<button
						className="w-full md:w-auto md:min-w-[200px] bg-brown hover:bg-pri-color text-white py-2 rounded-lg"
						onClick={handleNextClick}
					>
						Next
					</button>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default FeatureRequestArea;
