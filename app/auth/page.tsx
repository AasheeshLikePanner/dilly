// app/auth/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner'; // Assuming you have a Spinner component

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      if (session) {
        // User is logged in, redirect to workspace selection/creation
        router.push('/workspaces');
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      subscription?.unsubscribe();
    };
  }, [router]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`, // Supabase will redirect here after Google auth
        },
      });

      if (error) {
        setError(error.message);
      }
      // If data.url exists, Supabase will redirect the user to Google's auth page
      // No need to manually redirect here unless data.url is not provided by Supabase
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="p-8 rounded-lg shadow-lg bg-card text-center">
        <h1 className="text-2xl font-bold mb-6">Welcome to Dilly</h1>
        <p className="mb-4">Sign in to manage your workspaces.</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Spinner className="size-4" /> Signing in...
            </>
          ) : (
            <>
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg" alt="Google" className="size-5" />
              Sign in with Google
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
