"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";

import type { RecordType } from "@/types/records";
import { useDeleteRecord } from "@/react-query/mutation/users/patients/useDeleteMedicalRecord";

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

type ModalDeleteRecordProps = {
  record: RecordType;
  children: React.ReactNode;
  setIsOpenDropdown: (open: boolean) => void;
};

export function ModalDeleteRecord({
  record,
  children,
  setIsOpenDropdown,
}: ModalDeleteRecordProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useDeleteRecord({
    onSuccess: () => closeModal(),
  });

  const closeModal = () => {
    setIsOpen(false);
    setIsOpenDropdown(false);
  };

  const handleDelete = () => {
    mutate(record.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa hồ sơ vật lý trị liệu</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa hồ sơ của{" "}
            <span className="font-semibold text-foreground">
              {record.patient.fullName}
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
