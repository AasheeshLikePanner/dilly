// app/workspaces/new/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Workspace } from '@/types/supabase';

export default function CreateWorkspacePage() {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceDescription, setWorkspaceDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
      .trim()
      .replace(/\s+/g, '-'); // Replace spaces with hyphens
  };

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!workspaceName.trim()) {
      setError('Workspace name cannot be empty.');
      setLoading(false);
      return;
    }

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
        throw new Error(profileError?.message || 'Profile not found. Please ensure your profile exists.');
      }

      const userProfileId = profileData.id;
      const newSlug = generateSlug(workspaceName);

      // 1. Create the workspace
      const { data: workspaceData, error: workspaceError } = await supabase
        .from('workspaces')
        .insert({
          name: workspaceName.trim(),
          slug: newSlug,
          owner_id: userProfileId,
          description: workspaceDescription.trim(),
        })
        .select()
        .single();

      if (workspaceError || !workspaceData) {
        throw new Error(workspaceError?.message || 'Failed to create workspace.');
      }

      // 2. Add the user as an owner to workspace_members
      const { error: memberError } = await supabase
        .from('workspace_members')
        .insert({
          user_id: userProfileId,
          workspace_id: workspaceData.id,
          role: 'owner',
          status: 'active',
        });

      if (memberError) {
        throw new Error(memberError.message || 'Failed to add user to workspace members.');
      }

      // Redirect to new workspace
      router.push(`/${newSlug}`);

    } catch (err: any) {
      console.error('Error creating workspace:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-card">
        <h1 className="text-3xl font-bold mb-6 text-center">Create New Workspace</h1>

        <form onSubmit={handleCreateWorkspace} className="space-y-6">
          <div>
            <Label htmlFor="workspaceName" className="block text-sm font-medium text-secondary-foreground mb-2">
              Workspace Name
            </Label>
            <Input
              id="workspaceName"
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="e.g., My Team's Lab"
              className="w-full bg-input border-border text-foreground"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="workspaceDescription" className="block text-sm font-medium text-secondary-foreground mb-2">
              Description (Optional)
            </Label>
            <Input
              id="workspaceDescription"
              type="text"
              value={workspaceDescription}
              onChange={(e) => setWorkspaceDescription(e.target.value)}
              placeholder="A brief description of your workspace"
              className="w-full bg-input border-border text-foreground"
              disabled={loading}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2 h-12 text-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner className="size-4" /> Creating...
              </>
            ) : (
              'Create Workspace'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
