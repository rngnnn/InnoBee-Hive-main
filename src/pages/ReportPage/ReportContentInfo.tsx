import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoArrowBackOutline } from 'react-icons/io5';

// Define props interface
interface ReportContentInfoProps {
	onNextStep: () => void;
	onPreviousStep: () => void;
	updateReportData: (data: {
		reportExplanation: string;
		reportScreenshot: File | null;
		reportLink: string;
	}) => void;
}

const ReportContentInfo: React.FC<ReportContentInfoProps> = ({
	onNextStep,
	onPreviousStep,
	updateReportData,
}) => {
	const [explanation, setExplanation] = useState<string>('');
	const [screenshot, setScreenshot] = useState<File | null>(null);
	const [link, setLink] = useState<string>('');
	const [explanationError, setExplanationError] = useState<string>('');

	const handleExplanationChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		if (event.target.value.length <= 1500) {
			setExplanation(event.target.value);
			setExplanationError('');
		} else {
			setExplanationError('Explanation cannot exceed 1500 characters.');
		}
	};

	const handleScreenshotChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files && event.target.files.length > 0) {
			setScreenshot(event.target.files[0]);
		} else {
			setScreenshot(null);
		}
	};

	const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLink(event.target.value);
	};

	const handleNextClick = () => {
		if (!explanation.trim()) {
			setExplanationError('Please provide an explanation for your report.');
			return;
		}
		if (explanationError) {
			return; // Prevent navigation if there's a character limit error
		}
		updateReportData({
			reportExplanation: explanation,
			reportScreenshot: screenshot,
			reportLink: link,
		});
		onNextStep();
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
						Tell us more about the content you are reporting
					</h5>
					<div className="max-w-[600px] mb-4">
						<label
							htmlFor="explanation"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Explanation: <span className="text-red-500">*</span>
						</label>
						<textarea
							id="explanation"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							rows={4}
							placeholder="Please provide a detailed explanation of why you are reporting this content."
							value={explanation}
							onChange={handleExplanationChange}
							maxLength={1500}
						></textarea>
						{explanationError && (
							<p className="text-red-500 text-xs italic">{explanationError}</p>
						)}
						<p className="text-gray-500 text-xs italic">
							{explanation.length}/1500 characters
						</p>
					</div>
					<div className="max-w-[600px] mb-4">
						<label
							htmlFor="screenshot"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Upload Screenshot (Optional):
						</label>
						<input
							type="file"
							id="screenshot"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							onChange={handleScreenshotChange}
						/>
					</div>
					<div className="max-w-[600px] mb-6">
						<label
							htmlFor="link"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Link to Content (Optional):
						</label>
						<input
							type="text"
							id="link"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Enter the link to the content if applicable."
							value={link}
							onChange={handleLinkChange}
						/>
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

export default ReportContentInfo;
