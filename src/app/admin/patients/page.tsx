"use client";

import { useState } from "react";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  getFilteredRowModel,
  type VisibilityState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { UserRole } from "@/config.global";
import { cleanParams } from "@/utils/clean-params";
import { useUsers } from "@/react-query/query/users/useUsers";
import { useUsersQueryState } from "@/nuqs/admin/users";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/admin/DataTable";
import { SearchInput } from "@/components/admin/SearchInput";
import { columns } from "@/components/admin/patients-doctors/columns";
import { FilterMenu } from "@/components/admin/patients-doctors/FilterMenu";
import { ColumnVisibilityMenu } from "@/components/admin/ColumnVisibilityMenu";
import { TablePaginationControls } from "@/components/admin/TablePaginationControls";

export default function Page() {
  const { state: queryState, setters } = useUsersQueryState();

  const filteredParams = cleanParams({
    ...queryState,
    role: UserRole.USER,
  });

  const { data, isFetching } = useUsers(filteredParams);

  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    state: {
      sorting,
      rowSelection,
      columnFilters,
      columnVisibility,
      pagination: {
        pageSize: queryState.limit,
        pageIndex: queryState.page - 1,
      },
    },
    manualPagination: true,
    onSortingChange: setSorting,
    pageCount: data?.totalPages ?? -1,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({
              pageIndex: queryState.page - 1,
              pageSize: queryState.limit,
            })
          : updater;
      setters.setPage(next.pageIndex + 1);
      setters.setLimit(next.pageSize);
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <SearchInput placeholder="Tìm kiếm theo tên bệnh nhân" />

        <div className="flex items-center flex-row md:flex-row-reverse lg:flex-row gap-2 ml-auto">
          <FilterMenu />

          <div className="flex lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FilterMenu />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ColumnVisibilityMenu table={table} />
        </div>
      </div>

      <DataTable table={table} isFetching={isFetching} columns={columns} />
      <TablePaginationControls table={table} />
    </div>
  );
}
