import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy } from 'react';

import 'react-quill/dist/quill.snow.css';
import './App.css';
import AuthLayout from './components/layouts/auth/AuthLayout';
import CorporateGrayLayout from './components/layouts/corporate/CorporateGrayLayout';
import CorporateWhiteLayout from './components/layouts/corporate/CorporateWhiteLayout';
import DashboardLayout from './components/layouts/dashboard/DashboardLayout';
import ManageChallengeLayout from './components/layouts/manage-challenge/ManageChallengeLayout';
import NeedHelpLayout from './components/layouts/dashboard/NeedHelpLayout';
import ReportPage from './pages/ReportPage/ReportPage';
import SuggestImprovementPage from './pages/SuggestImprovementPage/SuggestImprovementPage';
import FeedBackPage from './pages/FeedBackPage/FeedBackPage';
import {
	accountSettingsLinks,
	networkMainLinks,
	dashboardMainLinks,
	judgingMainLinks,
} from './constants';
import { Toaster } from './components/ui/toaster';
import { JudgingCriteriaProvider } from './pages/ManageChallengeJudgingCriteria/JudgingCriteriaContext';
import { TimelineProvider } from './pages/ManageChallengeTimelines/TimelineContext';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { JudgesProvider } from './pages/ManageChallengeJudges/JudgesContext';
import { ParticipantsProvider } from './pages/ManageChallengeParticipants/ParticipantsContext';
import { FaqProvider } from 'src/pages/ManageChallengeFaq/FaqProvider';
import { PartnersProvider } from './pages/ManageChallengePartners/PartnersContext';
import { ModeratorsProvider } from './pages/ManageChallengeModerator/ModeratorsContext';
import NotificationsPage from './components/layouts/dashboard/NotificationsPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import Messaging from './pages/Messaging/Messaging';
import ManageChallengeSettings from './pages/ManageChallengeSettings/ManageChallengeSettings';

