import React from "react";
import DefaultButton from "../button/DefaultButton";
import SettingsIcon from "@mui/icons-material/Settings";
import { SvgIconComponent } from "@mui/icons-material";

interface ProfileProps {
  employeeName: string;
  plantillaPosition: string;
  department: string;
  employeeId: string;
  joinedDate: string;
  employmentStatus: string;
  phoneNumber: string;
  email: string;
  birthday: string;
  address: string;
  gender: string;
  reportsTo: string;
  imagePath?: string;
  employeeStatusIcon: SvgIconComponent;
}

const MainProfile: React.FC<ProfileProps> = ({
  employeeName,
  plantillaPosition,
  department,
  employeeId,
  joinedDate,
  employmentStatus,
  phoneNumber,
  email,
  birthday,
  address,
  gender,
  reportsTo,
  imagePath,
}) => {
  //Styles
  const profileTextSize = "text-xs";
  const profileTextColor = "text-accent-600";
  const profileTitleColor = "text-accent-700 font-semibold";

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

  return (
    <div className="flex flex-col rounded-sm bg-accent-50 p-6 shadow md:flex-row">
      {/* Left Side Content */}
      <div className="flex flex-col md:w-1/2 md:flex-row">
        <div className="mb-4 flex-shrink-0 md:mr-4">
          <img
            src={imagePath || "/src/assets/images/Avatar.png"}
            alt="Profile"
            className="mx-auto h-32 w-32 rounded-full"
          />
        </div>
        <div className="flex flex-col text-center md:mx-4 md:text-left">
          <h1 className={`${profileTitleColor} mb-1 text-2xl`}>
            {employeeName}
          </h1>
          <div className="mb-2 flex flex-col gap-1">
            <p className={`${profileTextSize} ${profileTextColor}`}>
              {plantillaPosition}
            </p>
            <p className={`${profileTextSize} ${profileTextColor}`}>
              {department}
            </p>
          </div>
          <div className="mb-2 flex flex-col gap-1">
            <p className={`${profileTitleColor} ${profileTextSize}`}>
              Employee ID: {employeeId}
            </p>
            <p className={`${profileTextSize} ${profileTextColor}`}>
              Joined Date: {joinedDate}
            </p>
          </div>
          {/* Employment Status */}
          <div className="flex flex-col items-center gap-1 md:flex-row md:items-start">
            <span className={`${profileTextColor} ${profileTextSize}`}>
              Employment Status
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`ml-2 h-2 w-2 rounded-full ${getStatusColor(employmentStatus)}`}
              ></span>
              <span className={`${profileTextSize} font-medium`}>
                {employmentStatus}
              </span>
              <button className="flex">
                <SettingsIcon style={{ fontSize: "12px" }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="ml-6 mr-6 hidden border border-dashed border-accent-150 md:block"></div>
      <div className="mb-6 mt-6 block border-t border-dashed border-accent-150 md:hidden"></div>

      {/* Right Side Content */}
      <div className="flex flex-col md:w-1/2">
        <div className="grid grid-cols-2 gap-3">
          <span className={`${profileTitleColor} ${profileTextSize}`}>
            Phone Number:
          </span>
          <span className={`${profileTextSize} ${profileTextColor}`}>
            {phoneNumber}
          </span>

          <span className={`${profileTitleColor} ${profileTextSize}`}>
            Email:
          </span>
          <span className={`${profileTextSize} ${profileTextColor}`}>
            {email}
          </span>

          <span className={`${profileTitleColor} ${profileTextSize}`}>
            Birthday:
          </span>
          <span className={`${profileTextSize} ${profileTextColor}`}>
            {birthday}
          </span>

          <span className={`${profileTitleColor} ${profileTextSize}`}>
            Address:
          </span>
          <span className={`${profileTextSize} ${profileTextColor}`}>
            {address}
          </span>

          <span className={`${profileTitleColor} ${profileTextSize}`}>
            Gender:
          </span>
          <span className={`${profileTextSize} ${profileTextColor}`}>
            {gender}
          </span>

          <span className={`${profileTitleColor} ${profileTextSize}`}>
            Reports To:
          </span>
          <span className={`${profileTextSize} ${profileTextColor}`}>
            {reportsTo}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
