// app/auth/callback/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js'; // Keep this for onAuthStateChange

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Listen for auth state changes to determine if the user is logged in
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      if (session) {
        // User is logged in, redirect to workspace selection/creation
        router.push('/workspaces');
      } else {
        // Something went wrong or session expired, redirect to login page
        router.push('/auth?error=authentication_failed');
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      subscription?.unsubscribe();
    };
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