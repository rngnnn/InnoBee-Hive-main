import useChallengeData from "./useChallengeData";
import useMenuItems from "./useMenuItems";

export default function usePageState(
challengeId: number, submissionId: number, userRole: string) {
  const challengeData = useChallengeData(challengeId);
  const submissionData = useChallengeData(submissionId);

  const menuItems = useMenuItems();

  return { challengeData, submissionData, menuItems };
}
