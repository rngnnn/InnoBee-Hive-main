import { Suspense, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NeedHelpSidebar from "./NeedHelpSidebar";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import { SideBarContext } from "../../../context/SideBarState";
import Loader from "src/components/Loader/Loader";

export default function NeedHelpLayout() {
  const { isSideBarActive, isLargeScreen } = useContext(SideBarContext);

  return (
    <main className="relative bg-gray-100 min-h-screen ">
      <NeedHelpSidebar />
      <Header showUpgrade={false} />
      <AnimatePresence>
        <motion.main
          initial={{ paddingLeft: "0" }}
          animate={
            isLargeScreen
              ? { paddingLeft: isSideBarActive ? "250px" : "80px" }
              : { paddingLeft: "80px" }
          }
        >
          <div className="padding-x w-full h-full">
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </motion.main>
      </AnimatePresence>
    </main>
  );
}