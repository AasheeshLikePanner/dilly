"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      if (session) {
        router.push('/workspaces');
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [router]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden selection:bg-white/20">
      {/* Ambient Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen"
        />
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[400px] p-6"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl shadow-2xl">
          {/* Subtle shine effect on top border */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

          <div className="p-8 flex flex-col items-center text-center">
            {/* Logo Area */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 relative group cursor-default"
            >
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img src="/cat.png" alt="Zynta Logo" className="relative w-12 h-12 rounded-lg shadow-lg object-cover ring-1 ring-white/10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h1 className="text-xl font-medium text-white mb-2 tracking-tight">Welcome to Zynta</h1>
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
                The quiet workspace for bugs, feedback,<br />and building what's next.
              </p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-xs w-full text-left"
              >
                {error}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-full"
            >
              <Button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full h-11 bg-white text-black hover:bg-zinc-200 transition-all duration-300 font-medium flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                {loading ? (
                  <Spinner className="size-4 text-zinc-600" />
                ) : (
                  <>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg"
                      alt="Google"
                      className="size-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    />
                    <span>Continue with Google</span>
                  </>
                )}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8 flex items-center gap-3 text-[9px] text-zinc-600 uppercase tracking-widest font-medium"
            >
              <span>Secure</span>
              <span className="w-0.5 h-0.5 rounded-full bg-zinc-700" />
              <span>Fast</span>
              <span className="w-0.5 h-0.5 rounded-full bg-zinc-700" />
              <span>Private</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
