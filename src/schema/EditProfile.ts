import { z, ZodIssueCode } from "zod";

import { TextInput, SelectInputRequired } from "e:/SHARED PROJECT/PCC-HRIS/src/utils/ZodFunctions";

import {
  UpdateEmployeeFetchData,
  educationLevelData,
} from "e:/Updated shared project/PCC-HRIS/src/utils/Types"
;


export const EditAccountInformationValidation = (
  employeeNumberPCCList: UpdateEmployeeFetchData["existence"]["employeeNumberPCC"],
  employeeNumberCityHallList: UpdateEmployeeFetchData["existence"]["employeeNumberCH"],
  currentEmployeeNumberPCC: string | null,  
  currentEmployeeNumberCityHall: string | null 
) => {
  return z
    .object({
      newEmployeeNumberPCC: TextInput(false, 0, 50)
      .nullable()
      .transform((value) => {
        return value === "" ? null : value;
      })
      .refine(
        (value) =>
          value === null ||
          !employeeNumberPCCList.some(
            (field) =>
              value === field.employee_number_pcc &&
              value !== currentEmployeeNumberPCC  
          ),
        "Employee number already exists."
      ),

      newEmployeeNumberCityHall: TextInput(true, 1, 50).refine(
        (value) =>
          !employeeNumberCityHallList.some(
            (field) =>
              value === field.employee_number_ch &&
              value !== currentEmployeeNumberCityHall 
          ),
        "Employee number already exists."
          ),

      
    });
  };

export type EditAccountInformationValidationType = z.infer<
  ReturnType<typeof EditAccountInformationValidation>
>;

export const EditAddressContactInformationValidation = ( 
  primaryContactList: UpdateEmployeeFetchData["existence"]["primaryContact"],
  currentPrimaryContact: string | null 
) => {
  return z
    .object({
      newPrimaryContact: TextInput (true, 1, 25)
        .regex(/^\d+$/, "Invalid input.")
        .refine(
          (value) =>
            !primaryContactList.some(
              (field) => 
                value === field.primary_contact &&
                value !== currentPrimaryContact
            ),
          "Contact number already exists.",
        ),

      newSecondaryContact: TextInput (false, 0, 25)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^\d+$/.test(value),
          "Invalid input.",
        ),
      newPresentAddress: TextInput (true, 1, 175),

      newPermanentAddress: TextInput (true, 1, 175),
    });
  };

export type EditAddressContactInformationValidationType = z.infer<
  ReturnType<typeof EditAddressContactInformationValidation>
>;

export const EditPersonalInformationValidation = (
  emailList: UpdateEmployeeFetchData["existence"]["email"],
  genderData: UpdateEmployeeFetchData["selectData"]["gender"],
  civilStatusData: UpdateEmployeeFetchData["selectData"]["civilStatus"],
  currentEmail: string | null 
) => {
  return z
    .object({
      newFirstName: TextInput (true, 1, 50).regex(
        /^[A-Za-zÀ-ÿ\s'-]+$/,
        "Invalid input.",
      ),
      newMiddleName: TextInput (false, 0, 50)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^[A-Za-zÀ-ÿ\s'-]+$/.test(value),
          "Invalid input",
        ),
      newLastName: TextInput (true, 1, 50).regex(
        /^[A-Za-zÀ-ÿ\s'-]+$/,
        "Invalid input.",
      ),
      newSuffix: TextInput (false, 0, 10)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^[A-Za-z]+$/.test(value),
          "Invalid input.",
        ),

      newEmail: TextInput (true, 1, 80)
      .email("Invalid email format.")
      .refine(
        (value) => 
          !emailList.some(
          (field) => 
            value === field.email &&
            value !== currentEmail
        ),
          "Email already exists.",
        ),
      newGender: z
        .string()
        .refine(
          (value) => genderData.some((item) => item.description === value),
          "Invalid input.",
        ),
      newBirthday: TextInput (true, 1, 25).refine(
        (value) => !isNaN(Date.parse(value)),
        "Invalid input.",
        ),
      newCivilStatus: z
        .string()
        .refine(
          (value) => civilStatusData.some((item) => item.description === value),
          "Invalid input.",
        ),
      newNationality: TextInput (true, 1, 50).regex(
        /^[a-zA-Z\s]+$/,
        "Invalid input.",
      ),
    });
  };
export type EditPersonalInformationValidationType = z.infer<
  ReturnType<typeof EditPersonalInformationValidation>
>;


export const EditGovernmentNumberValidation = (
  sssList: UpdateEmployeeFetchData["existence"]["sss"],
  tinList: UpdateEmployeeFetchData["existence"]["birTin"],
  gsisList: UpdateEmployeeFetchData["existence"]["gsis"],
  pagibigList: UpdateEmployeeFetchData["existence"]["pagIbig"],
  philHealthList: UpdateEmployeeFetchData["existence"]["philHealth"],
  currentSss : string | null, 
  currentBirTin : string | null, 
  currentGsis : string | null, 
  currentPagIbig : string | null, 
  currentPhilHealth : string | null, 
  
) => {
  return z
    .object({
      newSss: TextInput (false, 0, 25)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^[\d]+$/.test(value),
          "Invalid value.",
        )
        .refine(
          (value) => 
            !sssList.some(
            (field) => 
              value === field.sss &&
              value !== currentSss
          ),
          "SSS number already exists.",
        ),

      newBirTin: TextInput (false, 0, 25)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^[\d]+$/.test(value),
          "Invalid value.",
        )
        .refine(
          (value) => 
            !tinList.some(
            (field) => 
              value === field.bir_tin &&
              value !== currentBirTin
          ),
          "BIR/TIN number already exists.",
        ),

      newGsis: TextInput (false, 0, 25)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^[\d]+$/.test(value),
          "Invalid value.",
        )
        .refine(
          (value) => 
            !gsisList.some(
            (field) => 
              value === field.gsis &&
              value !== currentGsis
          ),
          "GSIS number already exists.",
        ),

      newPagIbig: TextInput (false, 0, 25)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^[\d]+$/.test(value),
          "Invalid value.",
        )
        .refine(
          (value) => 
            !pagibigList.some(
              (field) => 
                value === field.pag_ibig &&
                value !== currentPagIbig
            ),
          "PagIbig number already exists.",
        ),

      newPhilHealth: TextInput (false, 0, 25)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^[\d]+$/.test(value),
          "Invalid value.",
        )
        .refine(
          (value) =>
            !philHealthList.some(
              (field) => 
                value === field.philhealth &&
                value !== currentPhilHealth
            ),
          "PhilHealth number already exists.",
        ),
    });
};

