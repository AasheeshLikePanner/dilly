import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const supabase = createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const bugId = searchParams.get('bug_id');

    if (!bugId) {
        return NextResponse.json({ error: 'bug_id is required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('bug_comments')
        .select(`
      *,
      profiles:author_id (
        id,
        email,
        full_name,
        avatar_url
      )
    `)
        .eq('bug_id', bugId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const supabase = createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { bug_id, workspace_id, content, parent_id } = body;

        if (!bug_id || !workspace_id || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('bug_comments')
            .insert({
                bug_id,
                workspace_id,
                content,
                author_id: user.id,
                parent_id: parent_id || null
            })
            .select(`
        *,
        profiles:author_id (
          id,
          email,
          full_name,
          avatar_url
        )
      `)
            .single();

        if (error) {
            console.error('Error creating comment:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
