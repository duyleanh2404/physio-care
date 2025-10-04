"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Toast } from "@/components/ui/toast";

export function useCreateSpecialty(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/doctors/specialties", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Tạo chuyên khoa thất bại");
      }

      return res.json();
    },
    onSuccess: () => {
      Toast("success", "Tạo chuyên khoa thành công");
      queryClient.invalidateQueries({ queryKey: ["specialties", "list"] });
      options?.onSuccess?.();
    },
    onError: () => {
      Toast("error", "Tạo chuyên khoa thất bại");
      options?.onError?.();
    },
  });
}
