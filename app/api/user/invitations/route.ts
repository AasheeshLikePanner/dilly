import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createSupabaseServerClient();

  // 1. Authenticate
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Fetch Pending Invites
  const { data: invites, error } = await supabase
    .from('workspace_invites')
    .select('*')
    .eq('invitee_email', user.email)
    .eq('status', 'pending')
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching invites:', error);
    return NextResponse.json({ error: 'Failed to fetch invitations' }, { status: 500 });
  }

  if (!invites || invites.length === 0) {
    return NextResponse.json([]);
  }

  // 3. Fetch workspace and inviter details for each invite
  const enrichedInvites = await Promise.all(
    invites.map(async (invite) => {
      // Fetch workspace details
      const { data: workspace } = await supabase
        .from('workspaces')
        .select('id, name, logo_url')
        .eq('id', invite.workspace_id)
        .single();

      // Fetch inviter profile
      const { data: inviter } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('id', invite.invited_by_user_id)
        .single();

      return {
        id: invite.id,
        token: invite.token,
        role: invite.role,
        created_at: invite.created_at,
        workspaces: workspace,
        inviter: inviter,
      };
    })
  );

  return NextResponse.json(enrichedInvites);
}

export async function PUT(request: Request) {
  const supabase = createSupabaseServerClient();

  // 1. Authenticate
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { inviteId, action } = body;

    if (!inviteId || action !== 'decline') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Update invitation status to declined
    const { error } = await supabase
      .from('workspace_invites')
      .update({ status: 'declined' })
      .eq('id', inviteId)
      .eq('invitee_email', user.email); // Ensure user can only decline their own invites

    if (error) {
      console.error('Error declining invitation:', error);
      return NextResponse.json({ error: 'Failed to decline invitation' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Invitation declined successfully' });
  } catch (error: any) {
    console.error('Error in PUT /api/user/invitations:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
