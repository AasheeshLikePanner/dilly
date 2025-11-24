import { createClient } from '@supabase/supabase-js';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id: feedbackId } = await context.params;

  // 1. Authenticate the user
  const supabaseUserClient = createSupabaseServerClient();
  const { data: { user } } = await supabaseUserClient.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Check if the user is a member of the workspace associated with the feedback
  // This is an important security check.
  const { data: feedback, error: fetchError } = await supabaseUserClient
    .from('feedback')
    .select('workspace_id')
    .eq('id', feedbackId)
    .single();

  if (fetchError || !feedback) {
    return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
  }

  const { data: member } = await supabaseUserClient
    .from('workspace_members')
    .select('user_id')
    .eq('user_id', user.id)
    .eq('workspace_id', feedback.workspace_id)
    .maybeSingle();

  if (!member) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 3. Use the admin client to perform the deletion
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error: deleteError } = await supabaseAdmin
    .from('feedback')
    .delete()
    .eq('id', feedbackId);

  if (deleteError) {
    console.error('Error deleting feedback:', deleteError);
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return new Response(null, { status: 204 }); // 204 No Content is standard for successful DELETE
}
