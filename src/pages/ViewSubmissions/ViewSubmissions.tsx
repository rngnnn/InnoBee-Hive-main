import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardHeader from "src/components/bee-interface/DashboardHeader";
import SubmissionCard from "src/components/Submission/SubmissionCard2";
import Filters from "./Filters";
import usePageState from "./usePageState";
import { submission } from "src/constants";

interface SubmissionType {
  id: number;
  logo: string;
  challengeImg: string;
  title: string;
  companyName: string;
  description: string;
  score: number;
}

export default function ViewSubmissions() {
  const navigate = useNavigate();
  const { challengeId } = useParams();

  const challengeIdResolved = Number(challengeId);

  const invalidId = isNaN(challengeIdResolved);
  useEffect(() => {
    if (invalidId) {
      navigate("/my-challenges");
    }
  }, [invalidId, navigate]);

  if (invalidId) {
    return null;
  }

  return <Page challengeId={challengeIdResolved} />;
}

function Page({ challengeId }: { challengeId: number }) {
  const { menuItems, filtersState } = usePageState(challengeId);

  const challengeName =
    "P&G Expiration Date Elongation For Dairy Products Challenge"; // TODO: this needs to be fetched from backend according to the route param (id?)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="w-full">
          <DashboardHeader
            goBackLink={`/my-challenges`}
            title="View Submissions"
            menuItems={menuItems}
          />
          <p className="py-6">
            Preview submissions for <strong>{challengeName}</strong>
          </p>
          <Filters filtersState={filtersState} />
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 py-8">
            {submission.map((submission: SubmissionType, index: number) => (
              <SubmissionCard
                key={submission.id}
                submission={submission}
                index={index}
              />
            ))}
          </div>
          <div className="flex-center justify-center">
            <button className="px-6 py-1 rounded-full border-1 border-brown hover:font-semibold transition-all">
              Load more
            </button>
          </div>
          <div className="mb-8"></div>{" "}
          {/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
