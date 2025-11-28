"use client"

import * as React from "react"
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Bug,
  CaretRight,
  ChartPieSlice,
  ChatCircleText,
  Gear,
  House,
  Lightbulb,
  Lifebuoy,
  MapTrifold,
  UserCircle,
  SignOut, // Import SignOut icon
  Smiley, // New icon for Emoji Feedback
  SlidersHorizontal, // New icon for Slider Feedback
  NotePencil, // New icon for Form Feedback
  Cube, // New icon for Feedback parent
  Sun,
  Moon,
  Lock // Import Lock icon for locked items
} from "phosphor-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar, // Import useSidebar
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import SidebarHeaderContent from "@/components/sidebar-header-content"
import { DropdownMenuContent, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"

import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function AppSidebar({ workspaceId, onMouseEnter, onMouseLeave, ...props }: React.ComponentProps<typeof Sidebar> & { workspaceId?: string, onMouseEnter?: () => void, onMouseLeave?: () => void }) {
  const pathname = usePathname();
  const router = useRouter(); // Use useRouter hook
  const { state } = useSidebar(); // Use useSidebar hook
  const { theme, setTheme } = useTheme()
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [activeWorkspaceSlug, setActiveWorkspaceSlug] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserEmail(session.user.email ?? null);
        // Assuming user_metadata might contain a name, otherwise use email
        setUserName(session.user.user_metadata?.full_name || session.user.email);
      }
    };
    getUser();
  }, []);

  // Helper to check active state
  const isActive = (url: string, exact = false) => {
    if (exact) {
      return pathname === url;
    }
    return pathname.startsWith(url);
  };

  // Use the activeWorkspaceSlug from SidebarHeaderContent for homeHref
  const homeHref = activeWorkspaceSlug ? `/${activeWorkspaceSlug}` : "/";

  const getHrefWithSlug = (baseHref: string) => {
    if (activeWorkspaceSlug && baseHref !== "/") {
      return `${baseHref}/${activeWorkspaceSlug}`;
    }
    return baseHref;
  };

  return (
    <Sidebar collapsible="icon" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...props}>
      <SidebarHeader>
        <SidebarHeaderContent initialWorkspaceId={workspaceId} onWorkspaceChange={setActiveWorkspaceSlug} sidebarState={state} />
      </SidebarHeader>

      <SidebarContent>
        {/* Group 1: Platform */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/" || pathname.startsWith("/dashboard")}
                tooltip="Home"
              >
                <Link href={homeHref}>
                  <House />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Group 2: Product */}
        <SidebarGroup>
          <div className="px-2 py-1.5">
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider px-2 group-data-[collapsible=icon]:hidden">Product</span>
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive(getHrefWithSlug('/bugs'))} tooltip="Bugs">
                <Link href={getHrefWithSlug('/bugs')}>
                  <Bug />
                  <span>Bugs</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive(getHrefWithSlug('/feedback'))} tooltip="Product Feedback">
                <Link href={getHrefWithSlug('/feedback')}>
                  <ChatCircleText />
                  <span>Feedback</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton aria-disabled="true" className="pointer-events-none opacity-50" tooltip="Coming Soon">
                <Lightbulb />
                <span className="flex items-center gap-2">
                  <span>Features</span>
                  <Lock className="size-3 text-zinc-500" weight="fill" />
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton aria-disabled="true" className="pointer-events-none opacity-50" tooltip="Roadmap (Coming Soon)">
                <MapTrifold />
                <span className="flex items-center gap-2">
                  <span>Roadmap</span>
                  <Lock className="size-3 text-zinc-500" weight="fill" />
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Group 3: Components */}
        <SidebarGroup>
          <div className="px-2 py-1.5">
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider px-2 group-data-[collapsible=icon]:hidden">Components</span>
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Feedback Components">
                <Cube />
                <span>Components</span>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive(getHrefWithSlug('/components/feedback/emoji'))}>
                    <Link href={getHrefWithSlug('/components/feedback/emoji')}>
                      <span>Emoji Feedback</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive(getHrefWithSlug('/components/feedback/slider'))}>
                    <Link href={getHrefWithSlug('/components/feedback/slider')}>
                      <span>Slider Feedback</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive(getHrefWithSlug('/components/feedback/form'))}>
                    <Link href={getHrefWithSlug('/components/feedback/form')}>
                      <span>Form Feedback</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Bug Reporting">
                <Bug />
                <span>Bug Reporting</span>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive(getHrefWithSlug('/components/bug-reporting/form'))}>
                    <Link href={getHrefWithSlug('/components/bug-reporting/form')}>
                      <span>Simple Form</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>


      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-zinc-800/50 data-[state=open]:text-white hover:bg-zinc-800/50 hover:text-white transition-all"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-zinc-800 text-white border border-zinc-700">
                    <UserCircle className="size-5" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight ml-1">
                    <span className="truncate font-medium text-zinc-200">{userName || "User Account"}</span>
                    <span className="truncate text-xs text-zinc-500">{userEmail || "user@example.com"}</span>
                  </div>
                  <Gear className="ml-auto size-4 text-zinc-500" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-[#161616] border-zinc-800 text-zinc-200"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-zinc-800 text-white">
                      <UserCircle className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{userName || "John Doe"}</span>
                      <span className="truncate text-xs text-zinc-500">{userEmail || "john@example.com"}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem className="cursor-pointer focus:bg-zinc-800 focus:text-white" asChild>
                  <Link href={getHrefWithSlug('/settings')}>
                    <Gear className="mr-2 size-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <div className="flex items-center justify-between px-2 py-1.5 text-sm">
                  <span className="text-zinc-400">Theme</span>
                  <div className="flex items-center gap-1 bg-zinc-800 rounded-full p-0.5 border border-zinc-700">
                    <button
                      onClick={() => setTheme("light")}
                      className={cn(
                        "p-1 rounded-full transition-all",
                        theme === "light" ? "bg-zinc-600 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                      )}
                    >
                      <Sun className="size-3.5" weight="fill" />
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={cn(
                        "p-1 rounded-full transition-all",
                        theme === "dark" ? "bg-zinc-600 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                      )}
                    >
                      <Moon className="size-3.5" weight="fill" />
                    </button>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem className="cursor-pointer focus:bg-zinc-800 focus:text-white">
                  <SignOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}