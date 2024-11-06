import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { SelectIdDescription } from "../../../../utils/Types";
import { NewSchemaAddEmployeeType } from "../../../../schema/AddEmployee";

import FormCategory from "../../FormCategory";
import FormInput from "../../../../components/ui/layout/FormInput";
import CustomSelect from "../../../../components/ui/dropdown/CustomSelect";

interface Props {
  activeCategory: number | null;
  handleCategoryClick: (id: number) => void;
  civilStatusData: SelectIdDescription[];
  genderData: SelectIdDescription[];
}

const PersonalInformation: React.FC<Props> = ({
  activeCategory,
  handleCategoryClick,
  civilStatusData,
  genderData,
}) => {
  const currentYear = new Date().getFullYear() - 17;

  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<NewSchemaAddEmployeeType>();

  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirm_password");

  const [isFieldError, setFieldError] = useState<boolean>(false);
  const [minBirthday, setMinBirthday] = useState<string>("");

  const inputFields = [
    errors.firstName,
    errors.middleName,
    errors.lastName,
    errors.suffix,
    errors.gender,
    errors.birthday,
    errors.civilStatus,
    errors.nationality,
  ];

  useEffect(() => {
    const year = new Date();
    const minYear = new Date(year.getFullYear() - 80, 0, 2);
    const formattedMinDate = minYear.toISOString().split("T")[0];
    setMinBirthday(formattedMinDate);
  }, []);

  useEffect(() => {
    if (watchPassword !== "" && watchConfirmPassword !== "") {
      trigger("confirm_password");
    }
  }, [watchPassword]);

  useEffect(() => {
    setFieldError(inputFields.some((item) => item !== undefined));
  }, [inputFields]);

  return (
    <>
      <FormCategory
        id={2}
        text="Personal Information"
        activeCategory={activeCategory}
        isFieldError={isFieldError}
        handleCategoryClick={handleCategoryClick}
      >
        <FormInput
          labelText="First Name"
          requiredAsterisk={true}
          errorMessage={errors.firstName?.message}
        >
          <input
            type="text"
            maxLength={50}
            placeholder="First Name"
            className="modal-input"
            {...register("firstName")}
          />
        </FormInput>
        <FormInput
          labelText="Middle Name"
          errorMessage={errors.middleName?.message}
        >
          <input
            type="text"
            maxLength={50}
            placeholder="Middle Name"
            className="modal-input"
            {...register("middleName")}
          />
        </FormInput>
        <FormInput
          labelText="Last Name"
          requiredAsterisk={true}
          errorMessage={errors.lastName?.message}
        >
          <input
            type="text"
            maxLength={50}
            placeholder="Last Name"
            className="modal-input"
            {...register("lastName")}
          />
        </FormInput>
        <FormInput labelText="Suffix" errorMessage={errors.suffix?.message}>
          <input
            type="text"
            maxLength={10}
            placeholder="Suffix"
            className="modal-input"
            {...register("suffix")}
          />
        </FormInput>
        <FormInput
          labelText="Gender"
          requiredAsterisk={true}
          errorMessage={errors.gender?.message}
        >
          <CustomSelect
            data={genderData}
            typeOfData="IdAndDescription"
            register={register("gender")}
          />
        </FormInput>
        <FormInput
          labelText="Birthday"
          requiredAsterisk={true}
          errorMessage={errors.birthday?.message}
        >
          <input
            type="date"
            min={minBirthday}
            max={`${currentYear}-12-31`}
            className="modal-input"
            {...register("birthday")}
          />
        </FormInput>

        <FormInput
          labelText="Civil Status"
          requiredAsterisk={true}
          errorMessage={errors.civilStatus?.message}
        >
          <CustomSelect
            register={register("civilStatus")}
            typeOfData="IdAndDescription"
            data={civilStatusData}
          />
        </FormInput>

        <FormInput
          labelText="Nationality"
          requiredAsterisk={true}
          errorMessage={errors.nationality?.message}
        >
          <input
            type="text"
            maxLength={50}
            placeholder="Nationality"
            className="modal-input"
            {...register("nationality")}
          />
        </FormInput>
      </FormCategory>
    </>
  );
};

export default PersonalInformation;
