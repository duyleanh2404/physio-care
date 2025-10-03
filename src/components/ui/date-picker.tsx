"use client";

import * as React from "react";

import { startOfToday } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  return !!date && !isNaN(date.getTime());
}

type DatePickerProps = {
  value?: Date;
  disable: boolean;
  onChange: (date: Date | undefined) => void;
};

export function DatePicker({
  value,
  onChange,
  disable = false,
}: DatePickerProps) {
  const defaultDate = new Date();

  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(
    value ?? defaultDate,
  );
  const [inputValue, setInputValue] = React.useState(
    formatDate(value ?? defaultDate),
  );

  React.useEffect(() => {
    const fallback = new Date();
    setInputValue(formatDate(value ?? fallback));
    setMonth(value ?? fallback);
  }, [value]);

  const handleSelect = (d: Date | undefined) => {
    if (d && d >= startOfToday()) {
      onChange(d);
      setOpen(false);
      setInputValue(formatDate(d));
    }
  };

  return (
    <div className="relative flex gap-2">
      <Input
        id="date"
        value={inputValue}
        disabled={disable}
        placeholder="dd/mm/yyyy"
        className="bg-background pr-10"
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            setOpen(true);
            e.preventDefault();
          }
        }}
        onChange={(e) => {
          const newDate = new Date(e.target.value);
          setInputValue(e.target.value);

          if (isValidDate(newDate) && newDate >= startOfToday()) {
            onChange(newDate);
            setMonth(newDate);
          }
        }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            id="date-picker"
            disabled={disable}
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
          >
            <CalendarIcon className="size-3.5" />
            <span className="sr-only">Chọn ngày</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          sideOffset={10}
          alignOffset={-8}
          className="w-auto overflow-hidden p-0"
        >
          <Calendar
            mode="single"
            month={month}
            onSelect={handleSelect}
            captionLayout="dropdown"
            onMonthChange={setMonth}
            defaultMonth={startOfToday()}
            selected={value ?? defaultDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
