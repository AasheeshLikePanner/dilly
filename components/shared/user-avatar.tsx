'use client';

import React from 'react';

/**
 * UserAvatar Component
 * 
 * Displays a user avatar with initials fallback.
 * Used across bugs and feedback pages for consistent user representation.
 * 
 * Used in: Bug table, Feedback table, Drawers
 */

interface UserAvatarProps {
    /** User's full name */
    name: string | null;
    /** User's email (fallback if name is not available) */
    email: string | null;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
}

export function UserAvatar({ name, email, size = 'md' }: UserAvatarProps) {
    // Generate initial from name or email
    const initial = (name || email || '?').charAt(0).toUpperCase();

    // Size classes
    const sizeClasses = {
        sm: 'w-5 h-5 text-[9px]',
        md: 'w-6 h-6 text-[10px]',
        lg: 'w-8 h-8 text-xs',
    };

    return (
        <div
            className={`${sizeClasses[size]} rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-medium text-zinc-500 dark:text-zinc-400 shrink-0`}
        >
            {initial}
        </div>
    );
}
