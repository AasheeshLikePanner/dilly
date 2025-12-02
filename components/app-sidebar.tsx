"use client"

import * as React from "react"
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Bug,
  ChatCircleText,
  Check,
  Gear,
  House,
  Lightbulb,
  MapTrifold,
  UserCircle,
  SignOut, 
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
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-zinc-900 text-white border border-zinc-800">
                    <UserCircle className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{userName || "User Account"}</span>
                    <span className="truncate text-xs">{userEmail || "user@example.com"}</span>
                  </div>
                  <Gear className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background" side="bottom" align="end" sideOffset={4}>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground border border-sidebar-border">
                      <UserCircle className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{userName || "User"}</span>
                      <span className="truncate text-xs">{userEmail || "user@example.com"}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={getHrefWithSlug('/settings')} className="flex items-center">
                    <Gear className="mr-2 size-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center">
                  <Sun className="mr-2 size-4" />
                  Light Mode
                  {theme === "light" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center">
                  <Moon className="mr-2 size-4" />
                  Dark Mode
                  {theme === "dark" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await supabase.auth.signOut();
                    router.push('/auth');
                  }}
                  className="flex items-center"
                >
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
