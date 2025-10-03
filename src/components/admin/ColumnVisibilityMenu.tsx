import type { Table } from "@tanstack/react-table";
import { ChevronDown, Columns, Settings2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type ColumnVisibilityMenuProps<T> = {
  table: Table<T>;
};

export function ColumnVisibilityMenu<T>({
  table,
}: ColumnVisibilityMenuProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
            <Settings2 className="w-4 h-4" />
            Cột hiển thị
            <ChevronDown className="w-4 h-4" />
          </Button>

          <Button size="icon" variant="outline" className="flex sm:hidden">
            <Columns className="w-4 h-4" />
          </Button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            const label = (column.columnDef.meta as { label?: string })?.label;

            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {label || column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
