import {
	IoBriefcaseOutline,
	IoBugOutline,
	IoDocumentTextOutline,
	IoExtensionPuzzleOutline,
	IoFileTrayOutline,
	IoFilterOutline,
	IoFingerPrintOutline,
	IoFlagOutline,
	IoHelpOutline,
	IoMapOutline,
	IoNotificationsOutline,
	IoOptionsOutline,
	IoPeopleOutline,
	IoPieChartOutline,
	IoStarOutline,
} from 'react-icons/io5';
import {
	HiOutlineAdjustmentsHorizontal,
	HiOutlineBanknotes,
	HiOutlineUserGroup,
	HiOutlineUsers,
} from 'react-icons/hi2';
import { IoHomeOutline } from 'react-icons/io5';
import {
	LuBookMarked,
	LuBox,
	LuConstruction,
	LuHandshake,
	LuScreenShare,
	LuScroll,
} from 'react-icons/lu';
import { SlSupport, SlUserFemale } from 'react-icons/sl';

import Download from '../assets/icons/download.svg';
import Edit from '../assets/icons/edit.svg';
import Eye from '../assets/icons/Eye 2.svg';
import View from '../assets/icons/View 2.svg';

import { GrOverview, GrUpdate } from 'react-icons/gr';
import {
	RiGuideLine,
	RiQuestionAnswerLine,
	RiTimelineView,
	RiUserSettingsLine,
} from 'react-icons/ri';
import challenge_discovery from '../assets/images/challenge-dicovery.webp';
import ChatLogo from '../assets/images/chatgpt-icon.webp';
import contests from '../assets/images/cheerful-people.webp';
import desings from '../assets/images/designs.webp';
import ideas from '../assets/images/ideas.webp';
import innovation_strategy from '../assets/images/innovation-strategy.webp';
import Man from '../assets/images/man.jpg';
import products from '../assets/images/products.webp';
import proof_of_concept from '../assets/images/proof-of-concept.webp';
import prototypes from '../assets/images/prototypes.webp';
import women_power from '../assets/images/women-power.webp';
import coming_soon from '../assets/images/coming-soon.webp';
import slide1 from 'src/assets/images/slide1.webp';
import slide2 from 'src/assets/images/slide2.webp';
import slide3 from 'src/assets/images/slide3.webp';
import homeSlider1 from 'src/assets/images/homeslider01.jpg';
import homeSlider2 from 'src/assets/images/homeslider02.jpg';
import homeSlider3 from 'src/assets/images/homeslider03.jpg';
import homeSlider4 from 'src/assets/images/homeslider04.jpg';
import homeSlider5 from 'src/assets/images/homeslider05.jpg';
import { TbGavel, TbMessage2Cog } from 'react-icons/tb';

export const dashboardMainLinks = [
	{
		title: 'Home',
		link: '/overview',
		icon: <IoHomeOutline />,
	},
	{
		title: 'Explore',
		link: '/explore',
		icon: <IoMapOutline />,
	},
	{
		title: 'My Challenges',
		link: '/my-challenges',
		icon: <LuBox strokeWidth="1.5" />,
	},
	{
		title: 'My Network',
		link: '/network/invitations',
		icon: <HiOutlineUsers />,
	},
	{
		title: 'My Submissions',
		link: '/my-submission',
		icon: <IoExtensionPuzzleOutline />,
	},
	{
		title: 'Judging',
		link: '/judging',
		icon: <TbGavel strokeWidth="1.5" />,
	},
	// {
	// 	title: 'Others',
	// 	link: '/others',
	// 	icon: <BsBoxes />,
	// },
	{
		title: 'Settings',
		link: '/account/profile',
		icon: <HiOutlineAdjustmentsHorizontal />,
	},
	{
		title: 'Need Help?',
		link: '/help-center',
		icon: <SlSupport />,
	},
	{
		title: 'Innobee Guidelines',
		link: '/innobee-guidelines',
		icon: <LuBookMarked strokeWidth="1.5" />,
	},
];

export const networkMainLinks = [
	{
		title: 'Invitations',
		link: '/network/invitations',
		icon: <LuScroll />,
	},
	{
		title: 'My Requests',
		link: '/network/my-requests',
		icon: <IoFileTrayOutline />,
	},
	// {
	// 	title: 'Messaging',
	// 	link: 'network/Messaging',
	// 	icon: <IoSendOutline />,
	// },
	// {
	// 	title: 'Send Messages',
	// 	link: '/send-messages',
	// 	icon: <IoPaperPlaneOutline />,
	// },
	// {
	// 	title: 'Team activities',
	// 	link: '/team-activities',
	// 	icon: <VscFolderActive />,
	// },
	// {
	// 	title: 'Team agreement',
	// 	link: '/team-agreement',
	// 	icon: <PiHandshakeLight />,
	// },
	// {
	// 	title: 'Team settings',
	// 	link: '/team-settings',
	// 	icon: <HiOutlineAdjustmentsHorizontal />,
	// },
	// {
	// 	title: 'Miscellaneous',
	// 	link: '/miscellaneous',
	// 	icon: <BiSupport />,
	// },
];

export const accountSettingsLinks = [
	{
		title: 'Profile Details',
		link: '/account/profile',
		icon: <SlUserFemale />,
	},
	{
		title: 'Login Preferences',
		link: '/account/login-preferences',
		icon: <IoFingerPrintOutline />,
	},
	{
		title: 'Cookie Settings',
		link: '/account/cookie-settings',
		icon: <IoOptionsOutline />,
	},
	{
		title: 'Billing & Plans',
		link: '/account/billing',
		icon: <HiOutlineBanknotes />,
	},
	// {
	// 	title: 'Purchase History',
	// 	link: '/account/purchase',
	// 	icon: <BiBasket />,
	// },
	{
		title: 'Notification Settings',
		link: '/account/notification-settings',
		icon: <IoNotificationsOutline />,
	},
	{
		title: 'My Public Profile',
		link: '/public-profile',
		icon: <IoBriefcaseOutline />,
	},
];

export const needHelpLinks = [
	{
		title: 'Help Center',
		link: '/need-help/help-center',
		icon: <IoHelpOutline />,
	},
	// {
	// 	title: 'InnoBee Community',
	// 	link: '/need-help/community',
	// 	icon: <FaRegUser />,
	// },
	// {
	// 	title: 'Chat With Us',
	// 	link: '/need-help/contact-us',
	// 	icon: <IoChatboxOutline />,
	// },
	{
		title: 'Give Feedback',
		link: '/need-help/feedback',
		icon: <IoStarOutline />,
	},
	{
		title: 'Report Content',
		link: '/need-help/report',
		icon: <IoFlagOutline />,
	},
	{
		title: 'Suggest Improvement',
		link: '/need-help/improvement',
		icon: <IoBugOutline />,
	},
];

