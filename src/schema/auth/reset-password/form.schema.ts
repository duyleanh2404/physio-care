import z from "zod";

export const formSchema = z
  .object({
    newPassword: z
      .string()
      .nonempty("Vui lòng nhập mật khẩu mới")
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

    confirmNewPassword: z.string().nonempty("Vui lòng xác nhận mật khẩu mới"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Mật khẩu xác nhận không khớp",
  });

export type FormType = z.infer<typeof formSchema>;
