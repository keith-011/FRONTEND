import { z, ZodIssueCode } from "zod";
import { ExistingDepartmentNames } from "../utils/Types";

export const AddDepartmentSchema = (
  departmentNames: ExistingDepartmentNames[],
) => {
  return z.object({
    department: z
      .string()
      .trim()
      .min(1, "This field is required.")
      .max(150, "This field only accepts up to 150 characters.")
      .regex(/^[A-Za-z\s]+$/, "Invalid input.")
      .superRefine((data, ctx) => {
        if (departmentNames) {
          const isDuplicate = departmentNames.some(
            (item) => item.department.toLowerCase() === data.toLowerCase(),
          );
          if (isDuplicate) {
            ctx.addIssue({
              code: ZodIssueCode.custom,
              message: "Department name already exists.",
            });
          }
        } else {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: "Error fetching data.",
          });
        }
      }),
    department_head: z
      .string()
      .nullable()
      .transform((value) => {
        return value === "" ? null : value;
      })
      .refine(
        (value) => value === null || z.string().uuid().safeParse(value).success,
        "Invalid input.",
      )
      .optional(),
  });
};

export type AddDepartmentType = z.infer<ReturnType<typeof AddDepartmentSchema>>;
