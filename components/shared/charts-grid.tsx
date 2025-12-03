'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface ChartsGridProps {
    children: React.ReactNode;
    loading?: boolean;
}

export function ChartsGrid({ children, loading = false }: ChartsGridProps) {
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

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {children}
        </div>
    );
}

interface ChartSectionProps {
    title: string;
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
