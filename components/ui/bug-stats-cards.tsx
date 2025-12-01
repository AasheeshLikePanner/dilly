"use client";

import { ArrowUpRight, CheckCircle2, Clock, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type BugStatsCardsProps = {
    className?: string;
    data?: any[];
};

export function BugStatsCards({ className, data }: BugStatsCardsProps) {
    const rawData = data || [];

    // Calculate stats from the data
    const stats = rawData.reduce(
        (acc, item) => {
            const name = item.name || item.browser;
            const value = item.value || item.visitors || 0;

            if (name === 'open' || name === 'reopened') acc.open += value;
            else if (name === 'in_progress') acc.inProgress += value;
            else if (name === 'blocked' || name === 'qa_failed') acc.blocked += value;
            else if (name === 'done' || name === 'closed' || name === 'deployed') acc.done += value;

            acc.total += value;
            return acc;
        },
        { open: 0, inProgress: 0, blocked: 0, done: 0, total: 0 }
    );

    const statCards = [
        {
            label: "Open",
            value: stats.open,
            icon: AlertCircle,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
        },
        {
            label: "In Progress",
            value: stats.inProgress,
            icon: Loader2,
            color: "text-amber-500",
            bgColor: "bg-amber-500/10",
        },
        {
            label: "Blocked",
            value: stats.blocked,
            icon: Clock,
            color: "text-red-500",
            bgColor: "bg-red-500/10",
        },
        {
            label: "Done",
            value: stats.done,
            icon: CheckCircle2,
            color: "text-emerald-500",
            bgColor: "bg-emerald-500/10",
        },
    ];

    return (
        <div className={cn("grid grid-cols-2 gap-6", className)}>
            {statCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={index}
                        className="space-y-2 p-4 rounded-lg border border-border/40 bg-muted/5 hover:bg-muted/10 transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                                {stat.label}
                            </p>
                            <div className={cn("p-1.5 rounded", stat.bgColor)}>
                                <Icon className={cn("w-3.5 h-3.5", stat.color)} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-light tracking-tight">
                                {stat.value}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                                {((stat.value / stats.total) * 100 || 0).toFixed(0)}%
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
