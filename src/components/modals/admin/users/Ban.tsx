"use client";

import { useState } from "react";

import { Loader2, Slash } from "lucide-react";

import type { User } from "@/types/users";
import { useBanUser } from "@/react-query/mutation/users/useBanUser";

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

type ModalBanUserProps = {
  user: User;
  children: React.ReactNode;
  setIsOpenDropdown: (open: boolean) => void;
};

export function ModalBanUser({
  user,
  children,
  setIsOpenDropdown,
}: ModalBanUserProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useBanUser({
    onSuccess: () => closeModal,
  });

  const closeModal = () => {
    setIsOpen(false);
    setIsOpenDropdown(false);
  };

  const handleBan = () => {
    mutate(user.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cấm người dùng</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn cấm{" "}
            <span className="font-semibold text-foreground">
              {user.fullName}
            </span>
            ? Người này sẽ không thể đăng nhập vào hệ thống.
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
            onClick={handleBan}
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Slash className="size-3.5" />
            )}
            {isPending ? "Đang cấm..." : "Cấm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
