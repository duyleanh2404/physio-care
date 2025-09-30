"use client";

import { useState } from "react";

import { Loader2, Trash2 } from "lucide-react";

import type { User } from "@/types/users";
import { useDeleteUser } from "@/react-query/mutation/users/useDeleteUser";

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

type ModalDeleteUserProps = {
  user: User;
  children: React.ReactNode;
  setIsOpenDropdown: (open: boolean) => void;
};

export function ModalDeleteUser({
  user,
  children,
  setIsOpenDropdown,
}: ModalDeleteUserProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useDeleteUser({
    onSuccess: () => closeModal,
  });

  const closeModal = () => {
    setIsOpen(false);
    setIsOpenDropdown(false);
  };

  const handleDelete = () => {
    mutate(user.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa người dùng</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa{" "}
            <span className="font-semibold text-foreground">
              {user.fullName}
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
