"use client";

import { useRouter } from "next/navigation";

import { Icon } from "@iconify/react";
import { ChevronsUpDown } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/react-query/query-keys";
import { useAuthStore } from "@/store/use-auth.store";
import { useMe } from "@/react-query/query/users/useMe";

import {
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Toast } from "../ui/toast";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function NavUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isMobile } = useSidebar();
  const { resetAuth } = useAuthStore();

  const { data: user, isPending } = useMe();

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
    } catch {
      Toast("error", "Có lỗi xảy ra");
    }
  };

  return isPending ? (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2 p-2">
          <Skeleton className="w-8 h-8 bg-gray-300 rounded-lg animate-pulse" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-[150px] h-4 bg-gray-300 animate-pulse" />
            <Skeleton className="w-[120px] h-3 bg-gray-300 animate-pulse" />
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  ) : (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="w-8 h-8 rounded-lg">
                <AvatarImage
                  alt={user?.fullName}
                  src={user?.avatarUrl ?? undefined}
                />
                <AvatarFallback className="rounded-lg">
                  {user?.fullName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-sm text-left leading-tight">
                <span className="font-medium truncate">{user?.fullName}</span>
                <span className="text-xs truncate">{user?.email}</span>
              </div>
              <ChevronsUpDown className="size-4 ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={4}
            side={isMobile ? "bottom" : "right"}
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 text-sm px-1 py-1.5 text-left">
                <Avatar className="w-8 h-8 rounded-lg">
                  <AvatarImage
                    alt={user?.fullName}
                    src={user?.avatarUrl ?? undefined}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.fullName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-sm text-left leading-tight">
                  <span className="font-medium truncate">{user?.fullName}</span>
                  <span className="text-xs truncate">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

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
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
