import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createSupabaseServerClient();
  const { id } = await params;

  // We don't strictly enforce user ownership here to allow sharing links if needed, 
  // but typically you'd want to check if the user has access. 
  // For now, we'll fetch it if it exists.

  const { data: bug, error } = await supabase
    .from('bugs')
    .select(`
      *,
      workspaces (
        name,
        slug
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(bug);
}
