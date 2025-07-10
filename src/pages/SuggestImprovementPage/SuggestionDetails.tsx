import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoArrowBackOutline } from 'react-icons/io5';

const SuggestionDetails = ({
	onNextStep,
	onPreviousStep,
	updateReportData,
}: {
	onNextStep: () => void;
	onPreviousStep: () => void;
	updateReportData: (data: any) => void;
}) => {
	const [description, setDescription] = useState('');
	const [screenshot, setScreenshot] = useState<File | null>(null);
	const [link, setLink] = useState('');
	const [descriptionError, setDescriptionError] = useState('');

	const handleDescriptionChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		if (event.target.value.length <= 1500) {
			setDescription(event.target.value);
			setDescriptionError('');
		} else {
			setDescriptionError('Description cannot exceed 1500 characters.');
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
		if (!description.trim()) {
			setDescriptionError('Please provide a description.');
			return;
		}
		if (descriptionError) {
			return;
		}
		updateReportData({
			suggestionDescription: description,
			suggestionScreenshot: screenshot,
			suggestionLink: link,
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
					<h5 className="font-bold mb-6">Tell us more about your suggestion</h5>
					<div className="max-w-[600px] mb-4">
						<label
							htmlFor="description"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Description: <span className="text-red-500">*</span>
						</label>
						<textarea
							id="description"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							rows={4}
							placeholder="Please provide a detailed description of your suggestion."
							value={description}
							onChange={handleDescriptionChange}
							maxLength={1500}
						></textarea>
						{descriptionError && (
							<p className="text-red-500 text-xs italic">{descriptionError}</p>
						)}
						<p className="text-gray-500 text-xs italic">
							{description.length}/1500 characters
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
							Link (Optional):
						</label>
						<input
							type="text"
							id="link"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Enter a relevant link if applicable."
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

export default SuggestionDetails;
