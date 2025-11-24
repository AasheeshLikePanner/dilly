import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

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

  const { data, error } = await query;

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

  // 3. Validate API Key
  let validApiKey = null;
  try {
    const { data: key, error: dbError } = await supabase
      .from('api_keys')
      .select('id, user_id, is_active, expires_at, secret_hash, workspace_id')
      .eq('public_id', publicId)
      .eq('is_active', true) // Only consider active keys
      .maybeSingle();

    if (dbError) {
      console.error('Error fetching API key for validation:', dbError);
      return NextResponse.json({ error: 'Internal server error during API key validation' }, { status: 500 });
    }

    if (!key) {
      return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    }

    // Check expiration
    if (key.expires_at && new Date(key.expires_at) < new Date()) {
      return NextResponse.json({ error: 'API Key has expired' }, { status: 403 });
    }

    // Compare the secret part
    const isMatch = await bcrypt.compare(secret, key.secret_hash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    }

    validApiKey = key;

  } catch (error) {
    console.error('API Key validation failed:', error);
    return NextResponse.json({ error: 'Internal server error during API key validation' }, { status: 500 });
  }

  // 4. Extract bug details from request body
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
