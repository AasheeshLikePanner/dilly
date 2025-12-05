"use client"

import * as React from "react"
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Bug,
  ChatCircleText,
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
  SidebarMenuBadge,
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

  const isComponentsLocked = process.env.NEXT_PUBLIC_SHOW_COMPONENTS === 'false' || (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SHOW_COMPONENTS !== 'true');

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
              <SidebarMenuButton
                asChild={!isComponentsLocked}
                tooltip={isComponentsLocked ? "Coming Soon" : "Features"}
                aria-disabled={isComponentsLocked}
                className={isComponentsLocked ? "pointer-events-none opacity-50" : ""}
              >
                {isComponentsLocked ? (
                  <>
                    <Lightbulb />
                    <span>Features</span>
                    <SidebarMenuBadge>Soon</SidebarMenuBadge>
                  </>
                ) : (
                  <Link href="/features">
                    <Lightbulb />
                    <span>Features</span>
                  </Link>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild={!isComponentsLocked}
                tooltip={isComponentsLocked ? "Coming Soon" : "Roadmap"}
                aria-disabled={isComponentsLocked}
                className={isComponentsLocked ? "pointer-events-none opacity-50" : ""}
              >
                {isComponentsLocked ? (
                  <>
                    <MapTrifold />
                    <span>Roadmap</span>
                    <SidebarMenuBadge>Soon</SidebarMenuBadge>
                  </>
                ) : (
                  <Link href="/roadmap">
                    <MapTrifold />
                    <span>Roadmap</span>
                  </Link>
                )}
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
              <SidebarMenuButton
                tooltip={isComponentsLocked ? "Coming Soon" : "Feedback Components"}
                aria-disabled={isComponentsLocked}
                className={isComponentsLocked ? "pointer-events-none opacity-50" : ""}
              >
                <Cube />
                <span>Components</span>
                {isComponentsLocked && <SidebarMenuBadge>Soon</SidebarMenuBadge>}
              </SidebarMenuButton>
              {!isComponentsLocked && (
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
              )}
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={isComponentsLocked ? "Coming Soon" : "Bug Reporting"}
                aria-disabled={isComponentsLocked}
                className={isComponentsLocked ? "pointer-events-none opacity-50" : ""}
              >
                <Bug />
                <span>Bug Reporting</span>
                {isComponentsLocked && <SidebarMenuBadge>Soon</SidebarMenuBadge>}
              </SidebarMenuButton>
              {!isComponentsLocked && (
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={isActive(getHrefWithSlug('/components/bug-reporting/form'))}>
                      <Link href={getHrefWithSlug('/components/bug-reporting/form')}>
                        <span>Simple Form</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
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
              <DropdownMenuContent className="w-56 bg-background border border-border rounded-lg" side="bottom" align="end" sideOffset={4}>
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
                <div className="flex items-center px-2 py-1.5 text-sm cursor-default rounded-sm hover:bg-accent hover:text-accent-foreground">
                  {theme === "dark" ? (
                    <Moon className="size-4 mr-2" />
                  ) : (
                    <Sun className="size-4 mr-2" />
                  )}
                  <span>Dark Mode</span>
                </div>
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
