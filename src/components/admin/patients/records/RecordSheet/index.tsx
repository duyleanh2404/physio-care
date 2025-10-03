"use client";

import {
  User,
  Clock,
  Target,
  FileText,
  Calendar,
  Activity,
  TrendingUp,
  Stethoscope,
} from "lucide-react";

import type { RecordType } from "@/types/records";
import { formatDateTime } from "@/utils/format-date";

import { DetailItem } from "./DetailItem";
import { QuickInfoCard } from "./QuickInfoCard";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecordSheet({ record }: { record: RecordType }) {
  const getStatusLabel = (status?: string) => {
    const map: Record<string, string> = {
      active: "Đang điều trị",
      completed: "Hoàn thành",
      paused: "Tạm dừng",
      canceled: "Hủy",
    };

    return map[status || ""] || "Không rõ";
  };

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      "Đang điều trị": "bg-blue-100 text-blue-700",
      "Hoàn thành": "bg-green-100 text-green-700",
      "Tạm dừng": "bg-yellow-100 text-yellow-700",
      Hủy: "bg-red-100 text-red-700",
    };
    return statusMap[status] || "bg-gray-100 text-gray-500";
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="link"
          className="p-0 hover:text-primary text-sm font-medium hover:underline underline-offset-4"
        >
          {record.recordCode}
        </Button>
      </SheetTrigger>

      <SheetContent className="min-w-[500px] overflow-y-auto">
        <SheetHeader className="space-y-2 pb-4 border-b">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <SheetTitle className="text-lg font-semibold tracking-tight">
                Mã hồ sơ: {record.recordCode}
              </SheetTitle>
              <SheetDescription className="text-sm">
                Thông tin chi tiết hồ sơ bệnh nhân
              </SheetDescription>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3">
            <QuickInfoCard
              label="Bệnh nhân"
              value={record.patient?.fullName}
              icon={<User className="size-4 text-primary" />}
            />
            <QuickInfoCard
              label="Bác sĩ"
              value={record.doctor?.fullName}
              icon={<Stethoscope className="size-4 text-primary" />}
            />
            <QuickInfoCard
              label="Trạng thái"
              icon={<Activity className="size-4 text-primary" />}
              value={
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    record.status || "",
                  )}`}
                >
                  {getStatusLabel(record.status)}
                </span>
              }
            />
          </div>
        </SheetHeader>

        <Tabs defaultValue="general" className="pb-6 px-4 text-sm">
          <TabsList className="grid w-full grid-cols-2 h-9">
            <TabsTrigger value="general" className="text-sm font-medium">
              Thông tin chung
            </TabsTrigger>
            <TabsTrigger value="details" className="text-sm font-medium">
              Chi tiết hồ sơ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-3">
            <Card className="border-l-4 border-l-primary shadow-sm gap-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Activity className="h-4 w-4 text-primary" />
                  Thông tin điều trị
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <DetailItem
                  label="Loại điều trị"
                  value={record.treatmentType}
                  icon={<FileText className="size-4 text-muted-foreground" />}
                />
                <DetailItem
                  label="Cường độ"
                  value={record.intensity}
                  icon={<Activity className="size-4 text-muted-foreground" />}
                />
                <DetailItem
                  label="Tần suất"
                  value={record.frequency}
                  icon={<TrendingUp className="size-4 text-muted-foreground" />}
                />
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary shadow-sm gap-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  Thời gian
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <DetailItem
                  label="Ngày tạo"
                  value={formatDateTime(record.createdAt)}
                  icon={<Calendar className="size-4 text-muted-foreground" />}
                />
                <DetailItem
                  label="Ngày cập nhật"
                  value={formatDateTime(record.updatedAt)}
                  icon={<Calendar className="size-4 text-muted-foreground" />}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-3">
            <Card className="border-l-4 border-l-primary shadow-sm gap-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <FileText className="h-4 w-4 text-primary" />
                  Lịch sử bệnh án
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed whitespace-pre-wrap">
                  {record.history}
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary shadow-sm gap-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Target className="h-4 w-4 text-primary" />
                  Mục tiêu điều trị
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed whitespace-pre-wrap">
                  {record.goals}
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary shadow-sm gap-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Tiến trình điều trị
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed whitespace-pre-wrap">
                  {record.progress}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
