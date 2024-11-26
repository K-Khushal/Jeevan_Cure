"use client";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser } from "@/components/dashboard/nav-user";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  CircleUserRound,
  Command,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Send,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { Suspense } from "react";
import * as React from "react";

const data = {
  user: {
    name: "Khushal",
    email: "m@example.com",
    avatar: "/Logo.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Appointment",
      url: "/dashboard/appointment",
      icon: Calendar,
    },
    {
      title: "Documents",
      url: "/dashboard/documents",
      icon: FileText,
    },
    {
      title: "Profile",
      url: "/dashboard/user-profile",
      icon: CircleUserRound,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentPath = usePathname(); // Get current path from Next.js router

  const [isChildrenLoaded, setIsChildrenLoaded] = useState(false);

  // Simulate children loading (replace with your actual loading logic)
  useEffect(() => {
    const timer = setTimeout(() => setIsChildrenLoaded(true), 2000); // Simulate delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <Sidebar variant="inset" {...props} collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Jeevan Cure</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
                <ThemeToggle />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} currentPath={currentPath} />
        {/*<NavProjects projects={data.projects} />*/}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {!isChildrenLoaded ? (
          <UserFallback />
        ) : (
          <Suspense fallback={<UserFallback />}>
            <NavUser />
          </Suspense>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

function UserFallback() {
  return (
    <div className="flex items-center gap-2 px-1 py-1.5">
      <Skeleton className="h-9 w-9 rounded-lg" />
      <div className="grid flex-1 space-y-2">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
}
