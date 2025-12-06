import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { validateApiKey } from '@/lib/cache/api-keys';
import { getWorkspaceById } from '@/lib/cache/workspace';

export async function GET(request: Request) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const workspaceId = searchParams.get('workspace_id');
  const status = searchParams.get('status');
  const priority = searchParams.get('priority');
  const type = searchParams.get('type');
  const start_date = searchParams.get('start_date');
  const end_date = searchParams.get('end_date');
  const assignee = searchParams.get('assignee');
  const id = searchParams.get('id');

  if (!workspaceId) {
    return NextResponse.json({ error: 'workspace_id is required' }, { status: 400 });
  }

  let query = supabase.from('bugs').select('*, profiles!bugs_assigned_to_fkey(email, full_name)').eq('workspace_id', workspaceId);

  if (status) {
    query = query.eq('status', status);
  }
  if (priority) {
    query = query.eq('priority', priority);
  }
  if (type) {
    query = query.eq('type', type);
  }
  if (start_date) {
    query = query.gte('created_at', start_date);
  }
  if (end_date) {
    query = query.lte('created_at', end_date);
  }
  if (id) {
    query = query.eq('id', id);
  }

  // Filter by assignee
  if (assignee === 'me') {
    query = query.eq('assigned_to', user.id);
  } else if (assignee === 'unassigned') {
    query = query.is('assigned_to', null);
  } else if (assignee && assignee !== 'all') {
    // Filter by specific member ID
    query = query.eq('assigned_to', assignee);
  }
  // If assignee is 'all' or not provided, no filtering is applied


  const search = searchParams.get('search');
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }

  const { data, error } = await query.order('updated_at', { ascending: false }).order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching bugs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();

  // 1. Extract API Key from headers
  const apiKeyHeader = request.headers.get('x-api-key');
  if (!apiKeyHeader) {
    return NextResponse.json({ error: 'API Key is required' }, { status: 401 });
  }

  // 2. Parse the API Key
  const parts = apiKeyHeader.split(/[_.]/);
  if (parts.length !== 4 || parts[0] !== 'ak' || parts[1] !== 'live') {
    return NextResponse.json({ error: 'Invalid API Key format' }, { status: 403 });
  }
  const publicId = parts[2];
  const secret = parts[3];

  // 3. Validate API Key using cache
  const validApiKey = await validateApiKey(publicId, secret);

  if (!validApiKey) {
    return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
  }

  // 4. Validate Origin
  const origin = request.headers.get('origin') || request.headers.get('referer');

  if (!origin) {
    return NextResponse.json({ error: 'Origin header is required' }, { status: 403 });
  }

  // Extract bug details from request body
  const {
    workspace_id: payload_workspace_id, // Rename to avoid conflict
    title,
    description,
    type,
    priority,
    status,
    media,
    tags,
  } = await request.json();

  let final_workspace_id = payload_workspace_id;

  // If API key is tied to a specific workspace, and payload doesn't provide one, use API key's workspace_id
  if (!final_workspace_id && validApiKey.workspace_id) {
    final_workspace_id = validApiKey.workspace_id;
  }

  // If API key is tied to a specific workspace, and payload provides a different one, return error
  if (validApiKey.workspace_id && payload_workspace_id && validApiKey.workspace_id !== payload_workspace_id) {
    return NextResponse.json({ error: 'API Key is restricted to a different workspace' }, { status: 403 });
  }

  // Basic validation for required fields
  if (!final_workspace_id || !title || !type || !priority || !status) {
    return NextResponse.json({ error: 'Missing required bug fields (workspace_id, title, type, priority, status)' }, { status: 400 });
  }

  // Fetch workspace's allowed origins using cache
  const workspace = await getWorkspaceById(final_workspace_id);

  if (!workspace) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
  }

  const allowedOrigins = workspace.allowed_origins || [];

  // Only validate if allowed_origins is configured (opt-in security)
  if (allowedOrigins.length > 0) {
    // Normalize origin (remove trailing slash)
    const normalizedOrigin = origin.replace(/\/$/, '');
    const normalizedAllowedOrigins = allowedOrigins.map((o: string) => o.replace(/\/$/, ''));

    if (!normalizedAllowedOrigins.includes(normalizedOrigin)) {
      console.log(`Origin ${normalizedOrigin} not in allowed list:`, normalizedAllowedOrigins);
      return NextResponse.json({
        error: 'Origin not allowed. Please add this domain to your workspace\'s allowed origins in settings.'
      }, { status: 403 });
    }
  }

  // 5. Insert into public.bugs table
  const { data: newBug, error: dbError } = await supabase
    .from('bugs')
    .insert({
      workspace_id: final_workspace_id,
      title,
      description,
      type,
      priority,
      status,
      media: media || [],
      tags: tags || [],
      // created_by_id, created_by_email, created_by_username, created_by_name are null as per requirement
    })
    .select('*')
    .single();

  if (dbError) {
    console.error('Error creating bug:', dbError);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json(newBug, { status: 201 });
}

