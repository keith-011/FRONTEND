import { useOutletContext } from "react-router-dom";
import { UserProfile } from "../utils/Types";

import { wordedDate } from "../utils/Functions";

import { useModalContext } from "../context/ModalContext";
import EditAccountInformation from "../components/modals/profile_sections/EditAccountInformation";
import EditContactInformation from "../components/modals/profile_sections/EditContactInformation";
import EditGovernmentNumber from "../components/modals/profile_sections/EditGovernmentNumbers";
import EditPersonalInformation from "../components/modals/profile_sections/EditPersonalInformation";
import EditEmploymentDetails from "../components/modals/profile_sections/EditEmploymentDetails";
import EditEducationalAttainment from "../components/modals/profile_sections/EditEducationalAttainment";
import ProfileCards from "../components/ui/Cards/ProfileCards";
import EducationCard from "../components/ui/Cards/EducationCard";

const Profile: React.FC = () => {
  const profileData = useOutletContext<UserProfile>();
  const { openModal } = useModalContext();

  const profileDetail = profileData.profile;
  const educationDetail = profileData.education;
  const supervisorDetail = profileData.supervisor;

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex gap-6 max-md:flex-wrap">
          <ProfileCards
            header="Account Information"
            details={[
              { field: "Access Level", value: "Superadmin [hard coded]" },
              {
                field: "Employee Number (PCC)",
                value: profileDetail.employee_number_pcc,
              },
              {
                field: "Employee Number (City Hall)",
                value: profileDetail.employee_number_ch,
              },
            ]}
            className="basis-2/5"
            onEditClicked={() => {
              openModal({
                header: "Edit Account Information",
                subheading: "Update your account details by entering the required information here.",
                content: <EditAccountInformation/>,
              });
            }}
          />
          <ProfileCards
            header="Address & Contact Information"
            details={[
              {
                field: "Contact 1",
                value: profileDetail.primary_contact,
              },
              {
                field: "Contact 2",
                value: profileDetail.secondary_contact,
              },
              {
                field: "Present Address",
                value: profileDetail.present_address,
              },
              {
                field: "Permanent Address",
                value: profileDetail.permanent_address,
              },
            ]}
            className="basis-3/5"
            onEditClicked={() => {
              openModal({
                header: "Edit Address & Contact Information",
                subheading: "Update your address and contact details by entering the required information here.",
                content: <EditContactInformation/>,
              });
            }}
          />
        </div>
        <div className="flex gap-6 max-md:flex-wrap">
          <ProfileCards
            header="Personal Information"
            details={[
              { field: "Full Name", value: profileDetail.fullname },
              { field: "Email", value: profileDetail.email },
              { field: "Gender", value: profileDetail.gender },
              {
                field: "Birthday",
                value: wordedDate(profileDetail.birthday),
              },
              {
                field: "Civil Status",
                value: profileDetail.civil_status,
              },
              { field: "Nationality", value: profileDetail.nationality },
            ]}
            className="basis-3/5"
            onEditClicked={() => {
              openModal({
                header: "Edit Personal Information",
                subheading: "Update your personal details by entering the required information here.",
                content: <EditPersonalInformation/>,
              });
            }}
          />
          <ProfileCards
            header="Government Numbers"
            details={[
              { field: "SSS", value: profileDetail.sss },
              { field: "BIR/TIN", value: profileDetail.bir_tin },
              { field: "GSIS", value: profileDetail.gsis },
              { field: "Pag-IBIG", value: profileDetail.pag_ibig },
              { field: "PhilHealth", value: profileDetail.philhealth },
            ]}
            className="basis-2/5"
            onEditClicked={() => {
              openModal({
                header: "Edit Government Numbers",
                subheading: "Update your government numbers by entering the required information here.",
                content: <EditGovernmentNumber/>,
              });
            }}
          />
        </div>
        <div className="flex gap-6 max-md:flex-wrap">
          <ProfileCards
            header="Employment Details"
            details={[
              {
                field: "Department",
                value: profileDetail.department,
                value2: profileDetail.is_department_head
                  ? "Assigned as Head"
                  : "",
              },
              { field: "Designation", value: profileDetail.designation },
              {
                field: "Plantilla Position",
                value: profileDetail.plantilla,
              },
              {
                field: "Salary Grade",
                value: profileDetail.salary_grade,
              },
              { field: "Employment Status", value: profileDetail.status },
              {
                field: "Employment Category",
                value: profileDetail.category,
                value2: profileDetail.admin_function
                  ? "With Admin Function"
                  : "",
              },
              {
                field: "Civil Service Eligibility",
                value: profileDetail.civil_eligibility,
              },
              { field: "Daily Rate", value: profileDetail.daily_rate },
            ]}
            supervisor={
              supervisorDetail && {
                name: supervisorDetail.fullname,
                image_path: supervisorDetail.image_path,
              }
            }
            className="basis-3/5"
            onEditClicked={() => {
              openModal({
                header: "Edit Employment Details",
                subheading: "Update your employment information by entering the required information here.",
                content: <EditEmploymentDetails/>,
              });
            }}
          />
          <EducationCard
            header="Educational Attainment"
            details={educationDetail}
            className="basis-2/5"
            onEditClicked={() => {
              openModal({
                header: "Edit Educational Attainment",
                subheading: "Update your education details by entering the required information here.",
                content: <EditEducationalAttainment/>,
              });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
