import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import PCCLogo from "/PCCLogo.png";

import Avatar from "../../assets/images/Avatar.jpg";

interface Props {
  updateNavbarStatus: () => void;
}

const DashboardHeader: React.FC<Props> = ({ updateNavbarStatus }) => {
  return (
    <>
      <header className="relative flex h-navbar shrink-0 items-center justify-center bg-gradient-to-r from-[#329D4D] to-[#45C465]">
        <div className="absolute flex items-center gap-3 lg:left-6">
          <img
            src={PCCLogo}
            alt="PCC Logo"
            className="h-[3.125rem] w-[3.125rem]"
          />

          <h2 className="text-xl font-medium text-accent-50">PCC - HRIS</h2>
        </div>

        <div className="flex w-full items-center justify-between max-lg:mx-6 lg:ml-sidebar-padding lg:mr-6">
          {/* Hamburger Button */}
          <button onClick={updateNavbarStatus}>
            <MenuIcon className="text-accent-50" />
          </button>

          <div className="flex items-center gap-5 max-lg:hidden">
            {/* Notification Button */}
            <button>
              <NotificationsIcon className="text-accent-50" />
            </button>

            {/* Profile Button */}
            <button className="flex items-center justify-center">
              <div className="mr-3 max-h-10 max-w-10 overflow-hidden rounded-full">
                <img src={Avatar} alt="" className="object-scale-down" />
              </div>

              <span className="mr-1 font-medium text-accent-50">
                Alisa Leiza Doe
              </span>

              <KeyboardArrowDownIcon className="text-accent-50" />
            </button>
          </div>
          <button className="lg:hidden">
            <MoreVertIcon className="text-accent-50" />
          </button>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;
