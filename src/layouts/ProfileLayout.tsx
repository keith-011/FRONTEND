import { Outlet, useParams } from "react-router-dom";
import PageHeader from "../components/content/PageHeader";

// NEEDS RESOLVE
import { wordedDate } from "../utils/Functions";
import { useModalContext } from "../context/ModalContext";
import { useFetchData } from "../hooks/useFetchData";
import { UserProfile } from "../utils/Types";
import MainProfileCard from "../components/ui/Cards/MainProfileCard";

const ProfileLayout = () => {
  const breadcrumbs = [
    { text: "Employees", link: "/employees" },
    { text: "Profile", link: "/profile" },
  ];

  const { employeeNumberPCC } = useParams();

  const { refreshParent } = useModalContext();
  const { tableData, isError, isLoading } = useFetchData<UserProfile>(
    `/v1/profile/profile_information/${employeeNumberPCC}`,
    refreshParent,
  );

  const profileData = tableData[0];

  return (
    <>
      <PageHeader header="Profile" breadcrumbs={breadcrumbs} />
      {isError ? <p>An error ocurred.</p> : isLoading && <p>Loading...</p>}
      {!isLoading && !isError && (
        <>
          <MainProfileCard
            mainData={profileData.profile}
            rightContent={[
              {
                fieldName: "Phone",
                value: profileData.profile.primary_contact,
              },
              { fieldName: "Email", value: profileData.profile.email },
              {
                fieldName: "Birthday",
                value: wordedDate(profileData.profile.birthday),
              },
              {
                fieldName: "Address",
                value: profileData.profile.present_address,
              },
              { fieldName: "Gender", value: profileData.profile.gender },
            ]}
            navButtons={[
              { text: "Profile", link: "" },
              { text: "Documents", link: "documents" },
              { text: "Employment History", link: "history" },
            ]}
            supervisor={
              profileData.supervisor && {
                name: profileData.supervisor.fullname,
                image_path: profileData.supervisor.image_path,
              }
            }
            // employmentStatus={"Active"}
          />
          <Outlet context={profileData} />
        </>
      )}
    </>
  );
};

export default ProfileLayout;
