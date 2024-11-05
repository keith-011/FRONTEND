import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AddDepartmentSchema,
  AddDepartmentType,
} from "../../schema/AddDepartment";

import {
  ExistingDepartmentNames,
  SelectIdDescription,
  modalFormId,
} from "../../../utils/Types";

import FormInput from "../../../Shared/components/ui/layout/FormInput";
import CustomSelect from "../../../Shared/components/ui/dropdown/CustomSelect";
import { ToastHandleAxiosCatch } from "../../../utils/ToastFunctions";
import { useModalContext } from "../../context/ModalContext";
import { toast } from "react-toastify";

const AddDepartment = () => {
  const [nonHeadList, setNonHeadList] = useState<SelectIdDescription[]>([]);
  const [departmentNames, setDepartmentNames] = useState<
    ExistingDepartmentNames[]
  >([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const schema = AddDepartmentSchema(departmentNames);

  const { closeModal, isModalOpen } = useModalContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddDepartmentType>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      department: "",
      department_head: "",
    },
  });

  const onFormSubmit = handleSubmit(async (data) => {
    if (data.department_head === "none") {
      data.department_head = null;
    }
    try {
      const toPost = await axios.post("/v1/forms/insert/department", data);
      toast.success(toPost.data.message);
      closeModal(true);
      reset();
      setRefresh(!refresh);
    } catch (error) {
      ToastHandleAxiosCatch(error);
    }
  });

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const [fetchDepartmentHeads, fetchDepartmentNames] = await Promise.all([
          axios.get("/v1/forms/select/department_head", {
            signal: controller.signal,
          }),
          axios.get("/v1/existence/departments", {
            signal: controller.signal,
          }),
        ]);
        setNonHeadList(fetchDepartmentHeads.data.rows);
        setDepartmentNames(fetchDepartmentNames.data.rows);
      } catch (error) {
        setError(ToastHandleAxiosCatch(error));
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [refresh, isModalOpen]);

  return (
    <>
      {isLoading && <p className="ml-6 mt-8">Loading...</p>}
      {!isLoading && isError && (
        <p className="ml-6 mt-8">Error connecting to the server.</p>
      )}
      {!isLoading && !isError && (
        <>
          <form
            id={modalFormId}
            autoComplete="off"
            className="flex flex-col gap-4 px-6 py-8"
            onSubmit={onFormSubmit}
          >
            <FormInput
              labelText="Department"
              errorMessage={errors.department?.message}
            >
              <input
                type="text"
                maxLength={150}
                placeholder="Department Name"
                className="modal-input"
                {...register("department")}
              />
            </FormInput>
            <FormInput
              labelText="Department Head"
              errorMessage={errors.department_head?.message}
            >
              <CustomSelect
                typeOfData="IdAndDescription"
                data={nonHeadList}
                register={register("department_head")}
              />
            </FormInput>
          </form>
        </>
      )}
    </>
  );
};
export default AddDepartment;
