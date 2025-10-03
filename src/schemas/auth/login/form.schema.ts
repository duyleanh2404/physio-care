import z from "zod";

export const formSchema = z.object({
  email: z.string().nonempty("Vui lòng nhập email").email("Email không hợp lệ"),
  password: z
    .string()
    .nonempty("Vui lòng nhập mật khẩu")
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
    .max(50, { message: "Mật khẩu không được vượt quá 50 ký tự" }),
});

export type FormType = z.infer<typeof formSchema>;