export const judgingMainLinks = [
	{
		title: 'Judge Invitations',
		link: '/judging',
		icon: <LuScroll />,
	},
	{
		title: 'My Tasks',
		link: '/judging/my-tasks',
		icon: <TbGavel strokeWidth="1.5" />,
	},
	// {
	// 	title: 'Judging Settings',
	// 	link: '/judging-settings',
	// 	icon: <HiOutlineAdjustmentsHorizontal />,
	// 	comingSoon: true,
	// },
	// {
	//   title: "Miscellaneous",
	//   link: "/miscellaneous",
	//   icon: <BiSupport />,
	// },
];
export const manageChallengeLinks = [
	{
		title: 'Overview',
		link: '/manage-challenge/overview',
		icon: <GrOverview strokeWidth="1" />,
	},
	{
		title: 'Guidelines',
		link: '/manage-challenge/guidelines',
		icon: <RiGuideLine />,
	},
	{
		title: 'Timelines',
		link: '/manage-challenge/timelines',
		icon: <RiTimelineView />,
	},
	{
		title: 'FAQ',
		link: '/manage-challenge/faq',
		icon: <RiQuestionAnswerLine />,
	},
	{
		title: 'Updates',
		link: '/manage-challenge/updates',
		icon: <GrUpdate className="h-4 w-4" />,
	},
	{
		title: 'Press',
		link: '/manage-challenge/press',
		icon: <LuScreenShare strokeWidth="1.5" />,
	},
	{
		title: 'Legal Agreement',
		link: '/manage-challenge/legal-agreement',
		icon: <LuHandshake strokeWidth="1.5" />,
	},
	{
		title: 'Performance',
		link: '/manage-challenge/Performance',
		icon: <IoPieChartOutline strokeWidth="2" />,
	},
];

export const manageChallengeSubLinks = [
	{
		title: 'Submission & Judging',
		subLinks: [
			{
				title: 'Submission Form',
				link: '/manage-challenge/submission-form',
				icon: <IoDocumentTextOutline strokeWidth="2" />,
			},
			{
				title: 'View Submissions',
				link: '/my-challenges/view-submissions/1/',
				icon: <IoExtensionPuzzleOutline strokeWidth="2" />,
			},
			// {
			// 	title: 'Submission Options',
			// 	link: '/manage-challenge/submission-options',
			// 	icon: <GiAutoRepair />,
			// },
			{
				title: 'Judging Criteria',
				link: '/manage-challenge/judging-criteria',
				icon: <IoFilterOutline strokeWidth="2" />,
			},
			// {
			// title: 'Judging Activities',
			// link: '/manage-challenge/JudgingActivity',
			// icon: <GiChecklist />,
			// },
			{
				title: 'Judges',
				link: '/manage-challenge/judges',
				icon: <TbGavel strokeWidth="1.5" />,
			},
			{
				title: 'NDA for Judges',
				link: '/manage-challenge/NDA',
				icon: <IoDocumentTextOutline strokeWidth="2" />,
			},
		],
	},
	{
		title: 'Innovation Ecosystem',
		subLinks: [
			{
				title: 'Send Notification',
				link: '/manage-challenge/send-notification',
				icon: <TbMessage2Cog strokeWidth="1.5" />,
			},
			{
				title: 'Moderators',
				link: '/manage-challenge/moderators',
				icon: <RiUserSettingsLine />,
			},
			{
				title: 'Participants',
				link: '/manage-challenge/participants',
				icon: <HiOutlineUserGroup strokeWidth="1.5" />,
			},
			{
				title: 'Partners',
				link: '/manage-challenge/partners',
				icon: <IoPeopleOutline strokeWidth="2" />,
			},
			{
				title: 'Challenge Settings',
				link: '/manage-challenge/settings',
				icon: <IoPeopleOutline strokeWidth="2" />,
			},
			// {
			//	title: 'Notifications',
			//	link: '/manage-challenge/notifications',
			//	icon: <MdOutlineMailLock />,
			// },
		],
	},
	{
		title: 'Others',
		subLinks: [
			{
				title: 'Coming Soon!',
				link: '/manage-challenge/overview',
				icon: <LuConstruction strokeWidth="1.5" />,
			},
			// {
			// 	title: 'Personalized Tab',
			// 	link: '/manage-challenge/PersonalizedTab',
			//	icon: <GiNotebook />, // Represents customization & personal content
			// },
			// {
			// 	title: 'Settings',
			// 	link: '/manage-challenge/Settings',
			// 	icon: <FiSettings />, // Standard settings icon
			// },
			// {
			// 	title: 'Auto Notifications',
			// 	link: '/manage-challenge/AutoNotifications',
			// 	icon: <FiBell />, // Represents notifications & alerts
			// },
		],
	},
];

export const stepsData = [
	{ step: 'Step 2 of 5', description: 'Take a look around >' },
	{ step: 'Step 3 of 5', description: 'Add your profile details >' },
	{ step: 'Step 0 of 1', description: 'Check the challenge types >' },
	{ step: 'Step 0 of 1', description: 'Create your first challenge >' },
	{ step: 'Step 1 of 5', description: 'Upgrade your account >' },
];

export const homeImageSlider = [
	{
		src: homeSlider1,
		description:
			'InnoBee: free P2P platform to unleash the power of innovation.',
	},
	{
		src: homeSlider2,
		description:
			'Create a challenge and publish on the platform in four easy steps.',
	},
	{
		src: homeSlider3,
		description:
			'Participate in a challenge by filling out the submission form.',
	},
	{
		src: homeSlider4,
		description:
			'Invite experts to score the submissions and select your winners.',
	},
	{
		src: homeSlider5,
		description:
			'Visit our Help Center to learn how to navigate the dashboard.',
	},
];

