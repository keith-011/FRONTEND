import { z, ZodIssueCode } from "zod";

export const AddDocumentSchema = z.object({
  file1: z.instanceof(FileList),
});

export type AddDocumentType = z.infer<typeof AddDocumentSchema>;
