import { Filter } from "lucide-react";

import { Button } from "../ui/button";

export function ButtonClearFilters({
  clearFilters,
}: {
  clearFilters: () => void;
}) {
  return (
    <div className="col-span-full flex justify-end">
      <Button
        size="sm"
        variant="outline"
        onClick={clearFilters}
        className="flex items-center gap-2 text-red-500 hover:text-red-500 !bg-red-500/10 hover:!bg-red-500/20"
      >
        <Filter className="w-4 h-4 text-red-500" />
        Xóa bộ lọc
      </Button>
    </div>
  );
}
