import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import {
  EditEmploymentDetailsValidation,
  EditEmploymentDetailsValidationType,
} from "../../../schema/EditProfile";
import { useModalContext } from "../../../context/ModalContext";
import { ToastHandleAxiosCatch } from "../../../utils/ToastFunctions";
import FormInput from "../../ui/layout/FormInput";
import CustomSelect from "../../ui/dropdown/CustomSelect";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import {
  modalFormId,
  UpdateEmployeeFetchData,
  UserProfile,
} from "../../../utils/Types";
import { zodResolver } from "@hookform/resolvers/zod";

const EditEmploymentDetails: React.FC = () => {
  const { closeModal, isModalOpen, refreshParent } = useModalContext();
  const { employeeNumberPCC } = useParams();
  const { tableData } = useFetchData<UserProfile>(
    `/v1/profile/profile_information/${employeeNumberPCC}`,
    refreshParent,
  );
  const profileData = tableData[0];

  const [fetchData, setFetchData] = useState<UpdateEmployeeFetchData>({
    existence: {
      email: [],
      employeeNumberPCC: [],
      employeeNumberCH: [],
      sss: [],
      birTin: [],
      gsis: [],
      pagIbig: [],
      philHealth: [],
      primaryContact: [],
    },
    selectData: {
      plantilla: [],
      department: [],
      category: [],
      status: [],
      gender: [],
      civilStatus: [],
      educationLevel: [],
    },
  });

  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [payGrade, setPayGrade] = useState<string>("");
  const [departmentHead, setDepartmentHead] = useState<any>(null);
  const plantillaData = fetchData.selectData.plantilla;
  const statusData = fetchData.selectData.status;
  const departmentData = fetchData.selectData.department;
  const categoryData = fetchData.selectData.category;
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EditEmploymentDetailsValidationType>({
    resolver: zodResolver(EditEmploymentDetailsValidation()),
    mode: "onChange",
  });

  const watchPlantilla = watch("newPlantilla");
  const watchDepartment = watch("newDepartment");
  const watchCategory = watch("newCategory");
  
  useEffect(() => {
    if ( !isModalOpen || !profileData || !departmentData || !plantillaData || !statusData || !categoryData
    ) {
      return;
    }
    const selectedPlantilla = plantillaData.find((item) => item.description === profileData.profile.plantilla,);
    const selectedStatus = statusData.find((item) => item.description === profileData.profile.status,);
    const selectedDepartment = departmentData.find((item) => item.department === profileData.profile.department,);
    const selectedCategory = categoryData.find((item) => item.description === profileData.profile.category,);
    setValue("newPlantilla", selectedPlantilla?.id || "");
    setValue("newStatus", selectedStatus?.id || "");
    setValue("newDepartment", selectedDepartment?.id || "");
    setValue("newCategory", selectedCategory?.id || "");
    setValue("newIsDepartmentHead", profileData.profile.is_department_head);
    setValue("newDesignation", profileData.profile.designation);
    setValue("newWithAdminFunction", profileData.profile.admin_function);
    setValue("newCivilServiceEligibility",profileData.profile.civil_eligibility,);
    setValue("newDailyRate", profileData.profile.daily_rate);
    setLoading(false);
  }, [
    isModalOpen,
    profileData,
    setValue,
    plantillaData,
    statusData,
    departmentData,
    categoryData,
  ]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const departmentHeadResponse = await axios.get(`/v1/update/current_checkbox/${employeeNumberPCC}`);
        setDepartmentHead(departmentHeadResponse.data);
        const employeeEffectResponse = await axios.get("/v1/effect/add_employee");
        setFetchData(employeeEffectResponse.data);
      } catch (error) {
        setError(ToastHandleAxiosCatch(error));
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
    return () => {
      controller.abort();
    };
  }, [employeeNumberPCC, refresh]); 
  
  useEffect(() => {
    if (watchPlantilla) {
      const selectedPlantilla = fetchData.selectData.plantilla.find(
        (item) => item.id === watchPlantilla,
      );
      setPayGrade(
        selectedPlantilla ? selectedPlantilla.salary_grade.toString() : "",
      );
    }
  }, [watchPlantilla, fetchData.selectData.plantilla]);

  const onFormSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      const updateProfile = await axios.patch(
        `/v1/update/update_profile_information/${employeeNumberPCC}?section=employmentDetails`,
        data,
      );
      toast.success(updateProfile.data.message);
      closeModal(true);
      reset();
      setRefresh(!refresh);
    } catch (error) {
      ToastHandleAxiosCatch(error);
      console.log(data);
    }
  });
  console.log(watchDepartment)
  console.log(departmentHead)
  return (
    <>
      {isError ? <p>An error ocurred.</p> : isLoading && <p>Loading...</p>}
      {!isLoading && !isError && (
        <form
          id={modalFormId}
          autoComplete="off"
          className="flex flex-col gap-4 px-6 py-8"
          onSubmit={onFormSubmit}
        >
          <FormInput
            labelText="Plantilla Position"
            requiredAsterisk={true}
            errorMessage={errors.newPlantilla?.message}
          >
            <CustomSelect
              typeOfData="IdAndDescription"
              data={plantillaData}
              register={register("newPlantilla")}
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
            errorMessage={errors.newStatus?.message}
          >
            <CustomSelect
              typeOfData="IdAndDescription"
              data={statusData}
              register={register("newStatus")}
            />
          </FormInput>

          <FormInput
            labelText="Department"
            requiredAsterisk={true}
            errorMessage={errors.newDepartment?.message}
          >
            <CustomSelect
              typeOfData="DepartmentsCategorized"
              data={departmentData}
              register={register("newDepartment")}
            />
            {(fetchData.selectData.department.find((d) => d.id === watchDepartment)?.head_id === departmentHead ||
              fetchData.selectData.department.find((d) => d.id === watchDepartment,)?.head_id === null) 
              && (
              <label className="form-checkbox">
                <input 
                type="checkbox" {...register("newIsDepartmentHead")} 
                />
                <span>Assign as Head</span>
              </label>
            )}
          </FormInput>

          <FormInput
            labelText="Designation"
            requiredAsterisk={true}
            errorMessage={errors.newDesignation?.message}
          >
            <input
              type="text"
              maxLength={75}
              placeholder="Designation"
              className="modal-input"
              {...register("newDesignation")}
            />
          </FormInput>

          <FormInput
            labelText="Category"
            requiredAsterisk={true}
            errorMessage={errors.newCategory?.message}
          >
            <CustomSelect
              typeOfData="IdAndDescription"
              data={categoryData}
              register={register("newCategory")}
            />
            {fetchData.selectData.category.find((c) => c.id === watchCategory)
              ?.admin_compatible && (
              <label className="form-checkbox">
                <input type="checkbox" {...register("newWithAdminFunction")} />
                <span>With Admin Function?</span>
              </label>
            )}
          </FormInput>

          <FormInput
            labelText="Civil Service Eligibility"
            errorMessage={errors.newCivilServiceEligibility?.message}
          >
            <input
              type="text"
              maxLength={75}
              placeholder="Civil Service Eligibility"
              className="modal-input"
              {...register("newCivilServiceEligibility")}
            />
          </FormInput>

          <FormInput
            labelText="Daily Rate"
            errorMessage={errors.newDailyRate?.message}
          >
            <input
              type="text"
              maxLength={25}
              placeholder="Daily Rate"
              className="modal-input"
              {...register("newDailyRate")}
            />
          </FormInput>
        </form>
      )}
    </>
  );
};

export default EditEmploymentDetails;
