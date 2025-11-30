import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

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

    const { data: assignedToUserBugs } = await supabase
        .from('bugs')
        .select('*')
        .eq('workspace_id', workspaceId)
        .eq('assigned_to', user.id)
        .neq('status', 'done')
        .order('updated_at', { ascending: false })
        .limit(10);

    const { count: assignedToUserCount } = await supabase
        .from('bugs')
        .select('*', { count: 'exact', head: true })
        .eq('workspace_id', workspaceId)
        .eq('assigned_to', user.id)
        .neq('status', 'done');

    const { count: recentlyCreatedCount } = await supabase
        .from('bugs')
        .select('*', { count: 'exact', head: true })
        .eq('workspace_id', workspaceId);

    const { data: unAssignedBugs } = await supabase
        .from('bugs')
        .select('*')
        .eq('workspace_id', workspaceId)
        .is('assigned_to', null)
        .order('created_at', { ascending: false })
        .limit(10);

    const { count: unAssignedBugsCount } = await supabase
        .from('bugs')
        .select('*', { count: 'exact', head: true })
        .eq('workspace_id', workspaceId)
        .is('assigned_to', null);

    const { count: todoCount } = await supabase
        .from('bugs')
        .select('*', { count: 'exact', head: true })
        .eq('workspace_id', workspaceId)
        .eq('status', 'todo');

    const { count: inProgressCount } = await supabase
        .from('bugs')
        .select('*', { count: 'exact', head: true })
        .eq('workspace_id', workspaceId)
        .eq('status', 'in_progress');

    const { count: qaFailedCount } = await supabase
        .from('bugs')
        .select('*', { count: 'exact', head: true })
        .eq('workspace_id', workspaceId)
        .eq('status', 'qa_failed');

    const { count: criticalCount } = await supabase
        .from('bugs')
        .select('*', { count: 'exact', head: true })
        .eq('workspace_id', workspaceId)
        .eq('priority', 'critical');

    const { data: recentActivity } = await supabase
        .from('bugs')
        .select('id, title, status, priority, updated_at, created_by, type')
        .eq('workspace_id', workspaceId)
        .order('updated_at', { ascending: false })
        .limit(10);

    // Calculate weekly throughput (last 7 days)
    const weeklyThroughput = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const startOfDay = new Date(date.setHours(0, 0, 0, 0)).toISOString();
        const endOfDay = new Date(date.setHours(23, 59, 59, 999)).toISOString();

        const { count: openedCount } = await supabase
            .from('bugs')
            .select('*', { count: 'exact', head: true })
            .eq('workspace_id', workspaceId)
            .gte('created_at', startOfDay)
            .lte('created_at', endOfDay);

        const { count: closedCount } = await supabase
            .from('bugs')
            .select('*', { count: 'exact', head: true })
            .eq('workspace_id', workspaceId)
            .eq('status', 'done')
            .gte('updated_at', startOfDay)
            .lte('updated_at', endOfDay);

        weeklyThroughput.push({
            name: days[date.getDay()],
            open: openedCount || 0,
            closed: closedCount || 0
        });
    }

    return NextResponse.json({
        assignedToUserBugs: assignedToUserBugs || [],
        assignedToUserCount: assignedToUserCount || 0,
        recentlyCreatedCount: recentlyCreatedCount || 0,
        unAssignedBugs: unAssignedBugs || [],
        unAssignedBugsCount: unAssignedBugsCount || 0,
        todoCount: todoCount || 0,
        inProgressCount: inProgressCount || 0,
        qaFailedCount: qaFailedCount || 0,
        criticalCount: criticalCount || 0,
        recentActivity: recentActivity || [],
        weeklyThroughput: weeklyThroughput
    });
}