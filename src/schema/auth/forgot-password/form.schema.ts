import z from "zod";

export const formSchema = z.object({
  email: z.string().nonempty("Vui lòng nhập email").email("Email không hợp lệ"),
});

export type FormType = z.infer<typeof formSchema>;
