import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PageHeader from "../components/content/PageHeader";
import MainProfile from "../../Shared/components/ui/Cards/MainProfileCard";
import ProfileDetails from "../../Shared/components/ui/Cards/RowCards";

const Profile = () => {
  const breadcrumbs = [
    { text: "Employees", link: "/employees" },
    { text: "Profile", link: "/profile" },
  ];

  const { employeeNumberPCC } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/v1/profile/profile_information", {
          params: { employeeNumberPCC },
        });
        setProfileData(response.data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (employeeNumberPCC) {
      fetchData();
    }
  }, [employeeNumberPCC]);

  if (loading) return <div>Loading...</div>;
  if (!profileData) return <div>No profile data available</div>;

  const {
    fullName,
    profile: { birthday, gender, civilStatus, nationality },
    contact: { primaryContact, secondaryContact, presentAddress, permanentAddress },
    credentials: { employeeNumber, email },
    education: { schoolName, courseName, schoolTimePeriod },
    employment: { designation, civilEligibility, dailyRate },
    governmentNumbers: { sss, birTin, gsis, pagIbig, philHealth },
  } = profileData;

  return (
    <>
      <PageHeader header="Profile" breadcrumbs={breadcrumbs} />
      <div className="flex flex-col gap-6">
        <MainProfile
          employeeImagePath="/src/assets/images/Avatar.png"
          leftContent={{
            employeeName: fullName,
            plantillaPosition: designation,
            department: "",
            employeeId: employeeNumber,
            joinedDate: "", 
          }}
          rightContent={[
            { field: "Phone", value: primaryContact },
            { value: secondaryContact },
            { field: "Email", value: email },
            { field: "Birthday", value: birthday },
            { field: "Address", value: presentAddress},
            { field: "Gender", value: gender },
          ]}
          employmentStatus={"Active"}
        />
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-2/5">
            <ProfileDetails
              header="Account Information"
              details={[
                { field: "Email", value: email },
                { field: "Employee ID", value: employeeNumber },
              ]}
            />
          </div>
          <div className="md:w-3/5">
            <ProfileDetails
              header="Address & Contact Information"
              details={[
                { field: "Primary Phone", value: primaryContact },
                { field: "Secondary Phone", value: secondaryContact },
                { field: "Present Address", value: presentAddress},
                { field: "Permanent Address", value: permanentAddress },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-3/5">
            <ProfileDetails
              header="Personal Information"
              details={[
                { field: "Employee Name", value: fullName},
                { field: "Birthday", value: birthday },
                { field: "Gender", value: gender },
                { field: "Nationality", value: nationality },
                { field: "Marital Status", value: civilStatus },
              ]}
            />
          </div>
          <div className="md:w-2/5">
            <ProfileDetails
              header="Government Numbers"
              details={[
                { field: "SSS", value: sss },
                { field: "BIR TIN", value: birTin },
                { field: "GSIS", value: gsis },
                { field: "Pag-IBIG", value: pagIbig },
                { field: "PhilHealth", value: philHealth },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-3/5">
            <ProfileDetails
              header="Employment Details"
              details={[
                { field: "Position", value: designation },
                { field: "Daily Rate", value: dailyRate },
                { field: "Civil Service Eligibility", value: civilEligibility },
              ]}
            />
          </div>
          <div className="md:w-2/5">
            <ProfileDetails
              header="Educational Attainment"
              details={[
                { field: schoolName },
                { field: "Course Name", value: courseName },
                { field: "School Time Period", value: schoolTimePeriod },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