export const countries = [
	{ label: 'Afghanistan', value: 'Afghanistan' },
	{ label: 'Albania', value: 'Albania' },
	{ label: 'Algeria', value: 'Algeria' },
	{ label: 'Andorra', value: 'Andorra' },
	{ label: 'Angola', value: 'Angola' },
	{ label: 'Antigua and Barbuda', value: 'Antigua and Barbuda' },
	{ label: 'Argentina', value: 'Argentina' },
	{ label: 'Armenia', value: 'Armenia' },
	{ label: 'Australia', value: 'Australia' },
	{ label: 'Austria', value: 'Austria' },
	{ label: 'Azerbaijan', value: 'Azerbaijan' },
	{ label: 'Bahamas', value: 'Bahamas' },
	{ label: 'Bahrain', value: 'Bahrain' },
	{ label: 'Bangladesh', value: 'Bangladesh' },
	{ label: 'Barbados', value: 'Barbados' },
	{ label: 'Belarus', value: 'Belarus' },
	{ label: 'Belgium', value: 'Belgium' },
	{ label: 'Belize', value: 'Belize' },
	{ label: 'Benin', value: 'Benin' },
	{ label: 'Bhutan', value: 'Bhutan' },
	{ label: 'Bolivia', value: 'Bolivia' },
	{ label: 'Bosnia and Herzegovina', value: 'Bosnia and Herzegovina' },
	{ label: 'Botswana', value: 'Botswana' },
	{ label: 'Brazil', value: 'Brazil' },
	{ label: 'Brunei', value: 'Brunei' },
	{ label: 'Bulgaria', value: 'Bulgaria' },
	{ label: 'Burkina Faso', value: 'Burkina Faso' },
	{ label: 'Burundi', value: 'Burundi' },
	{ label: 'Cabo Verde', value: 'Cabo Verde' },
	{ label: 'Cambodia', value: 'Cambodia' },
	{ label: 'Cameroon', value: 'Cameroon' },
	{ label: 'Canada', value: 'Canada' },
	{ label: 'Central African Republic', value: 'Central African Republic' },
	{ label: 'Chad', value: 'Chad' },
	{ label: 'Chile', value: 'Chile' },
	{ label: 'China', value: 'China' },
	{ label: 'Colombia', value: 'Colombia' },
	{ label: 'Comoros', value: 'Comoros' },
	{ label: 'Congo', value: 'Congo' },
	{ label: 'Costa Rica', value: 'Costa Rica' },
	{ label: 'Croatia', value: 'Croatia' },
	{ label: 'Cuba', value: 'Cuba' },
	{ label: 'Cyprus', value: 'Cyprus' },
	{ label: 'Czech Republic', value: 'Czech Republic' },
	{
		label: 'Democratic Republic of the Congo',
		value: 'Democratic Republic of the Congo',
	},
	{ label: 'Denmark', value: 'Denmark' },
	{ label: 'Djibouti', value: 'Djibouti' },
	{ label: 'Dominica', value: 'Dominica' },
	{ label: 'Dominican Republic', value: 'Dominican Republic' },
	{ label: 'East Timor', value: 'East Timor' },
	{ label: 'Ecuador', value: 'Ecuador' },
	{ label: 'Egypt', value: 'Egypt' },
	{ label: 'El Salvador', value: 'El Salvador' },
	{ label: 'Equatorial Guinea', value: 'Equatorial Guinea' },
	{ label: 'Eritrea', value: 'Eritrea' },
	{ label: 'Estonia', value: 'Estonia' },
	{ label: 'Eswatini', value: 'Eswatini' },
	{ label: 'Ethiopia', value: 'Ethiopia' },
	{ label: 'Fiji', value: 'Fiji' },
	{ label: 'Finland', value: 'Finland' },
	{ label: 'France', value: 'France' },
	{ label: 'Gabon', value: 'Gabon' },
	{ label: 'Gambia', value: 'Gambia' },
	{ label: 'Georgia', value: 'Georgia' },
	{ label: 'Germany', value: 'Germany' },
	{ label: 'Ghana', value: 'Ghana' },
	{ label: 'Greece', value: 'Greece' },
	{ label: 'Grenada', value: 'Grenada' },
	{ label: 'Guatemala', value: 'Guatemala' },
	{ label: 'Guinea', value: 'Guinea' },
	{ label: 'Guinea-Bissau', value: 'Guinea-Bissau' },
	{ label: 'Guyana', value: 'Guyana' },
	{ label: 'Haiti', value: 'Haiti' },
	{ label: 'Honduras', value: 'Honduras' },
	{ label: 'Hungary', value: 'Hungary' },
	{ label: 'Iceland', value: 'Iceland' },
	{ label: 'India', value: 'India' },
	{ label: 'Indonesia', value: 'Indonesia' },
	{ label: 'Iran', value: 'Iran' },
	{ label: 'Iraq', value: 'Iraq' },
	{ label: 'Ireland', value: 'Ireland' },
	{ label: 'Israel', value: 'Israel' },
	{ label: 'Italy', value: 'Italy' },
	{ label: 'Ivory Coast', value: 'Ivory Coast' },
	{ label: 'Jamaica', value: 'Jamaica' },
	{ label: 'Japan', value: 'Japan' },
	{ label: 'Jordan', value: 'Jordan' },
	{ label: 'Kazakhstan', value: 'Kazakhstan' },
	{ label: 'Kenya', value: 'Kenya' },
	{ label: 'Kiribati', value: 'Kiribati' },
	{ label: 'Kosovo', value: 'Kosovo' },
	{ label: 'Kuwait', value: 'Kuwait' },
	{ label: 'Kyrgyzstan', value: 'Kyrgyzstan' },
	{ label: 'Laos', value: 'Laos' },
	{ label: 'Latvia', value: 'Latvia' },
	{ label: 'Lebanon', value: 'Lebanon' },
	{ label: 'Lesotho', value: 'Lesotho' },
	{ label: 'Liberia', value: 'Liberia' },
	{ label: 'Libya', value: 'Libya' },
	{ label: 'Liechtenstein', value: 'Liechtenstein' },
	{ label: 'Lithuania', value: 'Lithuania' },
	{ label: 'Luxembourg', value: 'Luxembourg' },
	{ label: 'Madagascar', value: 'Madagascar' },
	{ label: 'Malawi', value: 'Malawi' },
	{ label: 'Malaysia', value: 'Malaysia' },
	{ label: 'Maldives', value: 'Maldives' },
	{ label: 'Mali', value: 'Mali' },
	{ label: 'Malta', value: 'Malta' },
	{ label: 'Marshall Islands', value: 'Marshall Islands' },
	{ label: 'Mauritania', value: 'Mauritania' },
	{ label: 'Mauritius', value: 'Mauritius' },
	{ label: 'Mexico', value: 'Mexico' },
	{ label: 'Micronesia', value: 'Micronesia' },
	{ label: 'Moldova', value: 'Moldova' },
	{ label: 'Monaco', value: 'Monaco' },
	{ label: 'Mongolia', value: 'Mongolia' },
	{ label: 'Montenegro', value: 'Montenegro' },
	{ label: 'Morocco', value: 'Morocco' },
	{ label: 'Mozambique', value: 'Mozambique' },
	{ label: 'Myanmar', value: 'Myanmar' },
	{ label: 'Namibia', value: 'Namibia' },
	{ label: 'Nauru', value: 'Nauru' },
	{ label: 'Nepal', value: 'Nepal' },
	{ label: 'Netherlands', value: 'Netherlands' },
	{ label: 'New Zealand', value: 'New Zealand' },
	{ label: 'Nicaragua', value: 'Nicaragua' },
	{ label: 'Niger', value: 'Niger' },
	{ label: 'Nigeria', value: 'Nigeria' },
	{ label: 'North Korea', value: 'North Korea' },
	{ label: 'North Macedonia', value: 'North Macedonia' },
	{ label: 'Norway', value: 'Norway' },
	{ label: 'Oman', value: 'Oman' },
	{ label: 'Pakistan', value: 'Pakistan' },
	{ label: 'Palau', value: 'Palau' },
	{ label: 'Palestine', value: 'Palestine' },
	{ label: 'Panama', value: 'Panama' },
	{ label: 'Papua New Guinea', value: 'Papua New Guinea' },
	{ label: 'Paraguay', value: 'Paraguay' },
	{ label: 'Peru', value: 'Peru' },
	{ label: 'Philippines', value: 'Philippines' },
	{ label: 'Poland', value: 'Poland' },
	{ label: 'Portugal', value: 'Portugal' },
	{ label: 'Qatar', value: 'Qatar' },
	{ label: 'Romania', value: 'Romania' },
	{ label: 'Russia', value: 'Russia' },
	{ label: 'Rwanda', value: 'Rwanda' },
	{ label: 'Saint Kitts and Nevis', value: 'Saint Kitts and Nevis' },
	{ label: 'Saint Lucia', value: 'Saint Lucia' },
	{
		label: 'Saint Vincent and the Grenadines',
		value: 'Saint Vincent and the Grenadines',
	},
	{ label: 'Samoa', value: 'Samoa' },
	{ label: 'San Marino', value: 'San Marino' },
	{ label: 'Sao Tome and Principe', value: 'Sao Tome and Principe' },
	{ label: 'Saudi Arabia', value: 'Saudi Arabia' },
	{ label: 'Senegal', value: 'Senegal' },
	{ label: 'Serbia', value: 'Serbia' },
	{ label: 'Seychelles', value: 'Seychelles' },
	{ label: 'Sierra Leone', value: 'Sierra Leone' },
	{ label: 'Singapore', value: 'Singapore' },
	{ label: 'Slovakia', value: 'Slovakia' },
	{ label: 'Slovenia', value: 'Slovenia' },
	{ label: 'Solomon Islands', value: 'Solomon Islands' },
	{ label: 'Somalia', value: 'Somalia' },
	{ label: 'South Africa', value: 'South Africa' },
	{ label: 'South Korea', value: 'South Korea' },
	{ label: 'South Sudan', value: 'South Sudan' },
	{ label: 'Spain', value: 'Spain' },
	{ label: 'Sri Lanka', value: 'Sri Lanka' },
	{ label: 'Sudan', value: 'Sudan' },
	{ label: 'Suriname', value: 'Suriname' },
	{ label: 'Sweden', value: 'Sweden' },
	{ label: 'Switzerland', value: 'Switzerland' },
	{ label: 'Syria', value: 'Syria' },
	{ label: 'Tajikistan', value: 'Tajikistan' },
	{ label: 'Tanzania', value: 'Tanzania' },
	{ label: 'Thailand', value: 'Thailand' },
	{ label: 'Timor-Leste', value: 'Timor-Leste' },
	{ label: 'Togo', value: 'Togo' },
	{ label: 'Tonga', value: 'Tonga' },
	{ label: 'Trinidad and Tobago', value: 'Trinidad and Tobago' },
	{ label: 'Tunisia', value: 'Tunisia' },
	{ label: 'Turkey', value: 'Turkey' },
	{ label: 'Turkmenistan', value: 'Turkmenistan' },
	{ label: 'Tuvalu', value: 'Tuvalu' },
	{ label: 'Uganda', value: 'Uganda' },
	{ label: 'Ukraine', value: 'Ukraine' },
	{ label: 'United Arab Emirates', value: 'United Arab Emirates' },
	{ label: 'United Kingdom', value: 'United Kingdom' },
	{ label: 'United States', value: 'United States' },
	{ label: 'Uruguay', value: 'Uruguay' },
	{ label: 'Uzbekistan', value: 'Uzbekistan' },
	{ label: 'Vanuatu', value: 'Vanuatu' },
	{ label: 'Vatican City', value: 'Vatican City' },
	{ label: 'Venezuela', value: 'Venezuela' },
	{ label: 'Vietnam', value: 'Vietnam' },
	{ label: 'Yemen', value: 'Yemen' },
	{ label: 'Zambia', value: 'Zambia' },
	{ label: 'Zimbabwe', value: 'Zimbabwe' },
];

