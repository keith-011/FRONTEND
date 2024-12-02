import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { wordedDate } from "../../../utils/Functions";
import { NavLink } from "react-router-dom";
import { UserProfile } from "../../../utils/Types";

interface Props {
  mainData: UserProfile["profile"];
  supervisor: { name: string; image_path: string } | null;
  rightContent: { fieldName: string; value: string }[];
  navButtons: { text: string; link: string }[];
}

/*
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
*/
const MainProfileCard: React.FC<Props> = ({
  mainData,
  rightContent,
  navButtons,
  supervisor,
}) => {
  return (
    <>
      <div className="mb-11 flex flex-col overflow-hidden rounded bg-accent-50 shadow">
        <div className="flex gap-6 p-6 max-md:flex-col">
          <div className="flex border-dashed border-accent-600 max-md:flex-col max-md:border-b-2 md:grow md:basis-[45%] md:gap-6 md:border-r-2">
            <span className="shrink-0">
              <img
                src={mainData.image_path}
                className="mx-auto h-[7.5rem] w-[7.5rem] rounded-full object-cover"
              />
            </span>
            <div className="flex flex-col max-md:items-center max-md:pb-4 max-md:text-center md:pr-4">
              <h3 className="break-words break-all text-2xl font-medium text-accent-700">
                {mainData.fullname}
              </h3>
              <p className="break-words break-all text-sm font-medium text-accent-600">
                {mainData.department}
                {mainData.is_department_head && <span> (Head)</span>}
              </p>
              <p className="mb-2 break-words break-all text-sm text-accent-600">
                {mainData.designation}
              </p>
              <p className="break-words break-all text-sm font-medium text-accent-700">
                Employment Number (PCC): {mainData.employee_number_pcc}
              </p>
              <p className="mb-2 break-words break-all text-sm font-medium text-accent-600">
                Join Date: {wordedDate(mainData.created_at)}
              </p>
              <div className="mt-8 flex flex-wrap items-center max-md:flex-col max-md:gap-1 md:gap-2">
                <span className="break-words break-all font-medium text-accent-700">
                  Service Status:
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
          <ul className="flex flex-col gap-3 text-sm md:grow md:basis-[55%]">
            {rightContent.map((item, index) => (
              <li key={index} className="flex">
                <span className="grow basis-[40%] break-words break-all font-medium text-accent-700 md:basis-[30%]">
                  {`${item.fieldName}:`}
                </span>
                <span className="grow basis-[60%] break-words break-all text-accent-600 md:basis-[70%]">
                  {item.value}
                </span>
              </li>
            ))}
            <li className="flex">
              <span className="grow basis-[40%] break-words break-all font-medium text-accent-700 md:basis-[30%]">
                Reports to:
              </span>
              {supervisor && (
                <span className="grow basis-[60%] text-accent-600 md:basis-[70%]">
                  <span className="flex items-center gap-2">
                    <img
                      src={supervisor.image_path}
                      className="max-h-6 min-h-6 min-w-6 max-w-6 rounded-full object-cover"
                    />
                    <span className="break-words break-all font-semibold text-forest-900">
                      {supervisor.name}
                    </span>
                  </span>
                </span>
              )}
            </li>
          </ul>
        </div>
        <ul className="flex overflow-x-auto border-b-2 border-accent-300 text-[15px] text-accent-700">
          {navButtons.map((item, index) => (
            <li key={index} className="flex">
              <NavLink
                to={item.link}
                end
                className={({ isActive }) =>
                  `text-nowrap px-4 py-2 ${isActive ? "border-b-2 border-forest-600 font-semibold" : "hover:bg-accent-100"}`
                }
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MainProfileCard;
