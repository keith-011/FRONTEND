import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { twMerge } from "tailwind-merge";
import { UserProfile } from "../../../utils/Types";

interface Props {
  header: string;
  details: UserProfile["education"];
  onEditClicked: () => void;
  className: string;
}

const EducationCard: React.FC<Props> = ({
  className,
  header,
  details,
  onEditClicked,
}) => {
  return (
    <>
      <div
        className={twMerge(
          `flex grow flex-col gap-5 rounded bg-accent-50 p-6 shadow`,
          className,
        )}
      >
        <div className="flex justify-between text-xl font-medium text-accent-700">
          {header}
          <button className="flex items-center" onClick={onEditClicked}>
            <EditIcon className="rounded-full bg-accent-200 p-0.5 text-accent-100" />
          </button>
        </div>
        <div className="flex flex-col">
          {details.map((detail, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex h-full flex-col items-center">
                <span className="h-3 w-3 rounded-full border border-accent-300 bg-accent-300"></span>
                <span className="h-full border border-accent-300 bg-accent-300"></span>
              </div>
              <div className="flex flex-col gap-1 pb-4">
                {detail.school_name && (
                  <span className="font-semibold text-accent-700">
                    {detail.school_name}
                  </span>
                )}
                {detail.education_level && (
                  <span className="text-sm text-accent-600">
                    {`${detail.education_level} ${detail.program_type ? `- ${detail.program_type}` : ""}`}
                  </span>
                )}
                {detail.course_title && (
                  <span className="text-sm text-accent-600">
                    {detail.course_title}
                  </span>
                )}
                {detail.year_start && (
                  <span className="text-sm text-accent-600">
                    {`${detail.year_start} - ${detail.year_end ? detail.year_end : detail.is_studying && "Present"}`}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EducationCard;
