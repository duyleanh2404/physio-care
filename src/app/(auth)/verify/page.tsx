"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Loader2 } from "lucide-react";
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
import { Toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const [isResending, setIsResending] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const resendOtp = async () => {
    setIsResending(true);
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        Toast("error", "Gửi lại OTP thất bại");
        setIsResending(false);
        return;
      }

      Toast("success", "OTP đã được gửi lại vào email của bạn");
    } catch {
      Toast("error", "Lỗi hệ thống, vui lòng thử lại sau");
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async (data: FormType) => {
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: data.otp, email }),
      });

      if (!res.ok) {
        Toast("error", "Mã xác thực không hợp lệ hoặc đã hết hạn");
        return;
      }

      Toast("success", "Xác thực thành công!");
      router.push("/login");
    } catch {
      Toast("error", "Lỗi hệ thống, vui lòng thử lại sau");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-[22px] font-bold">Xác thực tài khoản</h2>
        <div className="flex gap-1 text-sm">
          <p>Chưa nhận được mã?</p>
          <button
            type="button"
            onClick={resendOtp}
            disabled={isResending}
            className="text-primary hover:underline cursor-pointer"
          >
            {isResending ? "Đang gửi..." : "Gửi lại ngay!"}
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
          <Button
            size="lg"
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="size-4 animate-spin" />
            )}
            <span>Tiếp tục</span>
          </Button>
        </form>
      </Form>
    </>
  );
}
