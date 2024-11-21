import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import { useModalContext } from "../../../context/ModalContext";
import { ToastHandleAxiosCatch } from "../../../utils/ToastFunctions";
import FormInput from "../../ui/layout/FormInput";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import {  modalFormId, UpdateEmployeeFetchData, UserProfile } from "../../../utils/Types";
import CustomSelect from "../../ui/dropdown/CustomSelect";
import { EditPersonalInformationValidation, EditPersonalInformationValidationType } from "../../../schema/EditProfile";
import { zodResolver } from "@hookform/resolvers/zod";

const EditPersonalInformation: React.FC = ({}) => {
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

  
  const currentYear = new Date().getFullYear() - 17;
  const [minBirthday, setMinBirthday] = useState<string>("");
  const civilStatusData = fetchData.selectData.civilStatus;
  const genderData = fetchData.selectData.gender;

  useEffect(() => {
    const year = new Date();
    const minYear = new Date(year.getFullYear() - 80, 0, 2);
    const formattedMinDate = minYear.toISOString().split("T")[0];
    setMinBirthday(formattedMinDate);
  }, []);

  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const schema = EditPersonalInformationValidation(
    fetchData.existence.email,
    fetchData.selectData.gender,
    fetchData.selectData.civilStatus,
    profileData?.profile.email
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm<EditPersonalInformationValidationType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isModalOpen && profileData) 
    {
      setValue("newFirstName", profileData.profile.first_name);
      setValue("newMiddleName", profileData.profile.middle_name);
      setValue("newLastName", profileData.profile.last_name);
      setValue("newSuffix", profileData.profile.suffix);
      setValue("newEmail", profileData.profile.email);
      setValue("newGender", profileData.profile.gender);
      const birthdayDate = new Date(profileData.profile.birthday);
      const formattedBirthday = birthdayDate
      .toLocaleDateString("en-CA") 
      .split("T")[0];
      setValue("newBirthday", formattedBirthday);
      setValue("newCivilStatus", profileData.profile.civil_status);
      setValue("newNationality", profileData.profile.nationality);
      setLoading(false);
    }
  }, 
  [ isModalOpen, profileData, setValue]);
  
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const fetchDataResponse = await axios.get("/v1/effect/add_employee");
        setFetchData(fetchDataResponse.data);
      } catch (error) {
        setError(ToastHandleAxiosCatch(error));
      } finally {
        setLoading(false);
    }
  })();
    return () => {
      controller.abort();
    };
  }, [refresh]);

  const onFormSubmit = handleSubmit(async (data) => {
    console.log('Form data before submitting:', data);
    try {
      const updateProfile = await axios.patch(`v1/update/update_profile_information/${employeeNumberPCC}?section=personalInfo`, data);
      toast.success(updateProfile.data.message); 
      closeModal(true);
      reset();
      setRefresh(!refresh);
      setLoading(true);
    } catch (error) {
      console.log(data);
      ToastHandleAxiosCatch(error);
    }
  });

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
            labelText="First Name"
            requiredAsterisk={true}
            errorMessage={errors.newFirstName?.message}
          >
            <input
              type="text"
              maxLength={50}
              placeholder="First Name"
              {...register("newFirstName")}
              className="modal-input"
            />
          </FormInput>

          <FormInput
            labelText="Middle Name"
            errorMessage={errors.newMiddleName?.message}
          >
            <input
              type="text"
              maxLength={50}
              placeholder="Middle Name"
              {...register("newMiddleName")}
              className="modal-input"
            />
          </FormInput>

          <FormInput
            labelText="Last Name"
            requiredAsterisk={true}
            errorMessage={errors.newLastName?.message}
          >
            <input
              type="text"
              maxLength={50}
              placeholder="Last Name"
              {...register("newLastName")}
              className="modal-input"
            />
          </FormInput>

          <FormInput
            labelText="Suffix"
            errorMessage={errors.newSuffix?.message}
          >
            <input
              type="text"
              maxLength={10}
              placeholder="Suffix"
              {...register("newSuffix")}
              className="modal-input"
            />
          </FormInput>

          <FormInput
            labelText="Email"
            requiredAsterisk={true}
            errorMessage={errors.newEmail?.message}
          >
            <input
              type="text"
              maxLength={80}
              placeholder="Email"
              {...register("newEmail")}
              className="modal-input"
            />
          </FormInput>

          <FormInput
            labelText="Gender"
            requiredAsterisk={true}
            errorMessage={errors.newGender?.message}
          >
            <CustomSelect
              data={genderData}
              typeOfData="Enum"
              register={register("newGender")}
            />
          </FormInput>

          <FormInput
            labelText="Birthday"
            requiredAsterisk={true}
            errorMessage={errors.newBirthday?.message}
          >
            <input
              type="date"
              min={minBirthday}
              max={`${currentYear}-12-31`}
              className="modal-input"
              {...register("newBirthday")}
            />
          </FormInput>

          <FormInput
            labelText="Civil Status"
            requiredAsterisk={true}
            errorMessage={errors.newCivilStatus?.message}
          >
            <CustomSelect
              data={civilStatusData}
              typeOfData="Enum"
              register={register("newCivilStatus")}
            />
          </FormInput>

          <FormInput
            labelText="Nationality"
            requiredAsterisk={true}
            errorMessage={errors.newNationality?.message}
          >
            <input
              type="text"
              maxLength={50}
              placeholder="Nationality"
              className="modal-input"
              {...register("newNationality")}
            />
          </FormInput>
        </form>
      )}
    </>
  );
};

export default EditPersonalInformation;
