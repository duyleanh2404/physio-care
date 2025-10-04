"use client";

import Image from "next/image";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { Loader2, Upload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import type { SpecialtyType } from "@/types/specialties";
import {
  updateSpecialtySchema,
  type UpdateSpecialtyFormValues,
} from "@/schemas/admin/users/doctors/specialties/update-specialty.schema";
import { useUpdateSpecialty } from "@/react-query/mutation/users/doctors/specialties/useUpdateSpecialty";

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
import { Textarea } from "@/components/ui/textarea";

type ModalUpdateSpecialtiesProps = {
  specialty: SpecialtyType;
  children: React.ReactNode;
  setIsOpenDropdown?: (open: boolean) => void;
};

export function ModalUpdateSpecialties({
  children,
  specialty,
  setIsOpenDropdown,
}: ModalUpdateSpecialtiesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(
    specialty.imageUrl || null,
  );

  const { mutate, isPending } = useUpdateSpecialty({
    onSuccess: () => closeModal(),
  });

  const form = useForm<UpdateSpecialtyFormValues>({
    resolver: zodResolver(updateSpecialtySchema),
    defaultValues: {
      id: specialty.id,
      name: specialty.name,
      notes: specialty.notes,
      description: specialty.description,
      image: undefined,
    },
  });

  const closeModal = () => {
    form.reset();
    setIsOpen(false);
    if (setIsOpenDropdown) setIsOpenDropdown(false);
    setPreviewImage(specialty.imageUrl || null);
  };

  const onSubmit = (values: UpdateSpecialtyFormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("notes", values.notes || "");
    formData.append("description", values.description || "");

    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    mutate({ id: values.id, formData });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="w-full sm:max-w-lg h-[95vh] 2xl:h-auto overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cập nhật chuyên khoa vật lý trị liệu</DialogTitle>
          <DialogDescription>
            Chỉnh sửa thông tin chi tiết chuyên khoa vật lý trị liệu.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên chuyên khoa</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nhập tên chuyên khoa" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả chuyên khoa</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Nhập mô tả" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Nhập ghi chú" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh chuyên khoa</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        type="file"
                        id="update-specialty-image"
                        accept="image/png,image/jpeg"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                          if (file) {
                            setPreviewImage(URL.createObjectURL(file));
                          }
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="update-specialty-image"
                        className={cn(
                          "group flex flex-col items-center justify-center w-44 h-44 rounded-full cursor-pointer transition-all overflow-hidden mx-auto relative",
                          !previewImage &&
                            "border-2 border-dashed hover:border-primary hover:bg-primary/10",
                        )}
                      >
                        {previewImage ? (
                          <Image
                            width={200}
                            height={200}
                            alt="Preview"
                            src={previewImage}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-1 text-muted-foreground group-hover:text-primary transition-smooth">
                            <Upload className="w-6 h-6" />
                            <span className="text-xs">
                              Chọn ảnh chuyên khoa
                            </span>
                          </div>
                        )}

                        {previewImage && (
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

            <DialogFooter className="flex justify-end gap-2">
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
                {isPending ? "Đang cập nhật..." : "Cập nhật chuyên khoa"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
