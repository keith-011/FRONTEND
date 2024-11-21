import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useModalContext } from "../../../context/ModalContext";
import { ToastHandleAxiosCatch } from "../../../utils/ToastFunctions";
import FormInput from "../../ui/layout/FormInput";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { modalFormId, UpdateEmployeeFetchData, UserProfile } from "../../../utils/Types";
import { EditGovernmentNumberValidation, EditGovernmentNumberValidationType } from "../../../schema/EditProfile";

const EditGovernmentNumber: React.FC = () => {
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

  const schema = EditGovernmentNumberValidation(
    fetchData.existence.sss,
    fetchData.existence.birTin,
    fetchData.existence.gsis,
    fetchData.existence.pagIbig,
    fetchData.existence.philHealth,
    profileData?.profile.sss,
    profileData?.profile.bir_tin,
    profileData?.profile.gsis,
    profileData?.profile.pag_ibig,
    profileData?.profile.philhealth
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm<EditGovernmentNumberValidationType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isModalOpen && profileData) {
      setValue("newSss", profileData.profile.sss);
      setValue("newBirTin", profileData.profile.bir_tin);
      setValue("newGsis", profileData.profile.gsis);
      setValue("newPagIbig", profileData.profile.pag_ibig);
      setValue("newPhilHealth", profileData.profile.philhealth);
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
      const updateProfile = await axios.patch(`v1/update/update_profile_information/${employeeNumberPCC}?section=governmentNumbers`, data);
      toast.success(updateProfile.data.message); 
      closeModal(true);
      reset();
      setRefresh(!refresh);
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
            labelText="SSS"
            errorMessage={errors.newSss?.message}
          >
            <input
              type="text"
              maxLength={25}
              placeholder="SSS"
              {...register("newSss")}
              className="modal-input"
            />
          </FormInput>

          <FormInput
            labelText="BIR / TIN"
            errorMessage={errors.newBirTin?.message}
          >
            <input
              type="text"
              maxLength={25}
              placeholder="BIR / TIN"
              {...register("newBirTin")}
              className="modal-input"
            />
          </FormInput>

          <FormInput
            labelText="GSIS"
            errorMessage={errors.newGsis?.message}
          >
            <input
              type="text"
              maxLength={25}
              placeholder="GSIS"
              {...register("newGsis")}
              className="modal-input"
            />
          </FormInput>

          <FormInput
            labelText="Pag-IBIG"
            errorMessage={errors.newPagIbig?.message}
          >
            <input
              type="text"
              maxLength={25}
              placeholder="Pag-IBIG"
              {...register("newPagIbig")}
              className="modal-input"
            />
          </FormInput>

          <FormInput
            labelText="PhilHealth"
            errorMessage={errors.newPhilHealth?.message}
          >
            <input
              type="text"
              maxLength={25}
              placeholder="PhilHealth"
              {...register("newPhilHealth")}
              className="modal-input"
            />
          </FormInput>
        </form>
      )}
    </>
  );
};

export default EditGovernmentNumber;