export const notificationSettings = [
	{
		title: 'Turn on the notification sound',
		code: 'sound',
	},
	{
		title: 'Show desktop notifications',
		code: 'desktop',
	},
	{
		title: 'Emails about suspicious sign in attempts',
		code: 'email',
	},
];

export const notificationChallenges = [
	{
		title: 'When someone follows your challenge',
		code: 'challenge',
	},
	{
		title: 'When a challenge you follow goes to the next stage',
		code: 'nextStage',
	},
	{
		title: 'When a challenge you follow releases an update',
		code: 'update',
	},
];

export const notificationProfile = [
	{
		title: 'When someone follows you',
		code: 'follows',
	},
	{
		title: 'When someone sends you a direct message',
		code: 'message',
	},
	{
		title: 'When someone send you an invitation',
		code: 'invitation',
	},
];

export const notificationUsersYouFollow = [
	{
		title: 'When they create a new challenge',
		code: 'create',
	},
	{
		title: 'When they participate in a challenge',
		code: 'participate',
	},
	{
		title: 'When they achieve an award or milestone',
		code: 'milestone',
	},
];

export const recurringMessagesNotificationType = ['All', 'Weekly', 'Monthly'];
export const hearFromNotificationType = ['All', 'Notifications', 'Email'];
export const offersNotificationType = ['Opt in', 'Pause', 'Opt out'];

