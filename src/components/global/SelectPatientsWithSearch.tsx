"use client";

import { useState } from "react";

import type { Control, FieldValues, Path } from "react-hook-form";

import { UserRole } from "@/config.global";
import { useDebounce } from "@/hooks/use-debounce";
import { useUsers } from "@/react-query/query/users/useUsers";

import { SelectWithSearch } from "@/components/ui/select-with-search";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

type SelectPatientsWithSearchProps<T extends FieldValues, K extends Path<T>> = {
  control: Control<T>;
  name: K;
};

export function SelectPatientsWithSearch<
  T extends FieldValues,
  K extends Path<T>,
>({ control, name }: SelectPatientsWithSearchProps<T, K>) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: patients, isFetching } = useUsers({
    role: UserRole.USER,
    search: debouncedSearch,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <SelectWithSearch
            label="Bệnh nhân"
            value={field.value}
            onSearch={setSearch}
            isFetching={isFetching}
            onChange={field.onChange}
            options={
              patients?.data.map((p) => ({
                value: p.id,
                label: p.fullName,
              })) || []
            }
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
