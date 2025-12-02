'use client';

import React from 'react';
import {
    Smile,
    SlidersHorizontal,
    FileText,
    MessageSquare,
} from 'lucide-react';

/**
 * Feedback Type Badge Component
 * 
 * Displays a badge with icon for feedback type.
 */

interface FeedbackTypeBadgeProps {
    type: string;
}

export function FeedbackTypeBadge({ type }: FeedbackTypeBadgeProps) {
    // Type icon mappings
    const icons: Record<string, any> = {
        emoji: Smile,
        slider: SlidersHorizontal,
        form: FileText,
    };

    const Icon = icons[type] || MessageSquare;

    return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-transparent">
            <Icon className="w-3 h-3" />
            {type}
        </span>
    );
}

/**
 * Feedback Rating Badge Component
 * 
 * Displays a numeric rating badge.
 */

interface FeedbackRatingBadgeProps {
    rating: number | null;
}

export function FeedbackRatingBadge({ rating }: FeedbackRatingBadgeProps) {
    // No rating case
    if (rating === null) {
        return <span className="text-zinc-400 text-xs">-</span>;
    }

    return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-900">
            {rating}
        </span>
    );
}
