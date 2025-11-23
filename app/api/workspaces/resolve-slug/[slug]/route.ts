import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: { slug: string } }) {
  const supabase = createSupabaseServerClient();
  const { slug } = await context.params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const { data: workspace, error: dbError } = await supabase
    .from('workspaces')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (dbError) {
    console.error('Error resolving workspace slug:', dbError);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  if (!workspace) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
  }

  return NextResponse.json({ workspace_id: workspace.id });
}
