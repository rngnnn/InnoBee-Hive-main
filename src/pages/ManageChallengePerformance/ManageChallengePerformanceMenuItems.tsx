import { BiExport } from 'react-icons/bi';
import { PerformanceData } from './ManageChallengePerformanceContext';

const useMenuItems = (performanceData: PerformanceData) => {
	// const { filteredParticipants } = useParticipantsData(); // If needed for export

	const handleExport = () => {
		if (!performanceData) {
			alert('No performance data to export.');
			return;
		}

		// Prepare data for export (you can customize this based on what you want to include)
		const exportData = {
			metrics: performanceData.metrics,
			participantGrowth: performanceData.participantGrowthData,
			submissionBreakdown: performanceData.submissionCategoryData,
			participantLocations: performanceData.participantLocationData,
			submissionScores: performanceData.submissionScoreData,
			// Add more data as needed
		};

		// Convert data to JSON string
		const jsonString = JSON.stringify(exportData, null, 2);

		// Create a Blob with the JSON data
		const blob = new Blob([jsonString], { type: 'application/json' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'performance_report.json';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	};

	const menuItems = [
		{
			icon: <BiExport className="text-xl" />,
			key: 'export-performance',
			label: 'Export Report (JSON)',
			onClick: handleExport,
			color: 'default',
		},
		// You can add more menu items here if needed (e.g., Export as CSV)
	];

	return menuItems;
};

export default useMenuItems;
