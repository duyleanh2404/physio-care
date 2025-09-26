"use client";

import { useRouter } from "next/navigation";

import { Icon } from "@iconify/react";
import { useQueryClient } from "@tanstack/react-query";

import type { User } from "@/types/users";
import { queryKeys } from "@/react-query/query-keys";
import { useAuthStore } from "@/store/use-auth.store";

import { Toast } from "../ui/toast";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserButton({ user }: { user: User }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { resetAuth } = useAuthStore();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });

      if (res.ok) {
        Toast("success", "Đăng xuất thành công");
        queryClient.removeQueries({ queryKey: queryKeys.users.me });
        resetAuth();
        router.push("/login");
      } else {
        Toast("error", "Đăng xuất thất bại");
      }
    } catch (error) {
      Toast("error", "Có lỗi xảy ra");
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-9">
          <AvatarImage src={user.avatarUrl ?? undefined} />
          <AvatarFallback>
            {user.fullName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[250px] p-2">
        <div className="flex items-center gap-2">
          <Avatar className="size-9">
            <AvatarImage src={user.avatarUrl ?? undefined} />
            <AvatarFallback>
              {user.fullName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="max-w-[150px] truncate">
            <h2 className="text-sm font-medium truncate">{user.fullName}</h2>
            <p className="text-xs truncate">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={handleLogout}
          className="flex items-center gap-2 text-[13px]"
        >
          <Icon icon="mdi:logout" width="18" height="18" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
