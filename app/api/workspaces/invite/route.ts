import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import {Resend} from 'resend'; // Assuming Resend is installed and configured

const resend = new Resend(process.env.RESEND_API_KEY); // Initialize Resend

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();

  // 1. Authenticate the inviter
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Input Validation
  const { invitee_email, workspace_id, invited_by_user_id } = await request.json();

  if (!invitee_email || !workspace_id || !invited_by_user_id) {
    return NextResponse.json({ error: 'Missing required fields: invitee_email, workspace_id, invited_by_user_id' }, { status: 400 });
  }

  if (invited_by_user_id !== user.id) {
    return NextResponse.json({ error: 'Invited by user ID does not match authenticated user.' }, { status: 403 });
  }

  // Basic email format validation
  if (!/\S+@\S+\.\S+/.test(invitee_email)) {
    return NextResponse.json({ error: 'Invalid invitee email format.' }, { status: 400 });
  }

  // 3. Permission Check (Example: Only workspace owner/admin can invite)
  // For simplicity, we'll assume any member can invite for now, but this is where you'd add role checks.
  const { data: member, error: memberError } = await supabase
    .from('workspace_members')
    .select('role')
    .eq('user_id', user.id)
    .eq('workspace_id', workspace_id)
    .maybeSingle();

  if (memberError || !member) {
    return NextResponse.json({ error: 'User is not a member of this workspace or permission denied.' }, { status: 403 });
  }
  // Further role-based checks could go here: e.g., if (member.role !== 'admin' && member.role !== 'owner') { ... }

  // 4. Check for existing invite/member
  const { data: existingInvite } = await supabase
    .from('workspace_invites')
    .select('id')
    .eq('workspace_id', workspace_id)
    .eq('invitee_email', invitee_email)
    .eq('status', 'pending')
    .maybeSingle();

  if (existingInvite) {
    return NextResponse.json({ error: 'An invitation to this email for this workspace is already pending.' }, { status: 409 });
  }

  // Resolve invitee_email to user_id if user exists
  const { data: inviteeProfile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', invitee_email)
    .maybeSingle();

  if (profileError) {
    console.error('Error checking invitee profile:', profileError);
    return NextResponse.json({ error: 'Internal server error checking invitee profile.' }, { status: 500 });
  }

  if (inviteeProfile) {
    const { data: existingMember } = await supabase
      .from('workspace_members')
      .select('id')
      .eq('workspace_id', workspace_id)
      .eq('user_id', inviteeProfile.id)
      .maybeSingle();

    if (existingMember) {
      return NextResponse.json({ error: 'This user is already a member of this workspace.' }, { status: 409 });
    }
  }

  // 5. Insert into workspace_invites
  const token = uuidv4();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // Invite expires in 7 days

  const { data: newInvite, error: inviteError } = await supabase
    .from('workspace_invites')
    .insert({
      workspace_id,
      invited_by_user_id,
      invitee_email,
      token,
      role: 'member', // Default role for now
      expires_at: expiresAt.toISOString(),
      status: 'pending',
    })
    .select('*')
    .single();

  if (inviteError) {
    console.error('Error creating workspace invite:', inviteError);
    return NextResponse.json({ error: inviteError.message }, { status: 500 });
  }

  // 6. Send Email (using Resend)
  try {
    const { data: workspaceData } = await supabase
      .from('workspaces')
      .select('name')
      .eq('id', workspace_id)
      .single();

    const workspaceName = workspaceData?.name || 'a workspace';

    const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/accept-invite?token=${token}`; // Ensure NEXT_PUBLIC_BASE_URL is set

    console.log('Resend: Attempting to send email...');
    console.log(`Resend: API Key (masked): ${process.env.RESEND_API_KEY?.substring(0, 5)}...`);
    console.log(`Resend: From: onboarding@resend.dev, To: ${invitee_email}`);
    console.log(`Resend: Subject: You're invited to join ${workspaceName} on Dilly!`);
    console.log(`Resend: Invite Link: ${inviteLink}`);

    const emailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev', // Replace with your verified Resend domain
      to: invitee_email,
      subject: `You're invited to join ${workspaceName} on Dilly!`,
      html: `
        <p>Hello,</p>
        <p>You've been invited to join <strong>${workspaceName}</strong> on Dilly by ${user.email}.</p>
        <p>Click the link below to accept the invitation:</p>
        <p><a href="${inviteLink}">${inviteLink}</a></p>
        <p>This invitation will expire in 7 days.</p>
        <p>Best regards,</p>
        <p>The Dilly Team</p>
      `,
    });
    console.log('Resend: Raw email send response:', emailResponse); // Log the full response

    if (emailResponse.error) {
      throw new Error(emailResponse.error.message);
    }

    console.log('Resend: Email sent successfully!');
  } catch (emailError: any) {
    console.error('Resend: Error sending invitation email:', emailError);
    // Optionally, delete the invite from DB if email sending fails
    // await supabase.from('workspace_invites').delete().eq('id', newInvite.id);
    return NextResponse.json({ error: 'Invitation created, but failed to send email.' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Invitation sent successfully!', invite: newInvite }, { status: 201 });
}
