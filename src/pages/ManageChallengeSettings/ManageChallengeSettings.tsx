import React, { useState, ReactNode } from 'react';
import DashboardHeader from 'src/components/bee-interface/DashboardHeader';
import CloseConfirmationModal from './CloseConfirmationModal';
import ProfileSection from 'src/components/ProfileComponent/ProfileSection';
import { Input } from 'antd';
// Check import path based on your file structure
import Checkbox from '../../components/Checkbox';
// Check import path based on your file structure
import { Button } from 'src/components/buttons/Button';
import { useToast } from 'src/hooks/use-toast';
import { FaCopy, FaLink, FaQuestionCircle, FaTimesCircle } from 'react-icons/fa';
import { IoLink, IoLinkOutline } from 'react-icons/io5';

const { TextArea } = Input;

const ManageChallengeSettings = () => {
	const { toast } = useToast();

	// State for each setting
	const [showJudges, setShowJudges] = useState(false);
	const [enableBlindJudging, setEnableBlindJudging] = useState(false);
	const [publicSubmissions, setPublicSubmissions] = useState(false);
	const [allowMultipleSubmissions, setAllowMultipleSubmissions] =
		useState(false);
	const [enablePublicVoting, setEnablePublicVoting] = useState(false); // Added state for public voting
	const [twitterShareText, setTwitterShareText] = useState('');
	const defaultTwitterShareText =
		'{challengetitle}: {stage} InnoBee.buzz/challenges/{challengeid}';

	// State and handlers for Close Modal
	const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
	const [CloseReason, setCloseReason] = useState('');
	const [CloseComment, setCloseComment] = useState('');

	const uniqueSubmissionLink =
		'https://innobee.buzz/challenges/your-challenge-id/unique-submission-link'; // Placeholder link

	const handleCopy = () => {
		if (uniqueSubmissionLink) {
			navigator.clipboard
				.writeText(uniqueSubmissionLink)
				.then(() => {
					toast({
						title: 'Link copied to clipboard!',
						duration: 1500,
					});
				})
				.catch((err) => {
					console.error('Failed to copy link: ', err);
					toast({
						title: 'Failed to copy link.',
						variant: 'destructive',
						duration: 1500,
					});
				});
		}
	};

	const openCloseModal = () => setIsCloseModalOpen(true);
	const closeCloseModal = () => {
		setIsCloseModalOpen(false);
		setCloseReason(''); // Reset state on close
		setCloseComment(''); // Reset state on close
	};

	const handleCloseSubmit = () => {
		console.log(
			'Challenge deletion requested with reason:',
			CloseReason,
			'and comment:',
			CloseComment
		);
		// Implement actual deletion logic here
		closeCloseModal();
		// Show success toast and/or redirect after actual deletion
	};

	return (
		<div>
			<DashboardHeader title="Manage Challenge" menuItems={[]} />
			<br />
			<h6 className="font-semibold text-lg mt-2">Challenge Settings</h6>
			<p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
				View our guides here for instructions on using the options and fields in
				this submenu.
			</p>
			{/* Settings Sections */}
			<div className="flex flex-col gap-6">
				<ProfileSection title="Customizations">
					<div className="flex flex-col gap-4">
						{/* Show Judges Checkbox */}
						<div className="flex items-start gap-6">
							{/* Handler expects the new boolean state */}
							<Checkbox
								checked={showJudges}
								onChange={(newState: boolean) => setShowJudges(newState)}
								className="cursor-pointer"
							>
								{/* Pass the label text as children */}
								<span className="font-semibold">Show judges</span>
							</Checkbox>
							<p className="text-gray-700">
								Make the identity of the judges public on your challenge page
							</p>
						</div>

						{/* Enable Blind Judging Checkbox */}
						<div className="flex items-start gap-6">
							{/* Handler expects the new boolean state */}
							<Checkbox
								checked={enableBlindJudging}
								onChange={(newState: boolean) =>
									setEnableBlindJudging(newState)
								}
								className="cursor-pointer"
							>
								<span className="font-semibold">Enable blind judging</span>
							</Checkbox>
							<p className="text-gray-700">
								The following fields will be hidden from the judges: Name,
								Email, Location, IP address. To hide any other fields from the
								judges, toggle on the "Hide from judges" button in the
								appropriate submission form fields.
							</p>
						</div>

						{/* Make submissions publicly visible Checkbox */}
						<div className="flex items-start gap-6">
							{/* Handler expects the new boolean state */}
							<Checkbox
								checked={publicSubmissions}
								onChange={(newState: boolean) => setPublicSubmissions(newState)}
								className="cursor-pointer"
							>
								<span className="font-semibold">
									Make submissions publicly visible
								</span>
							</Checkbox>
							<p className="text-gray-700">
								This allows anyone to view challenge submissions on the
								challenge page. The default is private.
							</p>
						</div>

						{/* Allow multiple submissions per user/team Checkbox */}
						<div className="flex items-start gap-6">
							{/* Handler expects the new boolean state */}
							<Checkbox
								checked={allowMultipleSubmissions}
								onChange={(newState: boolean) =>
									setAllowMultipleSubmissions(newState)
								}
								className="cursor-pointer"
							>
								<span className="font-semibold">
									Allow multiple submissions per user/team
								</span>
							</Checkbox>
							<p className="text-gray-700">
								Allow teams to submit multiple solutions to the same challenge.
							</p>
						</div>

						{/* Public Voting Checkbox - Added state and handler */}
						<div className="flex items-start gap-6">
							{/* Handler expects the new boolean state */}
							<Checkbox
								checked={enablePublicVoting}
								onChange={(newState: boolean) =>
									setEnablePublicVoting(newState)
								}
								className="cursor-pointer"
							>
								<span className="font-semibold">Public voting</span>
							</Checkbox>
							<p className="text-gray-700">
								Enable functionality allowing public voting for submissions
							</p>
						</div>
					</div>
				</ProfileSection>

				<ProfileSection title="Submission Link">
					<div className="flex flex-col gap-4">
						{/* Link Field */}
						<div className="flex flex-col gap-2 mb-4">
							<label className="font-semibold mb-2">Link:</label>
							<Input
								value={uniqueSubmissionLink}
								readOnly
								className="bg-white px-3 py-2 rounded-lg outline-none border-1 focus:border-pri-color max-w-[600px]"
							/>
						</div>

						{/* Explanation */}
						<p className="text-gray-700">
							This is a single-use link, it can be shared at the discretion of
							the Challenge Creator or Moderators to a participant who
							encounters any problems uploading their submission and/or after
							the submission deadline has passed.
						</p>

						{/* Copy Button - text passed as children */}
						<div>
							<Button
								type="button"
								onClick={handleCopy}
								className={`w-60 rounded-lg bg-brown hover:bg-pri-color text-white py-2 px-4 text-base font-normal mt-4`}
								style={{ padding: '10px 20px' }}
								disabled={!uniqueSubmissionLink}
								iconLeft={<FaLink />}
								iconRight={null}
								iconClass="text-white"
								iconSize={16}
								loading={false}
								ariaLabel="Copy link"
								size="large"
								variant="primary"
							>
								Copy link
							</Button>
						</div>
					</div>
				</ProfileSection>

				<ProfileSection title="Twitter Share">
					{/* Twitter Share */}
					<div className="flex flex-col gap-2 w-full">
						<label className="font-semibold mb-2" htmlFor="twitterShare">
							Twitter Share
						</label>
						<TextArea
							id="twitterShare"
							name="twitterShare"
							value={twitterShareText}
							onChange={(e) => setTwitterShareText(e.target.value)}
							rows={3}
							className="bg-white w-full px-3 py-2 rounded-lg outline-none focus:border-pri-color border-1"
							placeholder="Enter custom Twitter share text"
						/>
						{twitterShareText === '' && (
							<p className="text-gray-700 mt-2">
								Below is the default Twitter Share Text for your challenge. If
								you would like a different message to be used as your default
								text, simply type that message into the field above. The text in
								the field above will then be used as your default text.
								Otherwise, leave the field above black and your default text
								will read: {defaultTwitterShareText}
							</p>
						)}
					</div>
				</ProfileSection>

				<ProfileSection title="Help">
					{/* Help Section - text passed as children */}
					<div className="flex flex-col gap-2 w-full">
						<p className="text-gray-700">
							Need help with your challenge? Visit our help center or contact
							our support team.
						</p>
						<Button
							type="button"
							onClick={() => window.open('https://help.innobee.buzz', '_blank')}
							className={`w-60 rounded-lg bg-brown hover:bg-pri-color text-white py-2 px-4 text-base font-normal mt-4`}
							style={{ padding: '10px 20px' }}
							disabled={false}
							iconLeft={null}
							iconRight={null}
							iconClass="text-white"
							iconSize={16}
							loading={false}
							ariaLabel="Help Center"
							size="large"
							variant="primary"
						>
							Help Center
						</Button>
					</div>
				</ProfileSection>

				<ProfileSection title="Danger Zone">
					{/* Close Challenge - text passed as children */}
					<div className="flex flex-col gap-2 w-full">
						<p className="text-gray-700">
							This will close the challenge and remove it from the platform.
						</p>
						<Button
							type="button"
							onClick={openCloseModal}
							className={`w-60 bg-[#ED1A3B] hover:bg-[#CE1030] text-white text-base font-normal py-2 rounded-lg mt-4 mb-2`}
							style={{ padding: '10px 20px' }}
							disabled={false}
							iconLeft={<FaTimesCircle />}
							iconRight={null}
							iconClass="text-white"
							iconSize={16}
							loading={false}
							ariaLabel="Close challenge"
							size="large"
							variant="primary"
						>
							Close challenge
						</Button>
					</div>
				</ProfileSection>
			</div>{' '}
			{/* End of main sections container */}
			{/* Modals */}
			<CloseConfirmationModal
				open={isCloseModalOpen}
				onCancel={closeCloseModal}
				onSubmit={handleCloseSubmit}
				CloseReason={CloseReason}
				setCloseReason={setCloseReason}
				CloseComment={CloseComment}
				setCloseComment={setCloseComment}
			/>
			<br />
			<br />
		</div>
	);
};

export default ManageChallengeSettings;
