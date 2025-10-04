import { z } from "zod";

export const createSpecialtySchema = z.object({
  name: z.string().min(2, "Tên chuyên khoa ít nhất 2 ký tự"),
  description: z.string().optional(),
  notes: z.string().optional(),
  image: z
    .any()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Chỉ cho phép file ảnh (mọi định dạng ảnh hợp lệ)",
    )
    .optional(),
});

export type CreateSpecialtyFormValues = z.infer<typeof createSpecialtySchema>;
