import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import DashboardHeader from "../components/content/DashboardHeader";
import DashboardSidebar from "../components/content/DashboardSidebar";
import ModalBase from "../components/modals/ModalBase";
import { ModalContextProvider } from "../context/ModalContext";

const DashboardLayout: React.FC = () => {
  const [isMobile, isMobileScreen] = useState<boolean>(true);
  const [navbarStatus, setNavbarStatus] = useState<boolean>(false);

  const updateNavbarStatus = () => {
    setNavbarStatus(!navbarStatus);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleScreenChange = () => {
      if (!mediaQuery.matches) {
        isMobileScreen(true);
        setNavbarStatus(false);
      } else {
        isMobileScreen(false);
        setNavbarStatus(true);
      }
    };

    handleScreenChange();

    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  return (
    <>
      <ModalContextProvider>
        <div className="flex h-screen flex-col overflow-hidden bg-accent-100">
          <ModalBase />
          <DashboardHeader updateNavbarStatus={updateNavbarStatus} />
          <div className="relative flex flex-1 overflow-hidden">
            <DashboardSidebar
              isMobileScreen={isMobile}
              isNavbarOpen={navbarStatus}
              updateNavbarStatus={updateNavbarStatus}
            />
            <div className="flex-1 overflow-y-auto p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </ModalContextProvider>
    </>
  );
};

export default DashboardLayout;
