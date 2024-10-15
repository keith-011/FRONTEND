import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { EducationLevels } from "../../../../../utils/Globals";

import DefaultButton from "../../../../../Shared/components/ui/button/DefaultButton";
import FormInput from "../../../../../Shared/components/ui/layout/FormInput";
import FormCategory from "../../FormCategory";

import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { NewSchemaAddEmployeeType } from "../../../../schema/HRISAddEmployee";

interface Props {
  activeCategory: number | null;
  handleCategoryClick: (id: number) => void;
  educationLevelStatus: EducationLevels;
  setEducationLevelStatus: React.Dispatch<
    React.SetStateAction<EducationLevels>
  >;
}

const EducationalAttainment: React.FC<Props> = ({
  activeCategory,
  handleCategoryClick,
  educationLevelStatus,
  setEducationLevelStatus,
}) => {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext<NewSchemaAddEmployeeType>();

  const isBachelorStudying = watch("bachelor_studying");
  const isMasteralStudying = watch("masteral_studying");
  const isDoctorateStudying = watch("doctorate_studying");

  const [isFieldError, setFieldError] = useState<boolean>(false);

  const bachelorFields = [
    errors.bachelor_school?.message,
    errors.bachelor_title?.message,
    errors.bachelor_start?.message,
    errors.masteral_end?.message,
  ];

  const masteralFields = [
    errors.masteral_school?.message,
    errors.masteral_title?.message,
    errors.masteral_start?.message,
    errors.masteral_end?.message,
  ];

  const doctorateFields = [
    errors.doctorate_school?.message,
    errors.doctorate_title?.message,
    errors.doctorate_start?.message,
    errors.doctorate_end?.message,
  ];

  useEffect(() => {
    if (!educationLevelStatus.masteral) {
      setValue("masteral_school", "");
      setValue("masteral_title", "");
      setValue("masteral_start", "");
      setValue("masteral_end", "");
    }
    if (!educationLevelStatus.doctorate) {
      setValue("doctorate_school", "");
      setValue("doctorate_title", "");
      setValue("doctorate_start", "");
      setValue("doctorate_end", "");
    }
  }, [educationLevelStatus]);

  useEffect(() => {
    if (isBachelorStudying) {
      setEducationLevelStatus((prevValue) => ({
        ...prevValue,
        masteral: false,
        doctorate: false,
      }));
      setValue("bachelor_end", "");
      setValue("masteral_studying", false);
      setValue("doctorate_studying", false);
    }

    if (isMasteralStudying) {
      setEducationLevelStatus((prevValue) => ({
        ...prevValue,
        doctorate: false,
      }));
      setValue("masteral_end", "");
      setValue("doctorate_studying", false);
    }

    if (isDoctorateStudying) {
      setValue("doctorate_end", "");
    }
  }, [isBachelorStudying, isMasteralStudying, isDoctorateStudying]);

  useEffect(() => {
    let hasError = false;

    hasError = bachelorFields.some((item) => item !== undefined);

    if (educationLevelStatus.masteral) {
      hasError = masteralFields.some((item) => item !== undefined);
    }

    if (educationLevelStatus.doctorate) {
      hasError = doctorateFields.some((item) => item !== undefined);
    }
    setFieldError(hasError);
  }, [bachelorFields, masteralFields, doctorateFields]);

  return (
    <>
      <FormCategory
        id={5}
        text="Educational Attainment"
        activeCategory={activeCategory}
        isFieldError={isFieldError}
        handleCategoryClick={handleCategoryClick}
      >
        {/* Bachelor's Degree */}
        <FormInput
          labelText="Bachelor's Degree School"
          errorMessage={errors.bachelor_school?.message}
        >
          <input
            type="text"
            maxLength={100}
            placeholder="School Name"
            className="modal-input"
            {...register("bachelor_school")}
          />
        </FormInput>
        <FormInput
          labelText="Degree Title"
          errorMessage={errors.bachelor_title?.message}
        >
          <input
            type="text"
            maxLength={100}
            placeholder="Degree Title"
            className="modal-input"
            {...register("bachelor_title")}
          />
        </FormInput>
        <FormInput
          labelText="Year Started"
          errorMessage={errors.bachelor_start?.message}
        >
          <input
            type="text"
            maxLength={4}
            placeholder="Year"
            className="modal-input"
            {...register("bachelor_start")}
          />
        </FormInput>
        <FormInput
          labelText="Year Finished"
          errorMessage={errors.bachelor_end?.message}
        >
          <input
            type="text"
            maxLength={4}
            placeholder="Year"
            disabled={isBachelorStudying}
            className="modal-input disabled:bg-accent-100"
            {...register("bachelor_end")}
          />
          <label className="flex items-center justify-center gap-2 self-start">
            <input type="checkbox" {...register("bachelor_studying")} />
            Currently Studying
          </label>
        </FormInput>

        {/* Master's Degree */}
        <DefaultButton
          text={`${!educationLevelStatus.masteral ? "Add Master's Degree" : "Remove Master's Degree"}`}
          Icon={
            !educationLevelStatus.masteral
              ? AddOutlinedIcon
              : RemoveOutlinedIcon
          }
          type="button"
          className={`${!educationLevelStatus.masteral ? "bg-forest-400 hover:bg-forest-600" : "bg-red-600 hover:bg-red-500"}`}
          handleClick={() => {
            setValue("bachelor_studying", false);
            if (educationLevelStatus.doctorate) {
              setEducationLevelStatus((prevValue) => ({
                ...prevValue,
                masteral: !prevValue.masteral,
                doctorate: !prevValue.doctorate,
              }));
            } else {
              setEducationLevelStatus((prevValue) => ({
                ...prevValue,
                masteral: !prevValue.masteral,
              }));
            }
          }}
        />
        {educationLevelStatus.masteral && (
          <>
            <FormInput
              labelText="Master's Degree School"
              errorMessage={errors.masteral_school?.message}
            >
              <input
                type="text"
                maxLength={100}
                placeholder="School Name"
                className="modal-input"
                {...register("masteral_school")}
              />
            </FormInput>
            <FormInput
              labelText="Degree Title"
              errorMessage={errors.masteral_title?.message}
            >
              <input
                type="text"
                maxLength={100}
                placeholder="Degree Title"
                className="modal-input"
                {...register("masteral_title")}
              />
            </FormInput>
            <FormInput
              labelText="Year Started"
              errorMessage={errors.masteral_start?.message}
            >
              <input
                type="text"
                maxLength={4}
                placeholder="Year"
                className="modal-input"
                {...register("masteral_start")}
              />
            </FormInput>
            <FormInput
              labelText="Year Finished"
              errorMessage={errors.masteral_end?.message}
            >
              <input
                type="text"
                maxLength={4}
                placeholder="Year"
                disabled={isMasteralStudying}
                className="modal-input disabled:bg-accent-100"
                {...register("masteral_end")}
              />
              <label className="flex items-center justify-center gap-2 self-start">
                <input type="checkbox" {...register("masteral_studying")} />
                Currently Studying
              </label>
            </FormInput>

            {/* Doctorate Degree */}
            <DefaultButton
              text={`${!educationLevelStatus.doctorate ? "Add Doctorate Degree" : "Remove Doctorate Degree"}`}
              Icon={
                !educationLevelStatus.doctorate
                  ? AddOutlinedIcon
                  : RemoveOutlinedIcon
              }
              type="button"
              className={`${!educationLevelStatus.doctorate ? "bg-forest-400 hover:bg-forest-600" : "bg-red-600 hover:bg-red-500"}`}
              handleClick={() => {
                setValue("masteral_studying", false);
                setEducationLevelStatus((prevValue) => ({
                  ...prevValue,
                  doctorate: !prevValue.doctorate,
                }));
              }}
            />
          </>
        )}
        {educationLevelStatus.doctorate && (
          <>
            <FormInput
              labelText="Doctorate Degree School"
              errorMessage={errors.doctorate_school?.message}
            >
              <input
                type="text"
                maxLength={100}
                placeholder="School Name"
                className="modal-input"
                {...register("doctorate_school")}
              />
            </FormInput>
            <FormInput
              labelText="Degree Title"
              errorMessage={errors.doctorate_title?.message}
            >
              <input
                type="text"
                maxLength={100}
                placeholder="Degree Title"
                className="modal-input"
                {...register("doctorate_title")}
              />
            </FormInput>
            <FormInput
              labelText="Year Started"
              errorMessage={errors.doctorate_start?.message}
            >
              <input
                type="text"
                maxLength={4}
                placeholder="Year"
                className="modal-input"
                {...register("doctorate_start")}
              />
            </FormInput>
            <FormInput
              labelText="Year Finished"
              errorMessage={errors.doctorate_end?.message}
            >
              <input
                type="text"
                maxLength={4}
                placeholder="Year"
                disabled={isDoctorateStudying}
                className="modal-input disabled:bg-accent-100"
                {...register("doctorate_end")}
              />
              <label className="flex items-center justify-center gap-2 self-start">
                <input type="checkbox" {...register("doctorate_studying")} />
                Currently Studying
              </label>
            </FormInput>
          </>
        )}
      </FormCategory>
    </>
  );
};

