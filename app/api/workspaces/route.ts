// app/api/workspaces/route.ts
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch all workspaces where user is a member
  const { data: memberData, error: memberError } = await supabase
    .from('workspace_members')
    .select(`
      workspace_id,
      workspaces (*)
    `)
    .eq('user_id', user.id)
    .eq('status', 'active');

  if (memberError) {
    console.error('Error fetching workspace memberships:', memberError);
    return NextResponse.json({ error: memberError.message }, { status: 500 });
  }

  // Extract workspaces from the member data
  const workspaces = memberData
    ?.filter(m => m.workspaces !== null)
    .map(m => m.workspaces) || [];

  return NextResponse.json(workspaces);
}
