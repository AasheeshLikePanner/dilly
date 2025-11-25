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
  Cube // New icon for Feedback parent
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

export function AppSidebar({ workspaceId, onMouseEnter, onMouseLeave, ...props }: React.ComponentProps<typeof Sidebar> & { workspaceId?: string, onMouseEnter?: () => void, onMouseLeave?: () => void }) {
  const pathname = usePathname();
  const router = useRouter(); // Use useRouter hook
  const { state } = useSidebar(); // Use useSidebar hook
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
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>

            {/* Home */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/" || pathname.startsWith("/dashboard")}
                tooltip="Home"
                className={state === "expanded" ? "bg-white text-black h-10" : ""} // Conditional styling
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
          <SidebarGroupLabel>Product</SidebarGroupLabel>
          <SidebarMenu>
            {/* Features */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive(getHrefWithSlug('/features'))} tooltip="Features">
                <Link href={getHrefWithSlug('/features')}>
                  <Lightbulb />
                  <span>Features</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {/* Bugs */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive(getHrefWithSlug('/bugs'))} tooltip="Bugs">
                <Link href={getHrefWithSlug('/bugs')}>
                  <Bug />
                  <span>Bugs</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {/* Product Feedback */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive(getHrefWithSlug('/feedback'))} tooltip="Product Feedback">
                <Link href={getHrefWithSlug('/feedback')}>
                  <ChatCircleText />
                  <span>Product Feedback</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {/* Roadmap */}
          </SidebarMenu>
        </SidebarGroup>

        {/* Group 3: Community */}
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              {/* Non-clickable parent "Feedback" */}
              <SidebarMenuButton tooltip="Feedback">
                <Cube /> {/* Using a generic icon for the parent */}
                <span>Feedback</span>
              </SidebarMenuButton>
              <SidebarMenuSub>
                {/* Emoji Feedback */}
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive(getHrefWithSlug('/components/feedback/emoji'))}>
                    <Link href={getHrefWithSlug('/components/feedback/emoji')}>
                      <Smiley />
                      <span>Emoji Feedback</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                {/* Slider Feedback */}
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive(getHrefWithSlug('/components/feedback/slider'))}>
                    <Link href={getHrefWithSlug('/components/feedback/slider')}>
                      <SlidersHorizontal />
                      <span>Slider Feedback</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                {/* Form Feedback */}
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive(getHrefWithSlug('/components/feedback/form'))}>
                    <Link href={getHrefWithSlug('/components/feedback/form')}>
                      <NotePencil />
                      <span>Form Feedback</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
            <SidebarMenuItem>
              {/* Non-clickable parent "Bug Reporting" */}
              <SidebarMenuButton tooltip="Bug Reporting">
                <Bug /> {/* Using Bug icon for the parent */}
                <span>Bug Reporting</span>
              </SidebarMenuButton>
              <SidebarMenuSub>
                {/* Simple Bug Form */}
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive(getHrefWithSlug('/components/bug-reporting/form'))}>
                    <Link href={getHrefWithSlug('/components/bug-reporting/form')}>
                      <NotePencil /> {/* Reusing NotePencil for a form */}
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
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <UserCircle className="size-5" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{userName || "User Account"}</span>
                    <span className="truncate text-xs text-muted-foreground">{userEmail || "user@example.com"}</span>
                  </div>
                  <Gear className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-sidebar border-sidebar-border text-sidebar-foreground"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
                      <UserCircle className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{userName || "John Doe"}</span>
                      <span className="truncate text-xs text-muted-foreground">{userEmail || "john@example.com"}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-sidebar-border" />
                <DropdownMenuItem className="cursor-pointer focus:bg-sidebar-accent">
                  <Gear className="mr-2 size-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer focus:bg-sidebar-accent">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(getHrefWithSlug('/profile'))} tooltip="Profile">
              <Link href={getHrefWithSlug('/profile')}>
                <UserCircle />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(getHrefWithSlug('/settings'))} tooltip="Settings">
              <Link href={getHrefWithSlug('/settings')}>
                <Gear />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={async () => { await supabase.auth.signOut(); router.push('/auth'); }} tooltip="Log out">
              <SignOut />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}