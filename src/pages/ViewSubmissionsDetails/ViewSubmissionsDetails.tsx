import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import DashboardHeader from 'src/components/bee-interface/DashboardHeader';
import usePageState from './usePageState';
import { submission } from 'src/constants';
import { useUserRole } from 'src/hooks/useUserRole';
import {
	MdArrowForwardIos,
	MdAdd,
	MdRemove,
	MdStar,
	MdVerified,
} from 'react-icons/md';
import { format } from 'date-fns';
import { IoStarOutline } from 'react-icons/io5';
import { FiThumbsUp } from 'react-icons/fi';

interface SubmissionFormField {
	id: string;
	label: string;
	value: string;
}

interface Judge {
	id: string;
	name: string;
	notes: string;
	score: number;
}

interface JudgesScoring {
	judges: Judge[];
	averageScore: number;
}

interface CriteriaItem {
	id: string;
	name: string;
	description: string;
	maxScore: number;
}

// Mock data for judging criteria - would come from API
const JUDGING_CRITERIA: CriteriaItem[] = [
	{
		id: 'innovation',
		name: 'Innovation',
		description: 'Evaluate how innovative and original the solution is',
		maxScore: 25,
	},
	{
		id: 'feasibility',
		name: 'Feasibility',
		description: 'Evaluate how realistic and implementable the solution is',
		maxScore: 25,
	},
	{
		id: 'impact',
		name: 'Market Impact',
		description:
			'Evaluate the potential market impact and commercial viability',
		maxScore: 25,
	},
	{
		id: 'presentation',
		name: 'Presentation',
		description: 'Evaluate the quality and clarity of the presentation',
		maxScore: 25,
	},
];

// Mock data for judges scoring - would come from API
const MOCK_JUDGES_SCORING: JudgesScoring = {
	judges: [
		{
			id: 'judge1',
			name: 'Kathy Myers',
			notes: 'Innovative approach but concerns about scalability.',
			score: 82,
		},
		{
			id: 'judge2',
			name: 'Kyla Jeffrey',
			notes: 'Strong technical foundation with good market potential.',
			score: 88,
		},
		{
			id: 'judge3',
			name: 'Nate McConnell',
			notes: 'Excellent innovation but moderate implementation plan.',
			score: 79,
		},
	],
	averageScore: 83,
};

// Mock data for additional form fields - would come from API
const MOCK_FORM_FIELDS: Record<number, SubmissionFormField[]> = {
	1: [
		{
			id: 'technical',
			label: 'Technical Approach',
			value:
				'This submission proposes a novel approach using modified atmosphere packaging combined with natural preservatives extracted from plant sources.',
		},
		{
			id: 'timeline',
			label: 'Implementation Timeline',
			value:
				'6 months for research validation, 3 months for pilot testing, 3 months for scale-up.',
		},
		{
			id: 'cost',
			label: 'Estimated Cost',
			value:
				'$250,000 for research and development, $500,000 for initial implementation.',
		},
	],
	2: [
		{
			id: 'technical',
			label: 'Technical Approach',
			value:
				'A smart packaging system that actively monitors product freshness through embedded sensors.',
		},
		{
			id: 'timeline',
			label: 'Implementation Timeline',
			value:
				'8 months for R&D, 4 months for field testing, 2 months for market preparation.',
		},
		{
			id: 'cost',
			label: 'Estimated Cost',
			value: '$400,000 for R&D, $650,000 for production setup.',
		},
	],
	3: [
		{
			id: 'technical',
			label: 'Technical Approach',
			value:
				'Temperature control system for dairy transportation using advanced IoT sensors and machine learning algorithms.',
		},
		{
			id: 'timeline',
			label: 'Implementation Timeline',
			value:
				'4 months for system development, 5 months for integration testing, 3 months for deployment.',
		},
		{
			id: 'cost',
			label: 'Estimated Cost',
			value:
				'$350,000 for system development, $450,000 for deployment across distribution network.',
		},
	],
};

// Enhance mock data with additional submitter information - would come from API
const enhancedSubmissions = submission.map((sub, index) => ({
	...sub,
	formFields: MOCK_FORM_FIELDS[sub.id] || [],
	submitter: {
		name: ['Alex Johnson', 'Samantha Lee', 'Marcus Chen'][index % 3],
		avatar: `https://randomuser.me/api/portraits/${
			index % 2 ? 'women' : 'men'
		}/${(index % 10) + 1}.jpg`,
	},
	isEligible: index % 2 === 0,
	submissionDate: new Date(
		2025,
		3,
		Math.floor(Math.random() * 15) + 1
	).toISOString(),
	solutionHeadline: [
		"My solution submitted for P&G's challenge: add Zinc as a catalyst!",
		'Novel application of nanocellulose for P&G packaging solutions',
		'Biodegradable polymer integration for P&G sustainable packaging',
	][index % 3],
}));

