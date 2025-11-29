import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

// GET /api/workspaces/:id/origins - List allowed origins
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id: workspaceId } = await context.params;
    const supabase = createSupabaseServerClient();

    // Authenticate user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user is a member of the workspace
    const { data: membership, error: membershipError } = await supabase
        .from('workspace_members')
        .select('role')
        .eq('workspace_id', workspaceId)
        .eq('user_id', user.id)
        .maybeSingle();

    if (membershipError || !membership) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Fetch workspace's allowed origins
    const { data: workspace, error: workspaceError } = await supabase
        .from('workspaces')
        .select('allowed_origins')
        .eq('id', workspaceId)
        .single();

    if (workspaceError) {
        console.error('Error fetching workspace origins:', workspaceError);
        return NextResponse.json({ error: workspaceError.message }, { status: 500 });
    }

    return NextResponse.json({ origins: workspace.allowed_origins || [] });
}

// POST /api/workspaces/:id/origins - Add a new origin
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id: workspaceId } = await context.params;
    const supabase = createSupabaseServerClient();

    // Authenticate user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user is an admin or owner of the workspace
    const { data: membership, error: membershipError } = await supabase
        .from('workspace_members')
        .select('role')
        .eq('workspace_id', workspaceId)
        .eq('user_id', user.id)
        .maybeSingle();

    if (membershipError || !membership) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    if (!['owner', 'admin'].includes(membership.role)) {
        return NextResponse.json({ error: 'Only owners and admins can manage origins' }, { status: 403 });
    }

    // Parse request body
    const body = await request.json();
    const { origin } = body;

    if (!origin || typeof origin !== 'string') {
        return NextResponse.json({ error: 'Origin is required and must be a string' }, { status: 400 });
    }

    // Validate origin format
    try {
        const url = new URL(origin);
        if (!['http:', 'https:'].includes(url.protocol)) {
            return NextResponse.json({ error: 'Only HTTP and HTTPS protocols are allowed' }, { status: 400 });
        }
    } catch {
        return NextResponse.json({ error: 'Invalid origin URL format' }, { status: 400 });
    }

    // Fetch current origins
    const { data: workspace, error: fetchError } = await supabase
        .from('workspaces')
        .select('allowed_origins')
        .eq('id', workspaceId)
        .single();

    if (fetchError) {
        console.error('Error fetching workspace:', fetchError);
        return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    const currentOrigins = workspace.allowed_origins || [];

    // Check if origin already exists
    if (currentOrigins.includes(origin)) {
        return NextResponse.json({ error: 'Origin already exists' }, { status: 400 });
    }

    // Add new origin
    const updatedOrigins = [...currentOrigins, origin];

    const { error: updateError } = await supabase
        .from('workspaces')
        .update({ allowed_origins: updatedOrigins })
        .eq('id', workspaceId);

    if (updateError) {
        console.error('Error updating origins:', updateError);
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ origins: updatedOrigins }, { status: 201 });
}

// DELETE /api/workspaces/:id/origins - Remove an origin
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id: workspaceId } = await context.params;
    const supabase = createSupabaseServerClient();

    // Authenticate user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user is an admin or owner of the workspace
    const { data: membership, error: membershipError } = await supabase
        .from('workspace_members')
        .select('role')
        .eq('workspace_id', workspaceId)
        .eq('user_id', user.id)
        .maybeSingle();

    if (membershipError || !membership) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    if (!['owner', 'admin'].includes(membership.role)) {
        return NextResponse.json({ error: 'Only owners and admins can manage origins' }, { status: 403 });
    }

    // Parse request body
    const body = await request.json();
    const { origin } = body;

    if (!origin || typeof origin !== 'string') {
        return NextResponse.json({ error: 'Origin is required and must be a string' }, { status: 400 });
    }

    // Fetch current origins
    const { data: workspace, error: fetchError } = await supabase
        .from('workspaces')
        .select('allowed_origins')
        .eq('id', workspaceId)
        .single();

    if (fetchError) {
        console.error('Error fetching workspace:', fetchError);
        return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    const currentOrigins = workspace.allowed_origins || [];

    // Remove origin
    const updatedOrigins = currentOrigins.filter((o: string) => o !== origin);

    if (updatedOrigins.length === currentOrigins.length) {
        return NextResponse.json({ error: 'Origin not found' }, { status: 404 });
    }

    const { error: updateError } = await supabase
        .from('workspaces')
        .update({ allowed_origins: updatedOrigins })
        .eq('id', workspaceId);

    if (updateError) {
        console.error('Error updating origins:', updateError);
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ origins: updatedOrigins });
}
