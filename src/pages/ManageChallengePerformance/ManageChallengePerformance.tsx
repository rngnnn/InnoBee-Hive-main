'use client';
import React, { useState } from 'react';
import DashboardHeader, {
	DashboardHeaderMenuItem,
} from 'src/components/bee-interface/DashboardHeader';
import useMenuItems from './ManageChallengePerformanceMenuItems';
import MetricCard from './ManageChallengePerformanceMetricCard';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import {
	PerformanceProvider,
	usePerformanceData,
} from './ManageChallengePerformanceContext';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend
);

export default function ManageChallengePerformance() {
	return (
		<PerformanceProvider>
			<InnerManageChallengePerformance />
		</PerformanceProvider>
	);
}

function InnerManageChallengePerformance() {
	const { performanceData } = usePerformanceData();
	const menuItems = useMenuItems(performanceData);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [showParticipantsModal, setShowParticipantsModal] = useState(false);

	const handleStartDateChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setStartDate(event.target.value);
		console.log('Start Date:', event.target.value);
	};

	const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEndDate(event.target.value);
		console.log('End Date:', event.target.value);
	};

	const handleTotalParticipantsClick = () => {
		setShowParticipantsModal(true);
	};

	const handleCloseModal = () => {
		setShowParticipantsModal(false);
	};

	if (!performanceData) {
		return <div>Loading Performance Data...</div>;
	}

	const {
		metrics,
		participantGrowthData,
		submissionCategoryData,
		participantLocationData,
		submissionScoreData,
	} = performanceData;

	const lineChartOptions = {
		responsive: true,
		plugins: {
			title: {
				display: false,
			},
			legend: {
				display: false,
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Month',
				},
			},
			y: {
				title: {
					display: true,
					text: 'Number of Participants',
				},
				beginAtZero: true,
			},
		},
	};

	const barChartOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: 'Average Judging Score',
				},
			},
			x: {
				title: {
					display: true,
					text: 'Judging Criteria',
				},
			},
		},
	};

	const pieChartOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: 'right' as const,
			},
			title: {
				display: false,
			},
		},
	};

	const histogramChartOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: 'Number of Submissions',
				},
			},
			x: {
				title: {
					display: true,
					text: 'Score Range',
				},
			},
		},
	};

	return (
		<div>
			<DashboardHeader
				title="Manage Challenge"
				menuItems={menuItems as DashboardHeaderMenuItem[]}
			/>
			<br />
			<h6 className="font-bold text-lg mt-2">Performance</h6>
			<p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
				Manage your innovative challenge by monitoring and improving the right
				metrics.
			</p>{' '}
			<div className="mb-4 flex items-center gap-4 flex-wrap">
				<div className="flex items-center gap-2 mb-2 sm:mb-0">
					<label htmlFor="start-date" className="text-gray-700 font-semibold">
						Start Date:
					</label>
					<input
						type="date"
						id="start-date"
						className="border rounded p-2"
						value={startDate}
						onChange={handleStartDateChange}
					/>
				</div>
				<div className="flex items-center gap-2">
					<label htmlFor="end-date" className="text-gray-700 font-semibold">
						End Date:
					</label>
					<input
						type="date"
						id="end-date"
						className="border rounded p-2"
						value={endDate}
						onChange={handleEndDateChange}
					/>
				</div>
				{/* You might want to add a button to apply the filter */}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
				{/* Participant Engagement */}
				<div
					onClick={handleTotalParticipantsClick}
					style={{ cursor: 'pointer' }}
				>
					<MetricCard title="Total Visitors" value={metrics.totalVisitors} />
				</div>
				<MetricCard title="Total Followers" value={metrics.totalFollowers} />
				<MetricCard
					title="Total Participants"
					value={metrics.totalParticipants}
				/>
				<MetricCard
					title="New Participants (Last 7 Days)"
					value={metrics.newParticipantsLastWeek}
				/>
				<MetricCard
					title="Total Submissions"
					value={metrics.totalSubmissions}
				/>
				<MetricCard
					title="Eligible Submissions"
					value={metrics.eligibleSubmissions}
				/>
				<MetricCard
					title="Average Submission Score"
					value={metrics.averageSubmissionScore}
				/>
				<MetricCard
					title="Participants Who Left The Challenge"
					value={metrics.participantsWhoLeftTheChallenge}
				/>
				<MetricCard title="Number Of Judges" value={metrics.numberOfJudges} />
				<MetricCard
					title="Number Of Moderators"
					value={metrics.numberOfModerators}
				/>
				<MetricCard
					title="Visits From Share Link"
					value={metrics.visitsFromShareLink}
				/>
				<MetricCard title="Time Remaining" value={metrics.timeRemaining} />
			</div>
			{/* Visualizations */}
			<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-white shadow-md rounded-lg p-6">
					<h3 className="text-xl font-semibold mb-2">
						Participant Growth Over Time
					</h3>
					<Line data={participantGrowthData} options={lineChartOptions} />
				</div>

				<div className="bg-white shadow-md rounded-lg p-6">
					<h3 className="text-xl font-semibold mb-2">
						Average Judging Score By Judging Criteria
					</h3>
					<Bar data={submissionCategoryData} options={barChartOptions} />
				</div>

				<div className="bg-white shadow-md rounded-lg p-6 mb-8">
					<h3 className="text-xl font-semibold mb-2">
						Geographical Distribution of Participants
					</h3>
					<Pie data={participantLocationData} options={pieChartOptions} />
				</div>

				<div className="bg-white shadow-md rounded-lg p-6 mb-8">
					<h3 className="text-xl font-semibold mb-2">
						Submission Scores Distribution
					</h3>
					<Bar data={submissionScoreData} options={histogramChartOptions} />
				</div>
			</div>
		</div>
	);
}
