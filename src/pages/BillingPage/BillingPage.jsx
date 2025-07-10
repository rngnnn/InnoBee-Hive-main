import { useRef, useState, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";
import ProfileSection from "../../components/ProfileComponent/ProfileSection";
import { countries } from "../../constants"; // Assuming countries is an array like [{ value: 'US', label: 'United States' }, ...]
import { Button } from "../../components/buttons/Button"; // Using your custom Button
import { FiTrash2 } from "react-icons/fi";

const BillingPage = () => {
  const dropdownRef = useRef(null); // Seems unused in the provided code block
  const [selectedCountry, setSelectedCountry] = useState(null); // Seems unused in the provided code block
  const [isOpen, setIsOpen] = useState(false); // Seems unused in the provided code block
  const [redeemCode, setRedeemCode] = useState("");
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemSuccessMessage, setRedeemSuccessMessage] = useState("");
  const [redeemErrorMessage, setRedeemErrorMessage] = useState("");
  const [currentPlan, setCurrentPlan] = useState({ name: "Free" }); // Mock plan data
  const [isChangingPlan, setIsChangingPlan] = useState(false); // Placeholder for change plan logic
  const [planDetails, setPlanDetails] = useState(null); // Placeholder for plan details

  // State and functions for Tax ID section (similar to Social Links)
  const [taxIDs, setTaxIDs] = useState([]);
  const [currentTaxId, setCurrentTaxId] = useState({ country: null, taxId: '' });
  const taxIdCountryDropdownRef = useRef(null);
  const [isTaxIdCountryOpen, setIsTaxIdCountryOpen] = useState(false);
  const [taxIDsLoading, setTaxIDsLoading] = useState(false);
  const [taxIDsSuccessMessage, setTaxIDsSuccessMessage] = useState("");
  const [taxIDsErrorMessage, setTaxIDsErrorMessage] = useState("");

  useEffect(() => {
    // Simulate fetching initial data (current plan, existing tax IDs)
    const fetchInitialData = async () => {
      // Mock fetching current plan
      setTimeout(() => {
        setCurrentPlan({ name: "Premium", billingCycle: "Monthly", features: ["Feature 1", "Feature 2"] });
      }, 500);

      // Mock fetching existing tax IDs
      setTimeout(() => {
        setTaxIDs([
          { country: "United States", taxId: "12-3456789" },
          // Add more mock tax IDs if needed
        ]);
      }, 800);
    };

    fetchInitialData();
  }, []);

   // Effect to close the country dropdown when clicking outside
   useEffect(() => {
    const handleOutsideClick = (event) => {
      if (taxIdCountryDropdownRef.current && !taxIdCountryDropdownRef.current.contains(event.target)) {
        setIsTaxIdCountryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [taxIdCountryDropdownRef]);


  const handleTaxIdCountryClick = (country) => {
    setCurrentTaxId(prev => ({ ...prev, country }));
    setIsTaxIdCountryOpen(false);
  };

  const toggleTaxIdCountryDropdown = () => {
    setIsTaxIdCountryOpen(!isTaxIdCountryOpen);
  };

  const handleTaxIdNumberChange = (event) => {
    setCurrentTaxId(prev => ({ ...prev, taxId: event.target.value }));
  };

  const handleRemoveTaxId = (index) => {
    setTaxIDs(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveTaxIdChanges = () => {
    if (taxIDsLoading) return;
    setTaxIDsLoading(true);
    setTaxIDsSuccessMessage("");
    setTaxIDsErrorMessage("");

    // Basic client-side validation
    if (!currentTaxId.country || !currentTaxId.taxId) {
      setTaxIDsErrorMessage("Please select a country and enter a Tax ID to add.");
      setTaxIDsLoading(false);
      return;
    }

     // Check if the tax ID already exists for the selected country
     const existingTaxId = taxIDs.find(item => item.country === currentTaxId.country && item.taxId === currentTaxId.taxId);
     if (existingTaxId) {
        setTaxIDsErrorMessage(`Tax ID "${currentTaxId.taxId}" for ${currentTaxId.country} already exists.`);
        setTaxIDsLoading(false);
        return;
     }


    // Add the current tax ID to the list
    const updatedTaxIDs = [...taxIDs, currentTaxId];
    setTaxIDs(updatedTaxIDs); // Optimistically update UI

    // Simulate API call to save tax IDs
    setTimeout(() => {
      // Mock success or failure
      const success = true; // Simulate success for demonstration

      if (success) {
        setTaxIDsSuccessMessage("Tax ID information saved successfully!");
        // In a real application, you might want to reset the form only after API success
        setCurrentTaxId({ country: null, taxId: '' });
      } else {
        setTaxIDsErrorMessage("Failed to save Tax ID information.");
        // If save fails, you might revert the optimistic update or refetch
        // setTaxIDs(prevTaxIDs); // Revert to previous state
      }
      setTaxIDsLoading(false);
    }, 1500);
  };

  // Functions for Current Plan Section
  const handleChangePlanClick = () => {
    setIsChangingPlan(true);
    // In a real application, you would navigate to the plan change page or show a modal.
    console.log("Navigating to Change Plan (Placeholder)");
    // Simulate action completion
    setTimeout(() => setIsChangingPlan(false), 1000);
  };

  const handleSeeDetailsClick = () => {
    setPlanDetails({ name: currentPlan.name, billingCycle: currentPlan.billingCycle, features: currentPlan.features });
    // In a real application, you would show more detailed plan information.
    console.log(`Plan Details: Name - ${currentPlan.name}, Cycle - ${currentPlan.billingCycle}, Features - ${currentPlan.features.join(", ")} (Placeholder)`);
    // Simulate modal/details view closing
    setTimeout(() => setPlanDetails(null), 2000);
  };

  // Functions for Redeem Codes Section
  const handleRedeemCodeChange = (event) => {
    setRedeemCode(event.target.value);
    setRedeemSuccessMessage("");
    setRedeemErrorMessage("");
  };

  const handleRedeemClick = () => {
    if (redeemLoading) return;
    setRedeemLoading(true);
    setRedeemSuccessMessage("");
    setRedeemErrorMessage("");

    // Basic client-side validation
    if (!redeemCode.trim()) {
      setRedeemErrorMessage("Please enter a redeem code.");
      setRedeemLoading(false);
      return;
    }

    // Simulate API call to redeem code
    setTimeout(() => {
      // Mock success or failure based on the code
      if (redeemCode.trim().toUpperCase() === "VALID_CODE") { // Added trim and toUpperCase for robustness
        setRedeemSuccessMessage("Redeem code applied successfully!");
        setRedeemCode("");
      } else {
        setRedeemErrorMessage("Invalid redeem code.");
      }
      setRedeemLoading(false);
    }, 1000);
  };

  return (
    <>
      <h4 className="y-3 font-semibold text-xl">Billing & Plans</h4>
      <p className="py-6">
        Upgrade your account, access your payment and tax information and get exclusive rewards with your redeem codes.
      </p>
      <div className="pt-4 gap-4 pb-8">
        <ProfileSection title="Current Plan">
          <div className="max-w-[600px] w-full">
            <div className="flex w-full flex-col my-4">
              <div className="md:w-full w-full flex flex-col">
                <p className="text-gray-700 space-y-2 pb-4">
                  Take your innovation to the next level by choosing a plan that fits
                </p>
                <p className="font-semibold text-gray-700 space-y-2 pb-8">
                  Your current plan: {currentPlan.name}
                </p>
                {/* These are native buttons, already using children */}
                <div className="md:w-full w-full flex flex-col md:flex-row gap-4">
                  <button
                    onClick={handleChangePlanClick}
                    disabled={isChangingPlan}
                    className={`bg-brown hover:bg-pri-color text-white py-2 rounded-lg w-full md:w-60 ${isChangingPlan ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isChangingPlan ? "Changing..." : "Change Plan"}
                  </button>
                  <button
                    onClick={handleSeeDetailsClick}
                    className= "hover:text-white bg-white text-brown py-2 rounded-lg hover:bg-brown border border-brown w-full md:w-60">
                    See details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ProfileSection>

        <br />

        <ProfileSection title="Redeem Codes">
          <div className="max-w-[600px] w-full">
            <div className="flex w-full flex-col my-4">
              <div className="md:w-full w-full flex flex-col">
                <p className="text-gray-700 space-y-2 pb-8">
                  Get exclusive rewards, discounts, and more!
                </p>
                <div className="md:w-full w-full flex flex-col md:flex-row gap-4 items-start md:items-center"> {/* Added alignment */}
                  <input
                    type="text"
                    placeholder="Enter your code"
                    value={redeemCode}
                    onChange={handleRedeemCodeChange}
                    // Adjust width for responsiveness if needed
                    className="w-full md:w-[28rem] h-10 focus:border-1 focus:border-pri-color bg-white shadow-md rounded-lg px-4 outline-none text-gray-700"
                  />
                   {/* Refactored Redeem Button */}
                  <Button
                    onClick={handleRedeemClick}
                    disabled={redeemLoading}
                    className="bg-brown hover:bg-pri-color text-white py-2 rounded-lg w-full md:w-60" // Made button full width on small screens
                  >
                    {/* Text as children, dynamic based on loading state */}
                    {redeemLoading ? "Redeeming..." : "Redeem"}
                  </Button>
                </div>
                {redeemSuccessMessage && <p className="text-green-500 mt-2">{redeemSuccessMessage}</p>} {/* Added margin-top */}
                {redeemErrorMessage && <p className="text-red-500 mt-2">{redeemErrorMessage}</p>} {/* Added margin-top */}
              </div>
            </div>
          </div>
        </ProfileSection>

        <br />

        <ProfileSection title="Tax ID">
          <div className="max-w-[700px] w-full">
            <div className="flex flex-col gap-4 my-4">
              <p className="text-gray-700 space-y-2 pb-8">
                Enter this information if you are a tax-exempt organization. Only
                supported countries are shown.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <label htmlFor="add-tax-id" className="font-semibold">
                  Add Tax ID:
                </label>
                 {/* Country Dropdown - existing implementation */}
                <div className="relative w-full md:w-auto md:min-w-[18rem]" ref={taxIdCountryDropdownRef}>
                  <button
                    onClick={toggleTaxIdCountryDropdown}
                    type="button"
                    className="w-full h-10 focus:border-1 focus:border-pri-color bg-white shadow-md rounded-lg px-4 outline-none flex items-center justify-between text-gray-700" // Corrected flex-center-between
                  >
                    <p>
                      {currentTaxId.country ? currentTaxId.country : "Select Country"}
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-gray-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {isTaxIdCountryOpen && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-0 w-full mt-1 origin-top-right bg-white border-1 border-gray-200 rounded-lg shadow-lg z-10"
                      >
                        <div className="max-h-36 overflow-y-auto">
                          <ul className="py-1 w-full">
                            {countries.map((option) => (
                              <li key={option.value} className="w-full">
                                <button
                                  onClick={() => handleTaxIdCountryClick(option.label)}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                >
                                  {option.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
                 {/* Tax ID Input */}
                <input
                  type="text"
                  placeholder="Enter Tax ID"
                  value={currentTaxId.taxId}
                  onChange={handleTaxIdNumberChange}
                  // Adjust width for responsiveness if needed
                  className="w-full md:w-auto md:min-w-[18rem] h-10 focus:border-1 focus:border-pri-color bg-white shadow-md rounded-lg px-4 outline-none text-gray-700"
                  id="add-tax-id"
                />
              </div>

              {/* Display Added Tax IDs */}
              {taxIDs.map((taxIdEntry, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-grow flex flex-col"> {/* Added flex-col */}
                    <div className="flex items-center gap-2">
                      <label className="font-semibold text-sm">Country:</label>
                      <p className="text-gray-700">{taxIdEntry.country}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="font-semibold text-sm">Tax ID:</label>
                      <p className="text-gray-700">{taxIdEntry.taxId}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveTaxId(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none align-middle"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}

              {taxIDsSuccessMessage && <p className="text-green-500">{taxIDsSuccessMessage}</p>}
              {taxIDsErrorMessage && <p className="text-red-500">{taxIDsErrorMessage}</p>}

              {/* Save Changes Button */}
              <div className="mt-8">
                {/* Refactored Save Changes Button */}
                <Button
                  className={`bg-brown hover:bg-pri-color text-white py-2 rounded-lg w-full md:w-60 ${taxIDsLoading ? 'opacity-50 cursor-not-allowed' : ''}`} // Made button full width on small screens
                  onClick={handleSaveTaxIdChanges}
                  disabled={taxIDsLoading}
                >
                  {/* Text as children, dynamic based on loading state */}
                  {taxIDsLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </ProfileSection>
      </div>
       <div className= "mb-8"></div> {/* Added closing div tag */}
    </>
  );
};

export default BillingPage;