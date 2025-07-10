import { useState } from 'react';
import { Link } from 'react-router-dom';
import Awards from '../../components/ProfileComponent/Awards';
import Man from '../../assets/images/man.jpg';
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import {
	FaYoutube,
	FaX as FaTwitter,
	FaGithub,
	FaLinkedinIn,
	FaLink,
	FaEllipsisVertical,
} from 'react-icons/fa6';
import {
	IoBriefcaseOutline,
	IoLocationOutline,
	IoPeopleOutline,
	IoBulbOutline,
	IoAddOutline,
	IoChatbubbleOutline,
	IoPersonOutline,
	IoTrophyOutline,
} from 'react-icons/io5';
import Dropdown from 'src/components/Dropdown';
import { AnimatePresence } from 'framer-motion';
import DashboardHeader from 'src/components/bee-interface/DashboardHeader';

import HiveHeader from './HiveHeader'; // MOHAMMAD: THIS IS THE HEADER WE SHOUOLD USE
// BUT REPLACING IT WILL CAUSE DROPDOWN PROBLEMS WITH THE CURRENT MENUS IN THE MANAGE CHALLENGE TABS.

const aboutMe = {
	name: 'Mohammad Razghandi',
	whatYouDo: 'CEO at InnoBee',
	location: 'Tehran, Iran',
	skills: ['Entrepreneur', 'Innovation Manager', 'Researcher'],
	interest: ['Consultant', 'Industry Expert', 'InnoBee Expert', 'Judge'],
	categories: ['Technology', 'Sustainability', 'Arts & Design'],
	followers: '2,745,000',
	innovationArchetype: 'Relentless Creative',
	mbtiType: 'ENFP',
	challengesWon: '1',
};

const navLinks = ['Awards', 'Activity', 'Certifications'];

const dropdownLinks = [
	{ title: 'Follow' },
	{ title: 'Send message' },
	{ title: 'Share profile' },
	{ title: 'Download as PDF' },
	{ title: 'Report abuse' },
];

const socialLinks = [
	{ name: 'YouTube', icon: FaYoutube, url: '#' },
	{ name: 'X', icon: FaTwitter, url: '#' },
	{ name: 'GitHub', icon: FaGithub, url: '#' },
	{ name: 'Edge', icon: FaLink, url: '#' },
	{ name: 'LinkedIn', icon: FaLinkedinIn, url: '#' },
];

