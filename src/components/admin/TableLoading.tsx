import type { ColumnDef } from "@tanstack/react-table";

import { LoadingSpinner } from "../global/LoadingSpinner";
import { TableCell, TableRow } from "@/components/ui/table";

export function TableLoading<TData>({
  columns,
}: {
  columns: ColumnDef<TData, any>[];
}) {
  return (
    <TableRow>
      <TableCell colSpan={columns.length}>
        <LoadingSpinner
          size={7}
          className="h-[calc(100vh-230px)] flex items-center justify-center"
        />
      </TableCell>
    </TableRow>
  );
}
