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

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, description, slug, logo_url } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    // Create workspace
    const { data: workspace, error: workspaceError } = await supabase
      .from('workspaces')
      .insert({
        name,
        description,
        slug,
        logo_url,
        owner_id: user.id,
      })
      .select()
      .single();

    if (workspaceError) {
      console.error('Error creating workspace:', workspaceError);
      return NextResponse.json({ error: workspaceError.message }, { status: 500 });
    }

    // Add owner as member
    const { error: memberError } = await supabase
      .from('workspace_members')
      .insert({
        user_id: user.id,
        workspace_id: workspace.id,
        role: 'owner',
        status: 'active',
      });

    if (memberError) {
      console.error('Error adding owner as member:', memberError);
      // Don't fail the request, workspace is already created
    }

    return NextResponse.json(workspace, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/workspaces:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
