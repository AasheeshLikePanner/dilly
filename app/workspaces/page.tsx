// app/workspaces/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Plus } from 'phosphor-react'; // Assuming you have phosphor-react for icons
import { Workspace, WorkspaceMember, Profile } from '@/types/supabase'; // Import your types

export default function WorkspacesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [workspaces, setWorkspaces] = useState<Array<Workspace & { role: WorkspaceMember['role'] }>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserWorkspaces = async () => {
      setLoading(true);
      setError(null);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth');
        return;
      }

      try {
        // Fetch profile to get the user's ID linked to public.profiles
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single();

        if (profileError || !profileData) {
          throw new Error(profileError?.message || 'Profile not found.');
        }

        const userProfileId = profileData.id;

        // Fetch workspace memberships for the user
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

        if (memberData && memberData.length > 0) {
          const userWorkspaces = memberData.map(member => ({
            ...(member.workspaces as Workspace), // Type assertion
            role: member.role,
          }));
          setWorkspaces(userWorkspaces);
        } else {
          // If no workspaces, redirect to create a new one
          router.push('/workspaces/new');
        }
      } catch (err: any) {
        console.error('Error fetching workspaces:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserWorkspaces();
  }, [router]);

  const handleWorkspaceSelect = (workspaceId: string) => {
    router.push(`/dashboard?workspaceId=${workspaceId}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <Spinner className="size-8 text-primary" />
        <p className="ml-4 text-lg">Loading workspaces...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="p-8 rounded-lg shadow-lg bg-card text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-500 mb-6">{error}</p>
          <Button onClick={() => router.push('/auth')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-card">
        <h1 className="text-3xl font-bold mb-6 text-center">Select a Workspace</h1>

        {workspaces.length > 0 ? (
          <ul className="space-y-4 mb-6">
            {workspaces.map((ws) => (
              <li key={ws.id}>
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 text-lg"
                  onClick={() => handleWorkspaceSelect(ws.id)}
                >
                  {ws.logo_url ? (
                    <img src={ws.logo_url} alt={`${ws.name} logo`} className="size-8 rounded-md mr-3" />
                  ) : (
                    <div className="size-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-semibold mr-3">
                      {ws.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {ws.name}
                  <span className="ml-auto text-sm text-muted-foreground">({ws.role})</span>
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground mb-6">You are not a member of any workspaces yet.</p>
        )}

        <Button
          className="w-full flex items-center justify-center gap-2 h-12 text-lg"
          onClick={() => router.push('/workspaces/new')}
        >
          <Plus className="size-6" /> Create New Workspace
        </Button>
      </div>
    </div>
  );
}