const PublicProfile = () => {
	const [currentLink, setCurrentLink] = useState('Awards');
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const toggleLink = (link: string) => {
		setCurrentLink(link);
	};

	return (
		<div className="w-full relative bg-gray-100 min-h-screen mx-auto">
			<DashboardHeader title="" />
			<div className="padding-x max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Left Column (Main Content) */}
				<div className="lg:col-span-2 bg-white rounded-lg shadow-md relative">
					<div className="relative w-full h-60 bg-gray-200 rounded-t-lg overflow-hidden">
						{/* Cover Picture Placeholder */}
						<img src={Man} alt="Cover" className="w-full h-full object-cover" />
					</div>
					<div className="absolute left-8 -mb-16 top-48">
						{' '}
						{/* MOHAMMAD: Adjusted the profile picture in the page*/}
						<img
							src={Man}
							alt={aboutMe.name}
							className="w-24 h-24 object-cover rounded-full shadow-lg border-4 border-white"
						/>
					</div>
					<div className="px-6 py-4 pt-8">
						<div className="flex justify-end items-center mb-2">
							<div className="flex items-center gap-3">
								{socialLinks.map((item, index) => (
									<a
										key={index}
										href={item.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										<item.icon className="w-5 h-5 text-gray-600" />
									</a>
								))}
							</div>
						</div>
						<h6 className="text-xl font-semibold text-gray-800 mb-4">
							{aboutMe.name}
						</h6>
						<div className="grid grid-cols-2 gap-4 mb-4 text-sm">
							<div className="flex items-center gap-2">
								<IoBriefcaseOutline className="text-gray-500 w-4 h-4" />
								<span>{aboutMe.whatYouDo}</span>
							</div>
							<div className="flex items-center gap-2">
								<IoBulbOutline className="text-gray-500 w-4 h-4" />
								<span>{aboutMe.innovationArchetype}</span>
							</div>
							<div className="flex items-center gap-2">
								<IoPeopleOutline className="text-gray-500 w-4 h-4" />
								<span>{aboutMe.followers} followers</span>
							</div>
							<div className="flex items-center gap-2">
								<IoPersonOutline className="text-gray-500 w-5 h-5" />
								<span>{aboutMe.mbtiType}</span>
							</div>
							<div className="flex items-center gap-2">
								<IoLocationOutline className="text-gray-500 w-4 h-4" />
								<span>{aboutMe.location}</span>
							</div>
							<div className="flex items-center gap-2">
								<IoTrophyOutline className="text-gray-500 w-4 h-4" />
								<span>{aboutMe.challengesWon} challenge won</span>
							</div>
						</div>
						<div className="flex items-center gap-3 mb-6">
							<button className="bg-brown text-white py-2 px-8 pr-10 rounded-full text-sm hover:bg-pri-color">
								<IoAddOutline className="inline-block mr-1 w-4 h-4" /> Follow
							</button>
							<button className="bg-white text-brown border-1 py-2 px-8 pr-10 rounded-full text-sm hover:bg-brown hover:text-white">
								<IoChatbubbleOutline className="inline-block mr-1 w-4 h-4" />{' '}
								Message
							</button>
							<div className="relative">
								<FaEllipsisVertical
									className="text-xl cursor-pointer text-gray-500 hover:text-gray-700"
									onClick={toggleDropdown}
								/>
								<AnimatePresence>
									{isOpen && <Dropdown dropdownLinks={dropdownLinks} />}
								</AnimatePresence>
							</div>
						</div>
					</div>
					<div className="px-6 py-4 border-t border-gray-200">
						<h2 className="font-semibold text-lg mb-3">About Me</h2>
						<p className="text-gray-700 text-sm leading-relaxed mb-4">
							Hello, I'm Mohammad! I'm a dexterous business problem-solver with
							rich experience in various roles and industries. I enjoy
							everything about the business, from strategy to implementation and
							evaluation.
						</p>
					</div>
					<div className="px-6 py-4 border-t border-gray-200">
						<h2 className="font-semibold text-lg mb-3">Skills</h2>
						<div className="flex center gap-2 flex-wrap">
							{aboutMe.skills?.map((skill, index) => (
								<span
									className="px-3 py-1 bg-white-100 border-1 border-brown text-brown rounded-full hover:bg-gray-100 text-xs font-semibold mr-2 mb-2"
									key={index}
								>
									{skill}
								</span>
							))}
						</div>
					</div>
					<div className="px-6 py-4 border-t border-gray-200">
						<h2 className="font-semibold text-lg mb-3">Interests</h2>
						<div className="flex center gap-2 flex-wrap">
							{aboutMe.interest?.map((interest, index) => (
								<span
									className="px-3 py-1 bg-white-100 border-1 border-brown text-brown rounded-full hover:bg-gray-100 text-xs font-semibold mr-2 mb-2"
									key={index}
								>
									{interest}
								</span>
							))}
						</div>
					</div>
					<div className="px-6 py-4 border-t border-gray-200 rounded-b-lg">
						<h2 className="font-semibold text-lg mb-3">Categories</h2>
						<div className="flex center gap-2 flex-wrap">
							{aboutMe.categories?.map((category, index) => (
								<span
									className="px-3 py-1 bg-white-100 border-1 border-brown text-brown rounded-full hover:bg-gray-100 text-xs font-semibold mr-2 mb-2"
									key={index}
								>
									{category}
								</span>
							))}
						</div>
					</div>
				</div>

				{/* Right Column (Sidebar) */}
				<div className="lg:col-span-1 mb-8 z-100">
					<div className="bg-white rounded-t-lg shadow-md overflow-hidden">
						<img
							src={Man}
							alt="Advertisement"
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="bg-white rounded-b-lg shadow-md p-4">
						<h2 className="font-semibold text-lg mb-3">
							More challenges for you
						</h2>
						<ul className="space-y-3">
							<li className="flex items-center gap-3">
								<IoTrophyOutline className="rounded-lg w-6 h-6 text-brown" />
								<div className="flex-1">
									<h6 className="text-sm font-semibold text-gray-800">
										Challenge Title 1
									</h6>
									<p className="text-xs text-gray-600 truncate">
										Brief description of the challenge...
									</p>
								</div>
								<button className="bg-white-500 text-brown border border-brown py-1 px-2 rounded-full text-xs hover:bg-brown hover:text-white">
									+
								</button>
							</li>
							<li className="flex items-center gap-3">
								<IoTrophyOutline className="rounded-lg w-6 h-6 text-brown" />
								<div className="flex-1">
									<h6 className="text-sm font-semibold text-gray-800">
										Another Challenge Here
									</h6>
									<p className="text-xs text-gray-600 truncate">
										Short info about this exciting challenge...
									</p>
								</div>
								<button className="bg-white-500 text-brown py-1 px-2 border border-brown rounded-full text-xs hover:bg-brown hover:text-white">
									+
								</button>
							</li>
							<li className="flex items-center gap-3">
								<IoTrophyOutline className="rounded-lg w-6 h-6 text-brown" />
								<div className="flex-1">
									<h6 className="text-sm font-semibold text-gray-800">
										One More Challenge
									</h6>
									<p className="text-xs text-gray-600 truncate">
										A final challenge suggestion for you...
									</p>
								</div>
								<button className="bg-white-500 text-brown py-1 px-2 border border-brown rounded-full text-xs hover:bg-brown hover:text-white">
									+
								</button>
							</li>
						</ul>
					</div>
				</div>

				{/* Repeated Left Column (Main Content) */}
				<div className="lg:col-span-2 bg-white rounded-lg shadow-md mb-8 relative">
					<div className="px-6 py-4 pt-8">
						<div className="flex justify-end items-center mb-2">
							<div className="flex items-center gap-3"></div>
						</div>
						<h6 className="text-xl font-semibold text-gray-800 mb-4">
							Activity
						</h6>
						<div className="grid grid-cols-2 gap-4 mb-4 text-sm"></div>
						<div className="flex flex-center justify-left gap-4 my-2 py-2 w-full overflow-x-auto">
							{navLinks?.map((link, index) => (
								<p
									onClick={() => toggleLink(link)}
									key={index}
									className={`px-4 py-2 bg-white-100 border-1 border-brown text-brown rounded-lg hover:bg-gray-100 text-xs font-semibold mr-2 mb-2 ${
										currentLink === link &&
										'border-brown border-1 rounded-lg hover:bg-gray-100'
									}`}
								>
									{link}
								</p>
							))}
						</div>
						{currentLink === 'Awards' && <Awards />}
						{currentLink === 'Certifications' && <Awards />}
						{currentLink === 'Activity' && <Awards />}
					</div>
					<div className="px-6 py-4 mb-4 border-t border-gray-200">
						<Link to="" className="flex-center justify-center gap-1">
							<p className="underline text-sm font-semibold">
								View all activities
							</p>{' '}
							<MdOutlineArrowRightAlt />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PublicProfile;
