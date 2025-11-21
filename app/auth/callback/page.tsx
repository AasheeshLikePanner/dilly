// app/auth/callback/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Spinner } from '@/components/ui/spinner';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // This page is hit after Supabase processes the Google OAuth redirect.
      // Supabase's onAuthStateChange listener in AuthPage will pick up the session.
      // However, we can explicitly check for a session here if needed.
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // User is logged in, redirect to workspace selection/creation
        router.push('/workspaces');
      } else {
        // Something went wrong, redirect to login page with an error
        router.push('/auth?error=authentication_failed');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="p-8 rounded-lg shadow-lg bg-card text-center">
        <Spinner className="size-8 text-primary" />
        <p className="mt-4 text-lg">Processing authentication...</p>
      </div>
    </div>
  );
}
