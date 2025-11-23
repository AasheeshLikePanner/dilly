// app/api/api-keys/route.ts
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid'; // For generating API keys
import bcrypt from 'bcryptjs'; // For hashing keys and passwords

// GET: List API Keys
export async function GET() {
  const supabase = createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: apiKeys, error: dbError } = await supabase
    .from('api_keys')
    .select('id, name, last_used_at, created_at, updated_at, expires_at, rate_limit_per_minute, is_active')
    .eq('user_id', user.id);

  if (dbError) {
    console.error('Error fetching API keys:', dbError);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json(apiKeys);
}

// POST: Create New API Key
export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, expires_at, rate_limit_per_minute, workspace_id } = await request.json();

  if (!name) {
    return NextResponse.json({ error: 'API key name is required' }, { status: 400 });
  }

  // Generate API key parts
  const publicId = uuidv4().replace(/-/g, '').slice(0, 24); // Using uuidv4 for publicId
  const secret = uuidv4().replace(/-/g, '').slice(0, 32); // Using uuidv4 for secret

  // Hash the secret
  const secretHash = await bcrypt.hash(secret, 10);

  const { data, error: dbError } = await supabase
    .from('api_keys')
    .insert({
      user_id: user.id,
      name,
      public_id: publicId,
      secret_hash: secretHash,
      expires_at,
      rate_limit_per_minute,
      workspace_id: workspace_id || null, // Include workspace_id, allow null
    })
    .select('id, name, created_at') // Select minimal data to return
    .single();

  if (dbError) {
    console.error('Error creating API key:', dbError);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  // Return the full unhashed API key ONCE
  const fullApiKey = `ak_live_${publicId}.${secret}`;
  return NextResponse.json({ ...data, api_key: fullApiKey });
}
