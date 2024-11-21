import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useModalContext } from "../../../context/ModalContext";
import { ToastHandleAxiosCatch } from "../../../utils/ToastFunctions";
import FormInput from "../../ui/layout/FormInput";
import DefaultButton from "../../ui/button/DefaultButton";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { EditEducationalAttainmentValidation, EditEducationalAttainmentValidationType } from "../../../schema/EditProfile";
import { UpdateEmployeeFetchData, UserProfile } from "../../../utils/Types";
import CustomSelect from "../../ui/dropdown/CustomSelect";
import { zodResolver } from "@hookform/resolvers/zod";

const EditEducationalAttainment: React.FC = () => {
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
  const educationLevel = fetchData.selectData.educationLevel;

  const {
    register,
    watch,
    handleSubmit,
    reset,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<EditEducationalAttainmentValidationType>({
    resolver: zodResolver(EditEducationalAttainmentValidation()),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "newEducationalBackground", 
    control,
  });

  useEffect(() => {
    if (isModalOpen && profileData) {
      reset();
      profileData.education.forEach((education) => {
        append({
          newEducationLevel: education.education_level,
          newProgramType: education.program_type ?? "",
          newCourseTitle: education.course_title ?? "",
          newSchoolName: education.school_name ?? "",
          newYearStarted: education.year_start ? String(education.year_start) : "",
          newYearGraduated: education.year_end ? String(education.year_end) : "",
          newIsStudying: education.is_studying ?? false,
        });
      });
      setLoading(false);
    }
  }, [isModalOpen, profileData]);

  
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
    console.log("Submitting data:", data);
    try {
      const updateProfile = await axios.patch(`/v1/update/update_profile_information/${employeeNumberPCC}?section=educationalAttainment`, data);
      toast.success(updateProfile.data.message);
      closeModal(true);
      reset();
      setRefresh(!refresh);
    } catch (error) {
      ToastHandleAxiosCatch(error);
      console.log(data);
    }
  });

  useEffect(() => {
    console.log("Fields:", fields);
  }, [fields]);
  
  const watchEducation = watch("newEducationalBackground");

  return (
    <>
      {isError ? <p>An error occurred.</p> : isLoading && <p>Loading...</p>}
      {!isLoading && !isError && (
        <form
          autoComplete="off"
          className="flex flex-col gap-4 px-6 py-8"
          onSubmit={onFormSubmit}
        >
          {fields.map((item, index) => (
            <React.Fragment key={item.id}>
              <FormInput labelText="Education Level" requiredAsterisk={true}>
                <CustomSelect
                  defaultNone={false}
                  register={register(
                    `newEducationalBackground.${index}.newEducationLevel`, 
                    {
                      onChange: () => {
                        setValue(`newEducationalBackground.${index}.newProgramType`, "");
                        setValue(`newEducationalBackground.${index}.newCourseTitle`, "");
                        setValue(`newEducationalBackground.${index}.newSchoolName`, "");
                        setValue(`newEducationalBackground.${index}.newYearStarted`, "");
                        setValue(`newEducationalBackground.${index}.newYearGraduated`, "");
                        setValue(`newEducationalBackground.${index}.newIsStudying`, false);
                      },
                    }
                  )}
                  typeOfData="Enum"
                  data={educationLevel}
                />
              </FormInput>

              {educationLevel.some(
                (item) => item.description === watchEducation[index]?.newEducationLevel
              ) && (
                <>
                  {watchEducation[index]?.newEducationLevel === "Graduate Studies" && (
                    <FormInput 
                      labelText="Program Type" 
                      requiredAsterisk={true}
                      errorMessage={errors.newEducationalBackground?.[index]?.newProgramType?.message}
                    >
                      <input
                        type="text"
                        maxLength={100}
                        placeholder="e.g. Master's Degree / Doctorate Degree"
                        {...register(`newEducationalBackground.${index}.newProgramType`)}
                        className="modal-input"
                      />
                    </FormInput>
                  )}

                  {(watchEducation[index]?.newEducationLevel === "Vocational" ||
                    watchEducation[index]?.newEducationLevel === "College" ||
                    watchEducation[index]?.newEducationLevel === "Graduate Studies") && (
                    <FormInput 
                    labelText={
                        watchEducation[index].newEducationLevel === "Vocational"
                          ? "Program Title"
                          : "Degree / Course Title"
                      }
                      requiredAsterisk={true}
                      errorMessage={errors.newEducationalBackground?.[index]?.newCourseTitle?.message}
                    >
                      <input
                        type="text"
                        maxLength={100}
                        placeholder="Title"
                        {...register(`newEducationalBackground.${index}.newCourseTitle`)}
                        className="modal-input"
                      />
                    </FormInput>
                  )}

                  <FormInput 
                    labelText="School Name" 
                    requiredAsterisk={true}
                    errorMessage={errors.newEducationalBackground?.[index]?.newSchoolName?.message}
                  >
                    <input
                      type="text"
                      maxLength={100}
                      placeholder="School Name"
                      {...register(`newEducationalBackground.${index}.newSchoolName`)}
                      className="modal-input"
                    />
                  </FormInput>

                  <FormInput 
                    labelText="Year Started" 
                    requiredAsterisk={true}
                    errorMessage={errors.newEducationalBackground?.[index]?.newYearStarted?.message}
                  >
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="Year"
                      {...register(`newEducationalBackground.${index}.newYearStarted`, {
                        onChange: () => {
                          trigger(`newEducationalBackground.${index}.newYearGraduated`);
                        },
                      })}
                      className="modal-input"
                    />
                  </FormInput>

                  <FormInput 
                    labelText="Year Graduated" 
                    requiredAsterisk={true}
                    errorMessage={errors.newEducationalBackground?.[index]?.newYearGraduated?.message}
                  >
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="Year"
                      {...register(`newEducationalBackground.${index}.newYearGraduated`)}
                      className="modal-input disabled:bg-accent-100"
                      disabled={watchEducation[index]?.newIsStudying}
                    />
                    {(watchEducation[index].newEducationLevel === "Vocational" ||
                    watchEducation[index].newEducationLevel === "College" ||
                    watchEducation[index].newEducationLevel ===
                      "Graduate Studies") && (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register(`newEducationalBackground.${index}.newIsStudying`, {
                          onChange: () => {
                            setValue(`newEducationalBackground.${index}.newYearGraduated`, "");
                            trigger(`newEducationalBackground.${index}.newYearGraduated`);
                          },
                        })}
                      />
                      <span>Currently Studying</span>
                    </label>
                    )}
                  </FormInput>  
                </>
              )}

              {index !== -1 && (
                <DefaultButton
                  type="button"
                  Icon={RemoveOutlinedIcon}
                  className="bg-red-600 hover:bg-red-500"
                  handleClick={() => remove(index)}
                  text="Remove Education"
                />
              )}
            </React.Fragment>
          ))}


          <DefaultButton
            type="button"
            Icon={AddOutlinedIcon}
            className="bg-forest-400 hover:bg-forest-600"
            handleClick={() =>
              append({
                newEducationLevel: "Vocational",
                newProgramType: "",
                newCourseTitle: "",
                newSchoolName: "",
                newYearStarted: "",
                newYearGraduated: "",
                newIsStudying: false,
              })
            }
            text="Add Education"
          />
          <span className="text-red-400">{errors.newEducationalBackground?.message}</span>
        </form>
      )}
    </>
  );
};

export default EditEducationalAttainment;
