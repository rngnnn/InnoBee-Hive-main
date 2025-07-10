import DashboardHeader from "src/components/bee-interface/DashboardHeader";
import useMenuItems from "./ModeratorsMenuItems";
import ModeratorsCard from "./ModeratorsCard";
import { useModeratorsData } from "./ModeratorsContext";
import { Reorder } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import AddModeratorModal from "./AddModeratorModal";
import ManageUserRolesModal from "./ManageUserRolesModal"; // Import the user roles modal

const ManageChallengeModerators = () => {
  const {
    menuItems,
    isAddModeratorModalOpen,
    handleCloseAddModeratorModal,
    isManageUserRolesModalOpen,
    handleCloseManageUserRolesModal,
  } = useMenuItems();
  const { moderatorsData, setModeratorsData } = useModeratorsData();

  return (
    <div>
        <DashboardHeader title="Manage Challenge" menuItems={menuItems} />
      <br />

      <h6 className="font-bold text-lg mt-2">Moderators</h6>

      <p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
        Add and manage moderators for this challenge.
      </p>
      <Reorder.Group
        axis="y"
        values={moderatorsData}
        onReorder={setModeratorsData}
        className="flex flex-col w-full gap-4"
      >
        <AnimatePresence>
          {moderatorsData.map((item) => (
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
              <ModeratorsCard key={item.uuid} item={item} />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>

      <AddModeratorModal
        isOpen={isAddModeratorModalOpen}
        onClose={handleCloseAddModeratorModal}
      />

      <ManageUserRolesModal
        isOpen={isManageUserRolesModalOpen}
        onClose={handleCloseManageUserRolesModal}
      />
      <br /> {/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
      <br /> {/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
    </div>
  );
};

export default ManageChallengeModerators;