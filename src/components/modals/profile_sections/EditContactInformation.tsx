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
import {
  modalFormId,
  UpdateEmployeeFetchData,
  UserProfile,
} from "../../../utils/Types";
import {
  EditAddressContactInformationValidation,
  EditAddressContactInformationValidationType,
} from "../../../schema/EditProfile";

const EditContactInformation: React.FC = () => {
  const { closeModal, isModalOpen, refreshParent } = useModalContext();
  const { employeeNumberPCC } = useParams();
  const { tableData } = useFetchData<UserProfile>(
    `/v1/profile/profile_information/${employeeNumberPCC}`,
    refreshParent
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
  const [isSameAddress, setSameAddress] = useState<boolean>(false);

  const schema = EditAddressContactInformationValidation(
    fetchData.existence.primaryContact,
    profileData?.profile.primary_contact
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<EditAddressContactInformationValidationType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const watchPresentAddress = watch("newPresentAddress");

 
  const formatContactNumber = (number: string): string => {
    if (!number) return ""; 
    return number.startsWith("+63") ? `0${number.slice(3)}` : number;
  };

  useEffect(() => {
    if (isModalOpen && profileData) {
      setValue("newPrimaryContact", formatContactNumber(profileData.profile.primary_contact));
      setValue("newSecondaryContact", formatContactNumber(profileData.profile.secondary_contact));
      setValue("newPresentAddress", profileData.profile.present_address);
      setValue("newPermanentAddress", profileData.profile.permanent_address);
      setSameAddress(profileData.profile.present_address ===profileData.profile.permanent_address);
    }
  }, [isModalOpen, profileData, setValue]);


  useEffect(() => {
    if (isSameAddress) {
      setValue("newPermanentAddress", watchPresentAddress);
      trigger("newPermanentAddress");
    } else {
      setValue("newPermanentAddress", "");
    }
  }, [isSameAddress, watchPresentAddress, setValue, trigger]);


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
    try {
      
      const updateProfile = await axios.patch(
        `v1/update/update_profile_information/${employeeNumberPCC}?section=contactInfo`,
        data
      );
      toast.success(updateProfile.data.message);
      closeModal(true);
      reset();
      setRefresh(!refresh);
    } catch (error) {
      ToastHandleAxiosCatch(error);
    }
  });

  return (
    <>
      {isError ? <p>An error occurred.</p> : isLoading && <p>Loading...</p>}
      {!isLoading && !isError && (
        <form
          id={modalFormId}
          autoComplete="off"
          className="flex flex-col gap-4 px-6 py-8"
          onSubmit={onFormSubmit}
        >
          <FormInput
            labelText="Primary Contact"
            requiredAsterisk={true}
            errorMessage={errors.newPrimaryContact?.message}
          >
            <input
              type="tel"
              maxLength={11}
              placeholder="Contact 1"
              {...register("newPrimaryContact")}
              className="modal-input"
            />
          </FormInput>
          <FormInput
            labelText="Secondary Contact"
            errorMessage={errors.newSecondaryContact?.message}
          >
            <input
              type="tel"
              maxLength={11}
              placeholder="Contact 2"
              {...register("newSecondaryContact")}
              className="modal-input"
            />
          </FormInput>
          <FormInput
            labelText="Present Address"
            requiredAsterisk={true}
            errorMessage={errors.newPresentAddress?.message}
          >
            <textarea
              maxLength={175}
              placeholder="Present Address"
              {...register("newPresentAddress")}
              className="modal-input h-32"
            />
          </FormInput>
          <FormInput
            labelText="Permanent Address"
            requiredAsterisk={true}
            errorMessage={errors.newPermanentAddress?.message}
          >
            <textarea
              maxLength={175}
              placeholder="Permanent Address"
              disabled={isSameAddress}
              {...register("newPermanentAddress")}
              className="modal-input h-32 disabled:bg-accent-100"
            />
            <label className="form-checkbox">
              <input
                type="checkbox"
                checked={isSameAddress}
                onChange={(e) => setSameAddress(e.target.checked)}
              />
              <span>Same as present address</span>
            </label>
          </FormInput>
        </form>
      )}
    </>
  );
};

export default EditContactInformation;
