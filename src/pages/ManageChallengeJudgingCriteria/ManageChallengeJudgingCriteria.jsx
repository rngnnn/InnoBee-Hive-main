import DashboardHeader from "src/components/bee-interface/DashboardHeader";
import useMenuItems from "./JudgingCriteriaMenuItems";
import JudgingCriteriaCard from "./JudgingCriteriaCard";
import { useJudgingCriteriaData } from "./JudgingCriteriaContext";
import { Reorder } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const ManageChallengeJudgingCriteria = () => {
  const menuItems = useMenuItems();
  const { criteriaData, setCriteriaData } = useJudgingCriteriaData();

  return (
    <div>
        <DashboardHeader title="Manage Challenge" menuItems={menuItems} />

      <br />

      <h6 className="font-bold text-lg mt-2">Judging Criteria</h6>
      <p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
      Enter each criterion for judging, its maximum score and its description here. Your judges will use these criteria to score the submissions.
      </p>{" "}
      <Reorder.Group
        axis="y"
        values={criteriaData}
        onReorder={setCriteriaData}
        className="flex flex-col w-full gap-4"
      >
        <AnimatePresence>
          {criteriaData.map((item) => (
            <Reorder.Item
              key={item.uuid}
              value={item}
              initial={{ opacity: 0, x: -500 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 500 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <JudgingCriteriaCard key={item.uuid} item={item} />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
      <br /> {/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
      <br /> {/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
    </div>
  );
};

export default ManageChallengeJudgingCriteria;
