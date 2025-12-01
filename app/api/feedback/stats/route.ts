import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    console.log('GET /api/feedback/stats: Received request');
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

    try {
        // Calculate date range
        let filterStartDate: Date;
        const filterEndDate = new Date();

        if (startDate && endDate) {
            // Custom date range
            filterStartDate = new Date(startDate);
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

        // Fetch feedback within date range
        const { data: feedbackData, error: feedbackError } = await supabase
            .from('feedback')
            .select('*')
            .eq('workspace_id', workspaceId)
            .gte('created_at', filterStartDate.toISOString())
            .lte('created_at', filterEndDate.toISOString())
            .order('created_at', { ascending: true });

        if (feedbackError) {
            console.error('Error fetching feedback:', feedbackError);
            return NextResponse.json({ error: feedbackError.message }, { status: 500 });
        }

        // 1. Rating Trend Over Time (Area Chart)
        const chartDataPoints = [];
        const dayInMs = 24 * 60 * 60 * 1000;

        // Determine start and end for the chart loop
        // If it's 'max' (beginning of time), we might want to cap the chart points or just show from the first feedback
        let chartStartDate = new Date(filterStartDate);
        const chartEndDate = new Date(filterEndDate);

        // If start date is epoch (max), find the actual first feedback date or default to 30 days ago if no data
        if (dateRange === 'max' && feedbackData.length > 0) {
            const firstFeedback = feedbackData[0]; // Ordered by created_at asc
            chartStartDate = new Date(firstFeedback.created_at);
        } else if (dateRange === 'max') {
            chartStartDate = new Date();
            chartStartDate.setDate(chartStartDate.getDate() - 30);
        }

        // Generate array of dates between start and end
        for (let d = new Date(chartStartDate); d <= chartEndDate; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            chartDataPoints.push({
                dateObj: new Date(d),
                label: dateStr
            });
        }

        const ratingTrendMap = new Map<string, { total: number; count: number }>();

        feedbackData.forEach(item => {
            if (item.rating !== null) {
                const date = new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                const existing = ratingTrendMap.get(date) || { total: 0, count: 0 };
                ratingTrendMap.set(date, {
                    total: existing.total + item.rating,
                    count: existing.count + 1
                });
            }
        });

        // Calculate overall average for days with no data
        const allRatings = feedbackData.filter(f => f.rating !== null).map(f => f.rating!);
        const overallAvg = allRatings.length > 0
            ? allRatings.reduce((a, b) => a + b, 0) / allRatings.length
            : 0;

        const areaChartData = chartDataPoints.map(point => {
            const data = ratingTrendMap.get(point.label);
            return {
                month: point.label,
                mobile: data
                    ? Math.round((data.total / data.count) * 10) / 10
                    : Math.round(overallAvg * 10) / 10 // Use overall average for days with no data
            };
        });

        // 2. Component Variant Usage (Pie Chart)
        const componentVariantMap = new Map<string, number>();

        feedbackData.forEach(item => {
            if (item.component_name && item.component_variant) {
                const key = `${item.component_name} - ${item.component_variant}`;
                componentVariantMap.set(key, (componentVariantMap.get(key) || 0) + 1);
            }
        });

        const colors = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];
        const pieChartData = Array.from(componentVariantMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6) // Top 6
            .map(([name, value], index) => ({
                name,
                value,
                fill: colors[index % colors.length]
            }));

        // 3. Source Distribution (Bar Chart)
        const sourceMap = new Map<string, number>();

        feedbackData.forEach(item => {
            if (item.source) {
                sourceMap.set(item.source, (sourceMap.get(item.source) || 0) + 1);
            }
        });

        const barChartData = Array.from(sourceMap.entries())
            .map(([name, value]) => ({
                name: name.charAt(0).toUpperCase() + name.slice(1),
                value
            }))
            .sort((a, b) => b.value - a.value);

        // Additional stats
        const totalFeedback = feedbackData.length;
        const avgRating = feedbackData
            .filter(f => f.rating !== null)
            .reduce((acc, f) => acc + (f.rating || 0), 0) / feedbackData.filter(f => f.rating !== null).length || 0;

        const stats = {
            areaChartData,
            pieChartData,
            barChartData,
            summary: {
                total: totalFeedback,
                avgRating: Math.round(avgRating * 10) / 10,
                withRating: feedbackData.filter(f => f.rating !== null).length,
                withComment: feedbackData.filter(f => f.comment).length
            }
        };

        return NextResponse.json(stats);
    } catch (error: any) {
        console.error('Error generating stats:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
