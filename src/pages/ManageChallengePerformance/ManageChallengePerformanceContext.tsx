import { createContext, useContext } from 'react';

interface Metrics {
	totalVisitors: number;
	totalFollowers: number;
	totalParticipants: number;
	newParticipantsLastWeek: number;
	totalSubmissions: number;
	eligibleSubmissions: number;
	averageSubmissionScore: number;
	participantsWhoLeftTheChallenge: string | number;
	numberOfJudges: number;
	numberOfModerators: number;
	visitsFromShareLink: number;
	timeRemaining: string;
}

interface Dataset {
	label: string;
	data: number[];
	fill?: boolean;
	borderColor: string;
	backgroundColor: string | string[];
	tension?: number;
	borderWidth?: number;
}

interface ChartData {
	labels: string[];
	datasets: Dataset[];
}

export interface PerformanceData {
	metrics: Metrics;
	participantGrowthData: ChartData;
	submissionCategoryData: ChartData;
	participantLocationData: ChartData;
	submissionScoreData: ChartData;
}

interface PerformanceContextType {
	performanceData: PerformanceData;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(
	undefined
);

export const PerformanceProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	// Mock ManagePerformance data (replace with your actual data fetching logic)
	const initialPerformanceData: PerformanceData = {
		metrics: {
			totalVisitors: 1287,
			totalFollowers: 569,
			totalParticipants: 320,
			newParticipantsLastWeek: 41,
			totalSubmissions: 299,
			eligibleSubmissions: 257,
			averageSubmissionScore: 83.5,
			participantsWhoLeftTheChallenge: '10',
			numberOfJudges: 3,
			numberOfModerators: 1,
			visitsFromShareLink: 85,
			timeRemaining: '15 Days',
		},
		participantGrowthData: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
			datasets: [
				{
					label: 'New Participants',
					data: [57, 66, 55, 75, 84, 91],
					fill: false,
					borderColor: 'rgba(0, 0, 0, 0.8)', // Dark gray border
					backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly transparent brown
					tension: 0.1,
				},
			],
		},
		submissionCategoryData: {
			labels: [
				'Innovativeness',
				'Feasibility',
				'Market Impact',
				'Presentation',
			],
			datasets: [
				{
					label: 'Average Judging Score',
					data: [94, 79, 81, 80],
					backgroundColor: [
						'rgba(0, 0, 0, 0.8)',
						'rgba(0, 0, 0, 0.6)',
						'rgba(0, 0, 0, 0.4)',
						'rgba(0, 0, 0, 0.2)',
					],
					borderColor: 'rgba(0, 0, 0, 0.9)', // Darker gray border
					borderWidth: 1,
				},
			],
		},
		participantLocationData: {
			labels: ['USA', 'Germany', 'UK', 'India', 'Canada'],
			datasets: [
				{
					label: 'Number of Participants',
					data: [45, 30, 20, 15, 10],
					backgroundColor: [
						'rgba(0, 0, 0, 0.7)',
						'rgba(0, 0, 0, 0.6)',
						'rgba(0, 0, 0, 0.5)',
						'rgba(0, 0, 0, 0.4)',
						'rgba(0, 0, 0, 0.3)',
					],
					borderColor: 'rgba(0, 0, 0, 0.9)',
					borderWidth: 1,
				},
			],
		},
		submissionScoreData: {
			labels: ['0-20', '30-40', '50-60', '70-80', '90-100'],
			datasets: [
				{
					label: 'Number of Submissions',
					data: [5, 10, 25, 20, 15],
					backgroundColor: 'rgba(0, 0, 0, 0.7)',
					borderColor: 'rgba(0, 0, 0, 0.9)',
				},
			],
		},
	};

	return (
		<PerformanceContext.Provider
			value={{ performanceData: initialPerformanceData }}
		>
			{children}
		</PerformanceContext.Provider>
	);
};

export const usePerformanceData = () => {
	const context = useContext(PerformanceContext);
	if (!context) {
		throw new Error(
			'usePerformanceData must be used within a PerformanceProvider'
		);
	}
	return context;
};
