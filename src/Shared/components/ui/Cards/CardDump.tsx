import React from "react";
import DefaultButton from "../../../Shared/components/ui/button/DefaultButton";
import SettingsIcon from '@mui/icons-material/Settings';
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
const profileTitleColor= "text-accent-700 font-semibold"

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
        <div className="flex-shrink-0 mb-4 md:mr-4">
          <img
            src={imagePath || "/src/assets/images/Avatar.png"}
            alt="Profile"
            className="h-32 w-32 rounded-full mx-auto"
          />
        </div>
        <div className="flex flex-col text-center md:text-left md:mx-4">
          <h1 className={`${profileTitleColor} text-2xl mb-1`}>{employeeName}</h1>
          <div className="flex flex-col gap-1 mb-2">
            <p className={`${profileTextSize} ${profileTextColor}`}>{plantillaPosition}</p>
            <p className={`${profileTextSize} ${profileTextColor}`}>{department}</p>
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <p className={`${profileTitleColor} ${profileTextSize}`}>Employee ID: {employeeId}</p>
            <p className={`${profileTextSize} ${profileTextColor}`}>Joined Date: {joinedDate}</p>
          </div>
          {/* Employment Status */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-1">
            <span className={`${profileTextColor} ${profileTextSize}`}>Employment Status</span>
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 ml-2 rounded-full ${getStatusColor(employmentStatus)}`}></span>
              <span className={`${profileTextSize} font-medium`}>{employmentStatus}</span>
              <button className="flex"><SettingsIcon style={{fontSize: '12px'}} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className=" hidden md:block border border-dashed  border-accent-150 mr-6 ml-6"></div>
      <div className=" block md:hidden border-t border-dashed  border-accent-150 mb-6 mt-6"></div>

      {/* Right Side Content */}
      <div className="flex flex-col md:w-1/2">
        <div className="grid grid-cols-2 gap-3">
          <span className={`${profileTitleColor} ${profileTextSize}`}>Phone Number:</span>
          <span className={`${profileTextSize} ${profileTextColor}`}>{phoneNumber}</span>
          
          <span className={`${profileTitleColor} ${profileTextSize}`}>Email:</span>
          <span className={`${profileTextSize} ${profileTextColor}`}>{email}</span>
          
          <span className={`${profileTitleColor} ${profileTextSize}`}>Birthday:</span>
          <span className={`${profileTextSize} ${profileTextColor}`}>{birthday}</span>
          
          <span className={`${profileTitleColor} ${profileTextSize}`}>Address:</span>
          <span className={`${profileTextSize} ${profileTextColor}`}>{address}</span>
          
          <span className={`${profileTitleColor} ${profileTextSize}`}>Gender:</span>
          <span className={`${profileTextSize} ${profileTextColor}`}>{gender}</span>
          
          <span className={`${profileTitleColor} ${profileTextSize}`}>Reports To:</span>
          <span className={`${profileTextSize} ${profileTextColor}`}>{reportsTo}</span>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
