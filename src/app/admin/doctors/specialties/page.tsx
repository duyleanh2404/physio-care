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
import { MoreHorizontal, Plus } from "lucide-react";

import { cleanParams } from "@/utils/clean-params";
import { useSpecialtiesQueryState } from "@/nuqs/admin/specialties";
import { useSpecialties } from "@/react-query/query/users/doctors/specialties/useSpecialties";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/admin/DataTable";
import { SearchInput } from "@/components/admin/SearchInput";
import { columns } from "@/components/admin/doctors/specialties/columns";
import { FilterMenu } from "@/components/admin/doctors/specialties/FilterMenu";
import { ColumnVisibilityMenu } from "@/components/admin/ColumnVisibilityMenu";
import { TablePaginationControls } from "@/components/admin/TablePaginationControls";
import { ModalCreateSpecialties } from "@/components/modals/admin/users/doctors/specialties/Create";

export default function Page() {
  const { state: queryState, setters } = useSpecialtiesQueryState();

  const filteredParams = cleanParams(queryState);

  const { data, isFetching } = useSpecialties({
    ...filteredParams,
  });

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
        <SearchInput placeholder="Tìm kiếm theo tên chuyên khoa" />

        <div className="flex items-center flex-row md:flex-row-reverse lg:flex-row gap-2 ml-auto">
          <div className="hidden lg:flex items-center gap-2">
            <ModalCreateSpecialties>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Thêm chuyên khoa
              </Button>
            </ModalCreateSpecialties>
            <FilterMenu />
          </div>

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