// Lazy load components
const Press = lazy(
	() => import('./pages/ManageChallengePress/ManageChallengePress')
);
const Performance = lazy(
	() => import('./pages/ManageChallengePerformance/ManageChallengePerformance')
);
const ManageChallengePartners = lazy(
	() => import('./pages/ManageChallengePartners/ManageChallengePartners')
);
const JudgingActivity = lazy(
	() => import('./pages/ManageChallengeJudgingActivity/JudgingActivity')
);
const ManageChallengeJudges = lazy(
	() => import('./pages/ManageChallengeJudges/ManageChallengeJudges')
);
const ManageChallengeParticipants = lazy(
	() =>
		import('./pages/ManageChallengeParticipants/ManageChallengeParticipants')
);
const ManageChallengeModerators = lazy(
	() => import('./pages/ManageChallengeModerator/ManageChallengeModerators')
);
const ManageChallengeLegalAgreement = lazy(
	() =>
		import(
			'./pages/ManageChallengeLegalAgreement/ManageChallengeLegalAgreement'
		)
);
const ManageChallengeJudgesNDA = lazy(
	() => import('./pages/ManageChallengeNDA/ManageChallengeJudgesNDA')
);
const BillingPage = lazy(() => import('./pages/BillingPage/BillingPage'));
const Challenge = lazy(() => import('./pages/Challenge/Challenge'));
const CreateChallenge = lazy(
	() => import('./pages/CreateChallenge/CreateChallenge')
);
const EditSubmission = lazy(
	() => import('./pages/EditSubmission/EditSubmission')
);
const Explore = lazy(() => import('./pages/Explore/Explore'));
const Faq = lazy(() => import('./pages/ManageChallengeFaq/Faq'));
const FeedBackPageLazy = lazy(
	() => import('./pages/FeedBackPage/FeedBackPage')
);
const ForgotPasswordPage = lazy(
	() => import('./pages/ForgotPasswordPage/ForgotPasswordPage')
);
const Guidelines = lazy(
	() => import('./pages/ManageChallengeGuidelines/Guidelines')
);
const Invitations = lazy(() => import('./pages/Invitations/Invitations'));
const JudgingInvitation = lazy(
	() => import('./pages/ManageChallengeJudgingInvitation/JudgingInvitation')
);
const Login = lazy(() => import('./pages/Login/Login'));
const LoginPreference = lazy(
	() => import('./pages/LoginPreference/LoginPreference')
);
const ManageChallengeOverview = lazy(
	() => import('./pages/ManageChallengeOverview/ManageChallengeOverview')
);
const MyChallenges = lazy(() => import('./pages/MyChallenges/MyChallenges'));
const MyRequests = lazy(() => import('./pages/MyRequests/MyRequests'));
const MySubmission = lazy(() => import('./pages/MySubmission/MySubmission'));
const MyTask = lazy(() => import('./pages/MyTask/MyTask'));
const NotificationSettings = lazy(
	() => import('./pages/NotificationSettings/NotificationSettings')
);
const OverviewLazy = lazy(() => import('./pages/Overview/Overview'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const ProofOfConcept = lazy(
	() => import('./pages/ProofOfConcept/ProofOfConcept')
);
const PublicProfile = lazy(() => import('./pages/PublicProfile/PublicProfile'));
const PurchaseHistoryPage = lazy(
	() => import('./pages/PurchaseHistoryPage/PurchaseHistoryPage')
);
const RegistrationPage = lazy(
	() => import('./pages/RegistrationPage/RegistrationPage')
);
const ReportPageLazy = lazy(() => import('./pages/ReportPage/ReportPage'));
const SuggestImprovementPageLazy = lazy(
	() => import('./pages/SuggestImprovementPage/SuggestImprovementPage')
);
const TeamCollaboration = lazy(
	() => import('./pages/TeamCollaboration/TeamCollaboration')
);
const ManageChallengePressPage = lazy(
	() => import('./pages/ManageChallengePress/ManageChallengePress')
);
const ManageChallengeUpdates = lazy(
	() => import('./pages/ManageChallengeUpdates/ManageChallengeUpdates')
);
const CookieSettings = lazy(
	() => import('./pages/CookieSettings/CookieSettings')
);
const ViewSubmissions = lazy(
	() => import('./pages/ViewSubmissions/ViewSubmissions')
);
const ViewSubmissionsDetails = lazy(
	() => import('./pages/ViewSubmissionsDetails/ViewSubmissionsDetails')
);
const ManageChallengeTimelines = lazy(
	() => import('./pages/ManageChallengeTimelines/ManageChallengeTimelines')
);
const ManageChallengeSubmissionForm = lazy(
	() =>
		import(
			'./pages/ManageChallengeSubmissionForm/ManageChallengeSubmissionForm'
		)
);
const ManageChallengeNotifications = lazy(
	() =>
		import(
			'./pages/ManageChallengeSendNotifications/ManageChallengeSendNotifications'
		)
);
const ManageChallengeJudgingCriteria = lazy(
	() =>
		import(
			'./pages/ManageChallengeJudgingCriteria/ManageChallengeJudgingCriteria'
		)
);
const NoMatch = lazy(() => import('./pages/NoMatch/NoMatch'));

function App() {
	return (
		<>
			<Routes>
				{/** No layout */}
				<Route
					path="/proof-of-concept"
					element={
						<PrivateRoute>
							<ProofOfConcept />
						</PrivateRoute>
					}
				/>
				{/** Auth layout */}
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<RegistrationPage />} />
					<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				</Route>
				{/** Manage challenge layout */}
				<Route
					element={
						<PrivateRoute>
							<ManageChallengeLayout />
						</PrivateRoute>
					}
				>
					<Route
						path="/manage-challenge/overview"
						element={<ManageChallengeOverview />}
					/>
					<Route path="/manage-challenge/guidelines" element={<Guidelines />} />
					<Route
						path="/manage-challenge/faq"
						element={
							<FaqProvider>
								<Faq />
							</FaqProvider>
						}
					/>
					<Route
						path="/manage-challenge/press"
						element={<ManageChallengePressPage />}
					/>

					<Route path="/manage-challenge/press" element={<Press />} />
					<Route
						path="/manage-challenge/updates"
						element={<ManageChallengeUpdates />}
					/>
					<Route
						path="/manage-challenge/legal-agreement"
						element={<ManageChallengeLegalAgreement />}
					/>
					<Route
						path="/manage-challenge/NDA"
						element={<ManageChallengeJudgesNDA />}
					/>
					<Route
						path="/manage-challenge/Performance"
						element={<Performance />}
					/>
					<Route
						path="/manage-challenge/send-notification"
						element={<ManageChallengeNotifications />}
					/>
					<Route
						path="/manage-challenge/partners"
						element={
							<PartnersProvider>
								<ManageChallengePartners />
							</PartnersProvider>
						}
					/>
					<Route
						path="/manage-challenge/settings"
						element={<ManageChallengeSettings />}
					/>
					<Route
						path="/manage-challenge/judging-activity"
						element={<JudgingActivity />}
					/>
					<Route
						path="/manage-challenge/judges"
						element={
							<JudgesProvider>
								<ManageChallengeJudges />
							</JudgesProvider>
						}
					/>
					<Route
						path="/manage-challenge/moderators"
						element={
							<ModeratorsProvider>
								<ManageChallengeModerators />
							</ModeratorsProvider>
						}
					/>
					<Route
						path="/manage-challenge/participants"
						element={
							<ParticipantsProvider>
								<ManageChallengeParticipants />
							</ParticipantsProvider>
						}
					/>
					<Route
						path="/manage-challenge/timelines"
						element={
							<TimelineProvider>
								<ManageChallengeTimelines />
							</TimelineProvider>
						}
					/>
					<Route
						path="/manage-challenge/submission-form"
						element={<ManageChallengeSubmissionForm />}
					/>
					<Route
						path="/manage-challenge/judging-criteria"
						element={
							<JudgingCriteriaProvider>
								<ManageChallengeJudgingCriteria />
							</JudgingCriteriaProvider>
						}
					/>
				</Route>
				{/** Corporate sidebar layouts */}
				<Route element={<CorporateWhiteLayout />}>
					<Route
						path="/challenge"
						element={
							<PrivateRoute>
								<Challenge />
							</PrivateRoute>
						}
					/>
				</Route>
				<Route
					element={
						<PrivateRoute>
							<CorporateGrayLayout />
						</PrivateRoute>
					}
				>
					<Route path="/public-profile" element={<PublicProfile />} />
				</Route>
				{/** Dashboard sidebar layout */}
				<Route
					element={
						<PrivateRoute>
							<DashboardLayout
								defaultLinks={dashboardMainLinks}
								customLinks={{
									'/network': networkMainLinks,
									'/judging': judgingMainLinks,
									'/account': accountSettingsLinks,
								}}
							/>
						</PrivateRoute>
					}
				>
					<Route path="/" element={<OverviewLazy />} />
					<Route path="/overview" element={<OverviewLazy />} />
					<Route path="/account/profile" element={<Profile />} />
					<Route
						path="/account/login-preferences"
						element={<LoginPreference />}
					/>
					<Route path="/account/billing" element={<BillingPage />} />
					<Route path="/account/purchase" element={<PurchaseHistoryPage />} />
					<Route
						path="/account/notification-settings"
						element={<NotificationSettings />}
					/>
					<Route path="/notifications" element={<NotificationsPage />} />
					<Route path="/search-results" element={<SearchResultsPage />} />
					<Route path="/account/report" element={<ReportPageLazy />} />
					<Route
						path="/account/Improvement"
						element={<SuggestImprovementPageLazy />}
					/>
					<Route path="/account/feedback" element={<FeedBackPageLazy />} />
					<Route path="/create-challenge" element={<CreateChallenge />} />
					<Route path="/explore" element={<Explore />} />
					<Route path="/my-challenges" element={<MyChallenges />} />
					<Route
						path="/my-challenges/view-submissions/:challengeId"
						element={<ViewSubmissions />}
					/>
					<Route
						path="/my-challenges/view-submissions/:challengeId/details"
						element={<ViewSubmissionsDetails />}
					/>
					<Route path="/my-submission" element={<MySubmission />} />
					<Route path="/edit-submission" element={<EditSubmission />} />
					<Route
						path="/my-submission/team-collaboration"
						element={<TeamCollaboration />}
					/>
					<Route path="/network/invitations" element={<Invitations />} />
					<Route path="/network/my-requests" element={<MyRequests />} />
					<Route path="/network/messaging" element={<Messaging />} />
					<Route path="/judging" element={<JudgingInvitation />} />
					<Route path="/judging/my-tasks" element={<MyTask />} />
					<Route path="/account/cookie-settings" element={<CookieSettings />} />
				</Route>

				{/** Need Help Layout and Routes */}
				<Route path="/need-help" element={<NeedHelpLayout />}>
					{/* Redirect the base /need-help path to /need-help/give-feedback */}
					<Route path="" element={<Navigate to="feedback" replace />} />
					<Route path="help-center" element={<OverviewLazy />} />
					<Route path="feedback" element={<FeedBackPage />} />
					<Route path="report" element={<ReportPage />} />
					<Route path="improvement" element={<SuggestImprovementPage />} />
				</Route>

				<Route
					path="*"
					element={<NoMatch onCloseModal={() => {}} openModal={true} />}
				/>
			</Routes>
			<Toaster />
			<ToastContainer position="top-right" autoClose={4000} />
		</>
	);
}

export default App;
