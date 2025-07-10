import { useState } from 'react';
import { HiOutlineUsers } from 'react-icons/hi2';
import { SlUserFemale } from 'react-icons/sl';

import CreateTeamModal from '../../components/Modals/CreateTeamModal';
import SeekTeamModal from '../../components/Modals/SeekTeamModal';
import TeamCollaborationCard from '../../components/TeamCollaborationCard';
import { IoArrowBackOutline } from 'react-icons/io5';

const TeamCollaboration = () => {
	const [currentLink, setCurrentLink] = useState('Innovators');
	const [openCreateTeamModal, setOpenCretaeTeamModal] = useState(false);
	const [openSeekTeamModal, setOpenSeekTeamModal] = useState(false);

	const onCloseCreateTeamModal = () => {
		setOpenCretaeTeamModal(false);
	};

	const onCloseSeekTeamModal = () => {
		setOpenSeekTeamModal(false);
	};

	const toggleSeekTeamModal = () => {
		setOpenSeekTeamModal((prev) => !prev);
	};

	const toggleCreateTeamModal = () => {
		setOpenCretaeTeamModal((prev) => !prev);
	};

	const data = [1, 2, 3];
	const links = ['Innovators', 'Teams'];

	return (
		<>
			<CreateTeamModal
				onCloseModal={onCloseCreateTeamModal}
				openModal={openCreateTeamModal}
			/>
			<SeekTeamModal
				onCloseModal={onCloseSeekTeamModal}
				openModal={openSeekTeamModal}
			/>
			<div className="flex-center-between">
				<h4 className="y-3 font-semibold text-xl">Team Collaboration</h4>
				<div className="flex-center flex-wrap gap-2 pt-5">
					<button className="flex-center gap-1 text-sm">
						<IoArrowBackOutline />
						Go back
					</button>
					<button
						className="bg-brown px-3 py-1 text-white text-sm rounded-full w-fit flex-center gap-1"
						onClick={toggleSeekTeamModal}
					>
						<HiOutlineUsers /> <span>Seek a team</span>
					</button>
					<button
						className="bg-white px-3 py-1 text-brown border-1 rounded-full text-sm w-fit flex-center gap-1"
						onClick={toggleCreateTeamModal}
					>
						<SlUserFemale /> <span>Create a team</span>
					</button>
				</div>
			</div>
			<p className="py-6 text-sm">
				Team up with other innovators or teams for{' '}
				<span className="font-semibold">
					P&G Expiration Date Elongation For Dairy Products Challenge 2023
				</span>
			</p>
			<div className="flex-center justify-center gap-4">
				{links?.map((link, index) => (
					<button
						key={index}
						className={`px-5 py-2 bg-white rounded ${
							currentLink === link && 'border-1 border-brown'
						}`}
						onClick={() => setCurrentLink(link)}
					>
						{link}
					</button>
				))}
			</div>
			<div className="w-full flex flex-wrap py-8">
				{data.map((profile, index) => (
					<TeamCollaborationCard index={index} currentLink={currentLink} />
				))}
			</div>
			<div className="flex-center justify-center">
				<button className="px-6 py-1 rounded-full border-1 border-brown">
					Load more
				</button>
			</div>
			<div className="mb-8"></div>{' '}
			{/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
		</>
	);
};

export default TeamCollaboration;
