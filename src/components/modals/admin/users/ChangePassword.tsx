"use client";

import { useState } from "react";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { UserType } from "@/types/users";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/schemas/admin/users/change-password.schema";
import { useUpdateUser } from "@/react-query/mutation/users/useUpdateUser";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ModalChangePasswordProps = {
  user: UserType;
  children: React.ReactNode;
  setIsOpenDropdown: (open: boolean) => void;
};

export function ModalChangePassword({
  user,
  children,
  setIsOpenDropdown,
}: ModalChangePasswordProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useUpdateUser({
    onSuccess: () => {
      closeModal();
    },
  });

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const closeModal = () => {
    setIsOpen(false);
    setIsOpenDropdown(false);
  };

  const onSubmit = (values: ChangePasswordFormValues) => {
    const formData = new FormData();
    formData.append("password", values.password);

    mutate({ id: user.id, data: formData });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đổi mật khẩu</DialogTitle>
          <DialogDescription>
            Nhập mật khẩu mới cho người dùng: <strong>{user.fullName}</strong>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-2"
          >
            <FormField
              control={form.control}
              name="password"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
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

            <DialogFooter>
              <Button
                size="sm"
                type="button"
                variant="outline"
                onClick={closeModal}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isPending} size="sm">
                {isPending && <Loader2 className="size-4 animate-spin" />}
                {isPending ? "Đang lưu..." : "Đổi mật khẩu"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
