"use client";

import { useState } from "react";

import {
  Copy,
  Edit,
  Loader,
  Trash2,
  CheckCircle,
  MoreHorizontal,
} from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import type { RecordType } from "@/types/records";
import { formatDateTime } from "@/utils/format-date";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Toast } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Hint } from "@/components/global/Hint";
import { ModalUpdateRecord } from "@/components/modals/admin/users/patients/records/Update";
import { ModalDeleteRecord } from "@/components/modals/admin/users/patients/records/Delete";

export const columns: ColumnDef<RecordType>[] = [
  {
    accessorKey: "id",
    meta: { label: "Mã hồ sơ" },
    header: () => <div>Mã hồ sơ</div>,
    cell: ({ row }) => <div>{row.original.recordCode}</div>,
  },
  {
    id: "patient",
    meta: { label: "Tên bệnh nhân" },
    header: () => <div>Bệnh nhân</div>,
    cell: ({ row }) => (
      <Hint content="Click để sao chép ID bệnh nhân">
        <button
          type="button"
          onClick={() => {
            const patientId = row.original.patient?.id || "";
            navigator.clipboard.writeText(patientId);
            Toast("success", "Đã sao chép ID bệnh nhân");
          }}
          className="hover:text-primary cursor-pointer transition-smooth"
        >
          {row.original.patient?.fullName || "Không có dữ liệu"}
        </button>
      </Hint>
    ),
  },
  {
    id: "doctor",
    meta: { label: "Tên bác sĩ" },
    header: () => <div>Bác sĩ</div>,
    cell: ({ row }) => (
      <Hint content="Click để sao chép ID bác sĩ">
        <button
          type="button"
          onClick={() => {
            const doctorId = row.original.doctor?.id || "";
            navigator.clipboard.writeText(doctorId);
            Toast("success", "Đã sao chép ID bác sĩ");
          }}
          className="hover:text-primary cursor-pointer transition-smooth"
        >
          {row.original.doctor?.fullName || "Không có dữ liệu"}
        </button>
      </Hint>
    ),
  },
  {
    accessorKey: "status",
    meta: { label: "Trạng thái" },
    header: () => <div>Trạng thái</div>,
    cell: ({ row }) => {
      const status = (row.getValue("status") as string)?.toLowerCase();

      const config: Record<string, { icon: React.ReactNode; label: string }> = {
        active: {
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          label: "Đang điều trị",
        },
        inactive: {
          icon: <Loader className="w-4 h-4 animate-spin text-yellow-500" />,
          label: "Tạm dừng",
        },
        completed: {
          icon: <CheckCircle className="w-4 h-4 text-blue-500" />,
          label: "Hoàn tất",
        },
      };

      const { icon, label } = config[status];

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
    header: () => <div>Ngày tạo</div>,
    cell: ({ row }) => <div>{formatDateTime(row.getValue("createdAt"))}</div>,
  },
  {
    accessorKey: "updatedAt",
    meta: { label: "Ngày cập nhật" },
    header: () => <div>Ngày cập nhật</div>,
    cell: ({ row }) => <div>{formatDateTime(row.getValue("updatedAt"))}</div>,
  },
  {
    id: "actions",
    meta: { label: "Thao tác" },
    enableHiding: false,
    cell: ({ row }) => {
      const record = row.original;

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
                Toast("success", "Đã sao chép ID hồ sơ");
                navigator.clipboard.writeText(record.recordCode);
              }}
            >
              <Copy className="w-4 h-4 transition-smooth" />
              Sao chép ID
            </DropdownMenuItem>

            <ModalUpdateRecord
              record={record}
              setIsOpenDropdown={setIsOpenDropdown}
            >
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Edit className="w-4 h-4 transition-smooth" />
                Chỉnh sửa hồ sơ
              </DropdownMenuItem>
            </ModalUpdateRecord>

            <DropdownMenuSeparator />

            <ModalDeleteRecord
              record={record}
              setIsOpenDropdown={setIsOpenDropdown}
            >
              <DropdownMenuItem
                variant="destructive"
                onSelect={(e) => e.preventDefault()}
              >
                <Trash2 className="w-4 h-4" />
                Xóa hồ sơ
              </DropdownMenuItem>
            </ModalDeleteRecord>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
