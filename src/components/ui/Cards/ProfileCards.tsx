import React from "react";
import { SvgIconComponent } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { twMerge } from "tailwind-merge";

interface Props {
  header: string;
  details: {
    field: string;
    value: string;
    value2?: string;
    className?: string;
  }[];
  supervisor?: { name: string; image_path: string } | null;
  onEditClicked: () => void;

  className: string;
}

const ProfileCards: React.FC<Props> = ({
  header,
  details,
  className,
  supervisor,
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
        <h3 className="flex justify-between text-xl font-medium text-accent-700">
          {header}
          <button className="flex items-center" onClick={onEditClicked}>
            <EditIcon className="rounded-full bg-accent-200 p-0.5 text-accent-100" />
          </button>
        </h3>

        <ul className="flex flex-col gap-3">
          {details.map((item, index) => (
            <li key={index} className="flex gap-2 text-sm">
              <div className="grow basis-1/2 break-words break-all font-medium text-accent-700">
                {item.field}
              </div>
              <div className="flex grow basis-1/2 flex-col">
                <span
                  className={twMerge(
                    "break-words break-all text-accent-600",
                    item.className,
                  )}
                >
                  {item.value}
                </span>
                {item.value2 && (
                  <span className="break-words break-all text-xs font-medium italic text-accent-600">
                    {item.value2}
                  </span>
                )}
              </div>
            </li>
          ))}
          {supervisor && (
            <li className="flex gap-2 text-sm">
              <div className="grow basis-1/2 break-words break-all font-medium text-accent-700">
                Supervisor:
              </div>
              <div className="grow basis-1/2 text-accent-600">
                <div className="flex items-center gap-2">
                  <img
                    src={supervisor.image_path}
                    className="max-h-6 min-h-6 min-w-6 max-w-6 rounded-full object-cover"
                  />
                  <span className="break-words break-all font-semibold text-forest-900">
                    {supervisor.name}
                  </span>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default ProfileCards;