export const ChallengeTypes = [
	{
		imgUrl: challenge_discovery,
		title: 'Challenge Discovery',
		writeUp:
			'Ask experts to discover or define problems, missions, or opportunities by describing the situation or your vision and resources',
	},
	{
		imgUrl: innovation_strategy,
		title: 'Innovation Strategy',
		writeUp:
			'Ask experts to develop innovation roadmaps, explore innovation strategies, or design challenges for your organization using InnoBee',
	},
	{
		imgUrl: women_power,
		title: 'Women Power',
		writeUp:
			'Boost creativity and inclusivity by leveraging the power of women, bind innovation with female leadership, bring fresh blood to your innovative projects',
	},
	{
		imgUrl: contests,
		title: 'Contests',
		writeUp:
			'Host online festivals, conduct art auditions and best writing awards, or create anticipation for your live competitions and campaigns',
	},
	{
		imgUrl: ideas,
		title: 'Ideas',
		writeUp:
			'Generate novel ideas, conduct market research or surveys, Gather testimonials, conduct out-of-box thinking, and gain insights',
	},
	{
		imgUrl: desings,
		title: 'Designs',
		writeUp:
			'Ask experts to submit mock-ups,wireframes, sketches, lab designs, CAD designs, and presentations for your innovation',
	},
	{
		imgUrl: proof_of_concept,
		title: 'Proof of Concept',
		writeUp:
			'Generate miniature models, 3D models, physical models, software models, and demonstrations for your innovation',
	},
	{
		imgUrl: prototypes,
		title: 'Prototypes',
		writeUp:
			'Go full-scale, Execute single production, Develop hardware or software',
	},
	{
		imgUrl: products,
		title: 'Products',
		writeUp:
			'Final product, Ready to-go live, Fully delivered products with open and collaborative models of innovation on your demand',
	},
	{
		imgUrl: coming_soon,
		title: 'New Challenges',
		writeUp: 'Coming soon!',
	},
];

export const challenge = [
	{
		title: 'Expiration Date Elongation For Dairy Products Challenge 2023',
		SubTitle:
			'We are looking for the best solution to increase the expiry date of dairy products up to 10 percent and win a $1,000,000 prize!',
		companyName: 'P&G Inc. Innovation Lab',
		logo: ChatLogo,
		challengeImg: Man,
		category: ['Education', 'Science', 'Social Impact'],
		views: 2345,
		reward: 202,
	},
	{
		title: 'Make a custom GPT for NASA that beats Turing’s test!',
		SubTitle:
			'We are looking for the best solution to increase the expiry date of dairy products up to 10 percent and win a $1,000,000 prize!',
		companyName: 'ChainBox Foundation',
		logo: ChatLogo,
		challengeImg: Man,
		category: ['Education', 'Science', 'Social Impact'],
		views: 2345,
		reward: 202,
	},
	{
		title: 'Embed Fibonacci algorithm in traders’ portfolio with <10K budget',
		SubTitle:
			'We are looking for the best solution to increase the expiry date of dairy products up to 10 percent and win a $1,000,000 prize!',
		companyName: 'Technicalys',
		logo: ChatLogo,
		challengeImg: Man,
		category: ['Education', 'Science', 'Social Impact'],
		views: 2345,
		reward: 202,
	},
];

export const submission = [
	{
		id: 1,
		logo: ChatLogo,
		challengeImg: Man,
		title: 'Dairy Product Preservation Solution',
		companyName: 'P&G Innovation Lab',
		description:
			'An innovative approach to extend dairy product shelf life using natural preservatives',
		score: 89,
	},
	{
		id: 2,
		logo: ChatLogo,
		challengeImg: Man,
		title: 'Smart Packaging Technology',
		companyName: 'P&G Innovation Lab',
		description:
			'Developed a new packaging system that actively monitors product freshness',
		score: 76,
	},
	{
		id: 3,
		logo: ChatLogo,
		challengeImg: Man,
		title: 'Cold Chain Optimization',
		companyName: 'P&G Innovation Lab',
		description:
			'Advanced temperature control system for dairy transportation lorem ipsum',
		score: 92,
	},
];

export const myTaskDropdownLinks = [
	{
		title: 'Edit my score',
		imgUrl: Edit,
		link: '/my-challenges/view-submissions/1/details?id=1&role=judge',
	},
	{
		title: 'Review submissions',
		imgUrl: Eye,
		link: '/my-challenges/view-submissions/1?role=judge',
	},
	// {
	// 	title: 'Export score data',
	// 	imgUrl: Download,
	// 	link: '/',
	// },
	{
		title: 'Download NDA',
		imgUrl: Download,
		link: '/manage-challenge/NDA',
	},
	{
		title: 'View challenge',
		imgUrl: View,
		link: '/challenge/1',
	},
];

export const challengeCategories = [
	{ value: 'healthcare', label: 'Healthcare' },
	{ value: 'infrastructure', label: 'Infrastructure' },
	{ value: 'manufacturing', label: 'Manufactoring' },
	{
		value: 'natural-resource-enviroment',
		label: 'Natural Resource & Environment',
	},
	{ value: 'non-profit', label: 'Non-profit' },
	{ value: 'science', label: 'Science' },
	{ value: 'social-impact', label: 'Social Impact' },
	{ value: 'space', label: 'Space' },
	{ value: 'sustainability', label: 'Sustainability' },
	{ value: 'technology', label: 'Technology' },
];

export const onboardingPopups = [
	{
		step: 'Step 5 of 5',
		description: 'Welcome onboard NewBee!',
		completed: true,
	},
	// { step: 'Step 3 of 5', description: 'Launch a challenge', completed: false },
	// { step: 'Step 0 of 1', description: 'Solve a challenge', completed: false },
	// { step: 'Step 0 of 1', description: 'Judging', completed: false },
	// { step: 'Step 1 of 5', description: 'Manage a challenge', completed: false },
];

export const slides = [
	{
		title: 'Connect',
		description:
			'Browse real-world problems or create your innovation challenge',
		bgImage: slide1,
	},
	{
		title: 'Collaborate',
		description:
			'Work with different players in the innovation ecosystem to solve challenges',
		bgImage: slide2,
	},
	{
		title: 'Co-create',
		description:
			'Build your innovation culture and clusters, and reap the rewards',
		bgImage: slide3,
	},
];

