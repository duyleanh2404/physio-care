"use client";

import { useState, useEffect } from "react";

import {
  subDays,
  subYears,
  subMonths,
  endOfYear,
  endOfMonth,
  startOfYear,
  startOfMonth,
} from "date-fns";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

type RangeCalendarProps = {
  dateTo: string;
  dateFrom: string | null;
  onDateChange: (from: Date | undefined, to: Date | undefined) => void;
};

export function RangeCalendar({
  dateTo,
  dateFrom,
  onDateChange,
}: RangeCalendarProps) {
  const today = new Date();

  const yesterday = {
    from: subDays(today, 1),
    to: subDays(today, 1),
  };

  const last7Days = {
    from: subDays(today, 6),
    to: today,
  };

  const last30Days = {
    from: subDays(today, 29),
    to: today,
  };

  const monthToDate = {
    from: startOfMonth(today),
    to: today,
  };

  const lastMonth = {
    from: startOfMonth(subMonths(today, 1)),
    to: endOfMonth(subMonths(today, 1)),
  };

  const yearToDate = {
    from: startOfYear(today),
    to: today,
  };

  const lastYear = {
    from: startOfYear(subYears(today, 1)),
    to: endOfYear(subYears(today, 1)),
  };

  const [month, setMonth] = useState(today);
  const [date, setDate] = useState<DateRange | undefined>(last7Days);

  useEffect(() => {
    if (dateFrom && dateTo) {
      setDate({
        from: new Date(dateFrom),
        to: new Date(dateTo),
      });
    }
  }, [dateFrom, dateTo]);

  const handlePresetClick = (range: DateRange) => {
    setDate(range);
    setMonth(range.to ?? today);
    onDateChange(range.from, range.to);
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="flex max-sm:flex-col">
        <div className="relative py-4 max-sm:order-1 max-sm:border-t sm:w-40 flex flex-col gap-2 border-r p-2">
          {[
            { label: "Hôm nay", range: { from: today, to: today } },
            { label: "Hôm qua", range: yesterday },
            { label: "7 ngày qua", range: last7Days },
            { label: "30 ngày qua", range: last30Days },
            { label: "Đầu tháng đến nay", range: monthToDate },
            { label: "Tháng trước", range: lastMonth },
            { label: "Đầu năm đến nay", range: yearToDate },
            { label: "Năm trước", range: lastYear },
          ].map((preset) => (
            <Button
              key={preset.label}
              size="sm"
              variant="ghost"
              className="w-full text-left whitespace-nowrap justify-start"
              onClick={() => handlePresetClick(preset.range)}
            >
              {preset.label}
            </Button>
          ))}
        </div>

        <Calendar
          mode="range"
          selected={date}
          month={month}
          onMonthChange={setMonth}
          disabled={[{ after: today }]}
          onSelect={(newDate) => {
            if (newDate) {
              setDate(newDate);
              onDateChange(newDate.from, newDate.to);
            }
          }}
          className="p-2"
        />
      </div>
    </div>
  );
}
