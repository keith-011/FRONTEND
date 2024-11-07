import { Outlet, useLocation, useParams } from "react-router-dom";
import PageHeader from "../components/content/PageHeader";
import MainProfileCard from "../components/ui/cards/MainProfileCard";
import ProfileCards from "../components/ui/cards/ProfileCards";
import ColumnCardStyle from "../components/ui/cards/ColumnCards";
// NEEDS RESOLVE
import { wordedDate } from "../utils/Functions";
import { useModalContext } from "../context/ModalContext";
import { useFetchData } from "../hooks/useFetchData";
import { UserProfile } from "../utils/Types";

const ProfileLayout = () => {
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

  // const location = useLocation();
  // console.log(location.pathname === `/profile/${employeeNumberPCC}/documents`);

  return (
    <>
      {isError ? <p>An error ocurred.</p> : isLoading && <p>Loading...</p>}
      {!isLoading && !isError && (
        <>
          <PageHeader header="Profile" breadcrumbs={breadcrumbs} />
          {/* <div className="flex flex-col gap-6"> */}
          <MainProfileCard
            leftContent={{
              profileImage: profileData.image_path,
              employeeName: profileData.fullname,
              department: profileData.department,
              designation: profileData.designation,
              employeeNumberPcc: profileData.employee_number_pcc,
              joinDate: wordedDate(profileData.created_at),
            }}
            rightContent={[
              { fieldName: "Phone", value: profileData.primary_contact },
              { fieldName: "Email", value: profileData.email },
              {
                fieldName: "Birthday",
                value: wordedDate(profileData.birthday),
              },
              { fieldName: "Address", value: profileData.present_address },
              { fieldName: "Gender", value: profileData.gender },
              { fieldName: "Reports to", value: "" },
            ]}
            navButtons={[
              { text: "Profile", link: "" },
              { text: "Documents", link: "/documents" },
              { text: "Employment History", link: "/history" },
            ]}
            // employmentStatus={"Active"}
          />
          <Outlet context={profileData} />
          <br />
          {/* <div className="flex flex-col gap-6 md:flex-row">
            <div className="md:w-2/5">
              <ProfileCards
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
              <ProfileCards
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
          </div> */}
          {/* <div className="flex flex-col gap-6 md:flex-row">
            <div className="md:w-3/5">
              <ProfileCards
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
              <ProfileCards
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
          </div> */}
          {/* <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-grow flex-col gap-6">
              <div>
                <ProfileCards
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
                <ProfileCards
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
          </div> */}
        </>
      )}
    </>
  );
};

export default ProfileLayout;
