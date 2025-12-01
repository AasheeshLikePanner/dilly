import { MessageSquare, Star, FileText, Smile, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type FeedbackStatsCardsProps = {
    className?: string;
    data?: {
        total: number;
        avgRating: number;
        withRating: number;
        withComment: number;
        trends?: {
            total: number;
            rating: number;
        };
    };
};

export function FeedbackStatsCards({ className, data }: FeedbackStatsCardsProps) {
    const stats = data || { total: 0, avgRating: 0, withRating: 0, withComment: 0, trends: { total: 0, rating: 0 } };
    const trends = stats.trends || { total: 0, rating: 0 };

    const getTrendElement = (value: number, label: string) => {
        if (value === 0) return <span className="text-zinc-400 flex items-center gap-1"><Minus className="w-3 h-3" /> 0%</span>;
        const isPositive = value > 0;
        // For rating, positive is good (green), negative is bad (red)
        // For total volume, usually more is "active" (green), less is "quiet" (red/neutral) - let's stick to green/red for now
        const color = isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400";
        const Icon = isPositive ? TrendingUp : TrendingDown;

        return (
            <span className={cn("flex items-center gap-1 font-medium", color)}>
                <Icon className="w-3 h-3" />
                {Math.abs(value)}%
            </span>
        );
    };

    const statCards = [
        {
            label: "Total Feedback",
            value: stats.total,
            icon: MessageSquare,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
            subtext: "vs last period",
            trend: trends.total
        },
        {
            label: "Avg Rating",
            value: stats.avgRating,
            icon: Star,
            color: "text-amber-500",
            bgColor: "bg-amber-500/10",
            subtext: "vs last period",
            trend: trends.rating
        },
        {
            label: "With Comments",
            value: stats.withComment,
            icon: FileText,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10",
            subtext: `${((stats.withComment / (stats.total || 1)) * 100).toFixed(0)}% of total`
        },
        {
            label: "With Rating",
            value: stats.withRating,
            icon: Smile,
            color: "text-emerald-500",
            bgColor: "bg-emerald-500/10",
            subtext: `${((stats.withRating / (stats.total || 1)) * 100).toFixed(0)}% of total`
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
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-light tracking-tight">
                                {stat.value}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                {stat.trend !== undefined ? (
                                    <>
                                        {getTrendElement(stat.trend, stat.label)}
                                        <span>{stat.subtext}</span>
                                    </>
                                ) : (
                                    <span>{stat.subtext}</span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
