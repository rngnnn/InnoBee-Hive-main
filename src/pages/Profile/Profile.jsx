import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import countries from 'countries-and-timezones';
import defaultAvatar from '../../assets/images/default-avatar-icon-of-social-media-user-vector.jpg';
import { profileSchema } from 'src/helpers/schemas';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'src/components/buttons/Button'; // Using your custom Button
import './Profile.css';
import {
	profileSkills,
	profileRoles,
	profileCategories,
	profilePersonalityTypes,
	profileInnovationArchetypes,
} from 'src/constants/index';
import SelectField from 'src/components/ui/SelectField';
import { FormField } from 'src/components/ui/FormField';
import { motion } from 'framer-motion'; // Import motion for the container
import ProfileSection from '../../components/ProfileComponent/ProfileSection';
import useTimezones from '../../hooks/useTimezones';
import { FiTrash2 } from 'react-icons/fi';

const Profile = () => {
	const {
		register,
		handleSubmit,
		watch,
		getValues,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			phoneNumber: '',
			timezone: '',
			country: '',
			// Add default values for other fields if needed
			linkedIn: '',
			GitHub: '',
			Facebook: '',
			Instagram: '',
			Twitter: '',
			YouTube: '',
			Dribbble: '',
			website: '',
		},
		resolver: zodResolver(profileSchema),
	});

	const selectedCountry = watch('country');
	const timezoneOptions = useTimezones(selectedCountry);

	const [image, setImage] = useState(null);

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
	};

	const countryOptions = Object.keys(countries.getAllCountries()).map(
		(code) => ({
			value: code,
			label: countries.getCountry(code).name,
		})
	);

	const onSubmit = (data) => {
		console.log('Form submitted:', data);
		// Implement actual form submission logic here
	};

	console.log('values', getValues());

	const socialMediaOptions = [
		{ value: 'linkedIn', label: 'LinkedIn' },
		{ value: 'GitHub', label: 'GitHub' },
		{ value: 'Facebook', label: 'Facebook' },
		{ value: 'Instagram', label: 'Instagram' },
		{ value: 'Twitter', label: 'Twitter' },
		{ value: 'YouTube', label: 'YouTube' },
		{ value: 'Dribbble', label: 'Dribbble' },
		{ value: 'website', label: 'Website' },
	];

	// Initialize displayedSocialLinks with default values from getValues() or API data if available
	// For now, keeping your original initialization
	const [selectedSocialMedia, setSelectedSocialMedia] = useState('');
	const [displayedSocialLinks, setDisplayedSocialLinks] = useState({
		linkedIn: true,
		website: true,
		// You might want to initialize this based on existing profile data
		// e.g., linkedIn: !!getValues("linkedIn"), website: !!getValues("website"), etc.
	});

	const handleSocialMediaChange = (event) => {
		setSelectedSocialMedia(event.target.value);
	};

	const handleAddSocialLink = () => {
		if (selectedSocialMedia && !displayedSocialLinks[selectedSocialMedia]) {
			setDisplayedSocialLinks((prev) => ({
				...prev,
				[selectedSocialMedia]: true,
			}));
			setSelectedSocialMedia(''); // Reset the dropdown
		}
	};

	const handleRemoveSocialLink = (linkName) => {
		setDisplayedSocialLinks((prev) => {
			const newState = { ...prev };
			// Clear the form field value using react-hook-form's setValue if needed
			// setValue(linkName, "");
			delete newState[linkName];
			return newState;
		});
	};

	return (
		<form
			className="relative bg-gray-100 min-h-screen"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h4 className="y-3 font-semibold text-xl">Profile Details</h4>
			<p className="py-6">
				Add information to your profile. This information will be shown on your
				innovator public profile and give your profile credibility.
			</p>

			<motion.div
				className="w-full flex flex-col gap-4"
				// initial={{ opacity: 0, y: 20 }} // Optional: Add framer-motion animations
				// animate={{ opacity: 1, y: 0 }}
				// transition={{ duration: 0.5 }}
			>
				{/* ... Personal Information, Contact Information, Professional Details, Location Sections ... */}
				<ProfileSection title="Personal Information">
					<div className="flex-center gap-4 pt-4">
						<div className="flex items-center gap-4">
							<img
								src={image || defaultAvatar}
								alt=""
								className="w-24 h-24 rounded-full object-cover"
							/>
							<div className="flex flex-col items-start justify-center gap-2">
								<div className="flex items-center gap-4">
									<input
										type="file"
										accept="image/*"
										onChange={handleImageUpload}
										className="hidden"
										id="upload-image"
									/>
									{/* Using a label for the file input */}
									<label
										htmlFor="upload-image"
										className="cursor-pointer bg-white border border-brown text-brown hover:bg-brown hover:text-white p-2 rounded-lg"
									>
										Upload Image
									</label>
									{image && (
										<button
											type="button"
											onClick={handleRemoveImage}
											className="flex items-center gap-1 text-sm text-gray-700 hover:text-red-500 focus:outline-none"
										>
											<FiTrash2 className="h-4 w-4 text-gray-700" />
											Remove
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="max-w-[600px] w-full">
						<div className="flex w-full flex-col gap-6 my-4">
							<FormField
								label="First Name"
								id="firstName"
								name="firstName"
								register={register}
								errors={errors}
								placeholder="Enter first name"
								isRequired
								inputClassName="bg-gray-100"
							/>
							<FormField
								label="Last Name"
								id="lastName"
								name="lastName"
								register={register}
								errors={errors}
								placeholder="Enter last name"
								isRequired
								inputClassName="bg-gray-100"
							/>
						</div>
					</div>
				</ProfileSection>

				<ProfileSection title="Contact Information">
					<div className="max-w-[600px] w-full">
						<div className="flex w-full flex-col gap-6 my-4">
							<div className="md:w-full w-full flex flex-col gap-1">
								<label htmlFor="phone" className="font-semibold m-0">
									Phone <span className="text-red-500 text-sm">*</span>
								</label>
								<Controller
									name="phoneNumber"
									control={control}
									rules={{ required: 'Phone number is required' }} // Added required rule for Controller
									render={({ field }) => (
										<PhoneInput
											{...field}
											country={'us'}
											inputProps={{
												id: 'phone',
												className:
													'w-full h-10 focus:border-1 focus:border-pri-color bg-gray-100 shadow-md rounded-lg px-12 outline-none',
												placeholder: 'Enter Phone number',
											}}
											containerClass="w-full"
											onChange={(value, data, event, formattedValue) => {
												field.onChange(value); // Pass just the value to react-hook-form
											}}
											// Add onBlur to trigger validation on blur
											onBlur={field.onBlur}
										/>
									)}
								/>
								{errors.phoneNumber && (
									<p className="text-red-500 text-sm">
										{errors.phoneNumber.message}
									</p>
								)}
							</div>
						</div>
					</div>
				</ProfileSection>

				<ProfileSection title="Professional Details">
					<div className="max-w-[600px] w-full">
						<div className="flex w-full flex-col gap-6 my-4">
							<FormField
								label="Job Title"
								id="jobTitle"
								name="jobTitle"
								register={register}
								errors={errors}
								placeholder="Enter your job title"
								inputClassName="bg-gray-100"
							/>
							<FormField
								label="About Me"
								id="aboutMe"
								name="aboutMe"
								register={register}
								errors={errors}
								placeholder="About you"
								isTextarea
								inputClassName="bg-gray-100"
							/>
							<SelectField
								// name="Personality Type" // Use the actual field name from the schema
								name="personalityType" // Assuming the schema uses 'personalityType'
								control={control}
								label="Personality Type"
								placeholder="Select personality type"
								options={profilePersonalityTypes}
								errors={errors}
								isDropdown
								className="bg-gray-100"
							/>
							<SelectField
								// name="Innovation Artchetype" // Use the actual field name
								name="innovationArchetype" // Assuming the schema uses 'innovationArchetype'
								control={control}
								label="Innovation Archetype" // Corrected typo
								placeholder="Select innovation archetype"
								options={profileInnovationArchetypes}
								errors={errors}
								isDropdown
								className="bg-gray-100"
							/>
							<SelectField
								name="skills"
								control={control}
								label="Skills"
								placeholder="Select skills"
								options={profileSkills}
								errors={errors}
								mode="multiple"
								className="bg-gray-100"
							/>
							<SelectField
								name="roles"
								control={control}
								label="Roles I'm interested in"
								placeholder="Select roles"
								options={profileRoles}
								errors={errors}
								mode="multiple"
								className="bg-gray-100"
							/>
							<SelectField
								name="categories"
								control={control}
								label="Challenge categories I'm interested in"
								placeholder="Select categories"
								options={profileCategories}
								errors={errors}
								mode="multiple"
								className="bg-gray-100"
							/>
						</div>
					</div>
				</ProfileSection>

				<ProfileSection title="Location">
					<div className="max-w-[600px] w-full">
						<div className="flex w-full flex-col gap-6 my-4">
							<SelectField
								name="country"
								control={control}
								label="Country"
								placeholder="Select a country"
								options={countryOptions}
								errors={errors}
								isRequired
								className="bg-gray-100"
							/>
							<SelectField
								name="timezone"
								control={control}
								label="Timezone"
								placeholder="Select a timezone"
								options={timezoneOptions}
								errors={errors}
								isRequired
								className="bg-gray-100"
							/>
						</div>
					</div>
				</ProfileSection>

				<ProfileSection title="Social Links">
					<div className="max-w-[600px] w-full">
						<div className="flex flex-col gap-4 my-4">
							<div className="flex items-center gap-4 flex-wrap">
								<label htmlFor="add-social-link" className="font-semibold">
									Add Social Link:
								</label>
								<select
									id="add-social-link"
									className="w-auto p-2 border border-gray-300 rounded flex-grow min-w-[150px]"
									value={selectedSocialMedia}
									onChange={handleSocialMediaChange}
								>
									<option value="">Select Social Media</option>
									{socialMediaOptions
										.filter((option) => !displayedSocialLinks[option.value])
										.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
								</select>
								<Button
									type="button"
									variant="secondary"
									onClick={handleAddSocialLink}
									disabled={
										!selectedSocialMedia ||
										displayedSocialLinks[selectedSocialMedia]
									}
									className="min-w-[80px] rounded-lg"
								>
									{/* Text as children */}
									Add
								</Button>
							</div>

							{/* Render FormFields for each active social link */}
							{Object.keys(displayedSocialLinks).map((linkName) => {
								// Find the label for the linkName
								const socialLinkOption = socialMediaOptions.find(
									(opt) => opt.value === linkName
								);
								const label = socialLinkOption
									? socialLinkOption.label
									: linkName;

								return (
									<div key={linkName} className="flex items-center gap-4">
										<div className="flex-grow">
											{' '}
											{/* Allow FormField to take available space */}
											<FormField
												label={label} // Use the correct label
												id={linkName} // Use linkName as ID
												name={linkName} // Use linkName as the name for react-hook-form
												register={register}
												placeholder={`Enter your ${label} profile`}
												inputClassName="bg-gray-100"
												errors={errors} // Pass errors prop
											/>
										</div>
										<button
											type="button"
											onClick={() => handleRemoveSocialLink(linkName)}
											className="text-red-500 hover:text-red-700 focus:outline-none align-middle mt-8" // Adjust margin if needed
										>
											<FiTrash2 className="h-5 w-5" />
										</button>
									</div>
								);
							})}
						</div>
						{/* Update Profile Button */}
						<div className="mt-16 mb-6">
							<Button
								type="submit"
								variant="neutral"
								className="w-60 rounded-lg bg-brown hover:bg-pri-color text-white py-2 px-4 text-base font-normal"
							>
								{/* Text as children */}
								Update Profile
							</Button>
						</div>
					</div>
				</ProfileSection>
				<div className="mb-8"></div>
			</motion.div>
		</form>
	);
};

export default Profile;
