// components/sidebar-header-content.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

      const currentPath = window.location.pathname;

      if (!currentWorkspaceId) {
        if (currentPath !== '/workspaces' && currentPath !== '/workspaces/new') {
          router.push('/workspaces');
        } else {
          setLoading(false);
          setWorkspace(null);
        }
        return;
      }

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

        const activeWorkspace = userWorkspaces.find(ws => ws.id === currentWorkspaceId);

        if (!activeWorkspace) {
          router.push('/workspaces');
          return;
        }
        setWorkspace(activeWorkspace);

      } catch (err: any) {
        console.error('Error fetching workspace data:', err.message);
        setError(err.message);
        router.push('/workspaces');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaceData();
  }, [currentWorkspaceId, router]);

  const handleWorkspaceSwitch = (workspaceId: string) => {
    if (workspaceId !== currentWorkspaceId) {
      router.push(`/dashboard?workspaceId=${workspaceId}`);
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
