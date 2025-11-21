"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { House, ChartPieSlice, Gear, Question, UserCircle } from "phosphor-react";
import SidebarHeaderContent from "@/components/sidebar-header-content"; // Import the new component
import { useSearchParams } from 'next/navigation'; // Import useSearchParams

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get('workspaceId') || undefined; // Get workspaceId from URL

  return (
    <html lang="en" className="dark h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent h-full`}
      >
        <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <Sidebar
            collapsible="icon"
            onMouseEnter={() => setIsSidebarOpen(true)}
            onMouseLeave={() => setIsSidebarOpen(false)}
          >
            <SidebarHeader>
              <SidebarHeaderContent initialWorkspaceId={workspaceId} />
            </SidebarHeader>
            <SidebarContent className="p-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <House className="h-5 w-5" />
                    Home
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <ChartPieSlice className="h-5 w-5" />
                    Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Gear className="h-5 w-5" />
                    Settings
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Question className="h-5 w-5" />
                    Help
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <UserCircle className="h-5 w-5" />
                    User Profile
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarTrigger />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <header className="flex items-center justify-between">
              <div>
                {/* Other header content */}
              </div>
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}