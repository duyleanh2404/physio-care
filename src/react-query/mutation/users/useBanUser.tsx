"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Toast } from "@/components/ui/toast";

export function useBanUser(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/users/ban/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "banned" }),
      });

      if (!res.ok) {
        throw new Error("Ban failed");
      }

      return res.json();
    },
    onSuccess: (_data, _id) => {
      Toast("success", "Đã cấm người dùng thành công");
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
      options?.onSuccess?.();
    },
    onError: () => {
      Toast("error", "Cấm thất bại");
      options?.onError?.();
    },
  });
}
