import DashboardHeader from "src/components/bee-interface/DashboardHeader";
import useMenuItems from "./PartnersMenuItems";
import PartnersCard from "./PartnersCard";
import { usePartnersData } from "./PartnersContext";
import { Reorder } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const ManageChallengePartners = () => {
  const menuItems = useMenuItems();
  const { partnersData, setPartnersData } = usePartnersData();

  return (
      <div>
        <DashboardHeader title="Manage Challenge" menuItems={menuItems} />
        <br />

      <h6 className="font-bold text-lg mt-2">Partners</h6>

      <p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
      Enter your challenge partners' information to show on the challenge page.
      </p>{" "}
      <Reorder.Group
        axis="y"
        values={partnersData}
        onReorder={setPartnersData}
        className="flex flex-col w-full gap-4"
      >
        <AnimatePresence>
          {partnersData.map((item) => (
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
              <PartnersCard key={item.uuid} item={item} />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
      <br /> {/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
      <br /> {/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
    </div>
  );
};

export default ManageChallengePartners;
