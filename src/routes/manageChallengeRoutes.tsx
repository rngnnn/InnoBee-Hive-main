import { Route } from 'react-router-dom';
import { lazy } from 'react';

import ManageChallengeLayout from '../components/layouts/manage-challenge/ManageChallengeLayout';
import PrivateRoute from '../components/PrivateRoute';

const ManageChallengeOverview = lazy(() => import('../pages/ManageChallengeOverview/ManageChallengeOverview'));
const Guidelines = lazy(() => import('../pages/ManageChallengeGuidelines/Guidelines'));
const Faq = lazy(() => import('../pages/ManageChallengeFaq/Faq'));
const ManageChallengePressPage = lazy(() => import('../pages/ManageChallengePress/ManageChallengePress'));
const ManageChallengeUpdates = lazy(() => import('../pages/ManageChallengeUpdates/ManageChallengeUpdates'));
const ManageChallengeLegalAgreement = lazy(() => import('../pages/ManageChallengeLegalAgreement/ManageChallengeLegalAgreement'));
const ManageChallengeJudgesNDA = lazy(() => import('../pages/ManageChallengeNDA/ManageChallengeJudgesNDA'));
// const Performance = lazy(() => import('../pages/ManageChallengePerformance/Performance'));

const Performance = lazy(() => import('../pages/ManageChallengePerformance/ManageChallengePerformance'));
const ManageChallengeNotifications = lazy(() => import('../pages/ManageChallengeSendNotifications/ManageChallengeSendNotifications'));
const ManageChallengePartners = lazy(() => import('../pages/ManageChallengePartners/ManageChallengePartners'));
const ManageChallengeSettings = lazy(() => import('../pages/ManageChallengeSettings/ManageChallengeSettings'));
const JudgingActivity = lazy(() => import('../pages/ManageChallengeJudgingActivity/JudgingActivity'));
const ManageChallengeJudges = lazy(() => import('../pages/ManageChallengeJudges/ManageChallengeJudges'));
const ManageChallengeModerators = lazy(() => import('../pages/ManageChallengeModerator/ManageChallengeModerators'));
const ManageChallengeParticipants = lazy(() => import('../pages/ManageChallengeParticipants/ManageChallengeParticipants'));
const ManageChallengeTimelines = lazy(() => import('../pages/ManageChallengeTimelines/ManageChallengeTimelines'));
const ManageChallengeSubmissionForm = lazy(() => import('../pages/ManageChallengeSubmissionForm/ManageChallengeSubmissionForm'));
const ManageChallengeJudgingCriteria = lazy(() => import('../pages/ManageChallengeJudgingCriteria/ManageChallengeJudgingCriteria'));

import { JudgesProvider } from '../pages/ManageChallengeJudges/JudgesContext';
import { ParticipantsProvider } from '../pages/ManageChallengeParticipants/ParticipantsContext';
import { FaqProvider } from '../pages/ManageChallengeFaq/FaqProvider';
import { PartnersProvider } from '../pages/ManageChallengePartners/PartnersContext';
import { ModeratorsProvider } from '../pages/ManageChallengeModerator/ModeratorsContext';
import { TimelineProvider } from '../pages/ManageChallengeTimelines/TimelineContext';
import { JudgingCriteriaProvider } from '../pages/ManageChallengeJudgingCriteria/JudgingCriteriaContext';

const manageChallengeRoutes = (
  <Route
    element={
      <PrivateRoute>
        <ManageChallengeLayout />
      </PrivateRoute>
    }
  >
    <Route path="/manage-challenge/overview" element={<ManageChallengeOverview />} />
    <Route path="/manage-challenge/guidelines" element={<Guidelines />} />
    <Route path="/manage-challenge/faq" element={
      <FaqProvider>
        <Faq />
      </FaqProvider>
    } />
    <Route path="/manage-challenge/press" element={<ManageChallengePressPage />} />
    <Route path="/manage-challenge/updates" element={<ManageChallengeUpdates />} />
    <Route path="/manage-challenge/legal-agreement" element={<ManageChallengeLegalAgreement />} />
    <Route path="/manage-challenge/NDA" element={<ManageChallengeJudgesNDA />} />
    {/* <Route path="/manage-challenge/Performance" element={<Performance />} /> */}
    <Route path="/manage-challenge/send-notification" element={<ManageChallengeNotifications />} />
    <Route path="/manage-challenge/partners" element={
      <PartnersProvider>
        <ManageChallengePartners />
      </PartnersProvider>
    } />
    <Route path="/manage-challenge/settings" element={<ManageChallengeSettings />} />
    <Route path="/manage-challenge/judging-activity" element={<JudgingActivity />} />
    <Route path="/manage-challenge/judges" element={
      <JudgesProvider>
        <ManageChallengeJudges />
      </JudgesProvider>
    } />
    <Route path="/manage-challenge/moderators" element={
      <ModeratorsProvider>
        <ManageChallengeModerators />
      </ModeratorsProvider>
    } />
    <Route path="/manage-challenge/participants" element={
      <ParticipantsProvider>
        <ManageChallengeParticipants />
      </ParticipantsProvider>
    } />
    <Route path="/manage-challenge/timelines" element={
      <TimelineProvider>
        <ManageChallengeTimelines />
      </TimelineProvider>
    } />
    <Route path="/manage-challenge/submission-form" element={<ManageChallengeSubmissionForm />} />
    <Route path="/manage-challenge/judging-criteria" element={
      <JudgingCriteriaProvider>
        <ManageChallengeJudgingCriteria />
      </JudgingCriteriaProvider>
    } />
  </Route>
);

export default manageChallengeRoutes;
