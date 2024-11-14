import React from "react";
import { useState, useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { educationLevelData } from "../../../../utils/Types";

import DefaultButton from "../../../../components/ui/button/DefaultButton";
import FormInput from "../../../../components/ui/layout/FormInput";
import CustomSelect from "../../../../components/ui/dropdown/CustomSelect";
import FormCategory from "../../FormCategory";

import { NewSchemaAddEmployeeType } from "../../../../schema/AddEmployee";

import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

interface Props {
  activeCategory: number | null;
  handleCategoryClick: (id: number) => void;
  educationLevelData: { description: string }[];
}

const EducationalBackground: React.FC<Props> = ({
  activeCategory,
  handleCategoryClick,
  educationLevelData,
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
                typeOfData="Enum"
                data={educationLevelData}
              />
            </FormInput>

            {educationLevelData.some(
              (item) =>
                item.description === watchEducation[index].educationLevel,
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
