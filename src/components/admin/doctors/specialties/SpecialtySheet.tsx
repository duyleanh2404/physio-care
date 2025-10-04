"use client";

import Image from "next/image";
import { useState } from "react";

import {
  ClockIcon,
  FileTextIcon,
  CalendarIcon,
  StickyNoteIcon,
} from "lucide-react";

import { formatDateTime } from "@/utils/format-date";
import type { SpecialtyType } from "@/types/specialties";

import { Hint } from "@/components/global/Hint";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SpecialtySheet({ specialty }: { specialty: SpecialtyType }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Hint content="Xem chi tiết">
        <SheetTrigger asChild>
          <Button
            variant="link"
            className="p-0 text-white hover:text-primary text-sm font-medium hover:no-underline"
          >
            {specialty.name}
          </Button>
        </SheetTrigger>
      </Hint>

      <SheetContent
        side="right"
        className="w-full sm:w-[480px] py-6 gap-0 overflow-y-auto"
      >
        <SheetHeader className="space-y-3 pb-6">
          <div className="flex items-center gap-3">
            {specialty.imageUrl ? (
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  width={45}
                  height={45}
                  alt={specialty.name}
                  src={specialty.imageUrl}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <FileTextIcon className="w-5 h-5 text-muted-foreground" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <SheetTitle className="text-xl font-bold leading-tight">
                {specialty.name}
              </SheetTitle>
              <SheetDescription className="text-sm mt-1">
                Thông tin chi tiết chuyên khoa
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 px-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileTextIcon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-[15px] font-semibold text-muted-foreground">
                Mô tả
              </h3>
            </div>
            <div className="pl-10">
              <p className="text-sm leading-relaxed">
                {specialty.description || (
                  <span className="italic">Không có mô tả</span>
                )}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <StickyNoteIcon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-[15px] font-semibold text-muted-foreground">
                Ghi chú
              </h3>
            </div>
            <div className="pl-10">
              <p className="text-sm leading-relaxed">
                {specialty.notes || (
                  <span className="italic">Không có ghi chú</span>
                )}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-[15px] font-semibold">Thông tin thời gian</h3>

            <div className="grid gap-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground tracking-wide">
                    Ngày tạo
                  </p>
                  <p className="text-sm font-medium mt-0.5">
                    {formatDateTime(specialty.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ClockIcon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground tracking-wide">
                    Cập nhật lần cuối
                  </p>
                  <p className="text-sm font-medium mt-0.5">
                    {formatDateTime(specialty.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
