import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Controller, useForm, FormProvider, useFormContext } from 'react-hook-form'; // Added useFormContext
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ReactQuill from "react-quill-new";
import 'react-quill/dist/quill.snow.css';
import { Select } from "antd";

import DashboardHeader from "src/components/bee-interface/DashboardHeader";
import { FiTrash2 } from "react-icons/fi";
import { IoEyeOutline, IoSaveOutline } from "react-icons/io5";

import SelectField from 'src/components/ui/SelectField';
import { ChallengeTypes, challengeCategories } from '../../constants/index';

// --- For Debugging: Uncomment these lines to check the imported values ---
// console.log("Imported ChallengeTypes:", ChallengeTypes);
// console.log("Imported challengeCategories:", challengeCategories);
// --- End Debugging ---

const CHARACTER_LIMIT_TITLE = 70;
const MAX_PRIZE_AMOUNT = 1000000;

// manageChallengeSchema
const manageChallengeSchema = z.object({
    challengeType: z.string().min(1, "Challenge type is required"),
    challengeTitle: z.string().min(1, "Title is required").max(CHARACTER_LIMIT_TITLE, `Title cannot exceed ${CHARACTER_LIMIT_TITLE} characters`),
    challengeCategory: z.array(z.string()).min(1, "At least one category is required").max(3, "Select no more than 3 categories"),
    featuredImage: z.any().nullable(),
    featuredImageUrl: z.string().nullable(),
    description: z.string().min(10, "Description should be at least 10 characters").refine(value => {
        const text = value.replace(/<[^>]*>/g, '');
        return text.length > 0;
    }, "Description is required"),
    prize: z.preprocess(
        (val) => Number(String(val).replace(/[^0-9.-]+/g, "")),
        z.number({ invalid_type_error: "Prize must be a number" })
           .min(0, "Prize cannot be negative")
           .max(MAX_PRIZE_AMOUNT, `Prize cannot exceed ${MAX_PRIZE_AMOUNT}`)
    ),
    shortUrl: z.string().optional().or(z.literal('')),
    hashtag: z.string().optional().or(z.literal('')),
    problemStatement: z.string().optional().or(z.literal('')),
    currentSolutions: z.string().optional().or(z.literal('')),
    painPoint: z.string().optional().or(z.literal('')),
}).refine(data => data.featuredImage || data.featuredImageUrl, {
    message: "Featured image is required.",
    path: ["featuredImage"],
});

// ImageUploadWithPreview now uses useFormContext()
const ImageUploadWithPreview = ({ name, label, required = false }) => {
    const { control, setValue, watch, formState: { errors } } = useFormContext(); // Changed to useFormContext
    const fileInputRef = useRef(null);
    
    const currentImageUrl = watch(name + "Url");
    const currentFile = watch(name);

    const [previewUrl, setPreviewUrl] = useState(currentImageUrl || null);

    useEffect(() => {
        if (currentFile instanceof File) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(currentFile);
        } else if (currentImageUrl) {
            setPreviewUrl(currentImageUrl);
        } else {
            setPreviewUrl(null);
        }
    }, [currentFile, currentImageUrl]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setValue(name, file, { shouldValidate: true });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result); 
                setValue(name + "Url", reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreviewUrl(null);
        setValue(name, null, { shouldValidate: true });
        setValue(name + "Url", null, { shouldValidate: true });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const fieldError = errors[name] || errors[name + "Url"];

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={`${name}-upload`} className="font-semibold">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {previewUrl ? (
                <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-96 h-54 rounded-lg object-cover my-2 border border-gray-200"
                />
            ) : (
                   <div className="w-96 h-54 max-w-48 rounded-lg bg-gray-100 border-dashed border-2 border-gray-300 flex items-center justify-center my-2">
                    <span className="text-gray-500">No image selected</span>
                </div>
            )}
            <div className="flex items-center gap-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id={`${name}-upload`}
                    ref={fileInputRef}
                />
                <label
                    htmlFor={`${name}-upload`}
                    className="cursor-pointer bg-white border border-brown text-brown p-2 rounded-lg shadow-sm hover:bg-brown hover:text-white"
                >
                    Upload Image
                </label>
                {previewUrl && (
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="flex items-center gap-1 text-sm text-gray-700 hover:text-red-500 focus:outline-none"
                    >
                        <FiTrash2 className="h-4 w-4" />
                        Remove
                    </button>
                )}
            </div>
            {fieldError && (
                <p className="text-red-500 text-xs mt-1">{fieldError.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
                Maximum file size is 1 MB. Recommended size: 1280x720.
            </p>
        </div>
    );
};

const quillModules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [{ align: [] }],
        ["clean"],
    ],
};

