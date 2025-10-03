"use client";

import { useState } from "react";

import {
  Ban,
  Copy,
  Lock,
  Edit,
  Trash2,
  Loader,
  ArrowUpDown,
  CheckCircle,
  MoreHorizontal,
} from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import type { UserType } from "@/types/users";
import { UserStatus } from "@/config.global";
import { formatDateTime } from "@/utils/format-date";

import { Hint } from "@/components/global/Hint";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ModalBanUser } from "@/components/modals/admin/users/Ban";
import { ModalUnbanUser } from "@/components/modals/admin/users/Unban";
import { ModalDeleteUser } from "@/components/modals/admin/users/Delete";
import { ModalChangePassword } from "@/components/modals/admin/users/ChangePassword";
import { ModalUpdatePatientsDoctor } from "@/components/modals/admin/users/patients-doctor/Update";

export const columns: ColumnDef<UserType>[] = [
  {
    id: "select",
    meta: { label: "Chọn" },
    header: ({ table }) => (
      <Checkbox
        aria-label="Chọn tất cả"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Chọn dòng"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "avatarUrl",
    meta: { label: "Ảnh đại diện" },
    header: () => <div className="text-center">Ảnh đại diện</div>,
    cell: ({ row }) => {
      const fullName = row.getValue("fullName") as string;
      const avatarUrl = row.getValue("avatarUrl") as string | null;

      return (
        <div className="flex justify-center">
          <Avatar className="w-8 h-8">
            <AvatarImage src={avatarUrl || undefined} alt={fullName} />
            <AvatarFallback>{fullName?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "fullName",
    meta: { label: "Họ và tên" },
    header: ({ column }) => (
      <button
        type="button"
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Họ và tên
        <ArrowUpDown className="size-3" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="max-w-[160px] truncate">{row.getValue("fullName")}</div>
    ),
  },
  {
    accessorKey: "email",
    meta: { label: "Email" },
    header: ({ column }) => (
      <button
        type="button"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 cursor-pointer"
      >
        Email
        <ArrowUpDown className="size-3" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate lowercase">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    meta: { label: "Trạng thái" },
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = (row.getValue("status") as string)?.toLowerCase();

      const config: Record<string, { icon: React.ReactNode; label: string }> = {
        active: {
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          label: "Đã xác minh",
        },
        banned: {
          icon: <Ban className="w-4 h-4 text-red-500" />,
          label: "Bị cấm",
        },
        pending: {
          icon: <Loader className="w-4 h-4 animate-spin text-yellow-500" />,
          label: "Chưa xác minh",
        },
      };

      const { icon, label } = config[status] ?? {
        icon: <Loader className="w-4 h-4 text-gray-400" />,
        label: "Không xác định",
      };

      return (
        <Badge variant="outline" className="flex items-center gap-1 px-1.5">
          {icon}
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    meta: { label: "Ngày tạo" },
    header: "Ngày tạo",
    cell: ({ row }) => (
      <div>{formatDateTime(row.getValue("createdAt") as string)}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    meta: { label: "Ngày cập nhật" },
    header: "Ngày cập nhật",
    cell: ({ row }) => (
      <div>{formatDateTime(row.getValue("updatedAt") as string)}</div>
    ),
  },
  {
    id: "actions",
    meta: { label: "Thao tác" },
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      const [isOpenDropdown, setIsOpenDropdown] = useState(false);

      return (
        <DropdownMenu open={isOpenDropdown} onOpenChange={setIsOpenDropdown}>
          <Hint content="Thao tác">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Thao tác</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
          </Hint>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => {
                Toast("success", "Đã sao chép ID");
                navigator.clipboard.writeText(user.id);
              }}
            >
              <Copy className="w-4 h-4 transition-smooth" />
              Sao chép ID
            </DropdownMenuItem>

            <ModalUpdatePatientsDoctor
              user={user}
              setIsOpenDropdown={setIsOpenDropdown}
            >
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Edit className="w-4 h-4 transition-smooth" />
                Chỉnh sửa
              </DropdownMenuItem>
            </ModalUpdatePatientsDoctor>

            <ModalChangePassword
              user={user}
              setIsOpenDropdown={setIsOpenDropdown}
            >
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Lock className="w-4 h-4 transition-smooth" />
                Đổi mật khẩu
              </DropdownMenuItem>
            </ModalChangePassword>

            <DropdownMenuSeparator />

            <ModalDeleteUser user={user} setIsOpenDropdown={setIsOpenDropdown}>
              <DropdownMenuItem
                variant="destructive"
                onSelect={(e) => e.preventDefault()}
              >
                <Trash2 className="w-4 h-4" />
                Xóa
              </DropdownMenuItem>
            </ModalDeleteUser>

            {user.status === UserStatus.BANNED ? (
              <ModalUnbanUser user={user} setIsOpenDropdown={setIsOpenDropdown}>
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Ban className="w-4 h-4" />
                  Gỡ cấm
                </DropdownMenuItem>
              </ModalUnbanUser>
            ) : (
              <ModalBanUser user={user} setIsOpenDropdown={setIsOpenDropdown}>
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Ban className="w-4 h-4" />
                  Cấm
                </DropdownMenuItem>
              </ModalBanUser>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
