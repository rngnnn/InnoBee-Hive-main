import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import ChallengeNavbar from "src/components/ChallengeComponent/ChallengeNavbar";
import Loader from "src/components/Loader/Loader";

// TODO: Discuss how buttonTitle and buttonLink props are filled, and change depending on page
export default function CorporateGrayLayout() {
  return (
    <div className="w-full relative min-h-screen bg-gray-100">
      <ChallengeNavbar buttonTitle="Start for free" buttonLink="/overview" />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