export async function PUT(request: Request) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { id, last_updated_at, ...updates } = body;
  if (!id) {
    return NextResponse.json({ error: 'Bug ID is required' }, { status: 400 });
  }

  // Validate fields if present
  if (updates.priority && !['low', 'medium', 'high', 'critical'].includes(updates.priority)) {
    return NextResponse.json({ error: 'Invalid priority' }, { status: 400 });
  }
  if (updates.status && !['open', 'triage', 'todo', 'in_progress', 'blocked', 'needs_info', 'testing', 'qa_failed', 'qa_passed', 'review', 'ready_for_deploy', 'deployed', 'done', 'closed', 'reopened', 'archived'].includes(updates.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  if (updates.type && !['bug', 'feature', 'ui', 'performance', 'security', 'other'].includes(updates.type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }
  const { data: oldBug, error: fetchOldError } = await supabase
    .from("bugs")
    .select("*")
    .eq("id", id)
    .single();

  const isAssignedChanges = updates.assigned_to && updates.assigned_to !== user.id && updates.assigned_to !== oldBug.assigned_to;

  if (isAssignedChanges) {
    const { error } = await supabase.from('notifications')
      .insert({
        user_id: updates.assigned_to,
        actor_id: user.id,
        bug_id: id,
        event_type: 'assigned',
        workspace_id: oldBug.workspace_id,
      })
    if (error) {
      console.error('Error creating notification:', error);
      return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
    }
  }

  if (fetchOldError || !oldBug) {
    console.error("Error fetching current bug:", fetchOldError);
    return NextResponse.json({ error: "Failed to fetch current bug" }, { status: 500 });
  }
  // Optimistic Locking Check
  if (last_updated_at) {
    const { data: currentBug, error: fetchError } = await supabase
      .from('bugs')
      .select('updated_at')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching bug for version check:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch bug for version check' }, { status: 500 });
    }

    if (currentBug && currentBug.updated_at !== last_updated_at) {
      return NextResponse.json({ error: 'Conflict: The bug has been modified by another user. Please refresh and try again.' }, { status: 409 });
    }
  }
  const allowedFields = ["title", "description", "priority", "status", "type", "assigned_to", "tags", "media"];
  const changes: Record<string, any> = {};

  for (const field of allowedFields) {
    if (field in updates && JSON.stringify(oldBug[field]) !== JSON.stringify(updates[field])) {
      changes[field] = {
        old: oldBug[field],
        new: updates[field],
      };
    }
  }

  if (Object.keys(changes).length === 0) {
    return NextResponse.json(oldBug);
  }

  // Update the bug
  const { data: updatedBug, error } = await supabase
    .from('bugs')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*, profiles!bugs_assigned_to_fkey(email, full_name)')
    .single();
  if (error) {
    console.error('Error updating bug:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: updateBugEvent, error: updateBugEventError } = await supabase
    .from('bug_events')
    .insert(
      {
        bug_id: updatedBug.id,
        actor_id: user.id,
        event_type: "fields_updated",
        metadata: { ...changes },
      }
    )
  if (updateBugEventError) {
    console.error('Error updating bug event:', updateBugEventError);
    return NextResponse.json({ error: updateBugEventError.message }, { status: 500 });
  }

  return NextResponse.json(updatedBug);
}

export async function DELETE(request: Request) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Bug ID is required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('bugs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting bug:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function OPTIONS(request: Request) {
  return NextResponse.json({}, { status: 200 });
}
