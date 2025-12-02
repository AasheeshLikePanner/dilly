'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * ChartsGrid Component
 * 
 * A responsive 3-column grid for displaying charts and statistics.
 * Includes loading state with skeleton placeholders.
 * 
 * Used in: Bugs page, Feedback page
 */

interface ChartsGridProps {
    /** Chart components to display */
    children: React.ReactNode;
    /** Whether data is loading */
    loading?: boolean;
}

export function ChartsGrid({ children, loading = false }: ChartsGridProps) {
    // Show loading skeletons while data is being fetched
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-64 bg-zinc-50 dark:bg-zinc-900/50 animate-pulse rounded"
                    />
                ))}
            </div>
        );
    }

    // Render charts in responsive grid
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {children}
        </div>
    );
}

/**
 * ChartSection Component
 * 
 * Wrapper for individual chart sections with title.
 */

interface ChartSectionProps {
    /** Chart section title */
    title: string;
    /** Chart component */
    children: React.ReactNode;
}

export function ChartSection({ title, children }: ChartSectionProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">
                {title}
            </h3>
            {children}
        </div>
    );
}
