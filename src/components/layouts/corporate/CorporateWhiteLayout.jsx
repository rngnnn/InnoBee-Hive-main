import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import ChallengeNavbar from "src/components/ChallengeComponent/ChallengeNavbar";
import Loader from "src/components/Loader/Loader";

// TODO: Discuss how buttonTitle and buttonLink props are filled, and change depending on page
export default function CorporateWhiteLayout() {
  return (
    <div className="w-full relative min-h-screen bg-white">
      <ChallengeNavbar buttonTitle="My Dashboard" buttonLink="/overview" />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>{" "}
    </div>
  );
}