export const profileSkills = [
	{ value: 'activist', label: 'Activist' },
	{ value: 'analyst', label: 'Analyst' },
	{ value: 'anthropologist', label: 'Anthropologist' },
	{ value: 'architect', label: 'Architect' },
	{ value: 'athlete', label: 'Athlete' },
	{ value: 'blogger', label: 'Blogger' },
	{ value: 'business-advisor', label: 'Business Advisor' },
	{ value: 'clergy', label: 'Clergy' },
	{ value: 'coach', label: 'Coach' },
	{ value: 'communications-specialist', label: 'Communications Specialist' },
	{ value: 'community-organizer', label: 'Community Organizer' },
	{ value: 'data-analyst', label: 'Data Analyst' },
	{ value: 'designer', label: 'Designer' },
	{ value: 'doctor', label: 'Doctor' },
	{ value: 'educator-teacher', label: 'Educator/Teacher' },
	{ value: 'engineer', label: 'Engineer' },
	{ value: 'entrepreneur', label: 'Entrepreneur' },
	{ value: 'environmentalist', label: 'Environmentalist' },
	{ value: 'ethicist', label: 'Ethicist' },
	{ value: 'event-planner', label: 'Event planner' },
	{ value: 'filmmaker', label: 'Filmmaker' },
	{ value: 'finance-professional', label: 'Finance Professional' },
	{ value: 'healthcare-professional', label: 'Healthcare Professional' },
	{ value: 'information-technologist', label: 'Information Technologist' },
	{ value: 'inventor', label: 'Inventor' },
	{ value: 'investor', label: 'Investor' },
	{ value: 'journalist', label: 'Journalist' },
	{ value: 'lawyer', label: 'Lawyer' },
	{ value: 'marketing-specialist', label: 'Marketing Specialist' },
	{ value: 'musician', label: 'Musician' },
	{ value: 'performer', label: 'Performer' },
	{ value: 'philanthropist', label: 'Philanthropist' },
	{ value: 'photographer', label: 'Photographer' },
	{ value: 'policymaker', label: 'Policymaker' },
	{ value: 'politician', label: 'Politician' },
	{ value: 'producer', label: 'Producer' },
	{ value: 'project-manager', label: 'Project Manager' },
	{ value: 'researcher', label: 'Researcher' },
	{ value: 'scientist', label: 'Scientist' },
	{ value: 'social-entrepreneur', label: 'Social Entrepreneur' },
	{ value: 'social-media expert', label: 'Social Media Expert' },
	{ value: 'social-worker', label: 'Social Worker' },
	{ value: 'sociologist', label: 'Sociologist' },
	{ value: 'software developer', label: 'Software Developer' },
	{ value: 'student', label: 'Student' },
	{ value: 'sustainability-expert', label: 'Sustainability Expert' },
	{ value: 'technologist', label: 'Technologist' },
	{ value: 'writer=editor', label: 'Writer/Editor' },
];

export const profileRoles = [
	{ value: 'blogger', label: 'Blogger' },
	{ value: 'challenge-organizer', label: 'Challenge Organizer' },
	{ value: 'consultant', label: 'Consultant' },
	{ value: 'content-creator', label: 'Content Creator' },
	{ value: 'industry-expert', label: 'Industry Expert' },
	{ value: 'entrepreneur', label: 'Entrepreneur' },
	{ value: 'innobee-expert', label: 'InnoBee Expert' },
	{ value: 'innovation-influencer', label: 'Innovation Influencer' },
	{ value: 'innovator', label: 'Innovator' },
	{ value: 'investor', label: 'Investor' },
	{ value: 'judge', label: 'Judge' },
	{ value: 'sponsor', label: 'Sponsor' },
	{ value: 'project-manager', label: 'Project Manager' },
];

export const profileCategories = [
	{ value: 'technology', label: 'Technology' },
	{ value: 'sustainability', label: 'Sustainability' },
	{ value: 'arts-design', label: 'Arts & Design' },
	{ value: 'data-science', label: 'Data Science' },
	{ value: 'education', label: 'Education' },
	{ value: 'engineering', label: 'Engineering' },
	{ value: 'finance', label: 'Finance' },
	{ value: 'government', label: 'Government' },
	{ value: 'healthcare', label: 'Healthcare' },
	{ value: 'infrastructure', label: 'Infrastructure' },
	{ value: 'manufacturing', label: 'Manufacturing' },
	{
		value: 'natural-resources-environment',
		label: 'Natural Resources & Environment',
	},
	{ value: 'non-profit-social-impact', label: 'Non-profit & Social Impact' },
	{ value: 'science', label: 'Science' },
	{ value: 'space', label: 'Space' },
];

export const profilePersonalityTypes = [
	{ value: 'intj', label: 'Architect (INTJ)' },
	{ value: 'intp', label: 'Logician (INTP)' },
	{ value: 'entj', label: 'Commander (ENTJ)' },
	{ value: 'entp', label: 'Debater (ENTP)' },
	{ value: 'infj', label: 'Advocate (INFJ)' },
	{ value: 'infp', label: 'Mediator (INFP)' },
	{ value: 'enfj', label: 'Protagonist (ENFJ)' },
	{ value: 'enfp', label: 'Campaigner (ENFP)' },
	{ value: 'istj', label: 'Logistician (ISTJ)' },
	{ value: 'isfj', label: 'Defender (ISFJ)' },
	{ value: 'estj', label: 'Executive (ESTJ)' },
	{ value: 'esfj', label: 'Consul (ESFJ)' },
	{ value: 'istp', label: 'Virtuoso (ISTP)' },
	{ value: 'isfp', label: 'Adventurer (ISFP)' },
	{ value: 'estp', label: 'Entrepreneur (ESTP)' },
	{ value: 'esfp', label: 'Entertainer (ESFP)' },
];

export const profileInnovationArchetypes = [
	{ value: 'rebellious-warden', label: 'Rebellious Warden' },
	{ value: 'trusted-caretaker', label: 'Trusted Caretaker' },
	{ value: 'persistent-ideator', label: 'Persistent Ideator' },
	{ value: 'masterly-overseer', label: 'Masterly Overseer' },
	{ value: 'dedicated-agent', label: 'Dedicated Agent' },
	{ value: 'diligent-perfectionist', label: 'Diligent Perfectionist' },
	{ value: 'ambitious-visionary', label: 'Ambitious Visionary' },
	{ value: 'inventive-mediator', label: 'Inventive Mediator' },
	{ value: 'relentless-creative', label: 'Relentless Creative' },
	{ value: 'dynamic-realist', label: 'Dynamic Realist' },
	{ value: 'imaginative-brainstormer', label: 'Imaginative Brainstormer' },
	{ value: 'eager-initiator', label: 'Eager Initiator' },
	{ value: 'daring-moderator', label: 'Daring Moderator' },
	{ value: 'dependable-optimizer', label: 'Dependable Optimizer' },
	{ value: 'reliable-voyageur', label: 'Reliable Voyageur' },
	{ value: 'steadfast-performer', label: 'Steadfast Performer' },
	{ value: 'inquisitive-facilitator', label: 'Inquisitive Facilitator' },
	{ value: 'consistent-pragmatist', label: 'Consistent Pragmatist' },
	{ value: 'hungry-daredevil', label: 'Hungry Daredevil' },
	{ value: 'cautious-explorer', label: 'Cautious Explorer' },
	{ value: 'seasoned-adventurist', label: 'Seasoned Adventurist' },
	{ value: 'experienced-motivator', label: 'Experienced Motivator' },
	{ value: 'voracious-adventurer', label: 'Voracious Adventurer' },
	{ value: 'change-ambassador', label: 'Change Ambassador' },
	{ value: 'dutiful-changemaker', label: 'Dutiful Changemaker' },
	{ value: 'trustworthy-devotee', label: 'Trustworthy Devotee' },
	{ value: 'zealous-quarterback', label: 'Zealous Quarterback' },
	{ value: 'loyal-gatekeeper', label: 'Loyal Gatekeeper' },
	{ value: 'Devils-advocate', label: "Devil's Advocate" },
	{ value: 'decisive-guardian', label: 'Decisive Guardian' },
	{ value: 'venturous-entrepreneur', label: 'Venturous Entrepreneur' },
	{ value: 'whimsical-loyalist', label: 'Whimsical Loyalist' },
	{ value: 'fearless-opportunist', label: 'Fearless Opportunist' },
	{ value: 'courageous-influencer', label: 'Courageous Influencer' },
	{ value: 'futuristic-pioneer', label: 'Futuristic Pioneer' },
	{ value: 'purposeful-trailblazer', label: 'Purposeful Trailblazer' },
];

