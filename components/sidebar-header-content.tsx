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

interface SidebarHeaderContentProps {
  initialWorkspaceId?: string;
}

export default function SidebarHeaderContent({ initialWorkspaceId }: SidebarHeaderContentProps) {
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
      console.log('SidebarHeaderContent: fetchWorkspaceData started');
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      console.log('SidebarHeaderContent: user:', user);
      if (!user) {
        router.push('/auth');
        return;
      }

      // Extract slug from pathname if on dashboard route
      const dashboardMatch = pathname.match(/^\/dashboard\/([^/]+)/);
      const slugFromPath = dashboardMatch ? dashboardMatch[1] : null;
      console.log('SidebarHeaderContent: slugFromPath:', slugFromPath);

      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single();
        console.log('SidebarHeaderContent: profileData:', profileData);

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
        console.log('SidebarHeaderContent: memberData:', memberData);

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
        console.log('SidebarHeaderContent: userWorkspaces:', userWorkspaces);
        setAllWorkspaces(userWorkspaces);

        // Find workspace by ID or slug
        let activeWorkspace;
        if (currentWorkspaceId) {
          activeWorkspace = userWorkspaces.find(ws => ws.id === currentWorkspaceId);
        } else if (slugFromPath) {
          activeWorkspace = userWorkspaces.find(ws => ws.slug === slugFromPath);
        }
        console.log('SidebarHeaderContent: activeWorkspace:', activeWorkspace);

        if (!activeWorkspace && slugFromPath) {
          console.log('SidebarHeaderContent: Redirecting to /workspaces (workspace not found for slug)');
          router.push('/workspaces');
          return;
        }

        if (!activeWorkspace && !slugFromPath) {
          // If no workspace ID/slug and not on dashboard, it's okay
          setWorkspace(null);
          setLoading(false);
          return;
        }

        setWorkspace(activeWorkspace || null);

      } catch (err: any) {
        console.error('SidebarHeaderContent: Error in fetchWorkspaceData:', err.message);
        setError(err.message);
        router.push('/workspaces');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaceData();
  }, [currentWorkspaceId, pathname, router]);

  const handleWorkspaceSwitch = (workspaceId: string) => {
    const selectedWorkspace = allWorkspaces.find(ws => ws.id === workspaceId);
    if (selectedWorkspace && workspaceId !== currentWorkspaceId) {
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