export default EducationalAttainment;

// import { useFormContext } from "react-hook-form";
// import DefaultButton from "../../../../../Shared/components/ui/button/DefaultButton";
// import FormInput from "../../../../../Shared/components/ui/layout/FormInput";
// import FormCategory from "../../FormCategory";
// import { AddEmployeeForm, EducationLevels } from "../../../../../utils/Globals";

// import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import { useState, useEffect } from "react";

// interface Props {
//   activeCategory: number | null;
//   handleCategoryClick: (id: number) => void;
//   educationLevelStatus: EducationLevels;
//   setEducationLevelStatus: React.Dispatch<
//     React.SetStateAction<EducationLevels>
//   >;
// }

// const EducationalAttainment: React.FC<Props> = ({
//   activeCategory,
//   handleCategoryClick,
//   educationLevelStatus,
//   setEducationLevelStatus,
// }) => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext<AddEmployeeForm>();

//   const [isFieldError, setFieldError] = useState<boolean>(false);

//   const bachelorFields = [
//     errors.bachelor_school?.message,
//     errors.bachelor_title?.message,
//     errors.bachelor_start?.message,
//     errors.bachelor_end?.message,
//   ];

//   const masteralFields = [
//     errors.masteral_school?.message,
//     errors.masteral_title?.message,
//     errors.masteral_start?.message,
//     errors.masteral_end?.message,
//   ];

