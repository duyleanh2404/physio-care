"use client";

import { useState } from "react";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RecordStatus } from "@/config.global";
import {
  createRecordSchema,
  type CreateRecordFormValues,
} from "@/schemas/admin/users/patients/create-record.schema";
import { useCreateMedicalRecord } from "@/react-query/mutation/users/patients/useCreateMedicalRecord";

import { STATUS_OPTIONS } from "@/constants/records/status-options";
import { INTENSITY_OPTIONS } from "@/constants/records/intensity-options";
import { TREATMENT_FREQUENCY_OPTIONS } from "@/constants/records/treatment-frequency";
import { TREATMENT_OPTIONS } from "@/constants/filters/patients/record/treatment-options";

import { FileIcon } from "@/components/global/FileIcon";
import { SelectDoctorsWithSearch } from "@/components/global/SelectDoctorsWithSearch";
import { SelectPatientsWithSearch } from "@/components/global/SelectPatientsWithSearch";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ModalCreateRecord({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOtherTreatment, setIsOtherTreatment] = useState(false);

  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [otherTreatmentValue, setOtherTreatmentValue] = useState("");

  const { mutate, isPending } = useCreateMedicalRecord({
    onSuccess: () => closeModal(),
  });

  const form = useForm<CreateRecordFormValues>({
    resolver: zodResolver(createRecordSchema),
    defaultValues: {
      goals: "",
      history: "",
      progress: "",
      doctorId: "",
      frequency: "",
      intensity: "",
      patientsId: "",
      treatmentType: "",
      attachment: undefined,
      recordDate: new Date(),
      status: RecordStatus.ACTIVE,
    },
  });

  const closeModal = () => {
    setIsOpen(false);
    setPreviewFiles([]);
    form.reset();
  };

  const onSubmit = (values: CreateRecordFormValues) => {
    const formData = new FormData();

    formData.append(
      "treatmentType",
      values.treatmentType === "Khác"
        ? otherTreatmentValue
        : values.treatmentType,
    );
    formData.append("status", values.status);
    formData.append("doctorId", values.doctorId);
    formData.append("goals", values.goals || "");
    formData.append("patientsId", values.patientsId);
    formData.append("history", values.history || "");
    formData.append("progress", values.progress || "");
    formData.append("intensity", values.intensity || "");
    formData.append("frequency", values.frequency || "");

    if (values.attachment instanceof File) {
      formData.append("attachment", values.attachment);
    }

    mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="w-full sm:max-w-[850px] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo hồ sơ vật lý trị liệu</DialogTitle>
          <DialogDescription>
            Nhập thông tin chi tiết hồ sơ vật lý trị liệu cho bệnh nhân.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectPatientsWithSearch
                control={form.control}
                name="patientsId"
              />

              <SelectDoctorsWithSearch control={form.control} name="doctorId" />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái hồ sơ</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recordDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày lập hồ sơ</FormLabel>
                    <FormControl>
                      <DatePicker
                        disable
                        onChange={() => {}}
                        value={field.value || new Date()}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="history"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lịch sử bệnh lý</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Nhập lịch sử bệnh lý" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="treatmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại trị liệu</FormLabel>
                  <FormControl>
                    <div>
                      <RadioGroup
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setIsOtherTreatment(value === "Khác");
                          if (value !== "Khác") setOtherTreatmentValue("");
                        }}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                      >
                        {TREATMENT_OPTIONS.map((option) => (
                          <Label
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem value={option} />
                            <span>{option}</span>
                          </Label>
                        ))}
                      </RadioGroup>

                      {isOtherTreatment && (
                        <Input
                          value={otherTreatmentValue}
                          placeholder="Nhập loại trị liệu khác"
                          onChange={(e) =>
                            setOtherTreatmentValue(e.target.value)
                          }
                          className="mt-4"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="intensity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cường độ trị liệu</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-row space-x-6"
                    >
                      {INTENSITY_OPTIONS.map((option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`intensity-${option}`}
                          />
                          <Label htmlFor={`intensity-${option}`}>
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tần suất trị liệu</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn tần suất" />
                      </SelectTrigger>
                      <SelectContent>
                        {TREATMENT_FREQUENCY_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="goals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mục tiêu trị liệu</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Nhập mục tiêu trị liệu" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="progress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiến trình / Đánh giá</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Nhập tiến trình điều trị"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attachment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tệp đính kèm</FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                            setPreviewFiles([file]);
                          }
                        }}
                        className="cursor-pointer"
                      />

                      {previewFiles.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                          <FileIcon file={previewFiles[0]} />
                          <span>{previewFiles[0].name}</span>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end gap-2">
              <Button
                size="sm"
                type="button"
                variant="outline"
                onClick={closeModal}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isPending} size="sm">
                {isPending && <Loader2 className="size-4 animate-spin" />}
                {isPending ? "Đang tạo..." : "Tạo hồ sơ"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
