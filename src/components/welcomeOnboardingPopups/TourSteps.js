import Bee from "../../assets/images/bee-popups.png";

export const welcomeTourSteps = [
  {
    target: ".centered-popup-target",
    title: "Welcome onboard NewBee!",
    customClass: "w-[435px] h-[260px] ",
    content:
      "We're thrilled to have you here! Let's </br> get you started with the basics.",
    disableBeacon: true,
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
    customClass: "mr-10",
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
    customClass: "mr-16 2xl:mr-10",
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
    target: ".sidebar",
    customArrow: true,
    title: "Start your journey of innovation",
    content:
      "Use this panel to launch, explore, solve, or judge innovative </br> challenges.",

    placement: "right",
    spotlightPadding: 23,
    customClass: "ml-8",
    floaterProps: {
      hideArrow: true,
    },
  },

  {
    target: ".look-around",
    title: "Wanna buzz around more?",
    content:
      "Click on this button to learn more about the dashboard </br> features. You can also ask questions from InnoBee Queen,</br> your artificial intelligence innovation assistant (AIIA).",
    nextButton: "Got it!",
    customClass: "mr-[210px]",
    styles: {
      options: {
        arrowColor: "#FFB000 ",
      },
      spotlight: {
        borderRadius: "25px",
      },
    },
    spotlightPadding: -1,
  },
];
