import { AnimatePresence, motion } from "framer-motion";
import { useContext, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SideBarContext } from "../../../context/SideBarState";
import Header from "../Header";
import Sidebar from "./Sidebar";
import Loader from "src/components/Loader/Loader";

export default function DashboardLayout({ defaultLinks, customLinks }) {
  const { isSideBarActive, isLargeScreen } = useContext(SideBarContext);
  const { pathname } = useLocation();

  const updatedCustomLinks = {
    ...customLinks,
    "/need-help": [ // Define links for the /need-help route
      { title: "Need Help?", link: "/need-help", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.932 3.374h14.74c1.716 0 2.802-1.874 1.932-3.374L12 15.75m-9.303 3.376c-.866 1.5.217 3.374 1.932 3.374h14.74c1.716 0 2.802-1.874 1.932-3.374L12 15.75" /></svg> }, // Example icon
      // You might not need this here if you handle the main "Need Help?" in defaultLinks
    ],
  };

  const links = (function () {
    const match = Object.keys(updatedCustomLinks).find((link) =>
      pathname.startsWith(link)
    );
    return match ? updatedCustomLinks[match] : defaultLinks;
  })();

  return (
    <div className="relative bg-gray-100 min-h-screen overflow-hidden">
      <Sidebar links={links} />
      <Header showUpgrade={true} />
      <AnimatePresence>
        <motion.main
          initial={{ opacity: 0 }}
          animate={
            isLargeScreen
              ? { paddingLeft: isSideBarActive ? "250px" : "80px", opacity: 1 }
              : { paddingLeft: "80px", opacity: 1 }
          }
        >
          <div className="padding-x w-full h-full">
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}