//   const doctorateFields = [
//     errors.doctorate_school?.message,
//     errors.doctorate_title?.message,
//     errors.doctorate_start?.message,
//     errors.doctorate_end?.message,
//   ];

//   useEffect(() => {
//     let hasError = false;

//     hasError = bachelorFields.some((item) => item !== undefined);

//     if (educationLevelStatus.masteral) {
//       hasError = masteralFields.some((item) => item !== undefined);
//     }

//     if (educationLevelStatus.doctorate) {
//       hasError = doctorateFields.some((item) => item !== undefined);
//     }
//     setFieldError(hasError);
//   }, [bachelorFields, masteralFields, doctorateFields]);

//   const checkYearEnd = (value: string) => {
//     if (value.toLowerCase() != "present") {
//       if (value.trim() === "" || isNaN(Number(value))) {
//         return 'This field requires a numeric value or "Present"';
//       }
//     }
//   };

//   return (
//     <>
//       <FormCategory
//         id={5}
//         text="Educational Attainment"
//         activeCategory={activeCategory}
//         isFieldError={isFieldError}
//         handleCategoryClick={handleCategoryClick}
//       >
//         {/* Bachelor's Degree */}
//         <FormInput
//           labelText="Bachelor's Degree School"
//           errorMessage={errors.bachelor_school?.message}
//         >
//           <input
//             type="text"
//             maxLength={100}
//             placeholder="School Name"
//             className="modal-input"
//             {...register("bachelor_school", {
//               required: "School required.",
//               maxLength: {
//                 value: 100,
//                 message: "School must be 100 characters or less.",
//               },
//             })}
//           />
//         </FormInput>
//         <FormInput
//           labelText="Degree Title"
//           errorMessage={errors.bachelor_title?.message}
//         >
//           <input
//             type="text"
//             maxLength={100}
//             placeholder="Degree Title"
//             className="modal-input"
//             {...register("bachelor_title", {
//               required: "Title required.",
//               maxLength: {
//                 value: 100,
//                 message: "Degree title must be 100 characters or less.",
//               },
//             })}
//           />
//         </FormInput>
//         <FormInput
//           labelText="Year Started"
//           errorMessage={errors.bachelor_start?.message}
//         >
//           <input
//             type="text"
//             maxLength={100}
//             placeholder="Year"
//             className="modal-input"
//             {...register("bachelor_start", {
//               required: "Year required.",
//               validate: (value) =>
//                 !isNaN(Number(value)) || "This field requires a numeric value.",
//             })}
//           />
//         </FormInput>
//         <FormInput
//           labelText="Year Finished"
//           errorMessage={errors.bachelor_end?.message}
//         >
//           <input
//             type="text"
//             maxLength={100}
//             placeholder="Year/Present"
//             className="modal-input"
//             {...register("bachelor_end", {
//               required: "Year required.",
//               validate: (value) => checkYearEnd(value),
//             })}
//           />
//         </FormInput>

