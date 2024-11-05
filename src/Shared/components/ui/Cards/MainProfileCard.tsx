import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ProfileNavigationButton from "./ProfileNavigationButton";
import { wordedDate } from "../../../../utils/Functions";

interface MainProfileProps {
  employeeImagePath: string;
  employmentStatus: string;
  rightContent: Array<{ field?: string; value?: string }>;
  leftContent: {
    employeeName: string;
    plantillaPosition: string;
    department: string;
    employeeId: string;
    joinedDate: Date;
  };
}

const profileDefaultSize = "text-sm";
const profileLargeSize = "text-2xl";
const profileDefaultTextColorStyle = "text-accent-600";
const profileSemiboldStyle = "text-accent-700 font-semibold";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-forest-200";
    case "Resigned":
      return "bg-red-600";
    case "For Approval":
      return "bg-yellow-500";
    case "Terminated":
      return "bg-gray-500";
    case "Retired":
      return "bg-blue-500";
    default:
      return "bg-gray-600";
  }
};

const MainProfile: React.FC<MainProfileProps> = ({
  employeeImagePath,
  rightContent,
  leftContent,
  employmentStatus,
}) => {
  return (
  <div className="rounded-sm bg-accent-50 shadow">
    <div className="flex flex-col p-6 md:flex-row">
      {/* Left Side Content */}
      <div className="flex flex-col md:w-1/2 md:flex-row">
        <div className="mb-4 flex-shrink-0 md:mr-4">
          <img src={employeeImagePath || "/src/assets/images/Avatar.png"} alt="Profile" className="mx-auto h-32 w-32 rounded-full"/>
        </div>
        <div className="ml-4 flex flex-col text-center md:text-left">
            <h1 className={`${profileSemiboldStyle} ${profileLargeSize}`}>{leftContent.employeeName}</h1>
          <div className="flex flex-col gap-1 mb-2">
            <p className={`${profileDefaultSize} ${profileDefaultTextColorStyle}`}>{leftContent.plantillaPosition}</p>
            <p className={`${profileDefaultSize} ${profileDefaultTextColorStyle}`}>{leftContent.department}</p>
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <p className={`${profileSemiboldStyle} ${profileDefaultSize}`}>Employee ID: {leftContent.employeeId}</p>
            <p className={`${profileDefaultSize} ${profileDefaultTextColorStyle}`}>Joined Date: {leftContent.joinedDate}</p>
          </div>

          {/* Employee Status*/}
          <div className="mt-1 flex flex-col items-center gap-2 md:flex-row md:items-start">
            <span
              className={`${profileDefaultSize} ${profileDefaultTextColorStyle}`}
              >Employment Status
            </span>
            <div className="flex items-center gap-2">
              <span className={`ml-2 h-2 w-2 rounded-full ${getStatusColor(employmentStatus)}`}></span>
              <span className={`${profileDefaultSize} font-medium`}>{employmentStatus}</span>
              <button className="flex">
                <SettingsIcon fontSize="inherit" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="ml-6 mr-6 hidden border border-dashed border-accent-150 md:block"></div>
      <div className="mb-6 mt-6 block border-t border-dashed border-accent-150 md:hidden"></div>

      {/* Right Side Content */}
      <div className="flex flex-col md:w-1/2 gap-3">
          {rightContent.map((detail, index) => (
            <React.Fragment key={index}>
            <div className="flex gap-2">
              <span className={`${profileDefaultSize} ${profileSemiboldStyle} w-1/2`}>
                {detail.field}
              </span>
              <span className={`${profileDefaultSize} ${profileDefaultTextColorStyle} overflow-wrap break-words w-1/2 `}>
                {detail.value}
              </span>
            </div>
            </React.Fragment>
          ))}
        
      </div>
    </div>

    {/* Buttons */}
    <div className="flex p-2 pl-6 gap-6">
      <ProfileNavigationButton text="Profile"/>
      <ProfileNavigationButton text="Documents"/>
      <ProfileNavigationButton text="Employment History"/>
    </div>
  </div>
  );
};



export default MainProfile;
