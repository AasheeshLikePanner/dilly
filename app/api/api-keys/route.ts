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

  const { name, password, expires_at, rate_limit_per_minute } = await request.json();

  if (!name) {
    return NextResponse.json({ error: 'API key name is required' }, { status: 400 });
  }

  const newApiKey = uuidv4(); // Generate a new unhashed API key
  const hashedKey = await bcrypt.hash(newApiKey, 10); // Hash the API key

  let hashedPassword = null;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10); // Hash the provided password
  }

  const { data, error: dbError } = await supabase
    .from('api_keys')
    .insert({
      user_id: user.id,
      name,
      hashed_key: hashedKey,
      hashed_password: hashedPassword,
      expires_at,
      rate_limit_per_minute,
    })
    .select('id, name, created_at') // Select minimal data to return
    .single();

  if (dbError) {
    console.error('Error creating API key:', dbError);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  // Return the unhashed API key ONCE
  return NextResponse.json({ ...data, api_key: newApiKey });
}
