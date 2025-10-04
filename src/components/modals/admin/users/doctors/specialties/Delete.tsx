"use client";

import { useState } from "react";

import { Loader2, Trash2 } from "lucide-react";

import type { SpecialtyType } from "@/types/specialties";
import { useDeleteSpecialty } from "@/react-query/mutation/users/doctors/specialties/useDeleteSpecialty";

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ModalDeleteSpecialtyProps = {
  specialty: SpecialtyType;
  children: React.ReactNode;
  setIsOpenDropdown: (open: boolean) => void;
};

export function ModalDeleteSpecialty({
  specialty,
  children,
  setIsOpenDropdown,
}: ModalDeleteSpecialtyProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useDeleteSpecialty({
    onSuccess: () => closeModal(),
  });

  const closeModal = () => {
    setIsOpen(false);
    setIsOpenDropdown(false);
  };

  const handleDelete = () => {
    mutate(specialty.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa chuyên khoa</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa chuyên khoa{" "}
            <span className="font-semibold text-foreground">
              {specialty.name}
            </span>
            ? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            size="sm"
            type="button"
            variant="outline"
            onClick={closeModal}
          >
            Hủy
          </Button>
          <Button
            size="sm"
            type="button"
            disabled={isPending}
            variant="destructive"
            onClick={handleDelete}
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-3.5" />
            )}
            {isPending ? "Đang xóa..." : "Xóa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
