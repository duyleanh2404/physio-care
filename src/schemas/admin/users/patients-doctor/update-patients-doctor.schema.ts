import z from "zod";

export const updatePatientsDoctorSchema = z.object({
  fullName: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  avatar: z.any().optional(),
});

export type UpdatePatientsDoctorFormValues = z.infer<
  typeof updatePatientsDoctorSchema
>;
