"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, Cell, XAxis } from "recharts";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const chartConfig = {
    value: {
        label: "Count",
        color: "var(--secondary-foreground)",
    },
} satisfies ChartConfig;

// Important statuses to show (filter out less common ones)
const IMPORTANT_STATUSES = [
    'open',
    'triage',
    'in_progress',
    'blocked',
    'review',
    'testing',
    'done',
    'closed'
];

export function StatusBarChart({ className, data }: { className?: string; data?: any[] }) {
    const rawData = data || [];
    const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined);

    // Normalize data format and filter to important statuses only
    const normalizedData = rawData
        .map(item => ({
            name: item.name || item.browser,
            value: item.value || item.visitors || 0,
        }))
        .filter(item => IMPORTANT_STATUSES.includes(item.name))
        .sort((a, b) => b.value - a.value) // Sort by value descending
        .slice(0, 6); // Show top 6 statuses only

    const total = normalizedData.reduce((acc, curr) => acc + curr.value, 0);

    // Find max value for highlighting
    const maxValueIndex = React.useMemo(() => {
        if (!normalizedData || normalizedData.length === 0) return 0;
        if (activeIndex !== undefined && activeIndex < normalizedData.length) {
            return activeIndex;
        }
        return normalizedData.reduce(
            (maxIdx, data, index) => {
                return data.value > normalizedData[maxIdx].value ? index : maxIdx;
            },
            0
        );
    }, [activeIndex, normalizedData]);

    return (
        <Card className={cn("flex flex-col", className)}>
            <CardHeader className="flex flex-row items-start justify-between pb-0">
                <div className="items-center">
                    <CardTitle>
                        Status Distribution
                        <Badge
                            variant="outline"
                            className="text-green-500 bg-green-500/10 border-none ml-2"
                        >
                            <TrendingUp className="h-4 w-4" />
                            <span>{total} Total</span>
                        </Badge>
                    </CardTitle>
                    <CardDescription>Top Bug Statuses</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
                <ChartContainer
                    config={chartConfig}
                    className="w-full h-[200px]"
                >
                    <BarChart
                        data={normalizedData}
                        onMouseLeave={() => setActiveIndex(undefined)}
                        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                    >
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value: string) => value.replace(/_/g, ' ').slice(0, 8)}
                            tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="name" />}
                            cursor={{ fill: 'transparent' }}
                        />
                        <Bar dataKey="value" fill="var(--color-value)" radius={[6, 6, 0, 0]} maxBarSize={60}>
                            {normalizedData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    className="duration-200"
                                    opacity={index === maxValueIndex ? 1 : 0.2}
                                    onMouseEnter={() => setActiveIndex(index)}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
