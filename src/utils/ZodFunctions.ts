import { z, ZodIssueCode } from "zod";

export const TextInput = (required: boolean, min: number, max: number) => {
  if (required) {
    return z
      .string()
      .trim()
      .min(min, "This field is required.")
      .max(max, `This field only accepts up to ${max} characters.`);
  } else {
    return z
      .string()
      .trim()
      .max(max, `This field only accepts up to ${max} characters.`);
  }
};

export const SelectInputRequired = z
  .string()
  .trim()
  .min(1, "This field is required.")
  .superRefine((data, ctx) => {
    if (!z.string().uuid().safeParse(data).success) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Invalid input.",
      });
      return;
    }
  });
