"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Toast } from "@/components/ui/toast";

type UpdateUserArgs = { id: string; data: FormData };

export function useUpdateUser(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateUserArgs) => {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: data,
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      return res.json();
    },
    onSuccess: () => {
      Toast("success", "Cập nhật thành công");
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
      options?.onSuccess?.();
    },
    onError: () => {
      Toast("error", "Cập nhật thất bại");
      options?.onError?.();
    },
  });
}
