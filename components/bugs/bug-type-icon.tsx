'use client';

import React from 'react';
import {
    Bug,
    Zap,
    Monitor,
    Clock,
    Shield,
    HelpCircle,
} from 'lucide-react';

/**
 * Bug Type Icon Component
 * 
 * Displays an icon with label for bug type.
 */

type BugType = 'bug' | 'feature' | 'ui' | 'performance' | 'security' | 'other';

interface BugTypeIconProps {
    type: string;
}

export function BugTypeIcon({ type }: BugTypeIconProps) {
    // Type icon mappings
    const icons: Record<string, { icon: any; color: string }> = {
        bug: { icon: Bug, color: 'text-red-500 dark:text-red-400' },
        feature: { icon: Zap, color: 'text-amber-500 dark:text-amber-400' },
        ui: { icon: Monitor, color: 'text-blue-500 dark:text-blue-400' },
        performance: { icon: Clock, color: 'text-purple-500 dark:text-purple-400' },
        security: { icon: Shield, color: 'text-emerald-500 dark:text-emerald-400' },
        other: { icon: HelpCircle, color: 'text-zinc-400' },
    };

    const { icon: Icon, color } = icons[type as BugType] || icons.other;

    return (
        <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 capitalize font-medium">
            <Icon className={`w-3 h-3 ${color}`} />
            {type}
        </div>
    );
}
