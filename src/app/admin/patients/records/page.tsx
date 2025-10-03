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
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";

import { useRecords } from "@/react-query/query/users/patients/records/useRecords";

import { DataTable } from "@/components/admin/DataTable";
import { SearchInput } from "@/components/admin/SearchInput";
import { columns } from "@/components/admin/patients/records/columns";
import { FilterMenu } from "@/components/admin/patients-doctors/FilterMenu";
import { ColumnVisibilityMenu } from "@/components/admin/ColumnVisibilityMenu";
import { TablePaginationControls } from "@/components/admin/TablePaginationControls";
import { ModalCreateRecord } from "@/components/modals/admin/users/patients/records/Create";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10),
  );
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const [status] = useQueryState("status", parseAsString.withDefault(""));
  const [dateTo] = useQueryState("dateTo", parseAsString.withDefault(""));
  const [dateFrom] = useQueryState("dateFrom", parseAsString.withDefault(""));

  const { data, isFetching } = useRecords();

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
        pageSize: limit,
        pageIndex: page - 1,
      },
    },
    manualPagination: true,
    pageCount: data?.totalPages ?? -1,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,

    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex: page - 1, pageSize: limit })
          : updater;
      setPage(next.pageIndex + 1);
      setLimit(next.pageSize);
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <SearchInput placeholder="Tìm kiếm theo mã hồ sơ" />

        <div className="flex items-center flex-row md:flex-row-reverse lg:flex-row gap-2 ml-auto">
          <div className="hidden lg:flex items-center gap-2">
            <ModalCreateRecord>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Tạo hồ sơ
              </Button>
            </ModalCreateRecord>

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
                <DropdownMenuItem className="focus:[&_svg]:!text-white dark:focus:[&_svg]:!text-white">
                  <ModalCreateRecord>
                    <Button
                      size="sm"
                      className="w-full flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4 text-white" />
                      Thêm hồ sơ
                    </Button>
                  </ModalCreateRecord>
                </DropdownMenuItem>

                <DropdownMenuItem className="[&_svg]:!text-black dark:[&_svg]:!text-white focus:[&_svg]:!text-black dark:focus:[&_svg]:!text-white dark:focus:text-white">
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
