'use client';

import React from 'react';

interface PageHeaderProps {
    title: string;
    children?: React.ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
    return (
        <div className="flex items-baseline justify-between">
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">
                {title}
            </h1>

            {children && (
                <div className="flex items-center gap-4">
                    {children}
                </div>
            )}
        </div>
    );
}
