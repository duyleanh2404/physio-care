"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";

import { Bell, SidebarIcon } from "lucide-react";

import { capitalize } from "@/utils/capitalize";

import { Hint } from "../global/Hint";
import { ThemeToggle } from "../global/ThemeToggle";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export function SiteHeader() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 w-full flex items-center border-b bg-background z-50">
      <div className="w-full h-full flex items-center gap-2 px-4">
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleSidebar}
          className="w-8 h-8"
        >
          <SidebarIcon />
        </Button>

        <Separator
          orientation="vertical"
          className="hidden sm:block h-4 mr-2"
        />

        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            {segments.map((segment, index) => {
              const isLast = index === segments.length - 1;
              const href = `/${segments.slice(0, index + 1).join("/")}`;

              return (
                <Fragment key={href}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={href}>
                        {capitalize(segment)}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto flex items-center space-x-2">
          <Hint content="Thông báo">
            <Button size="icon" variant="outline" className="size-9">
              <Bell />
            </Button>
          </Hint>

          <ThemeToggle className="size-9" />
        </div>
      </div>
    </header>
  );
}
