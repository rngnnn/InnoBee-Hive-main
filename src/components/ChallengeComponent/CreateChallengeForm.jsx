import React, { useState, useRef } from "react";
import ReactQuill from "react-quill-new";
import {
    useForm,
    FormProvider,
    useFormContext,
    Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "antd";
import "./ChallengeComponent.css";
import { challengeCategories } from "../../constants";
import { challengeFormSchemas } from "./challengeFormSchemas";
import { Button } from "../../components/buttons/Button";
import ChallengeModal from "../Modals/ChallengeModal";
import { GoClock, GoInfo, GoLightBulb, GoTrophy } from "react-icons/go";
import { FiTrash2 } from "react-icons/fi";
import { IoTrophyOutline } from "react-icons/io5";

const steps = [
    { step: 1, image: <GoLightBulb /> },
    { step: 2, image: <GoInfo /> },
    { step: 3, image: <GoClock /> },
    { step: 4, image: <IoTrophyOutline /> },
];

const ImageUploadWithRemove = ({ name, label }) => {
    const { setValue, watch } = useFormContext();
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(watch(name + "Url") || null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
                setValue(name, file);
                setValue(name + "Url", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreviewUrl(null);
        setValue(name, null);
        setValue(name + "Url", null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <label className="font-semibold">{label}</label>
            <div className="mt-2">
                {previewUrl && (
                    <img
                        src={previewUrl || "/images/default-image.png"}
                        alt="Preview"
                        className="rounded-lg object-cover"
                        width={384}
                        height={216}
                    />
                )}
                <div className="flex items-center gap-2 mt-2">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        ref={fileInputRef}
                        id={`${name}-upload`}
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
            </div>
        </div>
    );
};

const CreateChallengeForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [startDateSelected, setStartDateSelected] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const methods = useForm({
        resolver: zodResolver(challengeFormSchemas[currentStep - 1]),
        mode: "onChange",
        defaultValues: {
            challengeTitle: "",
            challengeCategory: [],
            featuredImage: null,
            featuredImageUrl: null,
            description: "",
            problemStatement: "",
            currentSolutions: "",
            painPoint: "",
            prize: "",
            startDate: "",
            deadline: "",
            judgingStart: "",
            judgingEnd: "",
            winnerAnnouncement: "",
        },
    });

    const { handleSubmit, getValues, trigger } = methods;

    const updateFormData = () => {
        const data = getValues();
        const { featuredImageUrl, ...rest } = data;
        setFormData((prev) => ({ ...prev, ...rest }));
    };

    const onSubmit = (data) => {
        const { featuredImageUrl, ...rest } = data;
        const updatedData = { ...formData, ...rest };
        setFormData(updatedData);
        if (currentStep < steps.length) {
            setCurrentStep((prev) => prev + 1);
        } else {
            if (!getValues().prize) {
                alert("Previous step challenge prize is not filled");
                return;
            }
            console.log("Form Data:", updatedData);
            setOpenModal(true);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleStepClick = (step) => {
        if (step < currentStep) {
            setCurrentStep(step);
        } else {
            trigger().then((isValid) => {
                if (isValid) {
                    updateFormData();
                    setCurrentStep(step);
                }
            });
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const onCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div className="w-full">
            <div className="flex justify-center my-6">
                <div className="flex items-center max-w-96 w-full">
                    {steps.map(({ step, image }, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div
                                    className={`flex items-center justify-center text-2xl w-10 h-10 rounded-full cursor-pointer shadow-lg shadow-gray-400 ${
                                        currentStep >= step
                                            ? "bg-gradient-to-r from-pri-color to-pri-color rounded text-white"
                                            : "bg-gray-300 text-white"
                                    }`}
                                    onClick={() => handleStepClick(step)}
                                >
                                    {image}
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`flex-grow h-1 ${
                                            currentStep > step ? "bg-gradient-to-r from-pri-color to-pri-color rounded" : "bg-gray-300"
                                        }`}
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
            <div className="w-full sm:px-6 px-4 py-4 mb-6">
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-6 py-6 "
                    >
                        {currentStep === 1 && <Step1 />}
                        {currentStep === 2 && <Step2 />}
                        {currentStep === 3 && <Step3 />}
                        {currentStep === 4 && (
                            <Step4
                                startDateSelected={startDateSelected}
                                setStartDateSelected={setStartDateSelected}
                            />
                        )}

                        <div className="flex gap-2 mt-4">
                            {currentStep > 1 && (
                                <Button
                                    onClick={handleBack}
                                    className="text-[1rem] w-60 text-brown bg-white border border-brown hover:bg-brown hover:text-brown hover:text-white"
                                    variant="neutral"
                                    // Removed label prop
                                >
                                    {/* Text as children */}
                                    Go back
                                </Button>
                            )}
                            <Button
                                type="submit"
                                className="text-[1rem] w-60"
                                variant="neutral"
                                // Removed label prop
                            >
                                {/* Text as children, dynamic based on step */}
                                {currentStep === steps.length ? "Submit" : "Continue"}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
            <ChallengeModal openModal={openModal} onCloseModal={onCloseModal} />
        </div>
    );
};

const Step1 = () => {
    const {
        register,
        setValue,
        watch,
        control,
        clearErrors,
        formState: { errors },
    } = useFormContext();

    const description = watch("description");
    const quillRef = useRef(null);

    return (
        <div className="w-full flex flex-col gap-6">
            <div>
                <h6 className="font-bold text-xl">Challenge Overview</h6>
                <p className="challlenge-step-description">
                    Tell us your challenge name, category, description, and upload your
                    challenge visual.
                </p>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <label className="font-semibold">Challenge Title*</label>
                <input
                    {...register("challengeTitle")}
                    className="w-full bg-white h-11 outline-none px-2 focus:border-pri-color border-1"
                    placeholder="Enter the title of your challenges"
                />
                {errors.challengeTitle && (
                    <p className="text-red-500">{errors.challengeTitle.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1 w-full">
                <label className="font-semibold">Challenge Categories*</label>

                <Controller
                    name="challengeCategory"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            mode="multiple"
                            maxCount={3}
                            value={field.value || []}
                            onChange={(value) => {
                                field.onChange(value);
                            }}
                            placeholder="Select challenge category"
                            options={challengeCategories}
                        />
                    )}
                />

                <p className="text-xs text-gray-500">
                    The category help people use the search criteria to find your
                    challenge. Select no more than 3.
                </p>

                {errors.challengeCategory && (
                    <p className="text-red-500">{errors.challengeCategory.message}</p>
                )}
            </div>
            <div>
                <ImageUploadWithRemove
                    name="featuredImage"
                    label="Featured Image*"
                />
                <p className="text-xs text-gray-500">
                    {" "}
                    Maximum file size is 1 MB <br /> The image should illustrate your
                    challenge. Recommended size should be 1280 x 720.{" "}
                </p>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <label className="font-semibold">Challenge Description*</label>
                <ReactQuill
                    ref={quillRef}
                    value={description}
                    onChange={(value) => {
                        setValue("description", value);
                        clearErrors("description");
                    }}
                    theme="snow"
                    modules={{
                        toolbar: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ size: [] }],
                            ["bold", "italic", "underline", "strike", "blockquote"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link", "image"],
                            [{ align: [] }],
                            ["clean"],
                        ],
                    }}
                />
                <p className="text-xs text-gray-500">
                    Describe the challenge. The first 140 characters will be displayed
                    with the description on the Explore Page.
                </p>
                {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                )}
            </div>
        </div>
    );
};

const Step2 = () => {
    const { watch, setValue } = useFormContext();

    return (
        <>
            <div>
                <h6 className="font-bold text-xl">Challenge Problem Statement</h6>
                <p className="challlenge-step-description">
                    Tell us about the problem, the current solutions, and what solution
                    you are looking.
                </p>
            </div>
            <div>
                <label className="font-semibold">Problem Statement(optional)</label>
                <ReactQuill
                    value={watch("problemStatement")}
                    onChange={(value) => setValue("problemStatement", value)}
                    theme="snow"
                    modules={{
                        toolbar: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ size: [] }],
                            ["bold", "italic", "underline", "strike", "blockquote"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link", "image"],
                            [{ align: [] }],
                            ["clean"],
                        ],
                    }}
                />
                <p className="text-xs text-gray-500">What problem are you tackling?</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <label className="font-semibold">Current Solutions(optional)</label>
                <ReactQuill
                    value={watch("currentSolutions")}
                    onChange={(value) => setValue("currentSolutions", value)}
                    theme="snow"
                    modules={{
                        toolbar: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ size: [] }],
                            ["bold", "italic", "underline", "strike", "blockquote"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link", "image"],
                            [{ align: [] }],
                            ["clean"],
                        ],
                    }}
                />
                <p className="text-xs text-gray-500">
                    What are the current solutions to this problem?
                </p>
            </div>

            <div>
                <label className="font-semibold">Pain Point(optional)</label>
                <ReactQuill
                    value={watch("painPoint")}
                    onChange={(value) => setValue("painPoint", value)}
                    theme="snow"
                    modules={{
                        toolbar: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ size: [] }],
                            ["bold", "italic", "underline", "strike", "blockquote"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link", "image"],
                            [{ align: [] }],
                            ["clean"],
                        ],
                    }}
                />
                <p className="text-xs text-gray-500">
                    What are the current solutions missing?
                </p>
            </div>
        </>
    );
};

