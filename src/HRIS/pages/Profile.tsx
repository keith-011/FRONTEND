import { useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/content/PageHeader";
import MainProfile from "../../Shared/components/ui/Cards/MainProfileCard";
import ProfileDetails from "../../Shared/components/ui/Cards/RowCards";
import { useModalContext } from "../context/ModalContext";
import { useFetchData } from "../../hooks/useFetchData";
import { UserProfile } from "../../utils/Types";
import { wordedDate } from "../../utils/Functions";

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
                joinedDate: profileData.created_at,
              }}
              rightContent={[
                { field: "Phone", value: profileData.primary_contact },
                { value: profileData.secondary_contact },
                { field: "Email", value: profileData.email },
                { field: "Birthday", value: wordedDate(profileData.birthday) },
                { field: "Address", value: profileData.present_address },
                { field: "Gender", value: profileData.gender },
              ]}
              employmentStatus={"Active"}
            />
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="md:w-2/5">
                <ProfileDetails
                  header="Account Information"
                  details={[
                    { field: "Email", value: profileData.email },
                    {
                      field: "Employee ID",
                      value: profileData.employee_number_pcc,
                    },
                  ]}
                />
              </div>
              <div className="md:w-3/5">
                <ProfileDetails
                  header="Address & Contact Information"
                  details={[
                    {
                      field: "Primary Phone",
                      value: profileData.primary_contact,
                    },
                    {
                      field: "Secondary Phone",
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
                <ProfileDetails
                  header="Personal Information"
                  details={[
                    { field: "Employee Name", value: profileData.fullname },
                    {
                      field: "Birthday",
                      value: wordedDate(profileData.birthday),
                    },
                    { field: "Gender", value: profileData.gender },
                    { field: "Nationality", value: profileData.nationality },
                    {
                      field: "Marital Status",
                      value: profileData.civil_status,
                    },
                  ]}
                />
              </div>
              <div className="md:w-2/5">
                <ProfileDetails
                  header="Government Numbers"
                  details={[
                    { field: "SSS", value: profileData.sss },
                    { field: "BIR TIN", value: profileData.bir_tin },
                    { field: "GSIS", value: profileData.gsis },
                    { field: "Pag-IBIG", value: profileData.pag_ibig },
                    { field: "PhilHealth", value: profileData.philhealth },
                  ]}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="md:w-3/5">
                <ProfileDetails
                  header="Employment Details"
                  details={[
                    { field: "Position", value: profileData.designation },
                    { field: "Daily Rate", value: profileData.daily_rate },
                    {
                      field: "Civil Service Eligibility",
                      value: profileData.civil_eligibility,
                    },
                  ]}
                />
              </div>
              <div className="md:w-2/5">
                <ProfileDetails
                  header="Educational Attainment"
                  details={[
                    { field: "School Name", value: "KEKE" },
                    { field: "Course Name", value: "courseName" },
                    { field: "School Time Period", value: "schoolTimePeriod" },
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
