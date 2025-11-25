import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const supabase = createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const workspaceId = searchParams.get('workspace_id');

    if (!workspaceId) {
        return NextResponse.json({ error: 'workspace_id is required' }, { status: 400 });
    }

    // 1. Status Distribution (Pie Chart)
    const { data: statusData, error: statusError } = await supabase
        .from('bugs')
        .select('status')
        .eq('workspace_id', workspaceId);

    if (statusError) {
        return NextResponse.json({ error: statusError.message }, { status: 500 });
    }

    const statusCounts: Record<string, number> = {};
    statusData.forEach(bug => {
        statusCounts[bug.status] = (statusCounts[bug.status] || 0) + 1;
    });

    const statusColors: Record<string, string> = {
        open: 'var(--status-blue)',
        in_progress: 'var(--status-orange)',
        done: 'var(--status-green)',
        closed: 'var(--muted-foreground)',
        blocked: 'var(--status-red)',
        triage: 'var(--chart-1)',
        todo: 'var(--chart-2)',
        review: 'var(--chart-3)',
        testing: 'var(--chart-4)',
        ready_for_deploy: 'var(--chart-5)',
        deployed: 'var(--status-green)',
        reopened: 'var(--status-orange)',
        archived: 'var(--muted)',
        qa_failed: 'var(--destructive)',
        qa_passed: 'var(--status-green)',
        needs_info: 'var(--chart-2)',
        other: 'var(--chart-5)'
    };

    const pieChartData = Object.entries(statusCounts).map(([status, count], index) => ({
        browser: status,
        visitors: count,
        fill: statusColors[status] || `var(--chart-${(index % 5) + 1})`,
    }));

    // 2. Priority Distribution (Bar Chart)
    const { data: priorityData, error: priorityError } = await supabase
        .from('bugs')
        .select('priority')
        .eq('workspace_id', workspaceId);

    if (priorityError) {
        return NextResponse.json({ error: priorityError.message }, { status: 500 });
    }

    const priorityCounts: Record<string, number> = {
        low: 0,
        medium: 0,
        high: 0,
        critical: 0
    };
    priorityData.forEach(bug => {
        if (priorityCounts[bug.priority] !== undefined) {
            priorityCounts[bug.priority]++;
        }
    });

    const barChartData = Object.entries(priorityCounts).map(([priority, count]) => ({
        month: priority, // Using 'month' to match existing component
        desktop: count,  // Using 'desktop' to match existing component
    }));

    // 3. Activity Over Time (Area Chart) - Last 30 Days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: activityData, error: activityError } = await supabase
        .from('bugs')
        .select('created_at')
        .eq('workspace_id', workspaceId)
        .gte('created_at', thirtyDaysAgo.toISOString());

    if (activityError) {
        return NextResponse.json({ error: activityError.message }, { status: 500 });
    }

    const activityCounts: Record<string, number> = {};
    // Initialize last 30 days with 0
    for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0]; // YYYY-MM-DD
        activityCounts[key] = 0;
    }

    activityData.forEach(bug => {
        const key = new Date(bug.created_at).toISOString().split('T')[0];
        if (activityCounts[key] !== undefined) {
            activityCounts[key]++;
        }
    });

    const areaChartData = Object.entries(activityCounts)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([date, count]) => {
            const d = new Date(date);
            return {
                month: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                mobile: count
            };
        });

    return NextResponse.json({
        pieChartData,
        barChartData,
        areaChartData
    });
}
