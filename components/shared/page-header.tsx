'use client';

import React from 'react';

/**
 * PageHeader Component
 * 
 * A reusable header layout for pages with a title and optional control elements.
 * Provides consistent spacing and alignment across different pages.
 * 
 * Used in: Bugs page, Feedback page, and other list/table pages
 */

interface PageHeaderProps {
    /** Page title to display */
    title: string;
    /** Optional control elements (e.g., DateRangeSelector, action buttons) */
    children?: React.ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
    return (
        <div className="flex items-baseline justify-between">
            {/* Page Title */}
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">
                {title}
            </h1>

            {/* Control Elements (filters, actions, etc.) */}
            {children && (
                <div className="flex items-center gap-4">
                    {children}
                </div>
            )}
        </div>
    );
}
