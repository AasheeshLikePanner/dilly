// app/workspaces/new/page.tsx
"use client";

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import axios from '@/lib/axios';

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

    try {
      const newSlug = generateSlug(workspaceName);

      // Create workspace via API
      const response = await axios.post('/api/workspaces', {
        name: workspaceName.trim(),
        slug: newSlug,
        description: workspaceDescription.trim(),
      });

      const workspaceData = response.data;

      // Redirect to new workspace
      router.push(`/${workspaceData.slug}`);

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
