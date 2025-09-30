"use client";

import { useState } from "react";

import { useQueryState } from "nuqs";
import { parseAsString } from "nuqs";

import { Filter } from "lucide-react";
import { formatISO, startOfDay } from "date-fns";

import { cn } from "@/lib/utils";
import { ROLE_OPTIONS, STATUS_OPTIONS } from "@/constants/filters/users";

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RangeCalendar } from "@/components/ui/range-calendar";

export function FilterMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault(""),
  );
  const [role, setRole] = useQueryState("role", parseAsString.withDefault(""));

  const [dateTo, setDateTo] = useQueryState(
    "dateTo",
    parseAsString.withDefault(""),
  );
  const [dateFrom, setDateFrom] = useQueryState("dateFrom", parseAsString);

  const toggleFilter = (
    currentValue: string,
    setValue: (value: string) => void,
    target: string,
  ) => {
    const current = currentValue ? currentValue.split(",") : [];
    const updated = current.includes(target)
      ? current.filter((v) => v !== target)
      : [...current, target];
    setValue(updated.join(","));
  };

  const handleDateChange = (from: Date | undefined, to: Date | undefined) => {
    setDateFrom(
      from ? formatISO(startOfDay(from), { representation: "date" }) : "",
    );
    setDateTo(to ? formatISO(startOfDay(to), { representation: "date" }) : "");
  };

  const renderCheckboxGroup = (
    label: string,
    options: string[],
    currentValue: string,
    setValue: (value: string) => void,
  ) => (
    <div className="flex flex-col flex-shrink-0">
      <DropdownMenuLabel className="text-sm font-semibold px-0">
        {label}
      </DropdownMenuLabel>
      <div className="flex flex-col gap-2 mt-2">
        {options.map((option) => (
          <label
            key={option}
            htmlFor={`checkbox-${label}-${option}`}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Checkbox
              aria-label={`${label} ${option}`}
              id={`checkbox-${label}-${option}`}
              onCheckedChange={() =>
                toggleFilter(currentValue, setValue, option)
              }
              checked={currentValue?.split(",").includes(option) ?? false}
            />
            <span className="text-sm capitalize">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const clearFilters = () => {
    setRole(null);
    setStatus(null);
    setDateTo(null);
    setDateFrom(null);
    setIsOpen(false);
  };

  const hasActiveFilters = Boolean(status || role || dateFrom || dateTo);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "w-full sm:w-fit flex items-center gap-2",
            hasActiveFilters &&
              "text-primary hover:text-primary !bg-primary/20",
          )}
        >
          <Filter className="w-4 h-4" />
          Lọc
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        style={{ maxWidth: "fit-content" }}
        className="p-6 grid grid-cols-[auto_auto_auto] gap-y-6 gap-x-12"
      >
        {renderCheckboxGroup("Trạng thái", STATUS_OPTIONS, status, setStatus)}
        {renderCheckboxGroup("Vai trò", ROLE_OPTIONS, role, setRole)}

        <div className="flex flex-col flex-shrink-0">
          <DropdownMenuLabel className="text-sm font-semibold px-0">
            Ngày tạo
          </DropdownMenuLabel>
          <RangeCalendar
            dateTo={dateTo}
            dateFrom={dateFrom}
            onDateChange={handleDateChange}
          />
        </div>

        {hasActiveFilters && (
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
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
