"use client";

import Image from "next/image";
import { useState } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { Copy, Edit, Trash2, MoreHorizontal } from "lucide-react";

import { formatDateTime } from "@/utils/format-date";
import type { SpecialtyType } from "@/types/specialties";

import { Hint } from "@/components/global/Hint";
import { SpecialtySheet } from "./SpecialtySheet";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { ModalDeleteSpecialty } from "@/components/modals/admin/users/doctors/specialties/Delete";
import { ModalUpdateSpecialties } from "@/components/modals/admin/users/doctors/specialties/Update";

export const columns: ColumnDef<SpecialtyType>[] = [
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
    accessorKey: "imageUrl",
    meta: { label: "Ảnh" },
    header: "Ảnh",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const imageUrl = row.getValue("imageUrl") as string | null;

      return imageUrl ? (
        <div className="flex justify-center">
          <Image
            src={imageUrl}
            alt={name}
            width={40}
            height={40}
            className="rounded object-cover"
          />
        </div>
      ) : (
        <p>-</p>
      );
    },
  },
  {
    accessorKey: "name",
    meta: { label: "Tên chuyên khoa" },
    header: ({ column }) => (
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tên chuyên khoa
      </button>
    ),
    cell: ({ row }) => <SpecialtySheet specialty={row.original} />,
  },
  {
    accessorKey: "description",
    meta: { label: "Mô tả" },
    header: "Mô tả",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "notes",
    meta: { label: "Ghi chú" },
    header: "Ghi chú",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">{row.getValue("notes")}</div>
    ),
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
      const specialty = row.original;
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
                Toast("success", "Đã sao chép ID chuyên khoa");
                navigator.clipboard.writeText(specialty.id);
              }}
            >
              <Copy className="w-4 h-4" />
              Sao chép ID
            </DropdownMenuItem>

            <ModalUpdateSpecialties
              specialty={specialty}
              setIsOpenDropdown={setIsOpenDropdown}
            >
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Edit className="w-4 h-4 transition-smooth" />
                Chỉnh sửa
              </DropdownMenuItem>
            </ModalUpdateSpecialties>

            <DropdownMenuSeparator />

            <ModalDeleteSpecialty
              specialty={specialty}
              setIsOpenDropdown={setIsOpenDropdown}
            >
              <DropdownMenuItem
                variant="destructive"
                onSelect={(e) => e.preventDefault()}
              >
                <Trash2 className="w-4 h-4" />
                Xóa
              </DropdownMenuItem>
            </ModalDeleteSpecialty>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
