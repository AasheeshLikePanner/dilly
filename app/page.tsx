import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default async function Home() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single();

  if (profileError || !profileData) {
    console.error('Profile not found:', profileError?.message);
    redirect('/auth'); // Or handle profile creation flow
  }

  const userProfileId = profileData.id;

  const { data: memberData, error: memberError } = await supabase
    .from('workspace_members')
    .select(`
      workspace_id,
      workspaces (
        slug
      )
    `)
    .eq('user_id', userProfileId);

  if (memberError) {
    console.error('Error fetching workspace members:', memberError.message);
    redirect('/workspaces'); // Redirect to a generic workspace page or error
  }

  if (!memberData || memberData.length === 0) {
    redirect('/workspaces/new');
  }

  const firstWorkspaceSlug = memberData[0].workspaces?.slug;

  if (firstWorkspaceSlug) {
    redirect(`/dashboard/${firstWorkspaceSlug}`);
  } else {
    redirect('/workspaces'); // Fallback if slug is somehow missing
  }
}
