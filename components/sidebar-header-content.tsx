// components/sidebar-header-content.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner'; // Import Spinner
import { Workspace, WorkspaceMember } from '@/types/supabase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Check, Plus, UserPlus } from 'phosphor-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const LAST_ACTIVE_WORKSPACE_SLUG_KEY = 'last_active_workspace_slug';

interface SidebarHeaderContentProps {
  initialWorkspaceId?: string;
  onWorkspaceChange?: (slug: string | null) => void;
  sidebarState: "expanded" | "collapsed"; // Add sidebarState prop
}

export default function SidebarHeaderContent({ initialWorkspaceId, onWorkspaceChange, sidebarState }: SidebarHeaderContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [allWorkspaces, setAllWorkspaces] = useState<Array<Workspace & { role: WorkspaceMember['role'] }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isSendingInvite, setIsSendingInvite] = useState(false); // New state for spinner

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
      const segments = pathname.split('/').filter(Boolean);
      let slugFromPath: string | null = null;

      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single();

        if (profileError || !profileData) {
          throw new Error(profileError?.message || 'Profile not found. Please ensure your profile exists.');
        }
        console.log(`SidebarHeaderContent: Profile ID: ${profileData.id}`);

        const userProfileId = profileData.id;

        interface WorkspaceMemberWithWorkspace {
          role: 'owner' | 'admin' | 'member' | 'viewer'; // Explicitly define the union type
          workspaces: Workspace | null;
        }

        // ...

        console.log('SidebarHeaderContent: Fetching workspace members...');
        const { data: memberData, error: memberError } = await supabase
          .from('workspace_members')
          .select(`
        role,
        workspaces (
          id,
          created_at,
          updated_at,
          name,
          slug,
          owner_id,
          description,
          logo_url
        )
      `)
          .eq('user_id', user.id) as { data: WorkspaceMemberWithWorkspace[] | null, error: any };

        if (memberError) {
          console.error('SidebarHeaderContent: Error fetching workspace members:', memberError.message);
          return;
        }
        console.log(`SidebarHeaderContent: Found ${memberData?.length || 0} workspace memberships.`);

        if (!memberData || memberData.length === 0) {
          setAllWorkspaces([]);
          console.log('SidebarHeaderContent: No workspace memberships found.');
          return;
        }

        const userWorkspaces = memberData
          .filter(member => member.workspaces !== null)
          .map(member => ({
            ...(member.workspaces as Workspace),
            role: member.role,
          }));
        setAllWorkspaces(userWorkspaces);
        console.log(`SidebarHeaderContent: Processed ${userWorkspaces.length} user workspaces.`);

        // Match slug from URL segments against user's workspaces
        slugFromPath = userWorkspaces.find(ws => ws.slug && segments.includes(ws.slug))?.slug || null;
        console.log(`SidebarHeaderContent: Slug from path: ${slugFromPath}`);

        let activeWorkspace;
        let lastActiveWorkspaceSlug = localStorage.getItem(LAST_ACTIVE_WORKSPACE_SLUG_KEY);
        console.log(`SidebarHeaderContent: Last active workspace slug from localStorage: ${lastActiveWorkspaceSlug}`);

        if (slugFromPath) {
          activeWorkspace = userWorkspaces.find(ws => ws.slug === slugFromPath);
          console.log(`SidebarHeaderContent: Active workspace from path: ${activeWorkspace?.slug}`);
        } else if (currentWorkspaceId) {
          activeWorkspace = userWorkspaces.find(ws => ws.id === currentWorkspaceId);
          console.log(`SidebarHeaderContent: Active workspace from initialWorkspaceId: ${activeWorkspace?.slug}`);
        } else if (lastActiveWorkspaceSlug) {
          activeWorkspace = userWorkspaces.find(ws => ws.slug === lastActiveWorkspaceSlug);
          console.log(`SidebarHeaderContent: Active workspace from localStorage: ${activeWorkspace?.slug}`);
        }

        if (!activeWorkspace && userWorkspaces.length > 0) {
          activeWorkspace = userWorkspaces[0];
          console.log(`SidebarHeaderContent: Defaulting to first workspace: ${activeWorkspace?.slug}`);
        }

        if (!activeWorkspace && slugFromPath) {
          console.log('SidebarHeaderContent: No active workspace found for slug from path. Redirecting to /workspaces.');
          router.push('/workspaces');
          return;
        }

        setWorkspace(activeWorkspace || null);
        onWorkspaceChange?.(activeWorkspace?.slug || null);
        if (activeWorkspace?.slug) {
          localStorage.setItem(LAST_ACTIVE_WORKSPACE_SLUG_KEY, activeWorkspace.slug);
          console.log(`SidebarHeaderContent: Set active workspace to ${activeWorkspace.slug}`);
        } else {
          localStorage.removeItem(LAST_ACTIVE_WORKSPACE_SLUG_KEY);
          console.log('SidebarHeaderContent: No active workspace slug to set.');
        }

      } catch (err: any) {
        console.error('SidebarHeaderContent: Error in fetchWorkspaceData:', err.message);
        setError(err.message);
        router.push('/workspaces');
      } finally {
        setLoading(false);
        console.log('SidebarHeaderContent: Loading finished.');
      }
    };

    fetchWorkspaceData();
  }, [currentWorkspaceId, pathname, onWorkspaceChange]);

  const handleSendInvite = async () => {
    if (!workspace?.id) {
      alert('Please ensure a workspace is selected.');
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('You must be logged in to send invites.');
      return;
    }

    setIsSendingInvite(true); // Set loading state
    try {
      const testEmail = 'ashishrathour1102@gmail.com'; // Hardcode for testing
      const response = await fetch('/api/workspaces/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invitee_email: testEmail, // Use hardcoded email
          workspace_id: workspace.id,
          invited_by_user_id: user.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send invite.');
      }

      alert(`Invitation sent successfully to ${testEmail}!`);
      setInviteEmail(''); // Clear input after sending
      setShowInviteDialog(false);
    } catch (err: any) {
      alert(`Error sending invitation: ${err.message}`);
    } finally {
      setIsSendingInvite(false); // Reset loading state
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

  const logoSizeClass = sidebarState === "expanded" ? "size-10" : "size-8";
  const buttonClass = sidebarState === "expanded" ? "w-full h-auto justify-start" : "w-10 h-10 p-0 justify-center";

  const handleWorkspaceSwitch = (workspaceId: string) => {
    const newWorkspace = allWorkspaces.find(ws => ws.id === workspaceId);
    if (newWorkspace) {
      router.push(`/${newWorkspace.slug}`);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "flex items-center gap-2 p-2 bg-card hover:bg-zinc-800/50 border border-zinc-800 rounded-lg transition-all",
              buttonClass
            )}
          >
            {workspace.logo_url ? (
              <img src={workspace.logo_url} alt={`${workspace.name} logo`} className={`${logoSizeClass} rounded-md`} />
            ) : (
              <div className={`${logoSizeClass} rounded-md bg-primary flex items-center justify-center text-primary-foreground font-semibold text-xl`}>
                {workspace.name.charAt(0).toUpperCase()}
              </div>
            )}
            {sidebarState === "expanded" && (
              <>
                <div className="flex flex-col items-start flex-1">
                  <span className="font-semibold text-sm truncate">{workspace.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{workspace.slug}</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  className="text-zinc-500"
                >
                  <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                </svg>
              </>
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
          <DropdownMenuItem onClick={() => setShowInviteDialog(true)} className="flex items-center">
            <UserPlus className="h-4 w-4 mr-2" /> Invite Member
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite Member</DialogTitle>
            <DialogDescription>
              Invite a new member to {workspace?.name}. They will receive an email invitation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="col-span-3"
                placeholder="member@example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteDialog(false)} disabled={isSendingInvite}>Cancel</Button>
            <Button onClick={handleSendInvite} disabled={isSendingInvite}>
              {isSendingInvite ? <Spinner size="4" /> : 'Send Invite'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}