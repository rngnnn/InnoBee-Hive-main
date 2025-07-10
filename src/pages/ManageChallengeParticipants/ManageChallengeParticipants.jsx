import DashboardHeader from "src/components/bee-interface/DashboardHeader";
import useMenuItems from "./ParticipantsMenuItems";
import ParticipantsCard from "./ParticipantsCard";
import { useParticipantsData } from "./ParticipantsContext";
import { Reorder } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import SelectField from "src/components/ui/SelectField";
import { FilterParticipants } from "../../constants"; // Import FilterParticipants
import countries from "countries-and-timezones"; // Import the countries library

const ManageChallengeParticipants = () => {
  const menuItems = useMenuItems();
  const { participantsData, setParticipantsData } = useParticipantsData();
  const [statusFilter, setStatusFilter] = useState([]);
  const [countryFilter, setCountryFilter] = useState([]);
  const [nameFilter, setNameFilter] = useState("");

  const filterParticipantsOptions = FilterParticipants;

  // Generate country options dynamically
  const filterCountryOptions = Object.keys(countries.getAllCountries()).map(
    (code) => ({
      value: code,
      label: countries.getCountry(code).name,
    })
  );

  const filteredParticipants = participantsData.filter((participant) => {
    const statusMatch = !statusFilter.length || statusFilter.includes(participant?.status);
    const countryMatch = !countryFilter.length || countryFilter.includes(participant?.country);
    const nameMatch = !nameFilter || participant?.name?.toLowerCase().includes(nameFilter.toLowerCase());
    return statusMatch && countryMatch && nameMatch;
  });

  return (
    <div>
        <DashboardHeader title="Manage Challenge" menuItems={menuItems} />
      <br />

      <h6 className="font-bold text-lg mt-2">Participants</h6>

      <p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
        View the list of challenge solvers that are participating in your challenge. You can
        filter participant by country, name, or their participation status and export
        the lists in different formats.
      </p>
      
      <br />

      <div className="flex sm:flex-row flex-col gap-4 mb-4">
        <div className="sm:w-1/3 w-full">
          <SelectField
            label="Filter by Status"
            options={filterParticipantsOptions}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            mode="multiple"
            size="small"
          />
        </div>
        <div className="sm:w-1/3 w-full">
          <SelectField
            label="Filter by Country"
            options={filterCountryOptions}
            value={countryFilter}
            onChange={(value) => setCountryFilter(value)}
            mode="multiple"
            size="small"
          />
        </div>
        <div className="sm:w-1/3 w-full">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Filter by Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-white w-full px-3 py-2 rounded-xl outline-none focus:border-pri-color border-1 text-sm"
            placeholder="Enter name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
      </div>

      <Reorder.Group
        axis="y"
        values={participantsData}
        onReorder={setParticipantsData}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4"
      >
        <AnimatePresence>
          {filteredParticipants.map((item, index) => (
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
              <ParticipantsCard key={item.uuid} item={item} index={index} />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
      <br /> {/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
      <br /> {/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
    </div>
  );
};

export default ManageChallengeParticipants;