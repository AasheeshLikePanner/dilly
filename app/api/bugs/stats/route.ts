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
    const dateRange = searchParams.get('range') || '1m'; // 1d, 7d, 1m, max
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    if (!workspaceId) {
        return NextResponse.json({ error: 'workspace_id is required' }, { status: 400 });
    }

    // Calculate date range
    let filterStartDate: Date;
    const filterEndDate = new Date();

    if (startDate && endDate) {
        // Custom date range
        filterStartDate = new Date(startDate);
        // Set end date to end of day if it's just a date string
        if (endDate.length === 10) { // YYYY-MM-DD
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            filterEndDate.setTime(end.getTime());
        } else {
            filterEndDate.setTime(new Date(endDate).getTime());
        }
    } else {
        // Preset ranges
        switch (dateRange) {
            case '1d':
                filterStartDate = new Date();
                filterStartDate.setDate(filterStartDate.getDate() - 1);
                break;
            case '7d':
                filterStartDate = new Date();
                filterStartDate.setDate(filterStartDate.getDate() - 7);
                break;
            case '1m':
                filterStartDate = new Date();
                filterStartDate.setMonth(filterStartDate.getMonth() - 1);
                break;
            case 'max':
            default:
                filterStartDate = new Date(0); // Beginning of time
                break;
        }
    }

    // Helper to apply date filter
    const applyDateFilter = (query: any) => {
        return query
            .gte('created_at', filterStartDate.toISOString())
            .lte('created_at', filterEndDate.toISOString());
    };

    // 1. Status Distribution (Pie Chart)
    const { data: statusData, error: statusError } = await applyDateFilter(supabase
        .from('bugs')
        .select('status')
        .eq('workspace_id', workspaceId));

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
    const { data: priorityData, error: priorityError } = await applyDateFilter(supabase
        .from('bugs')
        .select('priority')
        .eq('workspace_id', workspaceId));

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

    // 3. Activity Over Time (Area Chart)
    const { data: activityData, error: activityError } = await applyDateFilter(supabase
        .from('bugs')
        .select('created_at')
        .eq('workspace_id', workspaceId));

    if (activityError) {
        return NextResponse.json({ error: activityError.message }, { status: 500 });
    }

    const activityCounts: Record<string, number> = {};

    if (dateRange === '1d') {
        // Hourly buckets for 24h view
        for (let i = 0; i < 24; i++) {
            const d = new Date();
            d.setHours(d.getHours() - i);
            d.setMinutes(0, 0, 0); // Round down to hour
            const key = d.toISOString(); // Use full ISO string for sorting
            activityCounts[key] = 0;
        }

        activityData.forEach(bug => {
            const d = new Date(bug.created_at);
            d.setMinutes(0, 0, 0);
            const key = d.toISOString();
            // Find closest bucket (simple exact match for now as we rounded)
            if (activityCounts[key] !== undefined) {
                activityCounts[key]++;
            } else {
                // If exact match fails (e.g. slight drift), find closest key
                // But for simplicity, let's just use the hour part for matching if needed
                // Actually, let's just iterate keys and match hour
            }
        });

        // Re-bucket properly to avoid timezone issues with simple string matching
        // Let's use a simpler approach: Key = "HH:00"
        const hourlyCounts: Record<string, number> = {};
        const now = new Date();
        const hours = [];

        for (let i = 23; i >= 0; i--) {
            const d = new Date(now);
            d.setHours(d.getHours() - i);
            const label = d.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
            hours.push({ label, timestamp: d.getTime() });
            hourlyCounts[label] = 0;
        }

        activityData.forEach(bug => {
            const bugTime = new Date(bug.created_at).getTime();
            // Find the hour bucket this bug belongs to
            const bucket = hours.find(h => Math.abs(h.timestamp - bugTime) < 3600000); // Within an hour roughly
            // Better: just match the hour label of the bug
            const label = new Date(bug.created_at).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
            // This is tricky because "3 PM" could be yesterday or today.
            // Let's stick to the 24h window check we already did with applyDateFilter
            if (hourlyCounts[label] !== undefined) {
                hourlyCounts[label]++;
            }
        });

        // Actually, let's do it the robust way:
        // 1. Create 24 buckets with specific timestamps
        // 2. Sort bugs into buckets
        const buckets = [];
        for (let i = 23; i >= 0; i--) {
            const d = new Date();
            d.setHours(d.getHours() - i);
            d.setMinutes(0, 0, 0);
            buckets.push({
                time: d.getTime(),
                label: d.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
                count: 0
            });
        }

        activityData.forEach(bug => {
            const bugTime = new Date(bug.created_at).getTime();
            // Find the closest bucket (within 30 mins before or after, or just same hour)
            // Since we round down buckets, bugTime should be >= bucketTime and < bucketTime + 1h
            const bucket = buckets.find(b => bugTime >= b.time && bugTime < b.time + 3600000);
            if (bucket) {
                bucket.count++;
            }
        });

        var areaChartData = buckets.map(b => ({
            month: b.label,
            mobile: b.count
        }));

    } else {
        // Daily buckets for other views
        // Initialize last 30 days (or 7 days) with 0
        const days = dateRange === '7d' ? 7 : 30; // Default to 30 for max/1m

        for (let i = 0; i < days; i++) {
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

        var areaChartData = Object.entries(activityCounts)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([date, count]) => {
                const d = new Date(date);
                return {
                    month: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    mobile: count
                };
            });
    }

    return NextResponse.json({
        pieChartData,
        barChartData,
        areaChartData
    });
}