// Function to format date
const formatDate = (dateString: string) => {
	try {
		const date = new Date(dateString);
		return format(date, "MMMM d, yyyy, hh:mm a 'PDT'");
	} catch (error) {
		console.error('Error formatting date:', error);
		return 'Date unavailable';
	}
};

export default function ViewSubmissionsDetails() {
	const navigate = useNavigate();
	const { challengeId } = useParams();
	const [searchParams] = useSearchParams();
	// Use the role management hook - this will later be connected to authentication
	const { userRole, isJudge } = useUserRole();

	const challengeIdResolved = Number(challengeId);
	const submissionIdResolved = Number(searchParams.get('id'));

	const invalidIds = isNaN(challengeIdResolved) || isNaN(submissionIdResolved);

	useEffect(() => {
		if (invalidIds) {
			navigate('/my-challenges');
		}
	}, [invalidIds, navigate]);

	if (invalidIds) {
		return null;
	}
	return (
		<Page
			challengeId={challengeIdResolved}
			submissionId={submissionIdResolved}
			userRole={userRole || 'judge'}
		/>
	);
}

function Page({
	challengeId,
	submissionId,
	userRole,
}: {
	challengeId: number;
	submissionId: number;
	userRole: string;
}) {
	const navigate = useNavigate();
	const challengeName =
		'P&G Expiration Date Elongation For Dairy Products Challenge'; // TODO: this needs to be fetched from backend according to the route param (id?)

	// Get menu items based on user role
	const { menuItems: originalMenuItems } = usePageState(
		challengeId,
		submissionId,
		userRole
	);

	// Filter menu items based on user role
	// Judges should only see Reset Score, View Challenge, and Export buttons
	const menuItems = React.useMemo(() => {
		if (userRole === 'judge') {
			return originalMenuItems.filter((item) => {
				// TODO: implement actual logic for filtering menu items based on user role
				return ['Reset Score', 'View Challenge', 'Export'].includes(item.label);
			});
		}
		return originalMenuItems;
	}, [originalMenuItems, userRole]);

	const [currentSubmissionIndex, setCurrentSubmissionIndex] = useState<number>(
		() => {
			// Find the index of the current submission
			return enhancedSubmissions.findIndex((item) => item.id === submissionId);
		}
	);

	// State for user's scores by criteria
	const [criteriaScores, setCriteriaScores] = useState<Record<string, number>>(
		Object.fromEntries(JUDGING_CRITERIA.map((criteria) => [criteria.id, 0]))
	);

	// State for user's comments by criteria
	const [criteriaComments, setCriteriaComments] = useState<
		Record<string, string>
	>(Object.fromEntries(JUDGING_CRITERIA.map((criteria) => [criteria.id, ''])));

	// Calculate total score
	const totalScore = Object.values(criteriaScores).reduce(
		(sum, score) => sum + score,
		0
	);

	// Function to update a criteria score
	const updateCriteriaScore = (criteriaId: string, score: number) => {
		setCriteriaScores((prev) => ({
			...prev,
			[criteriaId]: score,
		}));
	};

	// Function to update a criteria comment
	const updateCriteriaComment = (criteriaId: string, comment: string) => {
		setCriteriaComments((prev) => ({
			...prev,
			[criteriaId]: comment,
		}));
	};

	const goToNextSubmission = () => {
		if (currentSubmissionIndex < enhancedSubmissions.length - 1) {
			const nextSubmissionId =
				enhancedSubmissions[currentSubmissionIndex + 1].id;
			navigate(
				`/my-challenges/view-submissions/${challengeId}/details?id=${nextSubmissionId}&role=${userRole}`
			);
			setCurrentSubmissionIndex(currentSubmissionIndex + 1);
		}
	};

	const goToPreviousSubmission = () => {
		if (currentSubmissionIndex > 0) {
			const prevSubmissionId =
				enhancedSubmissions[currentSubmissionIndex - 1].id;
			navigate(
				`/my-challenges/view-submissions/${challengeId}/details?id=${prevSubmissionId}&role=${userRole}`
			);
			setCurrentSubmissionIndex(currentSubmissionIndex - 1);
		}
	};

	const handleSubmitEvaluation = () => {
		// TODO: API call to submit scores and comments
		console.log({
			submissionId,
			scores: criteriaScores,
			comments: criteriaComments,
			totalScore,
		});
		// Show success message or redirect
	};

	// Ensure we have the correct current submission
	const currentSubmission = enhancedSubmissions[currentSubmissionIndex];

	const [activeTab, setActiveTab] = useState(0);

	const getTabsForRole = () => {
		if (userRole === 'judge') {
			return ['Submission Form', 'My Evaluation'];
		}
		return ['Submission Form', 'Score Details', 'My Evaluation'];
	};

	const tabs = getTabsForRole();

	return (
		<>
			<DashboardHeader
				goBackLink={`/my-challenges/view-submissions/${challengeId}`}
				title="Submission Details"
				menuItems={menuItems}
			/>
			<p className="py-6">
				Preview submissions for <strong>{challengeName}</strong>
			</p>
			<div className="flex gap-3 flex-col lg:flex-row">
				<div className="basis-[28rem] bg-white rounded-lg shadow-sm p-4">
					<div className="flex flex-col h-full">
						<div className="flex-1">
							{currentSubmission && (
								<div className="mb-4">
									<h4 className="text-lg font-medium">
										{currentSubmission.title}
									</h4>
									<p className="text-sm text-gray-600 mt-1">
										{currentSubmission.companyName}
									</p>
									<p className="mt-3">{currentSubmission.description}</p>
								</div>
							)}
						</div>
						<div className="flex justify-between items-center mt-4">
							<button
								onClick={goToPreviousSubmission}
								disabled={currentSubmissionIndex <= 0}
								className={`p-2 rounded-full flex items-center justify-center ${
									currentSubmissionIndex <= 0
										? 'bg-gray-200 text-gray-400 cursor-not-allowed'
										: 'bg-brown text-white hover:bg-pri-color'
								}`}
							>
								<MdArrowForwardIos className="rotate-180" />
							</button>
							<div className="text-sm text-gray-600">
								{currentSubmissionIndex + 1} of {enhancedSubmissions.length}
							</div>
							<button
								onClick={goToNextSubmission}
								disabled={
									currentSubmissionIndex >= enhancedSubmissions.length - 1
								}
								className={`p-2 rounded-full flex items-center justify-center ${
									currentSubmissionIndex >= enhancedSubmissions.length - 1
										? 'bg-gray-200 text-gray-400 cursor-not-allowed'
										: 'bg-brown text-white hover:bg-pri-color'
								}`}
							>
								<MdArrowForwardIos />
							</button>
						</div>
					</div>
				</div>
				<div className="flex-1 bg-white rounded-lg shadow-sm p-4">
					<div className="flex flex-col h-full">
						{currentSubmission && (
							<div className="bg-white rounded-lg mb-6">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center">
										<img
											src={currentSubmission.submitter?.avatar || ''}
											alt={`${currentSubmission.submitter?.name}'s avatar`}
											className="w-10 h-10 rounded-full mr-3"
										/>
										<div>
											<p className="font-medium">
												{currentSubmission.submitter?.name ||
													'Unknown Submitter'}
											</p>
											<p className="text-sm text-gray-600">Submitter</p>
										</div>
									</div>

									<div className="flex items-center gap-6">
										{/* Eligibility status */}
										<div>
											{currentSubmission.isEligible ? (
												<div className="flex items-center">
													<FiThumbsUp className="text-green-500 mr-1" />
													<span className="text-green-500">Eligible</span>
												</div>
											) : (
												<span className="text-red-500">Ineligible</span>
											)}
										</div>

										{/* Rating */}
										<div className="flex items-center">
											<IoStarOutline className="text-brown mr-1" size={20} />
											<span className="font-medium">
												{currentSubmission.score.toFixed(1)}/100
											</span>
										</div>
									</div>
								</div>

								{/* Submission date */}
								<div className="mb-3">
									<p className="text-sm text-gray-500">
										{formatDate(currentSubmission.submissionDate)}
									</p>
								</div>

								{/* Solution headline */}
								<div className="border-t pt-3">
									<p className="font-medium text-gray-800">
										{currentSubmission.solutionHeadline}
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-y-7 mt-10">
				<h2 className="font-semibold text-xl text-center">
					Submission Details
				</h2>

				{/* Tabs Selection */}
				<div className="flex justify-center gap-4 mb-6">
					{tabs.map((tab, index) => (
						<div
							key={index}
							onClick={() => setActiveTab(index)}
							className={`px-6 py-2 rounded-lg cursor-pointer transition-all duration-200 shadow-sm ${
								activeTab === index
									? 'bg-white border-2 border-brown font-semibold'
									: 'bg-white hover:bg-gray-50'
							}`}
						>
							{tab}
						</div>
					))}
				</div>

				{/* Tab Content */}
				<div className="bg-white rounded-lg shadow-sm p-6">
					{/* Solution Details Tab */}
					{activeTab === 0 && (
						<div className="flex flex-col gap-4">
							<h3 className="font-semibold text-lg">Submission Form</h3>

							{/* Basic submission details */}
							<div className="border-b pb-4">
								<p className="font-medium">Title</p>
								<p className="text-gray-700 mt-1">{currentSubmission?.title}</p>
							</div>
							<div className="border-b pb-4">
								<p className="font-medium">Description</p>
								<p className="text-gray-700 mt-1">
									{currentSubmission?.description}
								</p>
							</div>
							<div className="border-b pb-4">
								<p className="font-medium">Company</p>
								<p className="text-gray-700 mt-1">
									{currentSubmission?.companyName}
								</p>
							</div>

							{/* Dynamic form fields */}
							{currentSubmission?.formFields?.map((field) => (
								<div key={field.id} className="border-b pb-4">
									<p className="font-medium">{field.label}</p>
									<p className="text-gray-700 mt-1">{field.value}</p>
								</div>
							))}
						</div>
					)}

					{/* Score Details Tab */}
					{activeTab === 1 && userRole !== 'judge' && (
						<div className="flex flex-col gap-4 mb-4">
							<h3 className="font-semibold text-lg">Score Details</h3>
							<div className="overflow-x-auto">
								<table className="min-w-full bg-white">
									<thead className="bg-gray-50 text-gray-600">
										<tr>
											<th className="py-3 px-4 text-left">Judge</th>
											<th className="py-3 px-4 text-left">Notes</th>
											<th className="py-3 px-4 text-right">Score</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200">
										{MOCK_JUDGES_SCORING.judges.map((judge) => (
											<tr key={judge.id}>
												<td className="py-3 px-4">{judge.name}</td>
												<td className="py-3 px-4 text-sm text-gray-700">
													{judge.notes}
												</td>
												<td className="py-3 px-4 text-right font-medium">
													{judge.score}/100
												</td>
											</tr>
										))}
										<tr className="bg-gray-50 font-semibold">
											<td className="py-3 px-4">Average</td>
											<td className="py-3 px-4"></td>
											<td className="py-3 px-4 text-right">
												{MOCK_JUDGES_SCORING.averageScore}/100
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					)}

					{/* My Score Tab */}
					{activeTab === (userRole === 'judge' ? 1 : 2) && (
						<div className="flex flex-col gap-6">
							<h3 className="font-semibold text-lg">My Evaluation</h3>

							{/* Dynamically render criteria evaluation sections */}
							{JUDGING_CRITERIA.map((criteria) => (
								<div key={criteria.id} className="border rounded-lg p-4">
									<div className="flex justify-between items-center mb-2">
										<h4 className="font-medium">{criteria.name}</h4>
										<div className="flex items-center">
											<span className="text-gray-700">
												{criteriaScores[criteria.id]} out of {criteria.maxScore}{' '}
												points
											</span>
										</div>
									</div>
									<div className="flex items-center gap-2 mb-2">
										<button
											onClick={() =>
												updateCriteriaScore(
													criteria.id,
													Math.max(0, criteriaScores[criteria.id] - 1)
												)
											}
											className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
										>
											<MdRemove />
										</button>
										<input
											type="range"
											min="0"
											max={criteria.maxScore}
											className="flex-1"
											value={criteriaScores[criteria.id]}
											onChange={(e) =>
												updateCriteriaScore(
													criteria.id,
													parseInt(e.target.value)
												)
											}
										/>
										<button
											onClick={() =>
												updateCriteriaScore(
													criteria.id,
													Math.min(
														criteria.maxScore,
														criteriaScores[criteria.id] + 1
													)
												)
											}
											className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
										>
											<MdAdd />
										</button>
									</div>
									<textarea
										placeholder={`Add your comments about ${criteria.name.toLowerCase()}...`}
										className="w-full p-2 border rounded-lg min-h-[100px]"
										value={criteriaComments[criteria.id]}
										onChange={(e) =>
											updateCriteriaComment(criteria.id, e.target.value)
										}
									/>
								</div>
							))}

							<div className="flex justify-between items-center mt-4 border-t pt-4">
								<div className="text-lg font-semibold">Total Score</div>
								<div className="text-lg font-semibold">{totalScore}/100</div>
							</div>

							<div className="flex justify-end mt-4">
								<button
									onClick={handleSubmitEvaluation}
									className="bg-brown hover:bg-pri-color text-white px-6 py-2 rounded-lg font-medium"
								>
									Submit Evaluation
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="mb-8"></div>{' '}
			{/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
		</>
	);
}
