"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';

export default function AcceptInvitePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleAcceptInvite = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setMessage('Invitation token not found.');
        setStatus('error');
        return;
      }

      // Check if user is logged in
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // If not logged in, redirect to auth page with redirect URL
        router.push(`/auth?redirect_to=/accept-invite?token=${token}`);
        return;
      }

      // If logged in, proceed to accept the invite via API
      try {
        const response = await fetch('/api/workspaces/accept-invite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to accept invitation.');
        }

        const result = await response.json();
        setMessage(result.message || 'Invitation accepted successfully!');
        setStatus('success');

        // Redirect to the new workspace dashboard
        if (result.workspace_slug) {
          router.push(`/dashboard/${result.workspace_slug}`);
        } else {
          router.push('/dashboard'); // Fallback to general dashboard
        }
      } catch (err: any) {
        setMessage(`Error: ${err.message}`);
        setStatus('error');
      }
    };

    handleAcceptInvite();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <div className="rounded-lg border bg-card p-8 shadow-lg text-center">
        {status === 'loading' && (
          <>
            <Spinner size="8" className="mb-4 text-primary" />
            <h1 className="text-xl font-semibold">Accepting Invitation...</h1>
            <p className="text-muted-foreground">Please wait while we process your invitation.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <h1 className="text-xl font-semibold text-green-500">Success!</h1>
            <p className="text-muted-foreground">{message}</p>
            <Button onClick={() => router.push('/dashboard')} className="mt-4">Go to Dashboard</Button>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className="text-xl font-semibold text-red-500">Error!</h1>
            <p className="text-muted-foreground">{message}</p>
            <Button onClick={() => router.push('/dashboard')} className="mt-4">Go to Dashboard</Button>
          </>
        )}
      </div>
    </div>
  );
}
