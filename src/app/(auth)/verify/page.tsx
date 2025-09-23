"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema, type FormType } from "@/schema/auth/verify/form.schema";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

export default function Page() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-[22px] font-bold">Xác thực tài khoản</h2>
        <div className="flex gap-1 text-sm">
          <p>Chưa nhận được mã?</p>
          <button
            type="button"
            className="text-primary hover:underline cursor-pointer"
          >
            Gửi lại ngay!
          </button>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mã xác thực</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field} className="w-full">
                    <InputOTPGroup className="w-full flex">
                      <InputOTPSlot index={0} className="flex-1 h-16" />
                      <InputOTPSlot index={1} className="flex-1 h-16" />
                      <InputOTPSlot index={2} className="flex-1 h-16" />
                      <InputOTPSlot index={3} className="flex-1 h-16" />
                      <InputOTPSlot index={4} className="flex-1 h-16" />
                      <InputOTPSlot index={5} className="flex-1 h-16" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="w-full">
            Tiếp tục
          </Button>
        </form>
      </Form>
    </>
  );
}