const ManageChallengeOverview = () => {
    const methods = useForm({
        resolver: zodResolver(manageChallengeSchema),
        mode: "onChange",
        defaultValues: {
            challengeType: "",
            challengeTitle: "",
            challengeCategory: [],
            featuredImage: null, // Keep here for initial state
            featuredImageUrl: null, // Keep here for initial state
            description: "",
            prize: "",
            shortUrl: "",
            hashtag: "",
            problemStatement: "",
            currentSolutions: "",
            painPoint: "",
        },
    });

    const { register, handleSubmit, control, watch, formState: { errors }, reset } = methods;

    useEffect(() => {
        const mockData = { // Replace with actual data fetching
            challengeType: null,
            challengeTitle: null,
            challengeCategory: ["technology"],
            description: null,
            prize: null,
            featuredImageUrl: null, 
            shortUrl: null,
            hashtag: null,
            problemStatement: null,
            currentSolutions: null,
            painPoint: null,
        };
        reset(mockData);
    }, [reset]);

    const onSubmit = (data) => {
        console.log("Form Data to Submit:", data);
        // Actual submission logic here
    };

    const titleCharCount = watch("challengeTitle")?.length || 0;

    const pageMenuItems = [
        {
            icon: <IoEyeOutline className="text-xl" />,
            key: "view-challenge",
            label: "View Challenge",
            color: "default",
            onClick: () => { console.log("View Challenge Clicked"); },
        },
        {
            icon: <IoSaveOutline className="text-xl" />,
            key: "save",
            label: "Save",
            color: "yellow",
            onClick: handleSubmit(onSubmit),
        },
    ];

    return (
        <FormProvider {...methods}> 
            <DashboardHeader title="Manage Challenge" menuItems={pageMenuItems} />
            <br />
            <h6 className="font-bold text-lg mt-2">Overview</h6>
            <p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
                Using this section, you can give a holistic idea about the challenge to the participants by clearly defining the title, the description, and the prize of your challenge.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <motion.div className="w-full flex flex-col gap-6 bg-white rounded-lg shadow-md relative p-6 md:p-8 mb-6">
                    <div className="absolute top-0 left-0 h-full w-2 bg-linearGradientToBottom rounded-lg shadow-sm" />
                    <h6 className="font-bold text-lg mt-2">Main Details</h6>

                    {/* 1. Challenge Type */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="challengeType" className="font-semibold">
                            Challenge Type <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="challengeType"
                            control={control}
                            render={({ field }) => (
                                <SelectField
                                    {...field}
                                    options={ChallengeTypes || []} // Fallback to empty array if undefined
                                    placeholder="Select challenge type"
                                    className="bg-gray-100 p-2 border border-gray-200 rounded w-full focus:border-pri-color outline-none shadow-sm"
                                />
                            )}
                        />
                        {errors.challengeType && <p className="text-red-500 text-xs mt-1">{errors.challengeType.message}</p>}
                    </div>

                    {/* 2. Challenge Title */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="challengeTitle" className="font-semibold">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="challengeTitle"
                                type="text"
                                {...register("challengeTitle")}
                                className="bg-gray-100 p-2 border border-gray-200 rounded w-full focus:border-pri-color outline-none shadow-sm pr-16"
                                placeholder="Enter the title of your challenge"
                            />
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
                                {titleCharCount}/{CHARACTER_LIMIT_TITLE}
                            </span>
                        </div>
                        {errors.challengeTitle && <p className="text-red-500 text-xs mt-1">{errors.challengeTitle.message}</p>}
                    </div>

                    {/* 3. Challenge Categories */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="challengeCategory" className="font-semibold">
                            Challenge Categories <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="challengeCategory"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Select categories (max 3)"
                                    options={challengeCategories || []} // Fallback to empty array
                                    className="custom-ant-select"
                                    maxCount={3}
                                />
                            )}
                        />
                           <p className="text-xs text-gray-500 mt-1">Select no more than 3 categories.</p>
                        {errors.challengeCategory && <p className="text-red-500 text-xs mt-1">{errors.challengeCategory.message}</p>}
                    </div>
                    
                    {/* 4. Featured Image */}
                    <ImageUploadWithPreview name="featuredImage" label="Featured Image" required={true} />

                    {/* 5. Challenge Description */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="description" className="font-semibold">
                            Challenge Description <span className="text-red-500">*</span>
                        </label>
                        <div className="bg-gray-100 border border-gray-200 rounded w-full shadow-sm focus-within:border-pri-color focus-within:ring-1 focus-within:ring-pri-color">
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <ReactQuill
                                        theme="snow"
                                        value={field.value}
                                        onChange={field.onChange}
                                        modules={quillModules}
                                        placeholder="Describe the challenge in detail."
                                        className="quill-custom-editor-bg"
                                    />
                                )}
                            />
                        </div>
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                    </div>

                    {/* 6. Prize */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="prize" className="font-semibold">
                            Prize <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="prize"
                            type="number"
                            {...register("prize")}
                            className="bg-gray-100 p-2 border border-gray-200 rounded w-full focus:border-pri-color outline-none shadow-sm"
                            placeholder={`Enter prize amount (e.g., 10000). Max: ${MAX_PRIZE_AMOUNT}`}
                        />
                        {errors.prize && <p className="text-red-500 text-xs mt-1">{errors.prize.message}</p>}
                    </div>

                    {/* 7. Short URL */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="shortUrl" className="font-semibold">
                            Short URL
                        </label>
                        <input
                            id="shortUrl"
                            type="text"
                            {...register("shortUrl")}
                            className="bg-gray-100 p-2 border border-gray-200 rounded w-full focus:border-pri-color outline-none shadow-sm"
                            placeholder="Example: Under30, HouseToHome"
                        />
                        {errors.shortUrl && <p className="text-red-500 text-xs mt-1">{errors.shortUrl.message}</p>}
                        <p className="max-w-[500px] text-xs text-gray-500 mt-1">
                            <span className="font-semibold">TIPS:</span> Make your URL short and relevant. <br />
                            <span className="text-pri-color">WARNING!</span> This cannot be changed after publishing by users.
                        </p>
                    </div>

                    {/* 8. Hashtag */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="hashtag" className="font-semibold">
                            Hashtag
                        </label>
                        <input
                            id="hashtag"
                            type="text"
                            {...register("hashtag")}
                            className="bg-gray-100 p-2 border border-gray-200 rounded w-full focus:border-pri-color outline-none shadow-sm"
                            placeholder="Create a #hashtag for Twitter shares."
                        />
                        {errors.hashtag && <p className="text-red-500 text-xs mt-1">{errors.hashtag.message}</p>}
                    </div>
                    
                </motion.div>

                <motion.div className="w-full flex flex-col gap-6 bg-white rounded-lg shadow-md relative p-6 md:p-8 mb-6">
                    <div className="absolute top-0 left-0 h-full w-2 bg-linearGradientToBottom rounded-lg shadow-sm" />
                    <h6 className="font-bold text-lg mt-2">Optional Details</h6>
                    
                    {/* Remaining fields as is */}
                    {['problemStatement', 'currentSolutions', 'painPoint'].map(fieldName => {
                        const labels = {
                            problemStatement: "Problem Statement (optional)",
                            currentSolutions: "Current Solutions (optional)",
                            painPoint: "Pain Point (optional)"
                        };
                        const placeholders = {
                            problemStatement: "What problem are you tackling?",
                            currentSolutions: "What are the current solutions to this problem?",
                            painPoint: "What are the current solutions missing?"
                        };
                        return (
                            <div className="flex flex-col gap-1" key={fieldName}>
                                <label htmlFor={fieldName} className="font-semibold">
                                    {labels[fieldName]}
                                </label>
                                <div className="bg-gray-100 border border-gray-200 rounded w-full shadow-sm focus-within:border-pri-color focus-within:ring-1 focus-within:ring-pri-color">
                                    <Controller
                                        name={fieldName}
                                        control={control}
                                        render={({ field }) => (
                                            <ReactQuill
                                                theme="snow"
                                                value={field.value}
                                                onChange={field.onChange}
                                                modules={quillModules}
                                                placeholder={placeholders[fieldName]}
                                                className="quill-custom-editor-bg"
                                            />
                                        )}
                                    />
                                </div>
                                {errors[fieldName] && <p className="text-red-500 text-xs mt-1">{errors[fieldName].message}</p>}
                            </div>
                        );
                    })}
                </motion.div>
            </form>
            <br />
            <br />
        </FormProvider>
    );
};

export default ManageChallengeOverview;