//         {/* Master's Degree */}
//         <DefaultButton
//           text={`${!educationLevelStatus.masteral ? "Add Master's Degree" : "Remove Master's Degree"}`}
//           Icon={
//             !educationLevelStatus.masteral
//               ? AddOutlinedIcon
//               : RemoveOutlinedIcon
//           }
//           type="button"
//           className={`${!educationLevelStatus.masteral ? "bg-forest-400 hover:bg-forest-600" : "bg-red-600 hover:bg-red-500"}`}
//           handleClick={() => {
//             if (educationLevelStatus.doctorate) {
//               setEducationLevelStatus((prevValue) => ({
//                 ...prevValue,
//                 masteral: !prevValue.masteral,
//                 doctorate: !prevValue.doctorate,
//               }));
//             } else {
//               setEducationLevelStatus((prevValue) => ({
//                 ...prevValue,
//                 masteral: !prevValue.masteral,
//               }));
//             }
//           }}
//         />
//         {educationLevelStatus.masteral && (
//           <>
//             <FormInput
//               labelText="Master's Degree School"
//               errorMessage={errors.masteral_school?.message}
//             >
//               <input
//                 type="text"
//                 maxLength={100}
//                 placeholder="School Name"
//                 className="modal-input"
//                 {...register("masteral_school", {
//                   required: educationLevelStatus.masteral && "School required.",
//                   maxLength: {
//                     value: 100,
//                     message: "School must be 100 characters or less.",
//                   },
//                 })}
//               />
//             </FormInput>
//             <FormInput
//               labelText="Degree Title"
//               errorMessage={errors.masteral_title?.message}
//             >
//               <input
//                 type="text"
//                 maxLength={100}
//                 placeholder="Degree Title"
//                 className="modal-input"
//                 {...register("masteral_title", {
//                   required: educationLevelStatus.masteral && "Title required.",
//                   maxLength: {
//                     value: 100,
//                     message: "Degree title must be 100 characters or less.",
//                   },
//                 })}
//               />
//             </FormInput>
//             <FormInput
//               labelText="Year Started"
//               errorMessage={errors.masteral_start?.message}
//             >
//               <input
//                 type="text"
//                 maxLength={100}
//                 placeholder="Year"
//                 className="modal-input"
//                 {...register("masteral_start", {
//                   required: educationLevelStatus.masteral && "Year required.",
//                   validate: (value) =>
//                     !isNaN(Number(value)) ||
//                     "This field requires a numeric value.",
//                 })}
//               />
//             </FormInput>
//             <FormInput
//               labelText="Year Finished"
//               errorMessage={errors.masteral_end?.message}
//             >
//               <input
//                 type="text"
//                 maxLength={100}
//                 placeholder="Year/Present"
//                 className="modal-input"
//                 {...register("masteral_end", {
//                   required: educationLevelStatus.masteral && "Year required.",
//                   validate: (value) => checkYearEnd(value),
//                 })}
//               />
//             </FormInput>

