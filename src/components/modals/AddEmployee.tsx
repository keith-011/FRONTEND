import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";

import { AddEmployeeFetchData, modalFormId } from "../../utils/Types";

import {
  NewSchemaAddEmployee,
  NewSchemaAddEmployeeType,
} from "../../schema/AddEmployee";

import { ToastHandleAxiosCatch } from "../../utils/ToastFunctions";

import { useModalContext } from "../../context/ModalContext";

import PersonalInformation from "../content/form_sections/add_employee/PersonalInformation";
import AddressContact from "../content/form_sections/add_employee/AddressContact";
import EmploymentDetails from "../content/form_sections/add_employee/EmploymentDetails";
import EducationalBackground from "../content/form_sections/add_employee/EducationalBackground";
import GovernmentNumbers from "../content/form_sections/add_employee/GovernmentNumbers";
import AccountInformation from "../content/form_sections/add_employee/AccountInformation";

const AddEmployee: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(1);

  const [fetchData, setFetchData] = useState<AddEmployeeFetchData>({
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

  // Base loading states
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const schema = NewSchemaAddEmployee(
    fetchData.existence.employeeNumberPCC,
    fetchData.existence.employeeNumberCH,
    fetchData.existence.email,
    fetchData.existence.sss,
    fetchData.existence.birTin,
    fetchData.existence.gsis,
    fetchData.existence.pagIbig,
    fetchData.existence.philHealth,
    fetchData.existence.primaryContact,
    fetchData.selectData.gender,
    fetchData.selectData.civilStatus,
  );

  const { closeModal } = useModalContext();

  const formMethods = useForm<NewSchemaAddEmployeeType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      // Account Information
      employeeNumberCityHall: "",
      employeeNumberPCC: "",
      autoGenerate: true,
      email: "",
      password: "",
      confirm_password: "",

      // Personal Information
      firstName: "",
      middleName: "",
      lastName: "",
      suffix: "",
      // gender: "",
      birthday: "",
      civilStatus: "",
      nationality: "",

      // Address & Contact
      primaryContact: "",
      secondaryContact: "",
      presentAddress: "",
      permanentAddress: "",

      // Employment Details
      plantilla: "",
      status: "",
      department: "",
      isDepartmentHead: false,
      designation: "",
      category: "",
      withAdminFunction: false,
      civilServiceEligibility: "",

      // Educational Background
      educationalBackground: [
        {
          educationLevel: "Secondary",

          programType: "",
          courseTitle: "",

          schoolName: "",
          yearStart: "",
          yearGraduated: "",
          isStudying: false,
        },
      ],

      // Government Numbers
      sss: "",
      birTin: "",
      gsis: "",
      pagibig: "",
      philhealth: "",
    },
  });

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const fetchData = await axios.get("/v1/effect/add_employee");
        setFetchData(fetchData.data);
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

  // Events
  const onFormSubmit = formMethods.handleSubmit(async (data) => {
    console.log(fetchData);
    try {
      const insertNewEmployee = await axios.post("/v1/insert/employee", data);
      toast.success(insertNewEmployee.data.message);
      closeModal(true);
      formMethods.reset();
      setRefresh(!refresh);
    } catch (error) {
      console.log(data);
      ToastHandleAxiosCatch(error);
    }
  });

  const handleCategoryClick = (id: number) => {
    activeCategory === id ? setActiveCategory(null) : setActiveCategory(id);
  };

  return (
    <>
      {isError ? <p>An error ocurred.</p> : isLoading && <p>Loading...</p>}

      {!isLoading && !isError && (
        <>
          <form
            id={modalFormId}
            onSubmit={onFormSubmit}
            autoComplete="off"
            className="flex flex-col gap-8 px-6 py-8"
          >
            <FormProvider {...formMethods}>
              <AccountInformation
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
              />
              <PersonalInformation
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
                genderData={fetchData.selectData.gender}
                civilStatusData={fetchData.selectData.civilStatus}
              />
              <AddressContact
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
              />
              <EmploymentDetails
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
                plantillaData={fetchData.selectData.plantilla}
                departmentData={fetchData.selectData.department}
                categoryData={fetchData.selectData.category}
                statusData={fetchData.selectData.status}
              />
              <EducationalBackground
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
                educationLevelData={fetchData.selectData.educationLevel}
              />

              <GovernmentNumbers
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
              />
            </FormProvider>
          </form>
        </>
      )}
    </>
  );
};

export default AddEmployee;