const Step3 = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <>
            <div>
                <h6 className="font-bold text-xl">Challenge Prize</h6>
                <p className="challlenge-step-description">
                    What is the prize that you are offering to the winner?
                </p>
            </div>

            <div className="flex flex-col gap-1 w-full">
                <label className="font-semibold">Challenge Prize*</label>
                <input
                    type="number"
                    {...register("prize")}
                    className=" w-full bg-white h-11 outline-none px-2 focus:border-pri-color border-1"
                />
                <p className="text-xs text-gray-500">
                    NOTE: The payment of the prize value is the responisbility of you, the
                    sponsor, to pay out at time of winner announcment
                </p>
                {errors.prize && <p className="text-red-500">{errors.prize.message}</p>}
            </div>
        </>
    );
};

const Step4 = ({ startDateSelected, setStartDateSelected }) => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <div>
                <h6 className="font-bold text-xl">Challenge Timeline</h6>
                <p className="challlenge-step-description">
                    How long will your challenge take?
                </p>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <label className="font-semibold">Challenge Start Date*</label>
                <input
                    type="datetime-local"
                    {...register("startDate")}
                    className="p-1"
                    onBlur={() => setStartDateSelected(true)}
                    onClick={(e) => e.target.showPicker()}
                />
                <p className="text-xs text-gray-500">
                    When would you like to launch your challenge?
                </p>
                {errors.startDate && (
                    <p className="text-red-500">{errors.startDate.message}</p>
                )}
            </div>
            {watch("startDate") && !errors.startDate && startDateSelected && (
                <>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="font-semibold">Challenge Deadline*</label>
                        <input
                            type="datetime-local"
                            {...register("deadline")}
                            className="p-1"
                            onClick={(e) => e.target.showPicker()}
                        />
                        <p className="text-xs text-gray-500">
                            When are your challenge submission due?
                        </p>
                        {errors.deadline && (
                            <p className="text-red-500">{errors.deadline.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="font-semibold">Judging Start Date*</label>
                        <input
                            type="datetime-local"
                            {...register("judgingStart")}
                            className="p-1 disabled:bg-gray-200 "
                            disabled={!watch("deadline") || errors.deadline}
                            onClick={(e) => e.target.showPicker()}
                        />
                        <p className="text-xs text-gray-500">
                            When does challenge judging process begin?
                        </p>
                        {errors.judgingStart && (
                            <p className="text-red-500">{errors.judgingStart.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="font-semibold">Judging End Date*</label>
                        <input
                            type="datetime-local"
                            {...register("judgingEnd")}
                            className="p-1 disabled:bg-gray-200 "
                            disabled={!watch("judgingStart") || errors.judgingStart}
                            onClick={(e) => e.target.showPicker()}
                        />
                        <p className="text-xs text-gray-500">
                            When does challenge judging process end?
                        </p>
                        {errors.judgingEnd && (
                            <p className="text-red-500">{errors.judgingEnd.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="font-semibold">Winner Announcement Date*</label>
                        <input
                            type="datetime-local"
                            {...register("winnerAnnouncement")}
                            className="p-1 disabled:bg-gray-200"
                            disabled={!watch("judgingEnd") || errors.judgingEnd}
                            onClick={(e) => e.target.showPicker()}
                        />
                        <p className="text-xs text-gray-500">
                            When is the challenge winner(s) announced?
                        </p>
                        {errors.winnerAnnouncement && (
                            <p className="text-red-500">
                                {errors.winnerAnnouncement.message}
                            </p>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default CreateChallengeForm;