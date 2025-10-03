import z from "zod";

export const createUserSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  fullName: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  role: z.enum(["admin", "user", "doctor"]),
  avatar: z.any().optional(),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
