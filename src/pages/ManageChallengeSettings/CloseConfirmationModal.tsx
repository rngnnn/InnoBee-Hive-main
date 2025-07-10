import React from 'react';
import { Modal, Button, Select, Input } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

// Define reusable Close button classes
// Aligned with the Close button used in LoginPreference and ManageChallengeSettings
const CloseButtonClasses =
	'w-60 bg-[#ED1A3B] hover:bg-[#CE1A3B] text-white text-base font-normal py-5 rounded-lg';

type CloseConfirmationModalProps = {
	open: boolean;
	onCancel: () => void;
	onSubmit: () => void;
	CloseReason: string;
	setCloseReason: (value: string) => void;
	CloseComment: string;
	setCloseComment: (value: string) => void;
};

const CloseConfirmationModal = ({
	open,
	onCancel,
	onSubmit,
	CloseReason,
	setCloseReason,
	CloseComment,
	setCloseComment,
}: CloseConfirmationModalProps) => {
	const reasons = [
		{ value: 'deadline-missed', label: 'Deadline missed' },
		{ value: 'no-worthy-submissions', label: 'No worthy submissions' },
		{
			value: 'solution-outpaced',
			label: 'Solution was outpaced by innovation',
		},
		{ value: 'other', label: 'Other – please leave a comment' },
	];

	const handleReasonChange = (value: string) => {
		setCloseReason(value);
		if (value !== 'other') {
			setCloseComment(''); // Clear comment if "Other" is not selected
		}
	};

	const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCloseComment(e.target.value);
	};

	return (
		<Modal
			title={
				<span className="text-red-600 font-bold text-xl">
					Close challenge request
				</span>
			}
			open={open}
			onCancel={onCancel}
			footer={null} //This will hide the open and cancel buttons!
		>
			<div className="flex flex-col mt-4 gap-4">
				{/* Subheading */}
				<p className="text-gray-700 font-normal text-base">
					Pressing this button ends your challenge with no winner. Prize money
					will be returned to the funders (challenge creator or challenge
					sponsor).
				</p>

				{/* Dropdown Menu */}
				<div className="flex flex-col gap-2">
					<label className="font-semibold text-base mb-2">
						Reason for closing the challenge:
					</label>
					<Select
						placeholder="Select a reason"
						onChange={handleReasonChange}
						value={CloseReason || undefined}
						style={{ width: '100%' }}
						className="bg-white rounded-lg border-1 focus:border-pri-color text-base font-normal text-gray-700 "
					>
						{reasons.map((reason) => (
							<Option key={reason.value} value={reason.value}>
								{reason.label}
							</Option>
						))}
					</Select>
				</div>

				{/* Optional Comment for "Other" */}
				{CloseReason === 'other' && (
					<div className="flex flex-col gap-2">
						<label className="font-semibold mb-2">Comment:</label>
						<TextArea
							rows={4}
							value={CloseComment}
							onChange={handleCommentChange}
							placeholder="Please provide details"
							className="bg-white px-3 py-2 rounded-lg outline-none border-1 focus:border-pri-color"
						/>
					</div>
				)}

				{/* Submit Button */}
				<div className="flex justify-end mt-4">
					<Button
						type="primary"
						onClick={onSubmit}
						disabled={
							CloseReason === '' ||
							(CloseReason === 'other' && CloseComment.trim() === '')
						}
						className={CloseButtonClasses}
					>
						Submit request
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default CloseConfirmationModal;
