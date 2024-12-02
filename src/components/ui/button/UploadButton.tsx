import DownloadIcon from "@mui/icons-material/Download";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AddEmployeeForm } from "../../../utils/Types";

// For modal forms only

interface Props {
  registerId: keyof AddEmployeeForm;
  multiple?: boolean;
  fileType: string;
}

const UploadButton: React.FC<Props> = ({
  registerId,
  fileType,
  multiple = false,
}) => {
  const [fileName, setFileName] = useState<string>("No file uploaded.");
  const buttonRef = useRef<HTMLInputElement | null>(null);

  const { register } = useFormContext<AddEmployeeForm>();

  const handleClick = () => {
    buttonRef.current?.click();
  };

 // const heh = watch("birth_certificate");

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files;

    if (file && file.length !== 0) {
      if (file.length === 1) {
        setFileName(file[0].name);
      } else {
        setFileName(`${file.length} files uploaded.`);
      }
    } else {
      setFileName("No file uploaded.");
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="flex items-center justify-center gap-1 rounded-lg border border-accent-600 px-3 py-2 text-accent-600 hover:bg-accent-50"
          onClick={handleClick}
        >
          <input
            type="file"
            multiple={multiple}
            accept={fileType}
            className="hidden bg-red-300"
            {...register(registerId, { onChange: onUpload })}
            ref={(e) => {
              register(registerId).ref(e);
              buttonRef.current = e;
            }}
          />
          <DownloadIcon />
          <span className="text-nowrap font-bold">
            {multiple ? "Upload Files" : "Upload"}
          </span>
        </button>
        <span className="overflow-hidden text-ellipsis text-nowrap">
          {fileName}
        </span>
      </div>
    </>
  );
};

export default UploadButton;

// {...register(register_id, {
//   required: required_text ? required_text : false,
// })}

// import DownloadIcon from "@mui/icons-material/Download";
// import { useRef } from "react";
// import { useFormContext } from "react-hook-form";
// import { AddEmployeeForm } from "../../../../utils/Globals";

// // For modal forms only

// interface Props {
//   register_id: keyof AddEmployeeForm;
//   required_text?: string;
// }

// const UploadButton: React.FC<Props> = ({ register_id, required_text }) => {
//   const buttonRef = useRef<HTMLInputElement | null>(null);

//   const {
//     register,
//     watch,
//     formState: { errors },
//   } = useFormContext<AddEmployeeForm>();

//   const handleClick = () => {
//     buttonRef.current?.click();
//   };

//   const heh = watch("birth_certificate");

//   const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     console.log(heh, "a");

//     if (e.target.files && e.target.files.length < 1) {
//       // console.log(e);
//     } else {
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center gap-4">
//         <button
//           type="button"
//           className="flex items-center justify-center gap-1 rounded-lg border border-accent-600 px-3 py-2 text-accent-600 hover:bg-accent-50"
//           onClick={handleClick}
//         >
//           <input
//             type="file"
//             className="hidden bg-red-300"
//             {...register(register_id, {
//               required: required_text ? required_text : false,
//               onChange: onUpload,
//               validate: {
//                 checkValidity: (value) => {
//                   console.log(value);
//                   return "ye";
//                 },
//               },
//             })}
//             ref={(e) => {
//               register(register_id).ref(e);
//               buttonRef.current = e;
//             }}
//           />
//           <DownloadIcon />
//           <span className="font-bold">Upload</span>
//         </button>
//         <span>No file chosen</span>
//       </div>
//     </>
//   );
// };

// export default UploadButton;

// // {...register(register_id, {
// //   required: required_text ? required_text : false,
// // })}
