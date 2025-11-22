// components/sidebar-header-content.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Workspace, WorkspaceMember } from '@/types/supabase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Check, Plus } from 'phosphor-react';

const LAST_ACTIVE_WORKSPACE_SLUG_KEY = 'last_active_workspace_slug';

interface SidebarHeaderContentProps {
  initialWorkspaceId?: string;
  onWorkspaceChange?: (slug: string | null) => void;
}

export default function SidebarHeaderContent({ initialWorkspaceId, onWorkspaceChange }: SidebarHeaderContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [allWorkspaces, setAllWorkspaces] = useState<Array<Workspace & { role: WorkspaceMember['role'] }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentWorkspaceId = initialWorkspaceId || searchParams.get('workspaceId');

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth');
        return;
      }

      // Extract slug from pathname if on dashboard route
      const dashboardMatch = pathname.match(/^\/dashboard\/([^/]+)/);
      const slugFromPath = dashboardMatch ? dashboardMatch[1] : null;

      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single();

        if (profileError || !profileData) {
          throw new Error(profileError?.message || 'Profile not found. Please ensure your profile exists.');
        }

        const userProfileId = profileData.id;

        const { data: memberData, error: memberError } = await supabase
          .from('workspace_members')
          .select(`
            workspace_id,
            role,
            workspaces (
              id,
              name,
              slug,
              logo_url
            )
          `)
          .eq('user_id', userProfileId);

        if (memberError) {
          throw new Error(memberError.message);
        }

        if (!memberData || memberData.length === 0) {
          router.push('/workspaces/new');
          return;
        }

        const userWorkspaces = memberData.map(member => ({
          ...(member.workspaces as Workspace),
          role: member.role,
        }));
        setAllWorkspaces(userWorkspaces);

        let activeWorkspace;
        let lastActiveWorkspaceSlug = localStorage.getItem(LAST_ACTIVE_WORKSPACE_SLUG_KEY);

        // Prioritize slug from path, then initialWorkspaceId, then localStorage
        if (slugFromPath) {
          activeWorkspace = userWorkspaces.find(ws => ws.slug === slugFromPath);
        } else if (currentWorkspaceId) {
          activeWorkspace = userWorkspaces.find(ws => ws.id === currentWorkspaceId);
        } else if (lastActiveWorkspaceSlug) {
          activeWorkspace = userWorkspaces.find(ws => ws.slug === lastActiveWorkspaceSlug);
        }
        
        // If no active workspace found yet, default to the first one in the list
        if (!activeWorkspace && userWorkspaces.length > 0) {
          activeWorkspace = userWorkspaces[0];
        }

        if (!activeWorkspace && slugFromPath) {
          router.push('/workspaces'); // Workspace not found for slug
          return;
        }

        setWorkspace(activeWorkspace || null);
        onWorkspaceChange?.(activeWorkspace?.slug || null);
        if (activeWorkspace?.slug) {
          localStorage.setItem(LAST_ACTIVE_WORKSPACE_SLUG_KEY, activeWorkspace.slug);
        } else {
          localStorage.removeItem(LAST_ACTIVE_WORKSPACE_SLUG_KEY);
        }

      } catch (err: any) {
        console.error('SidebarHeaderContent: Error in fetchWorkspaceData:', err.message);
        setError(err.message);
        router.push('/workspaces');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaceData();
  }, [currentWorkspaceId, pathname, onWorkspaceChange]);

  const handleWorkspaceSwitch = (workspaceId: string) => {
    const selectedWorkspace = allWorkspaces.find(ws => ws.id === workspaceId);
    if (selectedWorkspace && workspaceId !== currentWorkspaceId) {
      localStorage.setItem(LAST_ACTIVE_WORKSPACE_SLUG_KEY, selectedWorkspace.slug);
      router.push(`/dashboard/${selectedWorkspace.slug}?workspaceId=${workspaceId}`);
    }
  };

  if (loading) {
    return (
      <Button variant="ghost" size="icon" className="flex items-center justify-center">
        <Spinner size="4" className="text-primary" />
      </Button>
    );
  }

  if (error || !workspace) {
    return (
      <Button variant="ghost" size="icon" className="flex items-center justify-center">
        <div className="size-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground font-semibold text-lg">
          ?
        </div>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="flex items-center justify-center">
          {workspace.logo_url ? (
            <img src={workspace.logo_url} alt={`${workspace.name} logo`} className="size-8 rounded-md" />
          ) : (
            <div className="size-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
              {workspace.name.charAt(0).toUpperCase()}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {allWorkspaces.map((ws) => (
          <DropdownMenuItem
            key={ws.id}
            onClick={() => handleWorkspaceSwitch(ws.id)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              {ws.logo_url ? (
                <img src={ws.logo_url} alt={`${ws.name} logo`} className="size-6 rounded-md mr-2" />
              ) : (
                <div className="size-6 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm mr-2">
                  {ws.name.charAt(0).toUpperCase()}
                </div>
              )}
              {ws.name}
            </div>
            {ws.id === currentWorkspaceId && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/workspaces/new')} className="flex items-center">
          <Plus className="h-4 w-4 mr-2" /> Create New Workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}