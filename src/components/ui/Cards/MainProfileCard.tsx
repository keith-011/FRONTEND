import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ProfileNavigationButton from "./ProfileNavigationButton";
import { wordedDate } from "../../../utils/Functions";
import { NavLink } from "react-router-dom";

interface Props {
  leftContent: {
    profileImage: string;
    employeeName: string;
    department: string;
    designation: string;
    employeeNumberPcc: string;
    joinDate: string;
  };
  rightContent: { fieldName: string; value: string }[];
  navButtons: { text: string; link: string }[];
}

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

const MainProfileCard: React.FC<Props> = ({
  leftContent,
  rightContent,
  navButtons,
}) => {
  return (
    <>
      <div className="flex flex-col overflow-hidden rounded bg-accent-50 shadow">
        <div className="flex gap-6 p-6 max-md:flex-col">
          <div className="flex border-dashed border-accent-600 max-md:flex-col max-md:border-b-2 md:grow md:basis-[45%] md:gap-6 md:border-r-2">
            <span className="shrink-0">
              <img
                src={leftContent.profileImage}
                className="mx-auto h-[7.5rem] w-[7.5rem] rounded-full object-cover"
              />
            </span>
            <div className="flex flex-col max-md:items-center max-md:pb-4 max-md:text-center md:pr-4">
              <h3 className="text-2xl font-medium text-accent-700">
                {leftContent.employeeName}
              </h3>
              <p className="font-medium text-accent-600">
                {leftContent.department}
              </p>
              <p className="mb-2 text-sm text-accent-600">
                {leftContent.designation}
              </p>
              <p className="text-sm font-medium text-accent-700">
                Employment Number (PCC): {leftContent.employeeNumberPcc}
              </p>
              <p className="mb-2 text-sm font-medium text-accent-600">
                Joined Date: {leftContent.joinDate}
              </p>
              <div className="mt-8 flex flex-wrap items-center max-md:flex-col max-md:gap-1 md:gap-2">
                <span className="text-nowrap font-medium text-accent-700">
                  Employment Status:
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-forest-200" />
                  <span className="font-medium text-accent-700">Active</span>
                  <button className="flex">
                    <SettingsIcon fontSize="inherit" />
                  </button>
                </span>
              </div>
            </div>
          </div>
          <ul className="flex flex-col gap-3 text-[15px] md:grow md:basis-[55%]">
            {rightContent.map((item, index) => (
              <li key={index} className="flex">
                <span className="grow basis-[40%] font-medium text-accent-700 md:basis-[30%]">
                  {`${item.fieldName}:`}
                </span>
                <span className="grow basis-[60%] text-accent-600 md:basis-[70%]">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="flex border-b-2 border-accent-300 text-[15px] text-accent-600">
          {/* <li>
            <button className="-mb-[2px] border-b-2 border-azure-200 px-4 py-2 hover:bg-accent-100">
              Profile
            </button>
          </li> */}
          {/* <li className="px-4 py-2">
            <NavLink className="">Profile</NavLink>
          </li> */}
          {navButtons.map((item, index) => (
            <>
              <li key={index} className="flex">
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `px-4 py-2 ${isActive ? "-mb-[2px] border-b-2 border-forest-600 font-semibold" : "hover:bg-accent-100"}`
                  }
                >
                  {item.text}
                </NavLink>
              </li>
            </>
          ))}
          {/* <li>
            <button className="-mb-[2px] border-b-2 border-azure-200 px-4 py-2 hover:bg-accent-100">
              Profile
            </button>
          </li>
          <li>
            <button className="px-4 py-2">Documents</button>
          </li>
          <li>
            <button className="px-4 py-2">Employment History</button>
          </li> */}
        </ul>
      </div>

      <br />
    </>
  );
};

export default MainProfileCard;

// <div className="rounded bg-accent-50 shadow">
//   <div className="flex flex-col gap-6 p-6 md:flex-row">
//     {/* Left Side Content */}
//     <div className="flex flex-col border-dashed border-accent-600 max-md:border-b-2 max-md:pb-5 md:w-1/2 md:flex-row md:border-r-2 md:p-6">
//       <span className="mr-4 shrink-0">
//         <img
//           src={employeeImagePath}
//           alt="Profile"
//           className="mx-auto h-[7.5rem] w-[7.5rem] rounded-full object-cover"
//         />
//       </span>
//       <div className="flex flex-col text-center md:text-left">
//         <h2 className="text-2xl font-medium text-accent-700">
//           {leftContent.employeeName}
//         </h2>
//         {/* <div className="mb-2 flex flex-col gap-1"> */}
//         <p className="text-sm font-medium text-accent-600">
//           {leftContent.plantillaPosition}
//         </p>
//         <p className="mb-1 text-sm text-accent-600">
//           {leftContent.department}
//         </p>
//         {/* </div> */}
//         {/* <div className="mb-2 flex flex-col gap-1"> */}
//         <p className="text-sm font-medium text-accent-600">
//           Employee ID: {leftContent.employeeId}
//         </p>
//         <p className="mb-6 text-sm text-accent-600">
//           Joined Date: {leftContent.joinedDate}
//         </p>
//         {/* </div> */}

//         {/* Employee Status*/}
//         <span className="flex flex-col items-center gap-2 md:flex-row md:items-start">
//           <span className="font-medium text-accent-700">
//             Employment Status:
//           </span>
//           <div className="flex items-center gap-2">
//             <span
//               className={`ml-2 h-2 w-2 rounded-full ${getStatusColor(employmentStatus)}`}
//             ></span>
//             <span className="font-medium">{employmentStatus}</span>
//             <button className="flex">
//               <SettingsIcon fontSize="inherit" />
//             </button>
//           </div>
//         </span>
//       </div>
//     </div>

//     {/* Divider */}
//     {/* <div className="ml-6 mr-6 hidden border border-dashed border-accent-150 md:block"></div>
//   <div className="mb-6 mt-6 block border-t border-dashed border-accent-150 md:hidden"></div> */}

//     {/* Right Side Content */}
//     <div className="flex flex-col gap-3 md:w-1/2">
//       {rightContent.map((detail, index) => (
//         <React.Fragment key={index}>
//           <div className="flex gap-2">
//             <span
//               className={`${profileDefaultSize} ${profileSemiboldStyle} w-1/2`}
//             >
//               {detail.field}
//             </span>
//             <span
//               className={`${profileDefaultSize} ${profileDefaultTextColorStyle} overflow-wrap w-1/2 break-words`}
//             >
//               {detail.value}
//             </span>
//           </div>
//         </React.Fragment>
//       ))}
//     </div>
//   </div>

//   {/* Buttons */}
//   <div className="mb-12 flex gap-6 p-2 pl-6">
//     <ProfileNavigationButton text="Profile" />
//     <ProfileNavigationButton text="Documents" />
//     <ProfileNavigationButton text="Employment History" />
//   </div>
// </div>
