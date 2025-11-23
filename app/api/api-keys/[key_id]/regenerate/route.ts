// app/api/api-keys/[key_id]/regenerate/route.ts
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export async function POST(request: Request, context: { params: Promise<{ key_id: string }> }) {
  const supabase = createSupabaseServerClient();
  const resolvedParams = await context.params;
  const { key_id } = resolvedParams;

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Optional: Verify password if the key has one
  const { password } = await request.json();
  if (password) {
    const { data: keyData, error: fetchError } = await supabase
      .from('api_keys')
      .select('hashed_password')
      .eq('id', key_id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !keyData || !keyData.hashed_password) {
      return NextResponse.json({ error: 'API key not found or no password set' }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, keyData.hashed_password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 403 });
    }
  }

  const newApiKey = uuidv4(); // Generate a new unhashed API key
  const hashedKey = await bcrypt.hash(newApiKey, 10); // Hash the new API key

  const { error: dbError } = await supabase
    .from('api_keys')
    .update({ hashed_key: hashedKey, updated_at: new Date().toISOString(), is_active: true }) // Also reactivate if it was revoked
    .eq('id', key_id)
    .eq('user_id', user.id); // Ensure user can only regenerate their own keys

  if (dbError) {
    console.error('Error regenerating API key:', dbError);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  // Return the new unhashed API key ONCE
  return NextResponse.json({ message: 'API key regenerated successfully', api_key: newApiKey });
}
