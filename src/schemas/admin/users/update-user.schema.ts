import z from "zod";

export const updateUserSchema = z.object({
  fullName: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  role: z.enum(["doctor", "user"]),
  avatar: z.any().optional(),
});

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
