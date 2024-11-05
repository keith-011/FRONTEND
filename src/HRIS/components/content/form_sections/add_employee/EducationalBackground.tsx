import { useState, useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { educationLevelData } from "../../../../../utils/Types";

import DefaultButton from "../../../../../Shared/components/ui/button/DefaultButton";
import FormInput from "../../../../../Shared/components/ui/layout/FormInput";
import FormCategory from "../../FormCategory";

import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { NewSchemaAddEmployeeType } from "../../../../schema/AddEmployee";
import CustomSelect from "../../../../../Shared/components/ui/dropdown/CustomSelect";
import React from "react";

interface Props {
  activeCategory: number | null;
  handleCategoryClick: (id: number) => void;
}

const EducationalBackground: React.FC<Props> = ({
  activeCategory,
  handleCategoryClick,
}) => {
  const {
    register,
    watch,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<NewSchemaAddEmployeeType>();

  const { fields, append, remove } = useFieldArray({
    name: "educationalBackground",
    control,
  });

  const watchEducation = watch("educationalBackground");

  const [isFieldError, setFieldError] = useState<boolean>(false);

  useEffect(() => {
    if (errors.educationalBackground) {
      setFieldError(true);
    } else {
      setFieldError(false);
    }
  }, [errors.educationalBackground]);

  return (
    <>
      <FormCategory
        id={5}
        text="Educational Background"
        activeCategory={activeCategory}
        isFieldError={isFieldError}
        handleCategoryClick={handleCategoryClick}
      >
        {fields.map((item, index) => (
          <React.Fragment key={item.id}>
            <FormInput labelText="Education Level" requiredAsterisk={true}>
              <CustomSelect
                defaultNone={false}
                register={register(
                  `educationalBackground.${index}.educationLevel`,
                  {
                    onChange: () => {
                      setValue(
                        `educationalBackground.${index}.programType`,
                        "",
                      );
                      setValue(
                        `educationalBackground.${index}.courseTitle`,
                        "",
                      );
                      setValue(`educationalBackground.${index}.schoolName`, "");
                      setValue(`educationalBackground.${index}.yearStart`, "");
                      setValue(
                        `educationalBackground.${index}.programType`,
                        "",
                      );
                      setValue(
                        `educationalBackground.${index}.yearGraduated`,
                        "",
                      );
                      setValue(
                        `educationalBackground.${index}.isStudying`,
                        false,
                      );
                    },
                  },
                )}
                typeOfData="IdAndDescription"
                data={educationLevelData}
              />
            </FormInput>

            {educationLevelData.some(
              (item) => item.id === watchEducation[index].educationLevel,
            ) && (
              <>
                {watchEducation[index].educationLevel ===
                  "Graduate Studies" && (
                  <FormInput
                    labelText="Program Type"
                    requiredAsterisk={true}
                    errorMessage={
                      errors.educationalBackground?.[index]?.programType
                        ?.message
                    }
                  >
                    <input
                      type="text"
                      maxLength={100}
                      placeholder="eg. Master's Degree / Doctorate Degree / etc..."
                      {...register(
                        `educationalBackground.${index}.programType`,
                      )}
                      className="modal-input"
                    />
                  </FormInput>
                )}

                {(watchEducation[index].educationLevel === "Vocational" ||
                  watchEducation[index].educationLevel === "College" ||
                  watchEducation[index].educationLevel ===
                    "Graduate Studies") && (
                  <FormInput
                    labelText={
                      watchEducation[index].educationLevel === "Vocational"
                        ? "Program Title"
                        : "Degree / Course Title"
                    }
                    requiredAsterisk={true}
                    errorMessage={
                      errors.educationalBackground?.[index]?.courseTitle
                        ?.message
                    }
                  >
                    <input
                      type="text"
                      maxLength={100}
                      placeholder="Title"
                      {...register(
                        `educationalBackground.${index}.courseTitle`,
                      )}
                      className="modal-input"
                    />
                  </FormInput>
                )}

                <FormInput
                  labelText="School Name"
                  requiredAsterisk={true}
                  errorMessage={
                    errors.educationalBackground?.[index]?.schoolName?.message
                  }
                >
                  <input
                    type="text"
                    maxLength={100}
                    placeholder="School Name"
                    {...register(`educationalBackground.${index}.schoolName`)}
                    className="modal-input"
                  />
                </FormInput>

                <FormInput
                  labelText="Year Start"
                  requiredAsterisk={true}
                  errorMessage={
                    errors.educationalBackground?.[index]?.yearStart?.message
                  }
                >
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="Year"
                    {...register(`educationalBackground.${index}.yearStart`, {
                      onChange: () => {
                        trigger(`educationalBackground.${index}.yearGraduated`);
                      },
                    })}
                    className="modal-input"
                  />
                </FormInput>

                <FormInput
                  labelText="Year Graduated"
                  requiredAsterisk={true}
                  errorMessage={
                    errors.educationalBackground?.[index]?.yearGraduated
                      ?.message
                  }
                >
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="Year"
                    {...register(
                      `educationalBackground.${index}.yearGraduated`,
                    )}
                    className="modal-input disabled:bg-accent-100"
                    disabled={watchEducation[index].isStudying}
                  />

                  {(watchEducation[index].educationLevel === "Vocational" ||
                    watchEducation[index].educationLevel === "College" ||
                    watchEducation[index].educationLevel ===
                      "Graduate Studies") && (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register(
                          `educationalBackground.${index}.isStudying`,
                          {
                            onChange: () => {
                              setValue(
                                `educationalBackground.${index}.yearGraduated`,
                                "",
                              );
                              trigger(
                                `educationalBackground.${index}.yearGraduated`,
                              );
                            },
                          },
                        )}
                      />
                      <span>Currently Studying</span>
                    </label>
                  )}
                </FormInput>
              </>
            )}
            {index != -1 && (
              <DefaultButton
                type="button"
                Icon={RemoveOutlinedIcon}
                className="bg-red-600 hover:bg-red-500"
                handleClick={() => {
                  console.log(watchEducation);
                  remove(index);
                }}
                text="Remove Education"
              />
            )}
          </React.Fragment>
        ))}

        <DefaultButton
          type="button"
          Icon={AddOutlinedIcon}
          className="bg-forest-400 hover:bg-forest-600"
          handleClick={() => {
            append({
              educationLevel: "Vocational",

              programType: "",
              courseTitle: "",

              schoolName: "",
              yearStart: "",
              yearGraduated: "",
              isStudying: false,
            });
          }}
          text="Add Education"
        />
        <span className="text-red-400">
          {errors.educationalBackground?.message}
        </span>
      </FormCategory>
    </>
  );
};

export default EducationalBackground;

// import { useState, useEffect } from "react";
// import { useFormContext } from "react-hook-form";

// import { EducationLevels } from "../../../../../utils/Globals";

// import DefaultButton from "../../../../../Shared/components/ui/button/DefaultButton";
// import FormInput from "../../../../../Shared/components/ui/layout/FormInput";
// import FormCategory from "../../FormCategory";

// import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import { NewSchemaAddEmployeeType } from "../../../../schema/HRISAddEmployee";

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
//     watch,
//     formState: { errors },
//     setValue,
//   } = useFormContext<NewSchemaAddEmployeeType>();

//   const isBachelorStudying = watch("bachelor_studying");
//   const isMasteralStudying = watch("masteral_studying");
//   const isDoctorateStudying = watch("doctorate_studying");

//   const [isFieldError, setFieldError] = useState<boolean>(false);

//   const bachelorFields = [
//     errors.bachelor_school?.message,
//     errors.bachelor_title?.message,
//     errors.bachelor_start?.message,
//     errors.masteral_end?.message,
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
//     if (!educationLevelStatus.masteral) {
//       setValue("masteral_school", "");
//       setValue("masteral_title", "");
//       setValue("masteral_start", "");
//       setValue("masteral_end", "");
//     }
//     if (!educationLevelStatus.doctorate) {
//       setValue("doctorate_school", "");
//       setValue("doctorate_title", "");
//       setValue("doctorate_start", "");
//       setValue("doctorate_end", "");
//     }
//   }, [educationLevelStatus]);

//   useEffect(() => {
//     if (isBachelorStudying) {
//       setEducationLevelStatus((prevValue) => ({
//         ...prevValue,
//         masteral: false,
//         doctorate: false,
//       }));
//       setValue("bachelor_end", "");
//       setValue("masteral_studying", false);
//       setValue("doctorate_studying", false);
//     }

//     if (isMasteralStudying) {
//       setEducationLevelStatus((prevValue) => ({
//         ...prevValue,
//         doctorate: false,
//       }));
//       setValue("masteral_end", "");
//       setValue("doctorate_studying", false);
//     }

//     if (isDoctorateStudying) {
//       setValue("doctorate_end", "");
//     }
//   }, [isBachelorStudying, isMasteralStudying, isDoctorateStudying]);

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
//             {...register("bachelor_school")}
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
//             {...register("bachelor_title")}
//           />
//         </FormInput>
//         <FormInput
//           labelText="Year Started"
//           errorMessage={errors.bachelor_start?.message}
//         >
//           <input
//             type="text"
//             maxLength={4}
//             placeholder="Year"
//             className="modal-input"
//             {...register("bachelor_start")}
//           />
//         </FormInput>
//         <FormInput
//           labelText="Year Finished"
//           errorMessage={errors.bachelor_end?.message}
//         >
//           <input
//             type="text"
//             maxLength={4}
//             placeholder="Year"
//             disabled={isBachelorStudying}
//             className="modal-input disabled:bg-accent-100"
//             {...register("bachelor_end")}
//           />
//           <label className="flex items-center justify-center gap-2 self-start">
//             <input type="checkbox" {...register("bachelor_studying")} />
//             Currently Studying
//           </label>
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
//             setValue("bachelor_studying", false);
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
//                 {...register("masteral_school")}
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
//                 {...register("masteral_title")}
//               />
//             </FormInput>
//             <FormInput
//               labelText="Year Started"
//               errorMessage={errors.masteral_start?.message}
//             >
//               <input
//                 type="text"
//                 maxLength={4}
//                 placeholder="Year"
//                 className="modal-input"
//                 {...register("masteral_start")}
//               />
//             </FormInput>
//             <FormInput
//               labelText="Year Finished"
//               errorMessage={errors.masteral_end?.message}
//             >
//               <input
//                 type="text"
//                 maxLength={4}
//                 placeholder="Year"
//                 disabled={isMasteralStudying}
//                 className="modal-input disabled:bg-accent-100"
//                 {...register("masteral_end")}
//               />
//               <label className="flex items-center justify-center gap-2 self-start">
//                 <input type="checkbox" {...register("masteral_studying")} />
//                 Currently Studying
//               </label>
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
//                 setValue("masteral_studying", false);
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
//                 {...register("doctorate_school")}
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
//                 {...register("doctorate_title")}
//               />
//             </FormInput>
//             <FormInput
//               labelText="Year Started"
//               errorMessage={errors.doctorate_start?.message}
//             >
//               <input
//                 type="text"
//                 maxLength={4}
//                 placeholder="Year"
//                 className="modal-input"
//                 {...register("doctorate_start")}
//               />
//             </FormInput>
//             <FormInput
//               labelText="Year Finished"
//               errorMessage={errors.doctorate_end?.message}
//             >
//               <input
//                 type="text"
//                 maxLength={4}
//                 placeholder="Year"
//                 disabled={isDoctorateStudying}
//                 className="modal-input disabled:bg-accent-100"
//                 {...register("doctorate_end")}
//               />
//               <label className="flex items-center justify-center gap-2 self-start">
//                 <input type="checkbox" {...register("doctorate_studying")} />
//                 Currently Studying
//               </label>
//             </FormInput>
//           </>
//         )}
//       </FormCategory>
//     </>
//   );
// };

// export default EducationalAttainment;
