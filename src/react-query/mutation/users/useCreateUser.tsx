"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Toast } from "@/components/ui/toast";

export function useCreateUser(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("/api/users", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error("Create failed");
      }

      return res.json();
    },
    onSuccess: () => {
      Toast("success", "Tạo mới thành công");
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
      options?.onSuccess?.();
    },
    onError: () => {
      Toast("error", "Tạo mới thất bại");
      options?.onError?.();
    },
  });
}
