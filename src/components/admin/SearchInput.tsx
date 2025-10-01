"use client";

import { useEffect, useState } from "react";

import { useQueryState } from "nuqs";
import { Search } from "lucide-react";

import { useDebounce } from "@/hooks/use-debounce";

import { Input } from "@/components/ui/input";

export function SearchInput() {
  const [search, setSearch] = useQueryState("search", {
    shallow: false,
    history: "push",
  });

  const [inputValue, setInputValue] = useState(search ?? "");
  const debouncedSearch = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedSearch !== search) {
      setSearch(debouncedSearch);
    }
  }, [debouncedSearch, search, setSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="relative flex-1 sm:flex-none sm:min-w-[400px]">
      <Input
        value={inputValue}
        onChange={handleChange}
        placeholder="Tìm kiếm theo tên người dùng"
        className="h-8 pl-8.5"
      />
      <Search className="absolute top-1/2 left-3 -translate-y-1/2 size-4 opacity-50" />
    </div>
  );
}
