export type ColumnHeader = { id: string; headerName: string; width: string };

export const modalFormId = "modalForm";

export const maxTableRecord = [10, 25, 50, 100];

export const MimeFileType = {
  // File Types
  PDF: "application/pdf",

  // Image Types
  JPEG: "image/jpeg",
  PNG: "image/png",
};

export interface AddEmployeeForm {
  // Account Information
  employee_number: string;
  password: string;
  confirm_password: string;

  // Personal Information
  firstName: string;
  middleName: string;
  lastName: string;
  extension: string;
  birthday: string;

  // Contact and Address
  primaryContact: string;
  secondaryContact: string;
  fullAddress: string;

  // Employment Details
  plantilla: string;
  // pay_grade: string;
  department: string;
  category: string;
  status: string;
  civil_eligibility: string;

  // Educational Attainment
  bachelor_school: string;
  bachelor_title: string;
  bachelor_start: string;
  bachelor_end: string;
  masteral_school: string;
  masteral_title: string;
  masteral_start: string;
  masteral_end: string;
  doctorate_school: string;
  doctorate_title: string;
  doctorate_start: string;
  doctorate_end: string;

  // Government Numbers
  sss: string;
  bir_tin: string;
  gsis: string;
  pagibig: string;
  philhealth: string;

  //Documents
  birth_certificate: File;
  resume: File;
  pds: File;
  diploma_bachelor: File;
  diploma_master: File;
  diploma_doctorate: File;
  tor_bachelor: File;
  tor_master: File;
  tor_doctorate: File;
  ptt: File;
  certificates: FileList;
  mpo: File;
  cccr: File;
  csc_eligibility: File;
  employment_contract: File;
  marriage_contract: File;
  medical_analysis: FileList;
}

export type EmployeeTable = {
  employee_number: string;
  name: string;
  email: string;
  plantilla: string;
  department: string;
  designation: string;
  image_path: string;
};

export type ExistingDepartmentNames = { department: string };

export type DepartmentAndHeads = {
  id: string;
  department: string;
  department_head: string;
};

export type SelectIdDescription = {
  id: string;
  description: string;
};

export interface FormPlantillaList extends SelectIdDescription {
  salary_grade: number;
}

export interface FormCategoryList extends SelectIdDescription {
  admin_compatible: boolean;
}

export interface AddEmployeeFetchData {
  existence: {
    email: { email: string }[];
    employeeNumberPCC: { employee_number_pcc: string }[];
    employeeNumberCH: { employee_number_ch: string }[];
    sss: { sss: string }[];
    birTin: { bir_tin: string }[];
    gsis: { gsis: string }[];
    pagIbig: { pag_ibig: string }[];
    philHealth: { philhealth: string }[];
    primaryContact: { primary_contact: string }[];
  };

  selectData: {
    plantilla: FormPlantillaList[];
    department: DepartmentAndHeads[];
    category: FormCategoryList[];
    status: SelectIdDescription[];
  };
}

export const civilStatusData: SelectIdDescription[] = [
  { id: "Single", description: "Single" },
  { id: "Married", description: "Married" },
  { id: "Widowed", description: "Widowed" },
];

export const genderData: SelectIdDescription[] = [
  { id: "Male", description: "Male" },
  { id: "Female", description: "Female" },
];

export const educationLevelData: SelectIdDescription[] = [
  { id: "Secondary", description: "Secondary" },
  { id: "Vocational", description: "Vocational" },
  { id: "College", description: "College" },
  { id: "Graduate Studies", description: "Graduate Studies" },
];
