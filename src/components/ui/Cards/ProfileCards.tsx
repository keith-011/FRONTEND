import React from "react";
import { SvgIconComponent } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { twMerge } from "tailwind-merge";

interface Props {
  header: string;
  details: { field: string; value: string }[];
  onEditClicked: () => void;

  className: string;
}

const ProfileCards: React.FC<Props> = ({
  header,
  details,
  className,
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

        <div className="flex flex-col gap-3">
          {details.map((item, index) => (
            <div key={index} className="flex gap-2 text-[15px]">
              <span className="grow basis-1/2 font-medium text-accent-700">
                {item.field}
              </span>
              <span className="grow basis-1/2 text-accent-600">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileCards;
