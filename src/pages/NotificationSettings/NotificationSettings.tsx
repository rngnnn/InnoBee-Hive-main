import React, { useState } from 'react';
import { notificationChallenges, notificationSettings } from '../../constants';
import Checkbox from '../../components/Checkbox';
import ProfileSection from '../../components/ProfileComponent/ProfileSection';
import { Button } from 'src/components/buttons/Button';

// --- Type Definitions ---
interface NotificationSetting {
	code: string;
	title: string;
}

interface NotificationPreference {
	email: boolean;
	inApp: boolean;
}

interface NotificationPreferences {
	[key: string]: NotificationPreference;
}

interface MarketingPreferences {
	whatsNew: boolean;
	recommendation: boolean;
	blog: boolean;
	achievements: boolean;
	specialEvents: boolean;
	userSurveys: boolean;
}

type OtherSettingsKeys = 'recurringMessages' | 'hearFrom' | 'offers';

interface OtherSettingsPreferences {
	recurringMessages: 'All' | 'Weekly' | 'Monthly';
	hearFrom: 'All' | 'Notifications' | 'Email';
	offers: 'Opt in' | 'Pause' | 'Opt out';
}

// Type the function parameters and return type
const initializeNotificationState = (
	config: NotificationSetting[],
	isChallenge = false
): NotificationPreferences => {
	const initialState: NotificationPreferences = {};
	const defaultOnCodes = isChallenge
		? ['challenge_followed', 'challenge_stage_change', 'challenge_update']
		: ['suspicious_login'];

	config.forEach((setting) => {
		const shouldBeDefaultOn = defaultOnCodes.includes(setting.code);
		initialState[setting.code] = {
			email: shouldBeDefaultOn,
			inApp: shouldBeDefaultOn,
		};
	});
	return initialState;
};

