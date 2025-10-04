"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Toast } from "@/components/ui/toast";

export function useUpdateSpecialty(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; formData: FormData }) => {
      const { id, formData } = data;
      const res = await fetch(`/api/doctors/specialties/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Cập nhật chuyên khoa thất bại");
      }

      return res.json();
    },
    onSuccess: () => {
      Toast("success", "Cập nhật chuyên khoa thành công");
      queryClient.invalidateQueries({ queryKey: ["specialties", "list"] });
      options?.onSuccess?.();
    },
    onError: () => {
      Toast("error", "Cập nhật chuyên khoa thất bại");
      options?.onError?.();
    },
  });
}
