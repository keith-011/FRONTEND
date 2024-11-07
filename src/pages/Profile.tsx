import { useOutletContext } from "react-router-dom";
import { UserProfile } from "../utils/Types";
import ProfileCards from "../components/ui/cards/ProfileCards";
import { wordedDate } from "../utils/Functions";
import EducationCard from "../components/ui/cards/EducationCard";
import { useModalContext } from "../context/ModalContext";
import AddEmployee from "../components/modals/AddEmployee";

const Profile: React.FC = () => {
  const profileData = useOutletContext<UserProfile>();
  const { openModal, refreshParent } = useModalContext();

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex gap-6 max-md:flex-col">
          <ProfileCards
            header="Account Information"
            details={[
              { field: "Access Level", value: "[to be coded]" },
              { field: "Employment Status", value: "[to be coded]" },
              {
                field: "Employee Number (PCC)",
                value: profileData.profile.employee_number_pcc,
              },
              {
                field: "Employee Number (City Hall)",
                value: profileData.profile.employee_number_ch,
              },
            ]}
            className="basis-2/5"
            onEditClicked={() => {
              openModal({
                header: "Sample Header",
                subheading: "Another sample",
                content: <p></p>,
              });
            }}
          />
          <ProfileCards
            header="Address & Contact Information"
            details={[
              {
                field: "Contact 1",
                value: profileData.profile.primary_contact,
              },
              {
                field: "Contact 2",
                value: profileData.profile.secondary_contact,
              },
              {
                field: "Present Address",
                value: profileData.profile.present_address,
              },
              {
                field: "Permanent Address",
                value: profileData.profile.permanent_address,
              },
            ]}
            className="basis-3/5"
            onEditClicked={() => {
              openModal({
                header: "Sample Header",
                subheading: "Another sample",
                content: <p></p>,
              });
            }}
          />
        </div>
        <div className="flex gap-6 max-md:flex-col">
          <ProfileCards
            header="Personal Information"
            details={[
              { field: "Full Name", value: profileData.profile.fullname },
              {
                field: "Birthday",
                value: wordedDate(profileData.profile.birthday),
              },
              { field: "Gender", value: profileData.profile.gender },
              { field: "Nationality", value: profileData.profile.nationality },
              {
                field: "Civil Status",
                value: profileData.profile.civil_status,
              },
            ]}
            className="basis-3/5"
            onEditClicked={() => {
              openModal({
                header: "Sample Header",
                subheading: "Another sample",
                content: <p></p>,
              });
            }}
          />
          <ProfileCards
            header="Government Numbers"
            details={[
              { field: "SSS", value: profileData.profile.sss },
              { field: "BIR/TIN", value: profileData.profile.bir_tin },
              { field: "GSIS", value: profileData.profile.gsis },
              { field: "Pag-IBIG", value: profileData.profile.pag_ibig },
              { field: "PhilHealth", value: profileData.profile.philhealth },
            ]}
            className="basis-2/5"
            onEditClicked={() => {
              openModal({
                header: "Sample Header",
                subheading: "Another sample",
                content: <p></p>,
              });
            }}
          />
        </div>
        <div className="flex gap-6 max-md:flex-col">
          <ProfileCards
            header="Employment Details"
            details={[
              { field: "Department", value: profileData.profile.department },
              { field: "Designation", value: profileData.profile.designation },
              {
                field: "Plantilla Position",
                value: profileData.profile.plantilla,
              },
              {
                field: "Salary Grade",
                value: profileData.profile.salary_grade,
              },
              { field: "Employee Status", value: profileData.profile.status },
              {
                field: "Civil Service Eligibility",
                value: profileData.profile.civil_eligibility,
              },
              { field: "Daily Rate", value: profileData.profile.daily_rate },
              { field: "Supervisor", value: "[to be coded]" },
            ]}
            className="basis-3/5"
            onEditClicked={() => {
              openModal({
                header: "Sample Header",
                subheading: "Another sample",
                content: <p></p>,
              });
            }}
          />
          <EducationCard
            header="Educational Attainment"
            details={profileData.education}
            className="basis-2/5"
            onEditClicked={() => {
              openModal({
                header: "Sample Header",
                subheading: "Another sample",
                content: <p></p>,
              });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