const NotificationSettings = () => {
	// Type the state variables
	const [notificationPreferences, setNotificationPreferences] =
		useState<NotificationPreferences>(() => ({
			...initializeNotificationState(notificationSettings),
			...initializeNotificationState(notificationChallenges, true),
		}));
	const [marketingPreferences, setMarketingPreferences] =
		useState<MarketingPreferences>({
			whatsNew: true,
			recommendation: true,
			blog: true,
			achievements: true,
			specialEvents: true,
			userSurveys: true,
		});
	const [otherSettingsPreferences, setOtherSettingsPreferences] =
		useState<OtherSettingsPreferences>({
			recurringMessages: 'Weekly',
			hearFrom: 'All',
			offers: 'Opt in',
		});

	// Type handler parameters
	const handleNotificationToggle = (
		code: string,
		type: keyof NotificationPreference,
		isChallenge = false
	) => {
		setNotificationPreferences((prevPreferences) => {
			const key = code;
			const currentSetting = prevPreferences[key] || {
				email: false,
				inApp: false,
			};
			return {
				...prevPreferences,
				[key]: {
					...currentSetting,
					[type]: !currentSetting[type],
				},
			};
		});
	};

	// Type handler parameter
	const toggleMarketingPreference = (key: keyof MarketingPreferences) => {
		setMarketingPreferences((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const marketingTopics = [
		{
			key: 'whatsNew',
			title: "What's new",
			description: 'Stay up to date with InnoBee and products releases',
		},
		{
			key: 'recommendation',
			title: 'Recommendations',
			description: 'Curated innovative challenges picked for you',
		},
		{
			key: 'blog',
			title: 'Blogs',
			description: 'Stay ahead of the curve by receiving our latest articles',
		},
		{
			key: 'achievements',
			title: 'Achievements & milestones',
			description:
				'Personalized messages to celebrate your innovative achievements',
		},
		{
			key: 'specialEvents',
			title: 'Special events',
			description: 'Festivals, webinars, and innovation conferences, etc.',
		},
		{
			key: 'userSurveys',
			title: 'User experience surveys',
			description: 'Help us develop a platform you enjoy using',
		},
	];

	const otherSettingsTopics = [
		{
			key: 'recurringMessages',
			title: 'Choose frequency of recurring messages',
			description:
				'Hear all of it on-demand, or bundle messages in a weekly or monthly capsule',
			options: ['All', 'Weekly', 'Monthly'],
		},
		{
			key: 'hearFrom',
			title: 'How do you want to hear from us?',
			description:
				"Get your notifications where it's most convenient for you. To receive app notifications, please ensure you have enabled permissions on your browser.",
			options: ['All', 'Notifications', 'Email'],
		},
		{
			key: 'offers',
			title: 'Receive Updates and Offers from InnoBee',
			description:
				'Allow InnoBee to contact me with offers, updates, and other marketing communications. You can pause it for 3 months or unsubscribe from all.',
			options: ['Opt in', 'Pause', 'Opt out'],
		},
	];

	return (
		<>
			<h4 className="y-3 font-semibold text-xl">Notification Settings</h4>
			<p className="py-6">
				Adjust your notification settings and how you like to receive
				notifications.
			</p>

			<ProfileSection title="Notification Preferences">
				<section className="mb-10">
					<h5 className="py-3 font-semibold text-lg md:text-xl">
						General Settings
					</h5>
					<div className="">
						<section className="mb-8">
							<h6 className="font-semibold text-lg text-gray-800 mb-3">
								Notifications
							</h6>
							<div className="">
								<div className="grid grid-cols-3 gap-4 items-center mb-4 sm:grid-cols-3">
									<div className="font-bold text-gray-800"></div>
									<div className="text-center font-bold text-gray-800">
										Email
									</div>
									<div className="text-center font-bold text-gray-800">
										In-app
									</div>
								</div>
								{notificationSettings?.map((item, index) => (
									<div
										className="grid grid-cols-3 gap-4 items-center py-3 sm:grid-cols-3"
										key={index}
									>
										<div className="text-gray-800">{item?.title}</div>
										<div className="flex justify-center">
											<Checkbox
												id={`${item.code}-email`}
												checked={
													notificationPreferences[item.code]?.email || false
												}
												onChange={() =>
													handleNotificationToggle(item.code, 'email')
												}
												aria-label={`${item.title} Email Notification`}
												className=""
												children={null}
											/>
										</div>
										<div className="flex justify-center">
											<Checkbox
												id={`${item.code}-inApp`}
												checked={
													notificationPreferences[item.code]?.inApp || false
												}
												onChange={() =>
													handleNotificationToggle(item.code, 'inApp')
												}
												aria-label={`${item.title} In-App Notification`}
												className=""
												children={null}
											/>
										</div>
									</div>
								))}
							</div>
						</section>

						<section>
							<h6 className="font-semibold text-lg text-gray-800 mb-3">
								Challenges
							</h6>
							<div className="">
								<div className="grid grid-cols-3 gap-4 items-center mb-4 sm:grid-cols-3">
									<div className="font-bold text-gray-800"></div>
									<div className="text-center font-bold text-gray-800">
										Email
									</div>
									<div className="text-center font-bold text-gray-800">
										In-app
									</div>
								</div>
								{notificationChallenges?.map((item, index) => (
									<div
										className="grid grid-cols-3 gap-4 items-center py-3 sm:grid-cols-3"
										key={index}
									>
										<div className="text-gray-800">{item?.title}</div>
										<div className="flex justify-center">
											<Checkbox
												id={`${item.code}-email-challenge`}
												checked={
													notificationPreferences[item.code]?.email || false
												}
												onChange={() =>
													handleNotificationToggle(item.code, 'email', true)
												}
												aria-label={`${item.title} Email Notification`}
												className=""
												children={null}
											/>
										</div>
										<div className="flex justify-center">
											<Checkbox
												id={`${item.code}-inApp-challenge`}
												checked={
													notificationPreferences[item.code]?.inApp || false
												}
												onChange={() =>
													handleNotificationToggle(item.code, 'inApp', true)
												}
												aria-label={`${item.title} In-App Notification`}
												className=""
												children={null}
											/>
										</div>
									</div>
								))}
							</div>
						</section>
					</div>
				</section>

				<section className="mb-10">
					<h5 className="py-3 font-semibold text-lg md:text-xl">
						Marketing Preferences
					</h5>
					<p className="py-3 text-gray-700 md:text-lg">
						We'll always keep you updated with critical account information, but
						you'll have full control over the marketing content you receive.
					</p>
					<div className="mt-0 flex flex-col gap-6">
						{marketingTopics.map((topic) => (
							<div
								key={topic.key}
								className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2"
							>
								<div className="mb-2 sm:mb-0 flex-grow">
									<h6 className="font-semibold text-lg text-gray-800">
										{topic.title}
									</h6>
									<p className="text-md text-gray-700">{topic.description}</p>
								</div>
								<button
									className={`flex-shrink-0 w-12 h-6 rounded-full flex items-center transition-all duration-200 ${
										marketingPreferences[
											topic.key as keyof MarketingPreferences
										]
											? 'bg-pri-color justify-end'
											: 'bg-brown justify-start'
									}`}
									onClick={() =>
										toggleMarketingPreference(
											topic.key as keyof MarketingPreferences
										)
									}
									aria-pressed={
										marketingPreferences[
											topic.key as keyof MarketingPreferences
										]
									}
									aria-label={`Toggle ${topic.title} marketing preference`}
								>
									<div className="w-5 h-5 rounded-full bg-white shadow-md"></div>
								</button>
							</div>
						))}
					</div>
				</section>

				<section>
					<h5 className="py-3 font-semibold text-lg md:text-xl">
						Other Settings
					</h5>
					<p className="py-3 text-gray-700 md:text-lg">
						Manage other notification preferences for your account.
					</p>
					<div className="mt-0 flex flex-col gap-6">
						{otherSettingsTopics.map((topic) => (
							<div
								key={topic.key}
								className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2"
							>
								<div className="mb-2 sm:mb-0 flex-grow">
									<h6 className="font-semibold text-lg text-gray-800">
										{topic.title}
									</h6>
									<p className="text-md text-gray-700">{topic.description}</p>
								</div>
								<div className="flex gap-2 flex-wrap justify-end flex-shrink-0">
									{topic.options.map((option) => (
										<button
											key={option}
											className={`bg-white text-brown rounded-lg shadow-md py-2 px-4 ${
												otherSettingsPreferences[
													topic.key as OtherSettingsKeys
												] === option
													? 'border-brown border-2'
													: ''
											}`}
											onClick={() => {
												const currentKey = topic.key as OtherSettingsKeys;
												const value =
													option as (typeof otherSettingsPreferences)[typeof currentKey];
												setOtherSettingsPreferences((prev) => ({
													...prev,
													[currentKey]: value,
												}));
											}}
										>
											{option}
										</button>
									))}
								</div>
							</div>
						))}
					</div>
				</section>
				<div className="mt-8 mb-8">
					<Button
						className="w-60 rounded-lg bg-brown hover:bg-pri-color text-white py-2 px-4 text-base font-normal"
						onClick={() => {
							console.log(
								'Notification preferences saved:',
								notificationPreferences
							);
							console.log('Marketing preferences saved:', marketingPreferences);
							console.log(
								'Other settings preferences saved:',
								otherSettingsPreferences
							);
							alert('Preferences saved! (Placeholder)');
						}}
						disabled={false}
						iconLeft={null}
						iconRight={null}
						iconClass={null}
						loading={false}
						ariaLabel="Confirm my choice"
						style={null}
					>
						Confirm My Choice
					</Button>
				</div>
			</ProfileSection>
			<div className="mb-4"></div>
		</>
	);
};

export default NotificationSettings;
