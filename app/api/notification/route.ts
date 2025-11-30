import { NextResponse } from "next/server";
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(req: Request) {
    const supabase = createSupabaseServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get('workspace_id');

    if (!workspaceId) {
        return NextResponse.json({ error: 'workspace_id is required' }, { status: 400 });
    }

    const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .eq('workspace_id', workspaceId)
        .eq('user_id', user.id)
        .eq('read', false)
        .order('created_at', { ascending: false })
        .limit(10);

    const { count: notificationsCount } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('workspace_id', workspaceId)
        .eq('user_id', user.id)
        .eq('read', false);

    return NextResponse.json({
        notifications: notifications || [],
        notificationsCount: notificationsCount || 0
    });
}

export async function POST(req: Request) {
    const supabase = createSupabaseServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get('workspace_id');

    if (!workspaceId) {
        return NextResponse.json({ error: 'workspace_id is required' }, { status: 400 });
    }

    await supabase
        .from('notifications')
        .update({ read: true })
        .eq('workspace_id', workspaceId)
        .eq('user_id', user.id);

    return NextResponse.json({
        message: "all notification read"
    })
}