export const FilterParticipants = [
	{ value: 'all-members', label: 'All members' },
	{ value: 'participants', label: 'Participants' },
	{ value: 'followers', label: 'Followers' },
	{ value: 'submission-started', label: 'Submission started' },
	{ value: 'submission-submitted', label: 'Submission submitted' },
	{ value: 'submission-eligible', label: 'Submission eligible' },
	{ value: 'submission-ineligible', label: 'Submission Ineligible' },
	{ value: 'winners', label: 'Winners' },
	{ value: 'first-place', label: 'First place' },
	{ value: 'second-place', label: 'Second place' },
	{ value: 'third-place', label: 'Third place' },
	{ value: 'peoples-choice', label: 'People’s choice' },
	{ value: 'grandprize-winner', label: 'Grand prize winner' },
	{ value: 'finalists', label: 'Finalist' },
	{ value: 'judges', label: 'Judges' },
	{ value: 'moderators', label: 'Moderators' },
];

export const FilterCountries = [
	{ value: 'afghanistan', label: 'Afghanistan' },
	{ value: 'albania', label: 'Albania' },
	{ value: 'algeria', label: 'Algeria' },
	{ value: 'andorra', label: 'Andorra' },
	{ value: 'angola', label: 'Angola' },
	{ value: 'antigua-and-barbuda', label: 'Antigua and Barbuda' },
	{ value: 'argentina', label: 'Argentina' },
	{ value: 'armenia', label: 'Armenia' },
	{ value: 'australia', label: 'Australia' },
	{ value: 'austria', label: 'Austria' },
	{ value: 'azerbaijan', label: 'Azerbaijan' },
	{ value: 'bahamas', label: 'Bahamas' },
	{ value: 'bahrain', label: 'Bahrain' },
	{ value: 'bangladesh', label: 'Bangladesh' },
	{ value: 'barbados', label: 'Barbados' },
	{ value: 'belgium', label: 'Belgium' },
	{ value: 'belize', label: 'Belize' },
	{ value: 'benin', label: 'Benin' },
	{ value: 'bhutan', label: 'Bhutan' },
	{ value: 'bolivia', label: 'Bolivia' },
	{ value: 'bosnia-and-herzegovina', label: 'Bosnia and Herzegovina' },
	{ value: 'botswana', label: 'Botswana' },
	{ value: 'brazil', label: 'Brazil' },
	{ value: 'brunei', label: 'Brunei' },
	{ value: 'bulgaria', label: 'Bulgaria' },
	{ value: 'burkina-faso', label: 'Burkina Faso' },
	{ value: 'burundi', label: 'Burundi' },
	{ value: 'cabo-verde', label: 'Cabo Verde' },
	{ value: 'cambodia', label: 'Cambodia' },
	{ value: 'cameroon', label: 'Cameroon' },
	{ value: 'canada', label: 'Canada' },
	{ value: 'central-african-republic', label: 'Central African Republic' },
	{ value: 'chile', label: 'Chile' },
	{ value: 'china', label: 'China' },
	{ value: 'colombia', label: 'Colombia' },
	{ value: 'comoros', label: 'Comoros' },
	{
		value: 'congo-democratic-republic-of-the',
		label: 'Congo, Democratic Republic of the',
	},
	{ value: 'congo-republic-of-the', label: 'Congo, Republic of the' },
	{ value: 'costa-rica', label: 'Costa Rica' },
	{ value: 'croatia', label: 'Croatia' },
	{ value: 'cuba', label: 'Cuba' },
	{ value: 'cyprus', label: 'Cyprus' },
	{ value: 'czechia', label: 'Czechia' },
	{ value: 'denmark', label: 'Denmark' },
	{ value: 'djibouti', label: 'Djibouti' },
	{ value: 'dominica', label: 'Dominica' },
	{ value: 'dominican-republic', label: 'Dominican Republic' },
	{ value: 'ecuador', label: 'Ecuador' },
	{ value: 'egypt', label: 'Egypt' },
	{ value: 'el-salvador', label: 'El Salvador' },
	{ value: 'equatorial-guinea', label: 'Equatorial Guinea' },
	{ value: 'eritrea', label: 'Eritrea' },
	{ value: 'estonia', label: 'Estonia' },
	{ value: 'eswatini', label: 'Eswatini' },
	{ value: 'ethiopia', label: 'Ethiopia' },
	{ value: 'fiji', label: 'Fiji' },
	{ value: 'finland', label: 'Finland' },
	{ value: 'france', label: 'France' },
	{ value: 'gabon', label: 'Gabon' },
	{ value: 'gambia', label: 'Gambia' },
	{ value: 'georgia', label: 'Georgia' },
	{ value: 'germany', label: 'Germany' },
	{ value: 'ghana', label: 'Ghana' },
	{ value: 'greece', label: 'Greece' },
	{ value: 'grenada', label: 'Grenada' },
	{ value: 'guatemala', label: 'Guatemala' },
	{ value: 'guinea-bissau', label: 'Guinea-Bissau' },
	{ value: 'guyana', label: 'Guyana' },
	{ value: 'haiti', label: 'Haiti' },
	{ value: 'holy-see', label: 'Holy See' },
	{ value: 'honduras', label: 'Honduras' },
	{ value: 'hungary', label: 'Hungary' },
	{ value: 'iceland', label: 'Iceland' },
	{ value: 'india', label: 'India' },
	{ value: 'indonesia', label: 'Indonesia' },
	{ value: 'iran', label: 'Iran' },
	{ value: 'iraq', label: 'Iraq' },
	{ value: 'ireland', label: 'Ireland' },
	{ value: 'israel', label: 'Israel' },
	{ value: 'italy', label: 'Italy' },
	{ value: 'jamaica', label: 'Jamaica' },
	{ value: 'japan', label: 'Japan' },
	{ value: 'Kazakhstan', label: 'Kazakhstan' },
	{ value: 'Kenya', label: 'Kenya' },
	{ value: 'Kiribati', label: 'Kiribati' },
	{ value: 'Korea, North', label: 'Korea, North' },
	{ value: 'Korea, South', label: 'Korea, South' },
	{ value: 'Kosovo', label: 'Kosovo' },
	{ value: 'Kuwait', label: 'Kuwait' },
	{ value: 'Kyrgyzstan', label: 'Kyrgyzstan' },
	{ value: 'Laos', label: 'Laos' },
	{ value: 'Latvia', label: 'Latvia' },
	{ value: 'Lebanon', label: 'Lebanon' },
	{ value: 'Lesotho', label: 'Lesotho' },
	{ value: 'Liberia', label: 'Liberia' },
	{ value: 'Libya', label: 'Libya' },
	{ value: 'Liechtenstein', label: 'Liechtenstein' },
	{ value: 'Lithuania', label: 'Lithuania' },
	{ value: 'luxembourg', label: 'Luxembourg' },
	{ value: 'madagascar', label: 'Madagascar' },
	{ value: 'malawi', label: 'Malawi' },
	{ value: 'malaysia', label: 'Malaysia' },
	{ value: 'maldives', label: 'Maldives' },
	{ value: 'mali', label: 'Mali' },
	{ value: 'malta', label: 'Malta' },
	{ value: 'marshall-islands', label: 'Marshall Islands' },
	{ value: 'mauritania', label: 'Mauritania' },
	{ value: 'mauritius', label: 'Mauritius' },
	{ value: 'mexico', label: 'Mexico' },
	{
		value: 'micronesia-federated-states-of',
		label: 'Micronesia, Federated States of',
	},
	{ value: 'moldova', label: 'Moldova' },
	{ value: 'monaco', label: 'Monaco' },
	{ value: 'mongolia', label: 'Mongolia' },
	{ value: 'montenegro', label: 'Montenegro' },
	{ value: 'morocco', label: 'Morocco' },
	{ value: 'mozambique', label: 'Mozambique' },
	{ value: 'myanmar-burma', label: 'Myanmar (Burma)' },
	{ value: 'namibia', label: 'Namibia' },
	{ value: 'nauru', label: 'Nauru' },
	{ value: 'nepal', label: 'Nepal' },
	{ value: 'netherlands', label: 'Netherlands' },
	{ value: 'new-zealand', label: 'New Zealand' },
	{ value: 'nicaragua', label: 'Nicaragua' },
	{ value: 'niger', label: 'Niger' },
	{ value: 'nigeria', label: 'Nigeria' },
	{ value: 'north-macedonia', label: 'North Macedonia' },
	{ value: 'norway', label: 'Norway' },
	{ value: 'oman', label: 'Oman' },
	{ value: 'pakistan', label: 'Pakistan' },
	{ value: 'palau', label: 'Palau' },
	{ value: 'panama', label: 'Panama' },
	{ value: 'papua-new-guinea', label: 'Papua New Guinea' },
	{ value: 'paraguay', label: 'Paraguay' },
	{ value: 'peru', label: 'Peru' },
	{ value: 'philippines', label: 'Philippines' },
	{ value: 'poland', label: 'Poland' },
	{ value: 'portugal', label: 'Portugal' },
	{ value: 'qatar', label: 'Qatar' },
	{ value: 'romania', label: 'Romania' },
	{ value: 'russia', label: 'Russia' },
	{ value: 'rwanda', label: 'Rwanda' },
	{ value: 'saint-kitts-and-nevis', label: 'Saint Kitts and Nevis' },
	{ value: 'saint-lucia', label: 'Saint Lucia' },
	{
		value: 'saint-vincent-and-the-grenadines',
		label: 'Saint Vincent and the Grenadines',
	},
	{ value: 'samoa', label: 'Samoa' },
	{ value: 'san-marino', label: 'San Marino' },
	{ value: 'sao-tome-and-principe', label: 'Sao Tome and Principe' },
	{ value: 'saudi-arabia', label: 'Saudi Arabia' },
	{ value: 'senegal', label: 'Senegal' },
	{ value: 'serbia', label: 'Serbia' },
	{ value: 'seychelles', label: 'Seychelles' },
	{ value: 'sierra-leone', label: 'Sierra Leone' },
	{ value: 'singapore', label: 'Singapore' },
	{ value: 'slovakia', label: 'Slovakia' },
	{ value: 'slovenia', label: 'Slovenia' },
	{ value: 'solomon-islands', label: 'Solomon Islands' },
	{ value: 'somalia', label: 'Somalia' },
	{ value: 'south-africa', label: 'South Africa' },
	{ value: 'south-korea', label: 'South Korea' },
	{ value: 'south-sudan', label: 'South Sudan' },
	{ value: 'spain', label: 'Spain' },
	{ value: 'sri-lanka', label: 'Sri Lanka' },
	{ value: 'sudan', label: 'Sudan' },
	{ value: 'suriname', label: 'Suriname' },
	{ value: 'sweden', label: 'Sweden' },
	{ value: 'switzerland', label: 'Switzerland' },
	{ value: 'syria', label: 'Syria' },
	{ value: 'taiwan', label: 'Taiwan' },
	{ value: 'tajikistan', label: 'Tajikistan' },
	{ value: 'tanzania', label: 'Tanzania' },
	{ value: 'thailand', label: 'Thailand' },
	{ value: 'timor-leste', label: 'Timor-Leste' },
	{ value: 'togo', label: 'Togo' },
	{ value: 'tonga', label: 'Tonga' },
	{ value: 'trinidad-and-tobago', label: 'Trinidad and Tobago' },
	{ value: 'tunisia', label: 'Tunisia' },
	{ value: 'turkey', label: 'Turkey' },
	{ value: 'turkmenistan', label: 'Turkmenistan' },
	{ value: 'tuvalu', label: 'Tuvalu' },
	{ value: 'uganda', label: 'Uganda' },
	{ value: 'ukraine', label: 'Ukraine' },
	{ value: 'united-arab-emirates', label: 'United Arab Emirates' },
	{ value: 'united-kingdom', label: 'United Kingdom' },
	{ value: 'united-states', label: 'United States' },
	{ value: 'uruguay', label: 'Uruguay' },
	{ value: 'uzbekistan', label: 'Uzbekistan' },
	{ value: 'vanuatu', label: 'Vanuatu' },
	{ value: 'vatican-city', label: 'Vatican City' },
	{ value: 'venezuela', label: 'Venezuela' },
	{ value: 'vietnam', label: 'Vietnam' },
	{ value: 'yemen', label: 'Yemen' },
	{ value: 'zambia', label: 'Zambia' },
	{ value: 'zimbabwe', label: 'Zimbabwe' },
];
