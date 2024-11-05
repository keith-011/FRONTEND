import { z, ZodIssueCode } from "zod";

import { TextInput, SelectInputRequired } from "../../utils/ZodFunctions";

import {
  AddEmployeeFetchData,
  civilStatusData,
  educationLevelData,
  genderData,
} from "../../utils/Types";

export const NewSchemaAddEmployee = (
  empNumberPcc: AddEmployeeFetchData["existence"]["employeeNumberPCC"],
  empNumberCityHall: AddEmployeeFetchData["existence"]["employeeNumberCH"],
  emailList: AddEmployeeFetchData["existence"]["email"],
  sssList: AddEmployeeFetchData["existence"]["sss"],
  tinList: AddEmployeeFetchData["existence"]["birTin"],
  gsisList: AddEmployeeFetchData["existence"]["gsis"],
  pagibigList: AddEmployeeFetchData["existence"]["pagIbig"],
  philHealthList: AddEmployeeFetchData["existence"]["philHealth"],
  primaryContactList: AddEmployeeFetchData["existence"]["primaryContact"],
) => {
  return z
    .object({
      // Account Information
      employeeNumberCityHall: TextInput(true, 1, 50).refine(
        (value) =>
          !empNumberCityHall.some(
            (field) => value === field.employee_number_ch,
          ),
        "Employee number already exists.",
      ),
      employeeNumberPCC: TextInput(false, 0, 50)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) =>
            value === null ||
            !empNumberPcc.some((field) => value === field.employee_number_pcc),
          "Employee number already exists.",
        ),
      autoGenerate: z.boolean(),
      email: TextInput(true, 1, 80)
        .email("Invalid email format.")
        .refine(
          (value) => !emailList.some((field) => value === field.email),
          "Email already exists.",
        ),
      password: z
        .string()
        .min(1, "This field is required.")
        .max(50, "This field only accepts up to 50 characters.")
        .refine(
          (value) => value.length >= 8,
          "Password must be at least 8 characters.",
        ),
      confirm_password: z.string().min(1, "Password is required."),

      // Personal Information
      firstName: TextInput(true, 1, 50).regex(
        /^[A-Za-zÀ-ÿ\s'-]+$/,
        "Invalid input.",
      ),
      middleName: TextInput(false, 0, 50)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^[A-Za-zÀ-ÿ\s'-]+$/.test(value),
          "Invalid input",
        ),
      lastName: TextInput(true, 1, 50).regex(
        /^[A-Za-zÀ-ÿ\s'-]+$/,
        "Invalid input.",
      ),
      suffix: TextInput(false, 0, 10)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^[A-Za-z]+$/.test(value),
          "Invalid input.",
        ),
      gender: z
        .string()
        .refine(
          (value) => genderData.some((item) => item.id === value),
          "Invalid input.",
        ),

      birthday: TextInput(true, 1, 25).refine(
        (value) => !isNaN(Date.parse(value)),
        "Invalid input.",
      ),
      civilStatus: z
        .string()
        .refine(
          (value) => civilStatusData.some((item) => item.id === value),
          "Invalid input.",
        ),
      nationality: TextInput(true, 1, 50).regex(
        /^[a-zA-Z\s]+$/,
        "Invalid input.",
      ),

      // Address & Contact
      primaryContact: TextInput(true, 1, 25)
        .regex(/^\d+$/, "Invalid input.")
        .refine(
          (value) =>
            !primaryContactList.some(
              (field) => field.primary_contact === value,
            ),
          "Contact number already exists.",
        ),

      secondaryContact: TextInput(false, 0, 25)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^\d+$/.test(value),
          "Invalid input.",
        ),
      presentAddress: TextInput(true, 1, 175),

      permanentAddress: TextInput(true, 1, 175),

      // Employment Details
      plantilla: SelectInputRequired,

      status: SelectInputRequired,

      department: SelectInputRequired,

      isDepartmentHead: z.boolean(),

      designation: TextInput(true, 1, 75).regex(
        /^[A-Za-z\s]+$/,
        "Invalid input.",
      ),

      category: SelectInputRequired,

      withAdminFunction: z.boolean(),

      civilServiceEligibility: TextInput(false, 0, 75)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^[A-Za-zÀ-ÿ\s'-]+$/.test(value),
          "Invalid input.",
        ),

      dailyRate: TextInput(false, 0, 25)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        }),
      // Educational Attainment
      educationalBackground: z
        .array(
          z
            .object({
              educationLevel: z
                .string()
                .refine(
                  (value) =>
                    educationLevelData.some((item) => item.id === value),
                  "Invalid input.",
                ),

              programType: TextInput(false, 0, 50)
                .nullable()
                .transform((value) => {
                  return value === "" ? null : value;
                })
                .refine(
                  (value) => value === null || /^[A-Za-z\s']+$/.test(value),
                  "Invalid input.",
                ),
              courseTitle: TextInput(false, 0, 50)
                .nullable()
                .transform((value) => {
                  return value === "" ? null : value;
                })
                .refine(
                  (value) => value === null || /^[A-Za-z\s']+$/.test(value),
                  "Invalid input.",
                ),

              schoolName: TextInput(true, 1, 100).regex(
                /^[A-Za-z\s']+$/,
                "Invalid input.",
              ),

              yearStart: TextInput(true, 1, 4).refine(
                (value) => !isNaN(Number(value)),
                "Invalid input.",
              ),
              yearGraduated: TextInput(false, 0, 4)
                .nullable()
                .transform((value) => {
                  return value === "" ? null : value;
                })
                .refine(
                  (value) => value === "" || !isNaN(Number(value)),
                  "Invalid input.",
                ),
              isStudying: z.boolean(),
            })
            .superRefine((data, ctx) => {
              if (
                data.yearGraduated != null &&
                !isNaN(Number(data.yearStart)) &&
                !isNaN(Number(data.yearGraduated))
              ) {
                if (Number(data.yearStart) > Number(data.yearGraduated)) {
                  ctx.addIssue({
                    code: ZodIssueCode.custom,
                    message: "Year start cannot be greater than graduate year.",
                    path: ["yearGraduated"],
                  });
                }
              }

              if (data.yearGraduated == null && !data.isStudying) {
                ctx.addIssue({
                  code: ZodIssueCode.custom,
                  message: "This field is required.",
                  path: ["yearGraduated"],
                });
              }
            }),
        )
        .min(1, "At least one education is required."),

      // Government Numbers
      sss: TextInput(false, 0, 25)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^[\d]+$/.test(value),
          "Invalid value.",
        )
        .refine(
          (value) => !sssList.some((field) => value === field.sss),
          "SSS number already exists.",
        ),

      birTin: TextInput(false, 0, 25)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^[\d]+$/.test(value),
          "Invalid value.",
        )
        .refine(
          (value) => !tinList.some((field) => value === field.bir_tin),
          "BIR/TIN number already exists.",
        ),

      gsis: TextInput(false, 0, 25)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^[\d]+$/.test(value),
          "Invalid value.",
        )
        .refine(
          (value) => !gsisList.some((field) => value === field.gsis),
          "GSIS number already exists.",
        ),

      pagibig: TextInput(false, 0, 25)
        .nullable()
        .transform((value) => {
          return value === "" ? null : value;
        })
        .refine(
          (value) => value === null || /^[\d]+$/.test(value),
          "Invalid value.",
        )
        .refine(
          (value) => !pagibigList.some((field) => value === field.pag_ibig),
          "PagIbig number already exists.",
        ),

      philhealth: TextInput(false, 0, 25)
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
            !philHealthList.some((field) => value === field.philhealth),
          "PhilHealth number already exists.",
        ),
    })
    .superRefine((data, ctx) => {
      // Check logic for Auto generate checkbox and Employee Number PCC
      if (data.employeeNumberPCC === "" && !data.autoGenerate) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "This field is required.",
          path: ["employeeNumberPCC"],
        });
      }

      // Check if password matches confirm password
      if (data.password !== data.confirm_password) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "Password do not match",
          path: ["confirm_password"],
        });
      }
    });
};

export type NewSchemaAddEmployeeType = z.infer<
  ReturnType<typeof NewSchemaAddEmployee>
>;
