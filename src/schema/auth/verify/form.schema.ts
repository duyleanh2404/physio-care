import z from "zod";

export const formSchema = z.object({
  otp: z.string().nonempty("Vui lòng nhập mã xác thực").min(6, {
    message: "Mã xác thực phải đầy đủ 6 số",
  }),
});

export type FormType = z.infer<typeof formSchema>;
