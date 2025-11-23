// app/api/api-keys/[key_id]/unlock/route.ts
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request, { params }: { params: { key_id: string } }) {
  const supabase = createSupabaseServerClient();
  const resolvedParams = await params;
  const { key_id } = resolvedParams;

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { password } = await request.json();

  if (!password) {
    return NextResponse.json({ error: 'Password is required' }, { status: 400 });
  }

  const { data: keyData, error: dbError } = await supabase
    .from('api_keys')
    .select('hashed_password')
    .eq('id', key_id)
    .eq('user_id', user.id)
    .single();

  if (dbError || !keyData) {
    console.error('Error fetching API key:', dbError);
    return NextResponse.json({ error: 'API key not found' }, { status: 404 });
  }

  if (!keyData.hashed_password) {
    return NextResponse.json({ error: 'No password set for this API key' }, { status: 400 });
  }

  const passwordMatch = await bcrypt.compare(password, keyData.hashed_password);

  if (!passwordMatch) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 403 });
  }

  // If password matches, return success. The client can then proceed to view metadata.
  return NextResponse.json({ message: 'Password verified successfully' });
}