export type EditGovernmentNumberValidationType = z.infer<
  ReturnType<typeof EditGovernmentNumberValidation >
>;




export const EditEmploymentDetailsValidation = () => {
  return z
    .object({
      newPlantilla: SelectInputRequired,

      newStatus: SelectInputRequired,

      newDepartment: SelectInputRequired,

      newIsDepartmentHead: z.boolean(),

      newDesignation: TextInput (true, 1, 75).regex(
        /^[A-Za-z\s]+$/,
        "Invalid input.",
      ),

      newCategory: SelectInputRequired ,
      newWithAdminFunction: z.boolean(),

      newCivilServiceEligibility: TextInput (false, 0, 75)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^[A-Za-zÀ-ÿ\s'-]+$/.test(value),
          "Invalid input.",
        ),

      newDailyRate: TextInput (false, 0, 25)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        }),
    });
};

export type EditEmploymentDetailsValidationType = z.infer<
  ReturnType<typeof EditEmploymentDetailsValidation>
>;

export const EditEducationalAttainmentValidation = () => {
  return z
    .object({
      newEducationalBackground: z
        .array(
          z
            .object({
              newEducationLevel: z
                .string()
                .refine(
                  (value) =>
                    educationLevelData.some((item) => item.id === value),
                  "Invalid input.",
                ),

              newProgramType: TextInput (false, 0, 50)
                .nullable()
                .transform((value) => {
                  return value === "" ? null : value;
                })
                .refine(
                  (value) => value === null || /^[A-Za-z\s']+$/.test(value),
                  "Invalid input.",
                ),
              newCourseTitle: TextInput (false, 0, 50)
                .nullable()
                .transform((value) => {
                  return value === "" ? null : value;
                })
                .refine(
                  (value) => value === null || /^[A-Za-z\s']+$/.test(value),
                  "Invalid input.",
                ),

              newSchoolName: TextInput (true, 1, 100).regex(
                /^[A-Za-z\s']+$/,
                "Invalid input.",
              ),

              newYearStarted: TextInput (true, 1, 4).refine(
                (value) => !isNaN(Number(value)),
                "Invalid input.",
              ),
              newYearGraduated: TextInput (false, 0, 4)
                .nullable()
                .transform((value) => {
                  return value === "" ? null : value;
                })
                .refine(
                  (value) => value === "" || !isNaN(Number(value)),
                  "Invalid input.",
                ),
              newIsStudying: z.boolean(),
            })
            .superRefine((data, ctx) => {
              const yearStarted = data.newYearStarted ? Number(data.newYearStarted) : null;
              const yearGraduated = data.newYearGraduated ? Number(data.newYearGraduated) : null;
              if (yearStarted !== null && yearGraduated !== null) {
                if (yearStarted > yearGraduated) {
                  ctx.addIssue({
                    code: ZodIssueCode.custom,
                    message: "Year start cannot be greater than graduate year.",
                    path: ["newYearGraduated"],  
                  });
                }
              }
              if (data.newYearGraduated == null && !data.newIsStudying) {
                ctx.addIssue({
                  code: ZodIssueCode.custom,
                  message: "This field is required.",
                  path: ["newYearGraduated"], 
                });
              }
            }),
            
        )
        .min(1, "At least one education is required."),

      
    })
};

export type EditEducationalAttainmentValidationType = z.infer<
  ReturnType<typeof EditEducationalAttainmentValidation >
>;
