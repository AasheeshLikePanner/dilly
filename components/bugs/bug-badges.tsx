'use client';

import React from 'react';
import {
    AlertOctagon,
    ArrowUpCircle,
    CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Bug Status Badge Component
 * 
 * Displays a colored badge for bug status.
 * Supports all status values from the bugs schema.
 */

type BugStatus =
    | 'open' | 'triage' | 'todo' | 'in_progress' | 'blocked' | 'needs_info'
    | 'testing' | 'qa_failed' | 'qa_passed' | 'review' | 'ready_for_deploy'
    | 'deployed' | 'done' | 'closed' | 'reopened' | 'archived';

interface BugStatusBadgeProps {
    status: string;
}

export function BugStatusBadge({ status }: BugStatusBadgeProps) {
    // Status color mappings
    const styles: Record<string, string> = {
        open: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
        reopened: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
        todo: "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
        in_progress: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
        review: "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20",
        testing: "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20",
        qa_passed: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
        ready_for_deploy: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
        deployed: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
        done: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
        blocked: "bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
        qa_failed: "bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
        closed: "bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-500 dark:border-zinc-800",
        archived: "bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-500 dark:border-zinc-800",
        triage: "bg-pink-50 text-pink-600 border-pink-200 dark:bg-pink-500/10 dark:text-pink-400 dark:border-pink-500/20",
        needs_info: "bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
    };

    return (
        <span className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium uppercase tracking-wider border",
            styles[status] || styles.todo
        )}>
            {status.replace(/_/g, ' ')}
        </span>
    );
}

/**
 * Bug Priority Badge Component
 * 
 * Displays a colored badge with icon for bug priority.
 */

type BugPriority = 'low' | 'medium' | 'high' | 'critical';

interface BugPriorityBadgeProps {
    priority: string;
}

export function BugPriorityBadge({ priority }: BugPriorityBadgeProps) {
    // Priority configurations
    const config = {
        critical: {
            color: "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-500/10 dark:border-red-500/20",
            icon: AlertOctagon
        },
        high: {
            color: "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-500/10 dark:border-orange-500/20",
            icon: ArrowUpCircle
        },
        medium: {
            color: "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-500/20",
            icon: CheckCircle2
        },
        low: {
            color: "text-zinc-500 bg-zinc-100 border-zinc-200 dark:text-zinc-400 dark:bg-zinc-800 dark:border-zinc-700",
            icon: CheckCircle2
        },
    };

    const { color, icon: Icon } = config[priority as BugPriority] || config.low;

    return (
        <div className={cn(
            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-medium uppercase tracking-wider border",
            color
        )}>
            <Icon className="w-3 h-3" />
            {priority}
        </div>
    );
}
