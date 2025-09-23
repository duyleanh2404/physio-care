"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  formSchema,
  type FormType,
} from "@/schema/auth/forgot-password/form.schema";

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
    },
  });

  const onSubmit = (data: FormType) => {
    console.log(data);
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
          <Button type="submit" size="lg" className="w-full">
            Tiếp tục
          </Button>
        </form>
      </Form>
    </>
  );
}
