import React, { useState, useEffect } from "react";
import ProfileSection from "../../components/ProfileComponent/ProfileSection";
import Switch from "src/components/ui/Switch"; // Assuming Switch component is here
import { Button } from "src/components/buttons/Button"; // Using your custom Button

const CookieSettingsPage = () => {
  const [allCookiesAllowed, setAllCookiesAllowed] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    strictlyNecessary: true, // Always active
    performance: false,
    functional: false,
    targeting: false,
  });

  // Update allCookiesAllowed state when individual preferences change
  useEffect(() => {
    const allOptionalAllowed =
      cookiePreferences.performance && cookiePreferences.functional && cookiePreferences.targeting;
    setAllCookiesAllowed(allOptionalAllowed);
  }, [cookiePreferences]);

  // Toggle all optional cookies
  const toggleAllCookies = () => {
    const newState = !allCookiesAllowed;
    setAllCookiesAllowed(newState);
    setCookiePreferences({
      strictlyNecessary: true, // Strictly necessary are always true
      performance: newState,
      functional: newState,
      targeting: newState,
    });
  };

  // Toggle individual cookie preferences
  const toggleCookiePreference = (key) => {
    // Prevent toggling strictly necessary cookies
    if (key === 'strictlyNecessary') return;

    setCookiePreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Handle the "Confirm My Choice" button click
  const handleConfirmChoice = () => {
    // Here you would typically save these preferences
    // to local storage, a cookie, or send them to a backend
    console.log("Cookie preferences saved:", cookiePreferences);
    // You might also want to show a confirmation message or redirect
    alert("Cookie preferences saved!"); // Simple confirmation
  };


  return (
    <>
      <h4 className="y-3 font-semibold text-xl">Cookie Settings</h4>
      <p className="py-6 text-sm md:text-base">
        We use cookies to enhance your website experience. Cookies store information on your browser to personalize your visit and improve site functionality.
        While some cookies are essential, others help us understand your preferences. You have the right to choose which cookies to allow.
        Please note that blocking certain cookies may affect your experience and the services we can offer.
      </p>
      <ProfileSection
        title={
          <div className="flex items-center justify-between w-full ">
            Manage Cookie Preferences
            <div className="flex items-center">
              <span className="mr-2 text-sm font-semibold">Allow All</span>
              {/* Switch component - assuming it works with checked and onClick/onChange */}
              <Switch checked={allCookiesAllowed} onClick={toggleAllCookies} />
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-6 py-6">
          <div className="flex flex-col gap-4">
            {/* Strictly Necessary Cookies */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="md:w-3/4">
                <h6 className="font-semibold text-base">
                  Strictly Necessary Cookies
                </h6>
                <p className="text-sm text-gray-500 py-1">
                  These cookies are essential for the website to function. They enable core functionalities like security and network management.
                  You cannot disable these cookies.
                </p>
                <p className="text-sm text-gray-500 py-1">
                  They are usually set in response to your actions, such as setting privacy preferences or filling in forms.
                  You can configure your browser to block these cookies, but this may impact site functionality.
                </p>
              </div>
              <div className="flex justify-end md:w-1/4 mt-2 md:mt-0">
                <span className="text-pri-color font-medium text-base">
                  Always Active
                </span>
                 {/* You might add a disabled switch here for consistency */}
                 {/* <Switch checked={true} disabled={true} /> */}
              </div>
            </div>
            <hr className="border-gray-200" />

            {/* Performance Cookies */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="md:w-3/4">
                <h6 className="font-semibold text-base">Performance Cookies</h6>
                <p className="text-sm text-gray-500 py-1">
                  These cookies help us understand how visitors interact with our site by collecting and reporting information anonymously.
                  This allows us to improve the site's performance.
                </p>
                <p className="text-sm text-gray-500 py-1">
                  They track data such as page visits and traffic sources to help us measure and enhance site performance.
                </p>
              </div>
              <div className="flex justify-end md:w-1/4 mt-2 md:mt-0">
                <Switch
                  checked={cookiePreferences.performance}
                  // Pass the key to toggle the correct preference
                  onClick={() => toggleCookiePreference("performance")}
                />
              </div>
            </div>
            <hr className="border-gray-200" />

            {/* Functional Cookies */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="md:w-3/4">
                <h6 className="font-semibold text-base">Functional Cookies</h6>
                <p className="text-sm text-gray-500 py-1">
                  These cookies enable the website to provide enhanced functionality and personalization.
                  They remember your preferences, such as language and region.
                </p>
                <p className="text-sm text-gray-500 py-1">
                  They may be set by us or by third-party providers whose services we've added to our pages. Disabling them might affect some features.
                </p>
              </div>
              <div className="flex justify-end md:w-1/4 mt-2 md:mt-0">
                <Switch
                  checked={cookiePreferences.functional}
                   // Pass the key to toggle the correct preference
                  onClick={() => toggleCookiePreference("functional")}
                />
              </div>
            </div>
            <hr className="border-gray-200" />

            {/* Targeting Cookies */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="md:w-3/4">
                <h6 className="font-semibold text-base">Targeting Cookies</h6>
                <p className="text-sm text-gray-500 py-1">
                  These cookies may be set by our advertising partners to build a profile of your interests.
                  They may use this information to show you relevant ads on other websites.
                </p>
                <p className="text-sm text-gray-500 py-1">
                  They do not directly store personal information but uniquely identify your browser and device. Disabling them will result in less targeted advertising.
                </p>
              </div>
              <div className="flex justify-end md:w-1/4 mt-2 md:mt-0">
                <Switch
                  checked={cookiePreferences.targeting}
                  // Pass the key to toggle the correct preference
                  onClick={() => toggleCookiePreference("targeting")}
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            {/* Refactored Button usage */}
            <Button
              // Removed label prop
              className="w-60 rounded-lg bg-brown hover:bg-pri-color text-white py-2 px-4 text-base font-normal"
              onClick={handleConfirmChoice} // Use the dedicated handler
            >
              {/* Button text as children */}
              Confirm My Choice
            </Button>
          </div>
        </div>
      </ProfileSection>
      <div className= "mb-8"></div>
    </>
  );
};

export default CookieSettingsPage;