"use client";

import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { useSearchParams, usePathname } from 'next/navigation';
import { AppSidebar } from "@/components/app-sidebar";
import { useState } from "react"; // Import useState

import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const workspaceId = searchParams.get('workspaceId') || undefined;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fixed: Check if pathname starts with /dashboard to keep sidebar visible
  const hideSidebar = 
    pathname === '/workspaces' || 
    pathname === '/auth' || 
    pathname === '/workspaces/new' || 
    pathname === '/';

  if (hideSidebar) {
    return (
      <html lang="en" className="dark h-full">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent h-full`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="dark h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent h-full`}
      >
        <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <AppSidebar 
            workspaceId={workspaceId} 
            onMouseEnter={() => setIsSidebarOpen(true)}
            onMouseLeave={() => setIsSidebarOpen(false)}
          />
          <SidebarInset>
            <header className="flex items-center justify-between">
              <div>
                {/* Other header content */}
              </div>
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}