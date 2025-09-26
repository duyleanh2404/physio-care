"use client";

import { Icon } from "@iconify/react";

import type { User } from "@/types/users";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserButton({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.avatarUrl ?? undefined} />
          <AvatarFallback>
            {user.fullName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        <div className="flex items-center gap-3">
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
          className="flex items-center gap-2"
        >
          <Icon icon="mdi:logout" width="18" height="18" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
