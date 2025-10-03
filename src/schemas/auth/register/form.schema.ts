import z from "zod";

export const formSchema = z
  .object({
    fullName: z.string().nonempty("Vui lòng nhập họ tên").min(2, {
      message: "Họ và tên phải có ít nhất 2 ký tự",
    }),

    email: z.string().nonempty("Vui lòng nhập email").email({
      message: "Email không hợp lệ",
    }),

    password: z
      .string()
      .nonempty("Vui lòng nhập mật khẩu")
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
      .max(50, { message: "Mật khẩu không được vượt quá 50 ký tự" })
      .regex(/[a-z]/, {
        message: "Mật khẩu phải chứa ít nhất 1 chữ thường",
      })
      .regex(/[A-Z]/, {
        message: "Mật khẩu phải chứa ít nhất 1 chữ hoa",
      })
      .regex(/[0-9]/, {
        message: "Mật khẩu phải chứa ít nhất 1 chữ số",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt",
      }),

    confirmPassword: z.string().nonempty("Vui lòng xác nhận mật khẩu mới"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu xác nhận không khớp",
  });

export type FormType = z.infer<typeof formSchema>;