//             {/* Doctorate Degree */}
//             <DefaultButton
//               text={`${!educationLevelStatus.doctorate ? "Add Doctorate Degree" : "Remove Doctorate Degree"}`}
//               Icon={
//                 !educationLevelStatus.doctorate
//                   ? AddOutlinedIcon
//                   : RemoveOutlinedIcon
//               }
//               type="button"
//               className={`${!educationLevelStatus.doctorate ? "bg-forest-400 hover:bg-forest-600" : "bg-red-600 hover:bg-red-500"}`}
//               handleClick={() => {
//                 setEducationLevelStatus((prevValue) => ({
//                   ...prevValue,
//                   doctorate: !prevValue.doctorate,
//                 }));
//               }}
//             />
//           </>
//         )}
//         {educationLevelStatus.doctorate && (
//           <>
//             <FormInput
//               labelText="Doctorate Degree School"
//               errorMessage={errors.doctorate_school?.message}
//             >
//               <input
//                 type="text"
//                 maxLength={100}
//                 placeholder="School Name"
//                 className="modal-input"
//                 {...register("doctorate_school", {
//                   required:
//                     educationLevelStatus.doctorate && "School required.",
//                   maxLength: {
//                     value: 100,
//                     message: "School must be 100 characters or less.",
//                   },
//                 })}
//               />
//             </FormInput>
//             <FormInput
//               labelText="Degree Title"
//               errorMessage={errors.doctorate_title?.message}
//             >
//               <input
//                 type="text"
//                 maxLength={100}
//                 placeholder="Degree Title"
//                 className="modal-input"
//                 {...register("doctorate_title", {
//                   required: educationLevelStatus.doctorate && "Title required.",
//                   maxLength: {
//                     value: 100,
//                     message: "Degree title must be 100 characters or less.",
//                   },
//                 })}
//               />
//             </FormInput>
//             <FormInput
//               labelText="Year Started"
//               errorMessage={errors.doctorate_start?.message}
//             >
//               <input
//                 type="text"
//                 maxLength={100}
//                 placeholder="Year"
//                 className="modal-input"
//                 {...register("doctorate_start", {
//                   required: educationLevelStatus.doctorate && "Year required.",
//                   validate: (value) =>
//                     !isNaN(Number(value)) ||
//                     "This field requires a numeric value.",
//                 })}
//               />
//             </FormInput>
//             <FormInput
//               labelText="Year Finished"
//               errorMessage={errors.doctorate_end?.message}
//             >
//               <input
//                 type="text"
//                 maxLength={100}
//                 placeholder="Year/Present"
//                 className="modal-input"
//                 {...register("doctorate_end", {
//                   required: educationLevelStatus.doctorate && "Year required.",
//                   validate: (value) => checkYearEnd(value),
//                 })}
//               />
//             </FormInput>
//           </>
//         )}
//       </FormCategory>
//     </>
//   );
// };

// export default EducationalAttainment;
