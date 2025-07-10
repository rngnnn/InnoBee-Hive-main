import { useState, useCallback } from 'react';

import ReportType from './ReportType';
import ReportReason from './ReportReason';
import ReportContentInfo from './ReportContentInfo';
import ReportDetails from './ReportDetails';
import ReportThanks from './ReportThanks';
import { typeOfReport } from './ReportConstants';

// Define the structure for the report data state
interface ReportDataState {
	typeOfReport: number | null;
	otherTypeOfReport: string;
	reasonOfReport: number | null;
	reportExplanation: string;
	reportScreenshot: File | null;
	reportLink: string;
	violatesEULaws: boolean | null;
}

const ReportPage = () => {
	const [reportState, setReportState] = useState<number>(1);
	// Use the interface to type the state
	const [reportData, setReportData] = useState<ReportDataState>({
		typeOfReport: null,
		otherTypeOfReport: '',
		reasonOfReport: null,
		reportExplanation: '',
		reportScreenshot: null,
		reportLink: '',
		violatesEULaws: null,
	});
	const [progress, setProgress] = useState<number>(0);
	const totalSteps = 4;

	// Type the data parameter as Partial<ReportDataState>
	const updateReportData = useCallback((data: Partial<ReportDataState>) => {
		setReportData((prevData) => ({ ...prevData, ...data }));
	}, []);

	const handleNext = () => {
		if (reportState < totalSteps) {
			setReportState((prevState) => prevState + 1);
			setProgress(((reportState + 1) / totalSteps) * 100);
		} else if (reportState === totalSteps) {
			setReportState(5);
			setProgress(100);
		}
	};

	const handlePrevious = () => {
		if (reportState > 1) {
			setReportState((prevState) => prevState - 1);
			setProgress(((reportState - 1) / totalSteps) * 100);
		}
	};

	const handleSubmit = () => {
		// TODO: submit the report data here
		console.log('Report Data:', reportData);
		setReportState(5);
		setProgress(100);
	};

	const handleStartNewReport = () => {
		setReportState(1);
		setReportData({
			// Reset state
			typeOfReport: null,
			otherTypeOfReport: '',
			reasonOfReport: null,
			reportExplanation: '',
			reportScreenshot: null,
			reportLink: '',
			violatesEULaws: null,
		});
		setProgress(0);
	};

	// Helper function to safely get the title based on the selected type index
	const getSelectedReportTypeTitle = (): string | null => {
		const selectedTypeIndex = reportData.typeOfReport;
		if (
			selectedTypeIndex !== null &&
			selectedTypeIndex > 0 &&
			selectedTypeIndex <= typeOfReport.length
		) {
			return typeOfReport[selectedTypeIndex - 1]?.title || null;
		}
		return null;
	};

	return (
		<div>
			<h4 className="y-3 font-semibold text-xl">Report Content</h4>
			<p className="py-6">
				Found something on InnoBee that doesn’t seem right? Help us keep InnoBee
				safe for everyone by reporting it.
			</p>

			<div className="max-w-sm md:max-w-none mx-auto">
				{/* Progress Indicator */}
				{reportState < 5 && reportState >= 1 && (
					<div className="w-full bg-gray-200 rounded-full h-2 mb-4">
						<div
							className="bg-gradient-to-r from-yellow-300 to-pri-color h-2 rounded-full"
							style={{ width: `${(reportState / totalSteps) * 100}%` }}
						></div>
					</div>
				)}

				{/* Conditional Rendering based on reportState */}
				{reportState === 1 && (
					<ReportType
						onNextStep={handleNext}
						updateReportData={updateReportData}
						initialType={reportData.typeOfReport}
					/>
				)}
				{reportState === 2 && (
					<ReportReason
						onNextStep={handleNext}
						onPreviousStep={handlePrevious}
						updateReportData={updateReportData}
						initialReason={reportData.reasonOfReport}
						selectedReportType={getSelectedReportTypeTitle()} // Pass the selected report type title
					/>
				)}
				{reportState === 3 && (
					<ReportContentInfo
						onNextStep={handleNext}
						onPreviousStep={handlePrevious}
						updateReportData={updateReportData} // Pass necessary props
					/>
				)}
				{reportState === 4 && (
					<ReportDetails
						onSubmit={handleSubmit} // Use onSubmit prop for the final step
						onPreviousStep={handlePrevious}
						updateReportData={updateReportData}
						initialDetails={reportData.violatesEULaws} // Pass relevant initial data if needed
					/>
				)}
				{reportState === 5 && (
					<ReportThanks
						onStartNewReport={handleStartNewReport}
						message="Thank you for reporting!"
					/>
				)}
			</div>
		</div>
	);
};

export default ReportPage;
