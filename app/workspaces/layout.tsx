// app/workspaces/layout.tsx (Server Component)
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { UserProvider } from '@/components/user-context'; // Import UserProvider

export default async function WorkspacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  // Wrap children with UserProvider and pass the user object
  return (
    <UserProvider initialUser={user}>
      {children}
    </UserProvider>
  );
}
