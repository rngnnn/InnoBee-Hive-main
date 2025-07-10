import React, { useContext, useEffect, useState } from "react";
import Joyride from "react-joyride";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { SideBarContext } from "../../context/SideBarState";
import { useMediaQuery } from "react-responsive";
import { welcomeTourStepsMobile } from "./TourStepsMobile";
import { welcomeTourSteps } from "./TourSteps";
import CustomTooltip from "./CustomToolTip";

const WelcomeOnboardingPopups = () => {
  const [runJoyride, setRunJoyride] = useState(false);
  const { setIsSideBarActive } = useContext(SideBarContext);
  const { getItem, setItem } = useLocalStorage("hasSeenTour");
  const hasSeenTour = getItem();
  const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 576px) and (max-width: 1280px)",
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      setRunJoyride(true);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  const getTourSteps = () => {
    if (isMobile) {
      return welcomeTourStepsMobile;
    } else if (isTablet) {
      return welcomeTourSteps.slice(0, 4);
    } else {
      return welcomeTourSteps;
    }
  };

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if (!hasSeenTour) {
      setIsSideBarActive(true);
    }
    const finishedStatuses = ["finished", "skipped"];
    if (finishedStatuses.includes(status)) {
      setItem("true");
      setIsSideBarActive(false);
    }
  };
  return (
    <div>
      <Joyride
        run={runJoyride && !hasSeenTour}
        steps={getTourSteps()}
        continuous
        showSkipButton
        callback={handleJoyrideCallback}
        tooltipComponent={CustomTooltip}
        disableCloseOnEsc
        disableOverlayClose
        spotlightPadding={0}
        scrollDuration={10}
      />
    </div>
  );
};

export default WelcomeOnboardingPopups;
