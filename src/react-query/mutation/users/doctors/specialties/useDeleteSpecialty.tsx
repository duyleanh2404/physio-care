"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Toast } from "@/components/ui/toast";

export function useDeleteSpecialty(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/doctors/specialties/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Xóa chuyên khoa thất bại");
      }

      return res.json();
    },
    onSuccess: () => {
      Toast("success", "Xóa chuyên khoa thành công");
      queryClient.invalidateQueries({ queryKey: ["specialties", "list"] });
      options?.onSuccess?.();
    },
    onError: () => {
      Toast("error", "Xóa chuyên khoa thất bại");
      options?.onError?.();
    },
  });
}
