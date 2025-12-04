"use client";

import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from '@/components/ui/sonner';
import SidebarWrapper from "@/components/sidebar-wrapper"; // Import the new component

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

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';


import { ThemeProvider } from "@/components/theme-provider"

import { WorkspaceProvider } from "@/components/providers/workspace-provider";
import { ToastProvider } from "@/hooks/use-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent h-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={
            <div className="flex items-center justify-center h-screen bg-background">
              <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
            </div>
          }>
            <WorkspaceProvider>
              <SidebarWrapper>
                <ToastProvider>
                  {children}
                </ToastProvider>
              </SidebarWrapper>
            </WorkspaceProvider>
          </Suspense>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
