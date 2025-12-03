"use client";

import { useState } from "react";
import { useSearchParams, usePathname } from 'next/navigation';
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const workspaceId = searchParams.get('workspaceId') || undefined;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const hideSidebar =
    pathname === '/workspaces' ||
    pathname === '/auth' ||
    pathname === '/workspaces/new' ||
    pathname === '/' ||
    pathname === '/404' ||
    pathname === '/_not-found' ||
    pathname?.startsWith('/track');

  if (hideSidebar) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <AppSidebar
        workspaceId={workspaceId}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      />
      <SidebarInset>
        <header className="flex items-center justify-between">
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
