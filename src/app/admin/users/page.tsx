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
import { Plus, MoreHorizontal } from "lucide-react";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";

import { useUsers } from "@/react-query/query/users/useUsers";

import { Button } from "@/components/ui/button";
import { ModalCreateUser } from "@/components/modals/admin/users/Create";

import { DataTable } from "@/components/admin/DataTable";
import { columns } from "@/components/admin/users/columns";
import { SearchInput } from "@/components/admin/SearchInput";
import { FilterMenu } from "@/components/admin/users/FilterMenu";
import { ColumnVisibilityMenu } from "@/components/admin/ColumnVisibilityMenu";
import { TablePaginationControls } from "@/components/admin/TablePaginationControls";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export default function Page() {
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10),
  );
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const [role] = useQueryState("role", parseAsString.withDefault(""));
  const [status] = useQueryState("status", parseAsString.withDefault(""));
  const [dateTo] = useQueryState("dateTo", parseAsString.withDefault(""));
  const [dateFrom] = useQueryState("dateFrom", parseAsString.withDefault(""));

  const { data } = useUsers({
    page,
    role,
    limit,
    search,
    status,
    dateTo,
    dateFrom,
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
        <SearchInput />

        <div className="flex items-center flex-row md:flex-row-reverse lg:flex-row gap-2 ml-auto">
          <div className="hidden lg:flex items-center gap-2">
            <ModalCreateUser>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Tạo người dùng
              </Button>
            </ModalCreateUser>

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
                  <ModalCreateUser>
                    <Button
                      size="sm"
                      className="w-full flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4 text-white" />
                      Tạo người dùng
                    </Button>
                  </ModalCreateUser>
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

      <DataTable table={table} />
      <TablePaginationControls table={table} />
    </div>
  );
}
