import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  console.log('GET /api/feedback: Received request');
  const supabase = createSupabaseServerClient();

  console.log('GET /api/feedback: Authenticating user...');
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.log('GET /api/feedback: User not authenticated. Returning 401.');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  console.log(`GET /api/feedback: User authenticated: ${user.id}`);

  const { searchParams } = new URL(request.url);
  const workspaceId = searchParams.get('workspace_id');
  console.log(`GET /api/feedback: Parsed workspace_id: ${workspaceId}`);

  const type = searchParams.get('type');
  const rating_gte = searchParams.get('rating_gte');
  const rating_lte = searchParams.get('rating_lte');
  const source = searchParams.get('source');
  const start_date = searchParams.get('start_date');
  const end_date = searchParams.get('end_date');
  const search = searchParams.get('search');
  const created_by = searchParams.get('created_by');

  if (!workspaceId) {
    console.log('GET /api/feedback: workspace_id is required. Returning 400.');
    return NextResponse.json({ error: 'workspace_id is required' }, { status: 400 });
  }

  console.log('GET /api/feedback: Building database query...');
  let query = supabase.from('feedback').select('*').eq('workspace_id', workspaceId);

  if (type) {
    query = query.eq('type', type);
  }
  if (rating_gte) {
    query = query.gte('rating', parseInt(rating_gte, 10));
  }
  if (rating_lte) {
    query = query.lte('rating', parseInt(rating_lte, 10));
  }
  if (source) {
    query = query.eq('source', source);
  }
  if (start_date) {
    query = query.gte('created_at', start_date);
  }
  if (end_date) {
    query = query.lte('created_at', end_date);
  }
  if (created_by) {
    query = query.eq('created_by', created_by);
  }
  if (search) {
    // Search across multiple columns using OR syntax
    // Note: Supabase/PostgREST 'or' syntax: column.operator.value,column.operator.value
    // We want: comment.ilike.%search% OR context.ilike.%search% OR component_name.ilike.%search%
    const searchPattern = `%${search}%`;
    query = query.or(`comment.ilike.${searchPattern},context.ilike.${searchPattern},component_name.ilike.${searchPattern},component_variant.ilike.${searchPattern}`);
  }

  console.log('GET /api/feedback: Executing query...');
  const { data, error } = await query;

  if (error) {
    console.error('GET /api/feedback: Error fetching feedback:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log(`GET /api/feedback: Query successful. Returning ${data.length} items.`);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  console.log('POST /api/feedback: Received request');
  const supabase = createSupabaseServerClient();

  // 1. Extract and validate API Key
  console.log('POST /api/feedback: Validating API key...');
  const apiKeyHeader = request.headers.get('x-api-key');
  if (!apiKeyHeader) {
    return NextResponse.json({ error: 'API Key is required' }, { status: 401 });
  }
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
    console.log('POST /api/feedback: API key validated successfully.');
  } catch (error) {
    console.error('POST /api/feedback: API Key validation exception:', error);
    return NextResponse.json({ error: 'Internal server error during API key validation' }, { status: 500 });
  }

  // 4. Validate Origin
  console.log('POST /api/feedback: Validating origin...');
  const origin = request.headers.get('origin') || request.headers.get('referer');

  if (!origin) {
    return NextResponse.json({ error: 'Origin header is required' }, { status: 403 });
  }

  // Extract feedback details from request body
  const body = await request.json();
  console.log('POST /api/feedback: Parsed request body:', body);

  let final_workspace_id = body.workspace_id;

  // If API key is tied to a specific workspace, and payload doesn't provide one, use API key's workspace_id
  if (!final_workspace_id && validApiKey.workspace_id) {
    final_workspace_id = validApiKey.workspace_id;
  }

  // If API key is tied to a specific workspace, and payload provides a different one, return error
  if (validApiKey.workspace_id && body.workspace_id && validApiKey.workspace_id !== body.workspace_id) {
    return NextResponse.json({ error: 'API Key is restricted to a different workspace' }, { status: 403 });
  }

  // Basic validation for required fields
  if (!final_workspace_id || !body.type) {
    return NextResponse.json({ error: 'Missing required feedback fields (workspace_id, type)' }, { status: 400 });
  }
  console.log(`POST /api/feedback: Using final workspace_id: ${final_workspace_id}`);

  // Fetch workspace's allowed origins
  const { data: workspace, error: workspaceError } = await supabase
    .from('workspaces')
    .select('allowed_origins')
    .eq('id', final_workspace_id)
    .single();

  if (workspaceError) {
    console.error('POST /api/feedback: Error fetching workspace:', workspaceError);
    return NextResponse.json({ error: 'Failed to validate workspace' }, { status: 500 });
  }

  const allowedOrigins = workspace.allowed_origins || [];

  // Only validate if allowed_origins is configured (opt-in security)
  if (allowedOrigins.length > 0) {
    // Normalize origin (remove trailing slash)
    const normalizedOrigin = origin.replace(/\/$/, '');
    const normalizedAllowedOrigins = allowedOrigins.map((o: string) => o.replace(/\/$/, ''));

    if (!normalizedAllowedOrigins.includes(normalizedOrigin)) {
      console.log(`POST /api/feedback: Origin ${normalizedOrigin} not in allowed list:`, normalizedAllowedOrigins);
      return NextResponse.json({
        error: 'Origin not allowed. Please add this domain to your workspace\'s allowed origins in settings.'
      }, { status: 403 });
    }
    console.log('POST /api/feedback: Origin validated successfully.');
  } else {
    console.log('POST /api/feedback: No allowed origins configured, skipping validation.');
  }

  // 5. Insert into public.feedback table
  const feedbackData = {
    workspace_id: final_workspace_id,
    type: body.type,
    rating: body.rating,
    comment: body.comment,
    emoji: body.emoji,
    source: body.source,
    metadata: body.metadata,
    created_by: validApiKey.user_id,
    component_name: body.component_name,
    component_variant: body.component_variant,
    context: body.context,
  };
  console.log('POST /api/feedback: Inserting data into Supabase:', feedbackData);
  const { data: newFeedback, error: dbError } = await supabase
    .from('feedback')
    .insert(feedbackData)
    .select('*')
    .single();

  // 5. Handle response
  if (dbError) {
    console.error('POST /api/feedback: Error creating feedback:', dbError);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  console.log('POST /api/feedback: Insert successful. Returning new feedback:', newFeedback);
  return NextResponse.json(newFeedback, { status: 201 });
}

export async function OPTIONS(request: Request) {
  return NextResponse.json({}, { status: 200 });
}
