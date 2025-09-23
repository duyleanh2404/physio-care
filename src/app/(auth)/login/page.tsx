"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema, type FormType } from "@/schema/auth/login/form.schema";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-[22px] font-bold">Đăng nhập tài khoản</h2>
        <div className="flex gap-1 text-sm">
          <p>Chưa có tài khoản?</p>
          <Link href="/register" className="text-primary hover:underline">
            Đăng ký ngay!
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nhập email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="relative flex flex-col gap-1">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Nhập mật khẩu"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/forgot-password"
              className="text-sm hover:text-primary ml-auto transition-smooth"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <Button type="submit" size="lg" className="w-full">
            Đăng nhập tài khoản
          </Button>
        </form>
      </Form>
    </>
  );
}
