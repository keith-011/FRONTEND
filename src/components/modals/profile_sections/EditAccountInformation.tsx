import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useModalContext } from "../../../context/ModalContext";
import { ToastHandleAxiosCatch } from "../../../utils/ToastFunctions";
import FormInput from "../../ui/layout/FormInput";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { UpdateEmployeeFetchData, modalFormId, UserProfile } from "../../../utils/Types";
import { EditAccountInformationValidation, EditAccountInformationValidationType } from "../../../schema/EditProfile";

const EditAccountInformation: React.FC = () => {
  const { closeModal, isModalOpen, refreshParent } = useModalContext();
  const { employeeNumberPCC } = useParams();
  const navigate = useNavigate();
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

  const schema = EditAccountInformationValidation(
    fetchData.existence.employeeNumberPCC,
    fetchData.existence.employeeNumberCH,
    profileData?.profile.employee_number_pcc,
    profileData?.profile.employee_number_ch
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm<EditAccountInformationValidationType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isModalOpen && profileData) {
      setValue("newEmployeeNumberPCC", profileData.profile.employee_number_pcc);
      setValue("newEmployeeNumberCityHall", profileData.profile.employee_number_ch);
    }
  }, [isModalOpen, profileData, setValue]);

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
      const updateProfile = await axios.patch(`v1/update/update_profile_information/${employeeNumberPCC}?section=accountInfo`, data);
      const newEmployeeNumberPCC = data.newEmployeeNumberPCC;
      console.log(newEmployeeNumberPCC)
      toast.success(updateProfile.data.message); 
      closeModal(true);
      reset();
      setRefresh(!refresh);
      navigate(`/profile/${newEmployeeNumberPCC}`);
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
            labelText="Employee Number (PCC)"
            requiredAsterisk={true}
            errorMessage={errors.newEmployeeNumberPCC?.message}
          >
            <input
              type="text"
              maxLength={50}
              placeholder="Employee Number (PCC)"
              {...register("newEmployeeNumberPCC")}
              className="modal-input"
            />
          </FormInput>
          <FormInput
            labelText="Employee Number (City Hall)"
            requiredAsterisk={true}
            errorMessage={errors.newEmployeeNumberCityHall?.message}
          >
            <input
              type="text"
              maxLength={50}
              placeholder="Employee Number (City Hall)"
              {...register("newEmployeeNumberCityHall")}
              className="modal-input"
            />
          </FormInput>
        </form>
      )}
    </>
  );
};

export default EditAccountInformation;
