import React, { useState, useEffect } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { IoMdCheckmark } from 'react-icons/io';
import { contentOfReport as importedContentOfReport } from './ReportConstants';

// --- Type Definitions ---
interface ReportOption {
	title: string;
	content?: string; // Assuming content is optional based on usage
}

type ContentOfReport = {
	[key: string]: ReportOption[];
};

// Type the imported constants
const contentOfReport: ContentOfReport = importedContentOfReport;

interface ReportReasonProps {
	onNextStep: () => void;
	onPreviousStep: () => void;
	updateReportData: (data: { reasonOfReport: number | null }) => void;
	initialReason: number | null;
	selectedReportType: string | null; // Assuming the type title is passed as a string
}

const ReportReason: React.FC<ReportReasonProps> = ({
	onNextStep,
	onPreviousStep,
	updateReportData,
	initialReason,
	selectedReportType,
}) => {
	const [selectedReasonIndex, setSelectedReasonIndex] = useState<number | null>(
		initialReason
	);
	// State to hold the currently relevant report reasons/options
	const [currentContentOptions, setCurrentContentOptions] = useState<
		ReportOption[]
	>([]);

	useEffect(() => {
		console.log(
			'ReportReason useEffect: selectedReportType =',
			selectedReportType
		);

		let options: ReportOption[] = [];
		if (selectedReportType && contentOfReport[selectedReportType]) {
			options = contentOfReport[selectedReportType];
			console.log(
				'ReportReason useEffect: currentContentOptions set for',
				selectedReportType
			);
		} else {
			// Fallback if type is null or not found (e.g., initial state or error)
			options = contentOfReport['Something Else'] || [];
			console.log(
				"ReportReason useEffect: currentContentOptions set to 'Something Else' or empty"
			);
		}
		setCurrentContentOptions(options);

		// Reset selection when the report type changes
		console.log(
			'ReportReason useEffect: Before reset - selectedReasonIndex =',
			selectedReasonIndex
		);
		setSelectedReasonIndex(null);
		updateReportData({ reasonOfReport: null });
	}, [selectedReasonIndex, selectedReportType, updateReportData]);

	const handleButtonClick = (index: number) => {
		const newIndex = index + 1;
		setSelectedReasonIndex(newIndex);
		console.log(
			'handleButtonClick: Button index = ',
			index,
			'setting selectedReasonIndex to = ',
			newIndex
		);
	};

	const handleNextClick = () => {
		console.log(
			'handleNextClick: Current selectedReasonIndex =',
			selectedReasonIndex
		);
		if (selectedReasonIndex !== null) {
			updateReportData({ reasonOfReport: selectedReasonIndex });
			console.log(
				'handleNextClick: Calling updateReportData with reasonIndex = ',
				selectedReasonIndex
			);
			onNextStep();
			console.log('handleNextClick: Calling onNextStep');
		} else {
			alert('Please select the reason for reporting.'); // Consider a less disruptive error display
		}
	};

	return (
		<div className="bg-white rounded-lg p-6 shadow-md">
			<div className="flex justify-start items-center mb-2">
				<button
					className="text-pri-color hover:text-pri-color flex items-center gap-2"
					onClick={onPreviousStep}
				>
					<IoArrowBackOutline /> <span style={{ color: '#ffb000' }}>Back</span>
				</button>
			</div>
			<h5 className="font-bold mb-6">Why are you reporting this content?</h5>
			<div className="flex flex-col gap-4 mb-6">
				{currentContentOptions?.map((report, index) => (
					<div className="flex gap-2" key={index}>
						<button
							onClick={() => {
								console.log(
									'Rendering button for index:',
									index,
									'current selectedReasonIndex:',
									selectedReasonIndex
								);
								handleButtonClick(index);
							}}
							className={`w-6 h-6 rounded-full flex items-center justify-center ${
								selectedReasonIndex === index + 1
									? 'bg-pri-color'
									: 'bg-white border border-gray-300' // Fixed border style
							}`}
							style={{ minWidth: '1.5em', minHeight: '1.5em' }}
						>
							{selectedReasonIndex === index + 1 && (
								<span
									className="text-white"
									style={{ fontSize: '1em', lineHeight: '1.5em' }}
								>
									<IoMdCheckmark />
								</span>
							)}
						</button>
						<div>
							<h6 className="font-semibold text-sm"> {report.title} </h6>
							<p className="text-sm text-gray-400 py-1"> {report?.content} </p>
						</div>
					</div>
				))}
			</div>
			<button
				className="w-full md:w-auto md:min-w-[200px] bg-brown hover:bg-pri-color text-white py-2 rounded-lg mt-4"
				onClick={handleNextClick}
			>
				Next
			</button>
		</div>
	);
};

export default ReportReason;
