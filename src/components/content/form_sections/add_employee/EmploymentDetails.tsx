import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import {
  SelectIdDescription,
  FormPlantillaList,
  FormCategoryList,
  DepartmentAndHeads,
} from "../../../../utils/Types";

import { NewSchemaAddEmployeeType } from "../../../../schema/AddEmployee";

import FormCategory from "../../FormCategory";
import CustomSelect from "../../../../components/ui/dropdown/CustomSelect";
import FormInput from "../../../../components/ui/layout/FormInput";

interface Props {
  activeCategory: number | null;
  handleCategoryClick: (id: number) => void;
  plantillaData: FormPlantillaList[];
  departmentData: DepartmentAndHeads[];
  categoryData: FormCategoryList[];
  statusData: SelectIdDescription[];
}

const EmploymentDetails: React.FC<Props> = ({
  activeCategory,
  handleCategoryClick,
  plantillaData,
  departmentData,
  categoryData,
  statusData,
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<NewSchemaAddEmployeeType>();

  const watchPlantilla = watch("plantilla");
  const watchDepartment = watch("department");
  const watchCategory = watch("category");

  const [showHeadCheckbox, setHeadCheckboxVisibility] =
    useState<boolean>(false);
  const [showAdminCheckbox, setAdminCheckboxVisibility] =
    useState<boolean>(false);
  const [payGrade, setPayGrade] = useState<string>("");
  const [isFieldError, setFieldError] = useState<boolean>(false);

  const inputFields = [
    errors.plantilla,
    errors.status,
    errors.department,
    errors.isDepartmentHead,
    errors.designation,
    errors.category,
    errors.withAdminFunction,
    errors.civilServiceEligibility,
    errors.dailyRate,
  ];

  useEffect(() => {
    setFieldError(inputFields.some((item) => item !== undefined));
  }, [inputFields]);

  useEffect(() => {
    if (watchPlantilla !== "") {
      let toFind = plantillaData.find((item) => item.id === watchPlantilla);
      toFind && setPayGrade(toFind.salary_grade.toString());
    } else {
      setPayGrade("");
    }
  }, [watchPlantilla]);

  useEffect(() => {
    setValue("isDepartmentHead", false);

    const getDepartment = departmentData.find(
      (item) => item.id === watchDepartment,
    );

    if (getDepartment?.department_head === null) {
      setHeadCheckboxVisibility(true);
    } else {
      setHeadCheckboxVisibility(false);
    }
  }, [watchDepartment]);

  useEffect(() => {
    setValue("withAdminFunction", false);

    const getCategory = categoryData.find((item) => item.id === watchCategory);

    if (getCategory?.admin_compatible === true) {
      setAdminCheckboxVisibility(true);
    } else {
      setAdminCheckboxVisibility(false);
    }
  }, [watchCategory]);

  return (
    <>
      <FormCategory
        id={4}
        text="Employment Details"
        activeCategory={activeCategory}
        isFieldError={isFieldError}
        handleCategoryClick={handleCategoryClick}
      >
        {/* Employment Details */}
        <FormInput
          labelText="Plantilla Position"
          requiredAsterisk={true}
          errorMessage={errors.plantilla?.message}
        >
          <CustomSelect
            typeOfData="IdAndDescription"
            data={plantillaData}
            register={register("plantilla")}
          />
        </FormInput>

        <FormInput labelText="Salary Grade">
          <input
            type="number"
            maxLength={5}
            placeholder="Salary Grade"
            value={payGrade}
            disabled
            className="modal-input disabled:bg-accent-100"
          />
        </FormInput>

        <FormInput
          labelText="Status"
          requiredAsterisk={true}
          errorMessage={errors.status?.message}
        >
          <CustomSelect
            typeOfData="IdAndDescription"
            data={statusData}
            register={register("status")}
          />
        </FormInput>

        <FormInput
          labelText="Department"
          requiredAsterisk={true}
          errorMessage={errors.department?.message}
        >
          <CustomSelect
            register={register("department")}
            typeOfData="DepartmentsCategorized"
            data={departmentData}
          />

          {showHeadCheckbox && (
            <label className="form-checkbox">
              <input type="checkbox" {...register("isDepartmentHead")} />
              <span>Assign as Head</span>
            </label>
          )}
        </FormInput>

        <FormInput
          labelText="Designation"
          requiredAsterisk={true}
          errorMessage={errors.designation?.message}
        >
          <input
            type="text"
            maxLength={75}
            placeholder="Designation"
            className="modal-input"
            {...register("designation")}
          />
        </FormInput>

        <FormInput
          labelText="Category"
          requiredAsterisk={true}
          errorMessage={errors.category?.message}
        >
          <CustomSelect
            typeOfData="IdAndDescription"
            data={categoryData}
            register={register("category")}
          />
          {showAdminCheckbox && (
            <label className="form-checkbox">
              <input type="checkbox" {...register("withAdminFunction")} />
              <span>With Admin Function?</span>
            </label>
          )}
        </FormInput>

        <FormInput
          labelText="Civil Service Eligibility"
          errorMessage={errors.civilServiceEligibility?.message}
        >
          <input
            type="text"
            maxLength={75}
            placeholder="Civil Service Eligibility"
            className="modal-input"
            {...register("civilServiceEligibility")}
          />
        </FormInput>

        <FormInput
          labelText="Daily Rate"
          errorMessage={errors.dailyRate?.message}
        >
          <input
            type="text"
            maxLength={25}
            placeholder="Daily Rate"
            className="modal-input"
            {...register("dailyRate")}
          />
        </FormInput>
      </FormCategory>
    </>
  );
};

export default EmploymentDetails;
