"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Toast } from "@/components/ui/toast";

export function useUnbanUser(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/users/unban/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "active" }),
      });

      if (!res.ok) {
        throw new Error("Unban failed");
      }

      return res.json();
    },
    onSuccess: (_data, _id) => {
      Toast("success", "Đã bỏ cấm người dùng thành công");
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
      options?.onSuccess?.();
    },
    onError: () => {
      Toast("error", "Bỏ cấm thất bại");
      options?.onError?.();
    },
  });
}
