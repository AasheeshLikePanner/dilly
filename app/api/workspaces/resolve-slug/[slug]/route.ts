import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { getWorkspaceBySlug } from '@/lib/cache/workspace';

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const workspace = await getWorkspaceBySlug(slug);

  if (!workspace) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
  }

  return NextResponse.json({ workspace_id: workspace.id });
}
