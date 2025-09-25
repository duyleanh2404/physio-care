"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  formSchema,
  type FormType,
} from "@/schema/auth/reset-password/form.schema";

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
import { Input } from "@/components/ui/input";
import { Toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: FormType) => {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: data.otp,
          newPassword: data.newPassword,
        }),
      });

      if (!res.ok) {
        Toast("error", "Mã xác thực không hợp lệ hoặc đã hết hạn");
        return;
      }

      Toast("success", "Đặt lại mật khẩu thành công!");
      router.push("/login");
    } catch {
      Toast("error", "Lỗi hệ thống, vui lòng thử lại sau");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-[22px] font-bold">Đặt lại mật khẩu</h2>
        <div className="flex gap-1 text-sm">
          <p>Đã nhớ mật khẩu?</p>
          <Link href="/login" className="text-primary hover:underline">
            Đăng nhập ngay!
          </Link>
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
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu mới</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Nhập lại mật khẩu mới"
                  />
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
            Đặt lại mật khẩu
          </Button>
        </form>
      </Form>
    </>
  );
}
