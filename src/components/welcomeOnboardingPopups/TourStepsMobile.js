import Bee from "../../assets/images/bee-popups.png";

export const welcomeTourStepsMobile = [
  {
    target: ".centered-popup-target",
    title: "Welcome onboard NewBee!",
    customClass: "w-[350px] h-auto p-4",
    content:
      "We're thrilled to have you here! Let's </br> get you started with the basics.",
    disableBeacon: true,
    nextButton: "Let's go!",
    image: Bee,
    placement: "center",

    floaterProps: {
      hideArrow: true,
    },
  },
  {
    target: ".profile-img",
    title: "Why not add a profile picture?",
    content:
      "Edit your account settings, public profile, and privacy </br> settings from here.",
    nextButton: "Next",
    customClass: " w-[350px] p-4",
    disableParentScroll: true,
    disableScrolling: true,
    styles: {
      options: {
        arrowColor: "#FFB000 ",
      },
      spotlight: {
        borderRadius: "25px",
      },
    },
  },
  {
    target: ".getting-started-btn",
    title: "Limitless power to Bee Innovative!",
    content:
      "Click on the Get Started button to use the wizard for your </br> innovative efforts.",
    customClass: "ml-6 p-4",
    nextButton: "Next",
    spotlightPadding: -1,
    styles: {
      options: {
        arrowColor: "#FFB000 ",
      },
      spotlight: {
        borderRadius: "8px",
      },
    },
  },
  {
    target: ".siderbar-popup-mobile",
    customArrow: true,
    title: "Start your journey of innovation",
    content:
      "Use this panel to launch, explore, solve, or judge innovative challenges.",

    nextButton: "Finish",
    placement: "top-end",
    spotlightPadding: 238,
    customClass: " w-[300px] h-42 p-4 mt-52 ml-14 ",
    floaterProps: {
      hideArrow: true,
    },
  },
];
