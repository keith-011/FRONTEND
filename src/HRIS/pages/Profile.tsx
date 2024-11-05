import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PageHeader from "../components/content/PageHeader";
import MainProfile from "../../Shared/components/ui/Cards/MainProfileCard";
import RowCardStyle from "../../Shared/components/ui/Cards/RowCards";
import ColumnCardStyle from "../../Shared/components/ui/Cards/ColumnCards";
// NEEDS RESOLVE
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
            { field: "Phone:", value: primaryContact },
            { value: secondaryContact },
            { field: "Email:", value: email },
            { field: "Birthday:", value: birthday },
            { field: "Address:", value: presentAddress},
            { field: "Gender:", value: gender },
            { field: "Reports to:", value: " " },
          ]}
          employmentStatus={"Active"}
        />
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-2/5">
            <RowCardStyle
              header="Account Information"
              details={[
                ///
                { field: "Access Level", value: " " },
                ///
                { field: "Employement Status", value: " "},
                { field: "Employee ID", value: employeeNumber },
                { field: "Email", value: email }
              ]}
            />
          </div>
          <div className="md:w-3/5">
            <RowCardStyle
              header="Address & Contact Information"
              details={[
                { field: "Contact 1", value: primaryContact },
                { field: "Contact 2", value: secondaryContact },
                { field: "Present Address", value: presentAddress},
                { field: "Permanent Address", value: permanentAddress },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-3/5">
            <RowCardStyle
              header="Personal Information"
              details={[
                { field: "Full Name", value: fullName},
                { field: "Birthday", value: birthday },
                { field: "Gender", value: gender },
                { field: "Nationality", value: nationality },
                { field: "Civil Status", value: civilStatus },
              ]}
            />
          </div>
          <div className="md:w-2/5">
            <RowCardStyle
              header="Government Numbers"
              details={[
                { field: "SSS", value: sss },
                { field: "BIR/TIN", value: birTin },
                { field: "GSIS", value: gsis },
                { field: "Pag-IBIG", value: pagIbig },
                { field: "PhilHealth", value: philHealth },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex flex-grow flex-col gap-6 ">
          <div>
            <RowCardStyle
              header="Employment Details"
              details={[
                { field: "Position (Position)", value: "" },
                { field: "Salary Grade", value: ""},
                { field: "Employee Status", value: ""},
                { field: "Civil Service Eligibility", value: civilEligibility },
                { field: "Daily Rate", value: dailyRate },
                { field: "Supervisor", value: ""},
              ]}
            />
          </div>
          <div>
            <RowCardStyle
              header="Employment Role"
              details={[
                { field: "Department", value: "" },
                { value: "" }, ///Assigned as Head
                { field: "Category", value: "" },
                { value: "" }, ///With Admin function
              ]}
            />
          </div>
          </div>
          <div className="md:w-2/5">
            <ColumnCardStyle
              header="Educational Attainment"
              details={[
                { field: schoolName, value1: courseName, value2: schoolTimePeriod },
                { field: schoolName, value1: courseName, value2: schoolTimePeriod },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
