import z from "zod";

import { RecordStatus } from "@/config.global";

export const updateRecordSchema = z.object({
  goals: z.string().optional(),
  history: z.string().optional(),
  recordDate: z.date().optional(),
  progress: z.string().optional(),
  attachment: z.any().optional(),
  frequency: z.string().optional(),
  intensity: z.string().optional(),
  doctorId: z.string().min(1, "Vui lòng chọn bác sĩ"),
  patientsId: z.string().min(1, "Vui lòng chọn bệnh nhân"),
  treatmentType: z.string().min(1, "Vui lòng chọn loại trị liệu"),
  status: z.enum(Object.values(RecordStatus) as [string, ...string[]]),
});

export type UpdateRecordFormValues = z.infer<typeof updateRecordSchema>;
