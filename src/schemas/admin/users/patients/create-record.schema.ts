import z from "zod";

import { RecordStatus } from "@/config.global";

export const createRecordSchema = z.object({
  goals: z.string().optional(),
  history: z.string().optional(),
  recordDate: z.date().optional(),
  progress: z.string().optional(),
  attachments: z.any().optional(),
  frequency: z.string().optional(),
  intensity: z.string().optional(),
  attachment: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "File phải nhỏ hơn hoặc bằng 5MB",
    }),
  doctorId: z.string().min(1, "Vui lòng chọn bác sĩ"),
  patientsId: z.string().min(1, "Vui lòng chọn bệnh nhân"),
  treatmentType: z.string().min(1, "Vui lòng chọn loại trị liệu"),
  status: z.enum(Object.values(RecordStatus) as [string, ...string[]]),
});

export type CreateRecordFormValues = z.infer<typeof createRecordSchema>;
