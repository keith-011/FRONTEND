import { useOutletContext } from "react-router-dom";
import { UserProfile } from "../utils/Types";
import ProfileCards from "../components/ui/cards/ProfileCards";
import { wordedDate } from "../utils/Functions";
import EducationCard from "../components/ui/cards/EducationCard";
import { useModalContext } from "../context/ModalContext";

const Profile: React.FC = () => {
  const profileData = useOutletContext<UserProfile>();
  const { openModal, refreshParent } = useModalContext();

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
                header: "Sample Header",
                subheading: "Another sample",
                content: <p></p>,
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
                header: "Sample Header",
                subheading: "Another sample",
                content: <p></p>,
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
                header: "Sample Header",
                subheading: "Another sample",
                content: <p></p>,
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
                header: "Sample Header",
                subheading: "Another sample",
                content: <p></p>,
              });
            }}
          />
          <EducationCard
            header="Educational Attainment"
            details={educationDetail}
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
