// app/api/api-keys/[key_id]/route.ts
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, { params }: { params: { key_id: string } }) {
  const supabase = createSupabaseServerClient();
  const resolvedParams = await params;
  const { key_id } = resolvedParams;

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Perform a hard delete
  const { error: dbError } = await supabase
    .from('api_keys')
    .delete()
    .eq('id', key_id)
    .eq('user_id', user.id); // Ensure user can only delete their own keys

  if (dbError) {
    console.error('Error deleting API key:', dbError);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'API key deleted successfully' });
}
