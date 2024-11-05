import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { AddEmployeeType } from "../../../../schema/HRISSchema";

import FormCategory from "../../FormCategory";
import FormInput from "../../../../../Shared/components/ui/layout/FormInput";
import UploadButton from "../../../../../Shared/components/ui/button/UploadButton";
import { EducationLevels, MimeFileType } from "../../../../../utils/Types";

interface Props {
  activeCategory: number | null;
  handleCategoryClick: (id: number) => void;
  educationLevelStatus: EducationLevels;
}

const Documents: React.FC<Props> = ({
  activeCategory,
  handleCategoryClick,
  educationLevelStatus,
}) => {
  const [isFieldError, setFieldError] = useState<boolean>(false);

  const {
    formState: { errors },
  } = useFormContext<AddEmployeeType>();

  const inputFields = [
    errors.resume?.message,
    errors.pds?.message,
    errors.diploma_bachelor?.message,
    errors.diploma_master?.message,
    errors.diploma_doctorate?.message,
    errors.tor_bachelor?.message,
    errors.tor_master?.message,
    errors.tor_doctorate?.message,
    errors.ptt?.message,
    errors.certificates?.message,
    errors.mpo?.message,
    errors.cccr?.message,
    errors.csc_eligibility?.message,
    errors.employment_contract?.message,
    errors.birth_certificate?.message,
    errors.marriage_contract?.message,
    errors.medical_requirements?.message,
  ];

  useEffect(() => {
    setFieldError(inputFields.some((item) => item !== undefined));
  }, [inputFields]);

  return (
    <>
      <FormCategory
        id={7}
        text="Documents"
        activeCategory={activeCategory}
        isFieldError={isFieldError}
        handleCategoryClick={handleCategoryClick}
      >
        {/* Resume */}
        <FormInput
          labelText="Resume/Curriculum Vitae"
          errorMessage={errors.resume?.message}
        >
          <UploadButton
            registerId={"resume"}
            fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
          />
        </FormInput>

        {/* PDS */}
        <FormInput
          labelText="Personal Data Sheet"
          errorMessage={errors.pds?.message}
        >
          <UploadButton
            registerId={"pds"}
            fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
          />
        </FormInput>

        {/* Bachelor TOR */}
        <FormInput
          labelText="Transcript of Records (Bachelor's Degree)"
          errorMessage={errors.tor_bachelor?.message}
        >
          <UploadButton
            registerId={"tor_bachelor"}
            fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
          />
        </FormInput>

        {/* Bachelor Diploma */}
        <FormInput
          labelText="Diploma (Bachelor's Degree)"
          errorMessage={errors.diploma_bachelor?.message}
        >
          <UploadButton
            registerId={"diploma_bachelor"}
            fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
          />
        </FormInput>

        {educationLevelStatus.masteral && (
          <>
            {/* Masters TOR */}
            <FormInput
              labelText="Transcript of Records (Master's Degree)"
              errorMessage={errors.tor_master?.message}
            >
              <UploadButton
                registerId={"tor_master"}
                fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
              />
            </FormInput>

            {/* Masters Diploma */}
            <FormInput
              labelText="Diploma (Master's Degree)"
              errorMessage={errors.diploma_master?.message}
            >
              <UploadButton
                registerId={"diploma_master"}
                fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
              />
            </FormInput>
          </>
        )}

        {educationLevelStatus.doctorate && (
          <>
            {/* Doctorate TOR */}
            <FormInput
              labelText="Transcript of Records (Doctorate Degree)"
              errorMessage={errors.tor_doctorate?.message}
            >
              <UploadButton
                registerId={"tor_doctorate"}
                fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
              />
            </FormInput>

            {/* Doctorate Diploma */}
            <FormInput
              labelText="Diploma (Doctorate Degree)"
              errorMessage={errors.diploma_doctorate?.message}
            >
              <UploadButton
                registerId={"diploma_doctorate"}
                fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
              />
            </FormInput>
          </>
        )}

        {/* Permit to Teach */}
        <FormInput
          labelText="Permit to Teach (for government)"
          errorMessage={errors.ptt?.message}
        >
          <UploadButton
            registerId={"ptt"}
            fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
          />
        </FormInput>

        {/* Certificates */}
        <FormInput
          labelText="Certificates"
          errorMessage={errors.certificates?.message}
        >
          <UploadButton
            multiple={true}
            registerId={"certificates"}
            fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
          />
        </FormInput>

        {/* Membership of Professional Organization */}
        <FormInput
          labelText="Membership of Professional Organization"
          errorMessage={errors.mpo?.message}
        >
          <UploadButton
            registerId={"mpo"}
            fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
          />
        </FormInput>

        {/* Certificate of Community and Certificate of Research */}
        <FormInput
          labelText="Certificate of Community and Certificate of Research"
          errorMessage={errors.cccr?.message}
        >
          <UploadButton
            registerId={"cccr"}
            fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
          />
        </FormInput>

        {/* Professional Licenses/CSC Eligibility */}
        <FormInput
          labelText="Professional Licenses/CSC Eligibility"
          errorMessage={errors.csc_eligibility?.message}
        >
          <UploadButton
            registerId={"csc_eligibility"}
            fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
          />
        </FormInput>

        {/* Employment Contract */}
        <FormInput
          labelText="Employment Contract"
          errorMessage={errors.employment_contract?.message}
        >
          <UploadButton
            registerId={"employment_contract"}
            fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
          />
        </FormInput>

        {/* PSA Birth Certificate */}
        <FormInput
          labelText="PSA Birth Certificate"
          errorMessage={errors.birth_certificate?.message}
        >
          <UploadButton
            registerId={"birth_certificate"}
            fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
          />
        </FormInput>

        {/* Marriage Contract */}
        <FormInput
          labelText="Marriage Contract"
          errorMessage={errors.marriage_contract?.message}
        >
          <UploadButton
            registerId={"marriage_contract"}
            fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
          />
        </FormInput>

        {/* Medical Requirements */}
        <FormInput
          labelText="Medical Requirements"
          errorMessage={errors.medical_requirements?.message}
        >
          <UploadButton
            registerId={"medical_requirements"}
            fileType={`${MimeFileType.PDF},${MimeFileType.JPEG},${MimeFileType.PNG}`}
          />
        </FormInput>
      </FormCategory>
    </>
  );
};

export default Documents;
