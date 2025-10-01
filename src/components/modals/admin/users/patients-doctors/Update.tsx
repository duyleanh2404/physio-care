"use client";

import Image from "next/image";
import { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Loader2, Upload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ControllerRenderProps } from "react-hook-form";

import { cn } from "@/lib/utils";
import type { User } from "@/types/users";
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

type ModalUpdateUserProps = {
  user: User;
  children: React.ReactNode;
  setIsOpenDropdown: (open: boolean) => void;
};

const updateUserSchema = z.object({
  fullName: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  avatar: z.any().optional(),
});

type UpdateUserFormValues = z.infer<typeof updateUserSchema>;

export function ModalUpdateUser({
  user,
  children,
  setIsOpenDropdown,
}: ModalUpdateUserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(user.avatarUrl || null);

  const { mutate, isPending } = useUpdateUser({
    onSuccess: () => {
      closeModal();
    },
  });

  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: user.fullName,
    },
  });

  const closeModal = () => {
    setIsOpen(false);
    setIsOpenDropdown(false);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<UpdateUserFormValues, "avatar">,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (values: UpdateUserFormValues) => {
    const formData = new FormData();
    formData.append("fullName", values.fullName);

    if (values.avatar instanceof File) {
      formData.append("avatar", values.avatar);
    }

    mutate({ id: user.id, data: formData });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật người dùng</DialogTitle>
          <DialogDescription>Chỉnh sửa thông tin người dùng.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-2"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nguyễn Văn A" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh đại diện</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, field)}
                      />
                      <label
                        htmlFor="avatar"
                        className={cn(
                          "group flex flex-col items-center justify-center w-44 h-44 rounded-full cursor-pointer transition-all overflow-hidden mx-auto relative",
                          !preview &&
                            "border-2 border-dashed hover:border-primary hover:bg-primary/10",
                        )}
                      >
                        {preview ? (
                          <Image
                            width={200}
                            height={200}
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-1 text-muted-foreground group-hover:text-primary transition-smooth">
                            <Upload className="w-6 h-6" />
                            <span className="text-xs">Chọn ảnh</span>
                          </div>
                        )}

                        {preview && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-smooth rounded-full">
                            <Upload className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </label>
                    </div>
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
                {isPending ? "Đang lưu..." : "Lưu"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
