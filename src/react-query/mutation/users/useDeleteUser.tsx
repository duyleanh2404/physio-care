"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Toast } from "@/components/ui/toast";

export function useDeleteUser(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      return res.json();
    },
    onSuccess: () => {
      Toast("success", "Xóa người dùng thành công");
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
      options?.onSuccess?.();
    },
    onError: () => {
      Toast("error", "Xóa thất bại");
      options?.onError?.();
    },
  });
}
