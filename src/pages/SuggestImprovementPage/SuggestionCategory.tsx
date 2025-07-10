import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoMdCheckmark } from 'react-icons/io';
import { bugReportTypes } from './BugReportConstants';

interface BugReportTypeProps {
	onNextStep: () => void;
	updateReportData: (data: {
		reportType: number | null;
		otherReportType: string;
	}) => void;
	initialType: number | null;
}

const BugReportType: React.FC<BugReportTypeProps> = ({
	onNextStep,
	updateReportData,
	initialType,
}) => {
	const [selectedTypeIndex, setSelectedTypeIndex] = useState<number | null>(
		initialType
	);
	const [showOtherTextField, setShowOtherTextField] = useState(() => {
		// Initialize based on initialType if it corresponds to "Other"
		return (
			initialType !== null && bugReportTypes[initialType - 1]?.title === 'Other'
		);
	});
	const [otherReportType, setOtherReportType] = useState('');

	useEffect(() => {
		updateReportData({
			reportType: selectedTypeIndex,
			otherReportType: otherReportType,
		});
	}, [selectedTypeIndex, otherReportType, updateReportData]);

	const handleButtonClick = (index: number) => {
		setSelectedTypeIndex(index + 1);
		const isOther = bugReportTypes[index]?.title === 'Other';
		setShowOtherTextField(isOther);
		if (!isOther) {
			setOtherReportType(''); // Clear the text field if another option is selected
		}
	};

	const handleOtherTextChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setOtherReportType(event.target.value);
	};

	const handleNextClick = () => {
		if (selectedTypeIndex !== null) {
			if (showOtherTextField && !otherReportType.trim()) {
				alert('Please enter the type of report.'); // Consider a less disruptive error display
				return;
			}
			onNextStep();
		} else {
			alert('Please select the type of report.'); // Consider a less disruptive error display
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
					<h5 className="font-bold mb-6">What would you like to suggest?</h5>
					<div className="flex flex-col gap-4 mb-6">
						{bugReportTypes?.map((report, index) => (
							<div className="flex gap-2" key={index}>
								<button
									onClick={() => handleButtonClick(index)}
									className={`w-6 h-6 rounded-full flex items-center justify-center ${
										selectedTypeIndex === index + 1
											? 'bg-pri-color'
											: 'bg-white border border-gray-200' // Fixed border style
									}`}
								>
									{selectedTypeIndex === index + 1 && (
										<span className="text-white">
											<IoMdCheckmark />
										</span>
									)}
								</button>
								<div>
									<h6 className="font-semibold text-sm"> {report.title} </h6>
									<p className="text-sm text-gray-400 py-2">
										{' '}
										{report?.content}{' '}
									</p>
									{showOtherTextField && index + 1 === selectedTypeIndex && (
										<div className="mt-2">
											<label
												htmlFor="otherReportType"
												className="block text-gray-700 text-sm font-bold mb-1"
											>
												Please specify:
											</label>
											<input
												type="text"
												id="otherReportType"
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
												value={otherReportType}
												onChange={handleOtherTextChange}
												placeholder="Enter the type of report"
											/>
										</div>
									)}
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

export default BugReportType;
