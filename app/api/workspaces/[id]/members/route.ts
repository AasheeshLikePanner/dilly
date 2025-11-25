import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: { id: string } }) {
    const supabase = createSupabaseServerClient();
    const { id } = await context.params;

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user is a member of the workspace
    const { data: membership, error: membershipError } = await supabase
        .from('workspace_members')
        .select('role')
        .eq('workspace_id', id)
        .eq('user_id', user.id)
        .maybeSingle();

    if (membershipError || !membership) {
        return NextResponse.json({ error: 'Unauthorized access to workspace' }, { status: 403 });
    }

    // Fetch members with profile details
    const { data: members, error } = await supabase
        .from('workspace_members')
        .select(`
      id,
      role,
      status,
      user_id,
      profiles:user_id (
        id,
        email,
        full_name,
        avatar_url
      )
    `)
        .eq('workspace_id', id);

    if (error) {
        console.error('Error fetching workspace members:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(members);
}
