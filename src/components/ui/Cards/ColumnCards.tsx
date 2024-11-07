import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { twMerge } from "tailwind-merge";

interface ColumnCardStyleProps {
  header: string;
  details: { field: string; value1: string; value2: string }[];
  className: string;
}

const ColumnCardStyle: React.FC<ColumnCardStyleProps> = ({
  className,
  header,
  details,
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
          <button className="flex items-center">
            <EditIcon className="rounded-full bg-accent-200 p-0.5 text-accent-100" />
          </button>
        </div>
        <div className="flex flex-col">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <span className="h-2 w-2 rounded-full border border-accent-300 bg-accent-300"></span>
                  <span className="h-16 flex-grow border border-accent-300 bg-accent-300"></span>
                </div>
                <div className="flex flex-col gap-1">
                  {detail.field && (
                    <span className="text-sm font-semibold text-accent-700">
                      {detail.field}
                    </span>
                  )}
                  <span className="break-words text-sm text-accent-600">
                    {detail.value1}
                  </span>
                  <span className="break-words text-sm text-accent-600">
                    {detail.value2}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* <div className="flex flex-col gap-3">
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
        </div> */}
      </div>
    </>
    // <div className="flex h-full flex-col bg-accent-50 p-6 shadow">
    //   <div className="mb-4 flex justify-between text-xl font-semibold text-accent-700">
    //     {header}
    //     <button className="flex items-center">
    //       <EditIcon
    //         style={{ fontSize: "18px" }}
    //         className="rounded-xl bg-accent-200 p-0.5 text-accent-100"
    //       ></EditIcon>
    //     </button>
    //   </div>

    //   <div className="flex flex-col">
    //     {details.map((detail, index) => (
    //       <React.Fragment key={index}>
    //         <div className="flex items-start gap-4">
    //           <div className="flex flex-col items-center">
    //             <span className="h-2 w-2 rounded-full border border-accent-300 bg-accent-300"></span>
    //             <span className="h-16 flex-grow border border-accent-300 bg-accent-300"></span>
    //           </div>
    //           <div className="flex flex-col gap-1">
    //             {detail.field && (
    //               <span className="text-sm font-semibold text-accent-700">
    //                 {detail.field}
    //               </span>
    //             )}
    //             <span className="break-words text-sm text-accent-600">
    //               {detail.value1}
    //             </span>
    //             <span className="break-words text-sm text-accent-600">
    //               {detail.value2}
    //             </span>
    //           </div>
    //         </div>
    //       </React.Fragment>
    //     ))}
    //   </div>
    // </div>
  );
};

export default ColumnCardStyle;
