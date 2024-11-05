import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PageHeader from "../components/content/PageHeader";
import MainProfile from "../../Shared/components/ui/Cards/MainProfileCard";
import RowCardStyle from "../../Shared/components/ui/Cards/RowCards";
import ColumnCardStyle from "../../Shared/components/ui/Cards/ColumnCards";
// NEEDS RESOLVE
import { wordedDate } from "../../utils/Functions";
import { useModalContext } from "../context/ModalContext";
import { useFetchData } from "../../hooks/useFetchData";
import { UserProfile } from "../../utils/Types";

const Profile = () => {
  const breadcrumbs = [
    { text: "Employees", link: "/employees" },
    { text: "Profile", link: "/profile" },
  ];

  const { employeeNumberPCC } = useParams();

  const { openModal, refreshParent } = useModalContext();
  const { tableData, isError, isLoading } = useFetchData<UserProfile>(
    `/v1/profile/profile_information/${employeeNumberPCC}`,
    refreshParent,
  );

  const profileData = tableData[0];

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && isError && <p>An error ocurred.</p>}
      {!isLoading && !isError && (
        <>
          <PageHeader header="Profile" breadcrumbs={breadcrumbs} />
          <div className="flex flex-col gap-6">
            <MainProfile
              employeeImagePath={profileData.image_path}
              leftContent={{
                employeeName: profileData.fullname,
                plantillaPosition: profileData.plantilla,
                department: profileData.department,
                employeeId: profileData.employee_number_pcc,
                joinedDate: wordedDate(profileData.created_at),
              }}
              rightContent={[
                { field: "Phone:", value: profileData.primary_contact },
                { value: profileData.secondary_contact },
                { field: "Email:", value: profileData.email },
                { field: "Birthday:", value: wordedDate(profileData.birthday) },
                { field: "Address:", value: profileData.present_address },
                { field: "Gender:", value: profileData.gender },
                { field: "Reports to:", value: "" },
              ]}
              employmentStatus={"Active"}
            />
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="md:w-2/5">
                <RowCardStyle
                  header="Account Information"
                  details={[
                    { field: "Access Level", value: "" },
                    { field: "Employement Status", value: "" },
                    {
                      field: "Employee ID",
                      value: profileData.employee_number_pcc,
                    },
                    { field: "Email", value: profileData.email },
                  ]}
                />
              </div>
              <div className="md:w-3/5">
                <RowCardStyle
                  header="Address & Contact Information"
                  details={[
                    { field: "Contact 1", value: profileData.primary_contact },
                    {
                      field: "Contact 2",
                      value: profileData.secondary_contact,
                    },
                    {
                      field: "Present Address",
                      value: profileData.present_address,
                    },
                    {
                      field: "Permanent Address",
                      value: profileData.permanent_address,
                    },
                  ]}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="md:w-3/5">
                <RowCardStyle
                  header="Personal Information"
                  details={[
                    { field: "Full Name", value: profileData.fullname },
                    {
                      field: "Birthday",
                      value: wordedDate(profileData.birthday),
                    },
                    { field: "Gender", value: profileData.gender },
                    { field: "Nationality", value: profileData.nationality },
                    { field: "Civil Status", value: profileData.civil_status },
                  ]}
                />
              </div>
              <div className="md:w-2/5">
                <RowCardStyle
                  header="Government Numbers"
                  details={[
                    { field: "SSS", value: profileData.sss },
                    { field: "BIR/TIN", value: profileData.bir_tin },
                    { field: "GSIS", value: profileData.gsis },
                    { field: "Pag-IBIG", value: profileData.pag_ibig },
                    { field: "PhilHealth", value: profileData.philhealth },
                  ]}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex flex-grow flex-col gap-6">
                <div>
                  <RowCardStyle
                    header="Employment Details"
                    details={[
                      {
                        field: "Plantilla Position",
                        value: profileData.plantilla,
                      },
                      {
                        field: "Salary Grade",
                        value: profileData.salary_grade,
                      },
                      { field: "Employee Status", value: profileData.status },
                      {
                        field: "Civil Service Eligibility",
                        value: profileData.civil_eligibility,
                      },
                      { field: "Daily Rate", value: profileData.daily_rate },
                      { field: "Supervisor", value: "" },
                    ]}
                  />
                </div>
                <div>
                  <RowCardStyle
                    header="Employment Role"
                    details={[
                      { field: "Department", value: profileData.department },
                      { value: profileData.department_head }, ///Assigned as Head
                      { field: "Category", value: profileData.category },
                      {
                        value:
                          profileData.category != "Non-Teaching"
                            ? profileData.admin_function
                              ? "With Admin Function"
                              : "No Admin Function"
                            : "",
                      }, ///With Admin function
                    ]}
                  />
                </div>
              </div>
              <div className="md:w-2/5">
                <ColumnCardStyle
                  header="Educational Attainment"
                  details={[
                    {
                      field: "schoolName",
                      value1: "courseName",
                      value2: "schoolTimePeriod",
                    },
                    {
                      field: "schoolName",
                      value1: "courseName",
                      value2: "schoolTimePeriod",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
