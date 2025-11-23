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
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.0003 4.75C14.0503 4.75 15.8303 5.45 17.2403 6.79L20.0503 3.98C18.0303 2.19 15.2303 1.25 12.0003 1.25C7.72031 1.25 4.02031 3.72 2.21031 7.38L5.64031 9.95C6.52031 8.07 8.17031 6.75 10.1203 6.75C10.7903 6.75 11.4403 6.86 12.0003 7.08C12.5603 7.31 13.0603 7.64 13.4903 8.06C13.9203 8.49 14.2503 9.00 14.4703 9.56C14.6903 10.12 14.8003 10.77 14.8003 11.44C14.8003 12.11 14.6903 12.76 14.4703 13.32C14.2503 13.88 13.9203 14.39 13.4903 14.81C13.0603 15.24 12.5603 15.57 12.0003 15.79C11.4403 16.02 10.7903 16.13 10.1203 16.13C8.17031 16.13 6.52031 14.81 5.64031 12.93L2.21031 15.5C4.02031 19.16 7.72031 21.63 12.0003 21.63C15.2303 21.63 18.0303 20.69 20.0503 18.9C21.8603 17.11 22.7503 14.51 22.7503 11.44C22.7503 10.44 22.6103 9.44 22.3403 8.44H12.0003V4.75Z" />
              </svg>
              Sign in with Google
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
