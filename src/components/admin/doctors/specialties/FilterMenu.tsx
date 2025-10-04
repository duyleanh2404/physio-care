"use client";

import { useState } from "react";

import { Filter } from "lucide-react";
import { formatISO, startOfDay } from "date-fns";

import { cn } from "@/lib/utils";
import { useUsersQueryState } from "@/nuqs/admin/users";

import { ButtonClearFilters } from "../../ButtonClearFilters";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RangeCalendar } from "@/components/ui/range-calendar";

export function FilterMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const { state, setters } = useUsersQueryState();

  const handleDateChange = (from: Date | undefined, to: Date | undefined) => {
    setters.setDateFrom(
      from ? formatISO(startOfDay(from), { representation: "date" }) : "",
    );
    setters.setDateTo(
      to ? formatISO(startOfDay(to), { representation: "date" }) : "",
    );
  };

  const clearFilters = () => {
    setIsOpen(false);
    setters.setDateFrom("");
    setters.setDateTo("");
  };

  const hasActiveFilters = Boolean(state.dateFrom || state.dateTo);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "w-full lg:w-fit flex items-center gap-2",
            hasActiveFilters &&
              "text-primary hover:text-primary !bg-primary/20",
          )}
        >
          <Filter
            className={cn(
              "size-3.5 dark:text-white transition-smooth",
              hasActiveFilters && "text-primary dark:text-primary",
            )}
          />
          Lọc theo ngày
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        style={{ maxWidth: "fit-content" }}
        className="p-6 flex flex-col gap-4"
      >
        <RangeCalendar
          dateTo={state.dateTo}
          dateFrom={state.dateFrom}
          onDateChange={handleDateChange}
        />

        {hasActiveFilters && <ButtonClearFilters clearFilters={clearFilters} />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
