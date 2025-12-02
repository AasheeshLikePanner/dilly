import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();

  // 1. Authenticate the user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Input Validation
  const { token } = await request.json();
  if (!token) {
    return NextResponse.json({ error: 'Invitation token is required.' }, { status: 400 });
  }

  // 3. Validate Token and Invite
  const { data: invite, error: inviteError } = await supabase
    .from('workspace_invites')
    .select('*')
    .eq('token', token)
    .eq('status', 'pending')
    .maybeSingle();

  if (inviteError) {
    console.error('Error fetching invite:', inviteError);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }

  if (!invite) {
    return NextResponse.json({ error: 'Invalid or expired invitation token.' }, { status: 404 });
  }

  if (new Date(invite.expires_at) < new Date()) {
    // Update invite status to expired
    await supabase.from('workspace_invites').update({ status: 'expired' }).eq('id', invite.id);
    return NextResponse.json({ error: 'Invitation has expired.' }, { status: 403 });
  }

  // Check if invitee_email matches logged-in user's email
  if (invite.invitee_email !== user.email) {
    return NextResponse.json({ error: 'This invitation is not for your email address.' }, { status: 403 });
  }

  // 4. Check if already a member
  const { data: existingMember, error: memberCheckError } = await supabase
    .from('workspace_members')
    .select('*')
    .eq('user_id', user.id)
    .eq('workspace_id', invite.workspace_id)
    .maybeSingle();

  if (memberCheckError) {
    console.error('Error checking existing membership:', memberCheckError);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }

  if (existingMember) {
    // User is already a member, just update invite status
    await supabase.from('workspace_invites').update({ status: 'accepted' }).eq('id', invite.id);
    const { data: workspaceData } = await supabase.from('workspaces').select('slug').eq('id', invite.workspace_id).single();
    return NextResponse.json({ message: 'You are already a member of this workspace. Invitation accepted.', workspace_slug: workspaceData?.slug });
  }

  // 5. Add to workspace_members
  console.log('➕ Adding user to workspace_members:', {
    user_id: user.id,
    workspace_id: invite.workspace_id,
    role: invite.role,
    status: 'active'
  });

  const { data: newMember, error: addMemberError } = await supabase
    .from('workspace_members')
    .insert({
      user_id: user.id,
      workspace_id: invite.workspace_id,
      role: invite.role,
      status: 'active',
    })
    .select('*')
    .single();

  if (addMemberError) {
    console.error('❌ Error adding user to workspace members:', addMemberError);
    return NextResponse.json({ error: 'Failed to add you to the workspace.' }, { status: 500 });
  }

  console.log('✅ Successfully added member:', newMember);

  // 6. Update Invite Status
  const { error: updateInviteError } = await supabase
    .from('workspace_invites')
    .update({ status: 'accepted' })
    .eq('id', invite.id);

  if (updateInviteError) {
    console.error('Error updating invite status:', updateInviteError);
    // This is a non-critical error, user is already a member
  }

  const { data: workspaceData } = await supabase.from('workspaces').select('slug').eq('id', invite.workspace_id).single();

  return NextResponse.json({ message: 'Invitation accepted successfully!', workspace_slug: workspaceData?.slug });
}
