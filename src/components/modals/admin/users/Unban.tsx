"use client";

import { useState } from "react";

import { Loader2, Slash } from "lucide-react";

import type { User } from "@/types/users";
import { useUnbanUser } from "@/react-query/mutation/users/useUnbanUser";

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

type ModalUnbanUserProps = {
  user: User;
  children: React.ReactNode;
  setIsOpenDropdown: (open: boolean) => void;
};

export function ModalUnbanUser({
  user,
  children,
  setIsOpenDropdown,
}: ModalUnbanUserProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    setIsOpenDropdown(false);
  };

  const { mutate, isPending } = useUnbanUser({
    onSuccess: () => closeModal(),
  });

  const handleUnban = () => {
    mutate(user.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gỡ cấm người dùng</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn gỡ cấm{" "}
            <span className="font-semibold text-foreground">
              {user.fullName}
            </span>
            ? Người này sẽ có thể đăng nhập lại vào hệ thống.
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
            onClick={handleUnban}
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Slash className="size-3.5" />
            )}
            {isPending ? "Đang gỡ cấm..." : "Gỡ cấm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
