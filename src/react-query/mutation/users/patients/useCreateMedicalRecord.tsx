"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Toast } from "@/components/ui/toast";

export function useCreateMedicalRecord(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("/api/patients/records", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error("Tạo hồ sơ bệnh án thất bại");
      }

      return res.json();
    },
    onSuccess: () => {
      Toast("success", "Tạo hồ sơ bệnh án thành công");
      queryClient.invalidateQueries({ queryKey: ["records", "list"] });
      options?.onSuccess?.();
    },
    onError: () => {
      Toast("error", "Tạo hồ sơ bệnh án thất bại");
      options?.onError?.();
    },
  });
}
