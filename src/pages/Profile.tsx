import { useOutletContext } from "react-router-dom";
import { UserProfile } from "../utils/Types";
import ProfileCards from "../components/ui/cards/ProfileCards";
import { wordedDate } from "../utils/Functions";
import ColumnCardStyle from "../components/ui/cards/ColumnCards";

const Profile: React.FC = () => {
  const profileData = useOutletContext<UserProfile>();
  console.log(profileData);
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
                value: profileData.employee_number_pcc,
              },
              {
                field: "Employee Number (City Hall)",
                value: profileData.employee_number_ch,
              },
            ]}
            className="basis-2/5"
          />
          <ProfileCards
            header="Address & Contact Information"
            details={[
              { field: "Contact 1", value: profileData.primary_contact },
              { field: "Contact 2", value: profileData.secondary_contact },
              { field: "Present Address", value: profileData.present_address },
              {
                field: "Permanent Address",
                value: profileData.permanent_address,
              },
            ]}
            className="basis-3/5"
          />
        </div>
        <div className="flex gap-6 max-md:flex-col">
          <ProfileCards
            header="Personal Information"
            details={[
              { field: "Full Name", value: profileData.fullname },
              { field: "Birthday", value: wordedDate(profileData.birthday) },
              { field: "Gender", value: profileData.gender },
              { field: "Nationality", value: profileData.nationality },
              { field: "Civil Status", value: profileData.civil_status },
            ]}
            className="basis-3/5"
          />
          <ProfileCards
            header="Government Numbers"
            details={[
              { field: "SSS", value: profileData.sss },
              { field: "BIR/TIN", value: profileData.bir_tin },
              { field: "GSIS", value: profileData.gsis },
              { field: "Pag-IBIG", value: profileData.pag_ibig },
              { field: "PhilHealth", value: profileData.philhealth },
            ]}
            className="basis-2/5"
          />
        </div>
        <div className="flex gap-6 max-md:flex-col">
          <ProfileCards
            header="Employment Details"
            details={[
              { field: "Department", value: profileData.department },
              { field: "Designation", value: profileData.designation },
              { field: "Plantilla Position", value: profileData.plantilla },
              { field: "Salary Grade", value: profileData.salary_grade },
              { field: "Employee Status", value: profileData.status },
              {
                field: "Civil Service Eligibility",
                value: profileData.civil_eligibility,
              },
              { field: "Daily Rate", value: profileData.daily_rate },
              { field: "Supervisor", value: "[to be coded]" },
            ]}
            className="basis-3/5"
          />
          <ColumnCardStyle
            header="Educational Attainment"
            details={[]}
            className="basis-2/5"
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
