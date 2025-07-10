import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "src/components/Loader/Loader";
import Carousel from "src/components/ui/Carousel";
import { slides } from "src/constants/index";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen h-screen w-full">
      <div className="lg:w-[350px] py-6 px-6 flex flex-col items-start w-full box-content overflow-auto hide-scrollbar">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
      <Carousel slides={slides} />
    </div>
  );
}
