"use client";

import Loading from "@/app/dashboard/loading";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";
import { UserProvider } from "@/lib/user-context";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const user = session?.data?.user ?? null;

  return (
    <UserProvider value={{ user }}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbItem className="hidden md:block">
                  Dashboard
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </header>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
}
