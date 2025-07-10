import { useState, useEffect } from 'react';

import BugReportType from './SuggestionCategory';
import SuggestionDetails from './SuggestionDetails';
import SuggestionThanks from './SuggestionThanks';
import FeatureRequestArea from './FeatureRequestArea';
import BugReportDetails from './BugReportDetails';
import BugReportThanks from './BugReportThanks';

const SuggestImprovementPage = () => {
	const [reportState, setReportState] = useState(1);
	const [reportData, setReportData] = useState({
		reportType: null,
		otherReportType: '',
		bugReportDescription: '',
		bugReportSteps: '',
		bugReportSeverity: '',
		bugReportScreenshot: null,
		bugReportLink: '',
		suggestionDescription: '',
		suggestionScreenshot: null,
		suggestionLink: '',
		featureRequestArea: null,
	});
	const [progress, setProgress] = useState(0);
	const [totalSteps, setTotalSteps] = useState(2);
	const [isBugReport, setIsBugReport] = useState(false);
	const [isFeatureRequest, setIsFeatureRequest] = useState(false);

	const updateReportData = (data: any) => {
		setReportData((prevData) => ({ ...prevData, ...data }));
	};

	const handleNext = () => {
		if (reportState < totalSteps) {
			setReportState((prevState) => prevState + 1);
			setProgress(((reportState + 1) / totalSteps) * 100);
		} else if (reportState === totalSteps) {
			setReportState(totalSteps + 1);
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
		console.log('Report Data:', reportData);
		setReportState(totalSteps + 1);
		setProgress(100);
	};

	const handleStartNewReport = () => {
		setReportState(1);
		setReportData({
			reportType: null,
			otherReportType: '',
			bugReportDescription: '',
			bugReportSteps: '',
			bugReportSeverity: '',
			bugReportScreenshot: null,
			bugReportLink: '',
			suggestionDescription: '',
			suggestionScreenshot: null,
			suggestionLink: '',
			featureRequestArea: null,
		});
		setProgress(0);
		setIsBugReport(false);
		setIsFeatureRequest(false);
		setTotalSteps(2);
	};

	useEffect(() => {
		if (reportData.reportType === 1) {
			// Bug Report
			setIsBugReport(true);
			setIsFeatureRequest(false);
			setTotalSteps(2); // Category -> Details -> Thanks
		} else if (reportData.reportType === 3) {
			// Feature Request
			setIsBugReport(false);
			setIsFeatureRequest(true);
			setTotalSteps(3); // Category -> Feature Area -> Details -> Thanks
		} else {
			setIsBugReport(false);
			setIsFeatureRequest(false);
			setTotalSteps(2); // Category -> Details -> Thanks
		}
	}, [reportData.reportType]);

	return (
		<div>
			<h4 className="y-3 font-semibold text-xl">Suggest Improvement</h4>
			<p className="py-6">
				Help us make InnoBee even better by reporting bugs, suggesting
				improvements, or requesting new features.
			</p>

			<div className="max-w-sm md:max-w-none mx-auto">
				{/* Progress Indicator */}
				{reportState <= totalSteps && reportState >= 1 && (
					<div className="w-full bg-gray-200 rounded-full h-2 mb-4">
						<div
							className="bg-gradient-to-r from-yellow-300 to-pri-color h-2 rounded-full"
							style={{ width: `${(reportState / totalSteps) * 100}%` }}
						></div>
					</div>
				)}

				{reportState === 1 && (
					<BugReportType
						onNextStep={handleNext}
						updateReportData={updateReportData}
						initialType={reportData.reportType}
					/>
				)}

				{reportState === 2 && isBugReport && (
					<BugReportDetails
						onNextStep={handleSubmit}
						onPreviousStep={handlePrevious}
						updateReportData={updateReportData}
					/>
				)}

				{reportState === 2 && isFeatureRequest && (
					<FeatureRequestArea
						onNextStep={handleNext}
						onPreviousStep={handlePrevious}
						updateReportData={updateReportData}
						initialArea={reportData.featureRequestArea}
					/>
				)}

				{reportState === 2 && !isBugReport && !isFeatureRequest && (
					<SuggestionDetails // Generic Details for Improvement Suggestion and Other
						onNextStep={handleSubmit}
						onPreviousStep={handlePrevious}
						updateReportData={(data) =>
							updateReportData({
								suggestionDescription: data.suggestionDescription,
								suggestionScreenshot: data.suggestionScreenshot,
								suggestionLink: data.suggestionLink,
							})
						}
					/>
				)}

				{reportState === 3 && isFeatureRequest && (
					<SuggestionDetails // Generic Details after Feature Area
						onNextStep={handleSubmit}
						onPreviousStep={handlePrevious}
						updateReportData={(data) =>
							updateReportData({
								suggestionDescription: data.suggestionDescription,
								suggestionScreenshot: data.suggestionScreenshot,
								suggestionLink: data.suggestionLink,
							})
						}
					/>
				)}

				{reportState === totalSteps + 1 && (
					<>
						{isBugReport ? (
							<BugReportThanks
								onStartNewReport={handleStartNewReport}
								message="Thank you for reporting the bug!"
							/>
						) : (
							<SuggestionThanks
								onStartNewSuggestion={handleStartNewReport}
								message="Thank you for your feedback!"
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default SuggestImprovementPage;
