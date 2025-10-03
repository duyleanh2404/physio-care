"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Toast } from "@/components/ui/toast";

export function useUpdateMedicalRecord(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const res = await fetch(`/api/patients/records/${id}`, {
        method: "PUT",
        body: data,
      });

      if (!res.ok) {
        throw new Error("Cập nhật hồ sơ bệnh án thất bại");
      }

      return res.json();
    },
    onSuccess: () => {
      Toast("success", "Cập nhật hồ sơ bệnh án thành công");
      queryClient.invalidateQueries({ queryKey: ["records", "list"] });
      options?.onSuccess?.();
    },
    onError: () => {
      Toast("error", "Cập nhật hồ sơ bệnh án thất bại");
      options?.onError?.();
    },
  });
}
