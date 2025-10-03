"use client";

import { useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

import { UserRole } from "@/config.global";
import { useDebounce } from "@/hooks/use-debounce";
import { useUsers } from "@/react-query/query/users/useUsers";

import { SelectWithSearch } from "@/components/ui/select-with-search";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

type SelectDoctorsWithSearchProps<T extends FieldValues, K extends Path<T>> = {
  control: Control<T>;
  name: K;
};

export function SelectDoctorsWithSearch<
  T extends FieldValues,
  K extends Path<T>,
>({ control, name }: SelectDoctorsWithSearchProps<T, K>) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: doctors, isFetching } = useUsers({
    role: UserRole.DOCTOR,
    search: debouncedSearch,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <SelectWithSearch
            value={field.value}
            onSearch={setSearch}
            isFetching={isFetching}
            label="Bác sĩ phụ trách"
            onChange={field.onChange}
            options={
              doctors?.data.map((d) => ({
                value: d.id,
                label: d.fullName,
              })) || []
            }
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
