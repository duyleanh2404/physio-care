import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { columns } from "./users/columns";
import type { User } from "@/types/users";

import {
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableHeader,
  Table as BaseTable,
} from "@/components/ui/table";

export function DataTable({ table }: { table: TanstackTable<User> }) {
  return (
    <div className="h-[calc(100vh-185px)] overflow-hidden rounded-md border overflow-y-auto">
      <BaseTable
        className={cn(table.getRowModel().rows?.length ? "h-fit" : "h-full")}
      >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-full text-center"
              >
                Không có dữ liệu.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </BaseTable>
    </div>
  );
}
