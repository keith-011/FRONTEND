import { z } from "zod";

export const LoginSchema = z.object({
  employeeNumber: z
    .string()
    .trim()
    .min(1, "Employee number and password are required.")
    .max(50),
  password: z
    .string()
    .min(1, "Employee number and password are required.")
    .max(50),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
