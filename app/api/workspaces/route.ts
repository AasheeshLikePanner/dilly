// app/api/workspaces/route.ts
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: workspacesData, error: workspacesError } = await supabase
    .from('workspaces')
    .select('*')
    .eq('owner_id', user.id);

  if (workspacesError) {
    console.error('Error fetching workspaces:', workspacesError);
    return NextResponse.json({ error: workspacesError.message }, { status: 500 });
  }

  return NextResponse.json(workspacesData);
}
