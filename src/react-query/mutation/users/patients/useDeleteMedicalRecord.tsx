"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Toast } from "@/components/ui/toast";

export function useDeleteRecord(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/patients/records/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Xóa hồ sơ thất bại");
      }

      return res.json();
    },
    onSuccess: () => {
      Toast("success", "Xóa hồ sơ thành công");
      queryClient.invalidateQueries({ queryKey: ["records", "list"] });
      options?.onSuccess?.();
    },
    onError: () => {
      Toast("error", "Xóa hồ sơ thất bại");
      options?.onError?.();
    },
  });
}
