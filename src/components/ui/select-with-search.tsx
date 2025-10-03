"use client";

import * as React from "react";

import { CheckIcon, ChevronDown, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { LoadingSpinner } from "../global/LoadingSpinner";

type Option = { value: string; label: string };

type SelectWithSearchProps = {
  label: string;
  value: string;
  options: Option[];
  isFetching?: boolean;
  onSearch: (text: string) => void;
  onChange: (value: string) => void;
};

export function SelectWithSearch({
  label,
  value,
  options,
  onSearch,
  onChange,
  isFetching,
}: SelectWithSearchProps) {
  const [open, setOpen] = React.useState(false);

  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 300);

  React.useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label ||
    `Chọn ${label.toLowerCase()}`;

  return (
    <div className="*:not-first:mt-2">
      <Label className="block text-sm font-medium">{label}</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {selectedLabel}
            <ChevronDown className="text-muted-foreground" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-2 space-y-2">
          <div className="relative">
            <Input
              autoFocus
              value={search}
              placeholder={`Tìm ${label.toLowerCase()}`}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 size-4 text-muted-foreground" />
          </div>

          <div
            onWheel={(e) => e.stopPropagation()}
            className="max-h-[300px] overflow-y-auto"
          >
            {isFetching ? (
              <LoadingSpinner size={6} className="flex justify-center p-6" />
            ) : options.length > 0 ? (
              options.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full flex justify-between items-center text-sm py-2 px-3 hover:text-primary hover:bg-primary/10 cursor-pointer rounded-md transition",
                    value === opt.value && "text-primary bg-primary/10",
                  )}
                >
                  {opt.label}
                  {value === opt.value && (
                    <CheckIcon size={14} className="ml-2 text-primary" />
                  )}
                </button>
              ))
            ) : (
              <div className="p-6 text-sm text-muted-foreground text-center">
                Không tìm thấy.
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
