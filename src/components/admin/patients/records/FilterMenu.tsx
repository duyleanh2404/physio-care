"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { formatISO, startOfDay } from "date-fns";

import { cn } from "@/lib/utils";
import { useRecordsQueryState } from "@/nuqs/admin/records";

import { STATUS_OPTIONS } from "@/constants/filters/users";
import { INTENSITY_OPTIONS } from "@/constants/records/intensity-options";
import { TREATMENT_FREQUENCY_OPTIONS } from "@/constants/records/treatment-frequency";
import { TREATMENT_OPTIONS } from "@/constants/filters/patients/record/treatment-options";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RangeCalendar } from "@/components/ui/range-calendar";

import { SelectDoctorsWithSearch } from "@/components/global/SelectDoctorsWithSearch";
import { SelectPatientsWithSearch } from "@/components/global/SelectPatientsWithSearch";

export function FilterMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const { state, setters } = useRecordsQueryState();

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
    setters.dateFrom(
      from ? formatISO(startOfDay(from), { representation: "date" }) : "",
    );
    setters.dateTo(
      to ? formatISO(startOfDay(to), { representation: "date" }) : "",
    );
  };

  const clearFilters = () => {
    setIsOpen(false);
    setters.status("");
    setters.dateTo("");
    setters.dateFrom("");
    setters.doctorId("");
    setters.frequency("");
    setters.intensity("");
    setters.patientsId("");
    setters.treatmentType("");
  };

  const hasActiveFilters = Boolean(
    state.status ||
      state.dateTo ||
      state.dateFrom ||
      state.doctorId ||
      state.frequency ||
      state.intensity ||
      state.patientsId ||
      state.treatmentType,
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "flex items-center gap-2",
            hasActiveFilters &&
              "text-primary hover:!text-primary !bg-primary/20",
          )}
        >
          <Filter
            className={cn(
              "size-3.5 dark:text-white transition-smooth",
              hasActiveFilters && "text-primary dark:text-primary",
            )}
          />
          Lọc
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="p-4 min-w-[1000px] max-h-[80vh]"
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Trạng thái</span>
                {STATUS_OPTIONS.map((option) => (
                  <Label key={option} className="flex items-center gap-1">
                    <Checkbox
                      onCheckedChange={() =>
                        toggleFilter(state.status, setters.status, option)
                      }
                      checked={
                        state.status?.split(",").includes(option) ?? false
                      }
                    />
                    <span className="text-sm capitalize">{option}</span>
                  </Label>
                ))}
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold">Loại điều trị</span>
                {TREATMENT_OPTIONS.map((option) => (
                  <Label key={option} className="flex items-center gap-1">
                    <Checkbox
                      onCheckedChange={() =>
                        toggleFilter(
                          state.treatmentType,
                          setters.treatmentType,
                          option,
                        )
                      }
                      checked={
                        state.treatmentType?.split(",").includes(option) ??
                        false
                      }
                    />
                    <span className="text-sm capitalize">{option}</span>
                  </Label>
                ))}
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold">Tần suất trị liệu</span>
                {TREATMENT_FREQUENCY_OPTIONS.map((option) => (
                  <Label key={option} className="flex items-center gap-1">
                    <Checkbox
                      onCheckedChange={() =>
                        toggleFilter(state.frequency, setters.frequency, option)
                      }
                      checked={
                        state.frequency?.split(",").includes(option) ?? false
                      }
                    />
                    <span className="text-sm capitalize">{option}</span>
                  </Label>
                ))}
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold">Cường độ trị liệu</span>
                {INTENSITY_OPTIONS.map((option) => (
                  <Label key={option} className="flex items-center gap-1">
                    <Checkbox
                      onCheckedChange={() =>
                        toggleFilter(state.intensity, setters.intensity, option)
                      }
                      checked={
                        state.intensity?.split(",").includes(option) ?? false
                      }
                    />
                    <span className="text-sm capitalize">{option}</span>
                  </Label>
                ))}
              </div>

              <SelectPatientsWithSearch
                value={state.patientsId}
                onChange={setters.patientsId}
              />

              <SelectDoctorsWithSearch
                value={state.doctorId}
                onChange={setters.doctorId}
              />
            </div>

            <div className="w-fit flex flex-col">
              <span className="text-sm font-semibold">Ngày tạo</span>
              <RangeCalendar
                dateTo={state.dateTo}
                dateFrom={state.dateFrom}
                onDateChange={handleDateChange}
              />
            </div>
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
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
