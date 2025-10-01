"use client";

import type * as React from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  Bot,
  Send,
  User,
  Frame,
  MapIcon,
  BookOpen,
  LifeBuoy,
  PieChart,
  Settings2,
  SquareTerminal,
  LayoutDashboard,
} from "lucide-react";

import {
  Sidebar,
  SidebarMenu,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import { NavProjects } from "./NavProjects";
import { NavSecondary } from "./NavSecondary";

const data = {
  navMain: [
    {
      title: "Bảng điều khiển",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Quản lý người dùng",
      url: "/admin/users",
      icon: User,
    },
    {
      title: "Quản lý bệnh nhân",
      url: "/admin/patients",
      icon: User,
      items: [
        { title: "Danh sách bệnh nhân", url: "/admin/patients" },
        { title: "Hồ sơ bệnh án", url: "/admin/patients/records" },
      ],
    },
    {
      title: "Buổi trị liệu",
      url: "/admin/sessions",
      icon: SquareTerminal,
      items: [
        { title: "Lịch hẹn", url: "/admin/sessions/schedule" },
        { title: "Theo dõi tiến trình", url: "/admin/sessions/progress" },
        { title: "Cài đặt", url: "/admin/sessions/settings" },
      ],
    },
    {
      title: "Bài tập phục hồi",
      url: "/admin/exercises",
      icon: Bot,
      items: [
        { title: "Danh mục bài tập", url: "/admin/exercises/list" },
        { title: "Theo nhóm cơ", url: "/admin/exercises/muscles" },
        { title: "Bài tập chuyên biệt", url: "/admin/exercises/special" },
      ],
    },
    {
      title: "Tài liệu",
      url: "/admin/docs",
      icon: BookOpen,
      items: [
        { title: "Hướng dẫn sử dụng", url: "/admin/docs/manual" },
        { title: "Bắt đầu nhanh", url: "/admin/docs/get-started" },
        { title: "Quy trình trị liệu", url: "/admin/docs/protocols" },
        { title: "Nhật ký thay đổi", url: "/admin/docs/changelog" },
      ],
    },
    {
      title: "Cài đặt",
      url: "/admin/settings",
      icon: Settings2,
      items: [
        { title: "Hệ thống", url: "/admin/settings/general" },
        { title: "Nhân sự", url: "/admin/settings/team" },
        { title: "Thanh toán", url: "/admin/settings/billing" },
        { title: "Giới hạn", url: "/admin/settings/limits" },
      ],
    },
  ],
  navSecondary: [
    { title: "Hỗ trợ kỹ thuật", url: "#", icon: LifeBuoy },
    { title: "Góp ý cải tiến", url: "#", icon: Send },
  ],
  projects: [
    { name: "Phục hồi chức năng sau chấn thương", url: "#", icon: Frame },
    { name: "Vật lý trị liệu cho người cao tuổi", url: "#", icon: PieChart },
    { name: "Chăm sóc bệnh nhân sau phẫu thuật", url: "#", icon: MapIcon },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navMainWithActive = data.navMain.map((item) => ({
    ...item,
    isActive: pathname === item.url,
  }));

  return (
    <Sidebar
      {...props}
      className="h-[calc(100svh-var(--header-height))] top-(--header-height)"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image src={"/logo.svg"} alt="Logo" width={30} height={30} />
                <h1 className="text-xl font-bold">PhysioCare</h1>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMainWithActive} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
