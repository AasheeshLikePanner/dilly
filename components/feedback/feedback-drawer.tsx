'use client';

import React, { useState } from 'react';
import { Trash2, Copy, Check, FileJson, Globe } from 'lucide-react';
import { DetailDrawer } from '@/components/shared/detail-drawer';
import { UserAvatar } from '@/components/shared/user-avatar';
import { FeedbackTypeBadge } from '@/components/feedback/feedback-badges';

/**
 * FeedbackDrawer Component
 * 
 * A detailed read-only view drawer for feedback items.
 * Uses DetailDrawer as the base and adds feedback-specific content.
 * 
 * Features:
 * - View feedback details (rating, comment, emoji)
 * - Display metadata (creator, source, component, timestamp)
 * - Show raw JSON data
 * - Copy metadata to clipboard
 * - Delete feedback option
 */

// Feedback type definition
type Feedback = {
    id: string;
    created_at: string;
    workspace_id: string;
    type: string;
    rating: number | null;
    comment: string | null;
    emoji: string | null;
    source: string | null;
    metadata: any | null;
    created_by: string | null;
    component_name: string | null;
    component_variant: string | null;
    context: string | null;
};

interface FeedbackDrawerProps {
    item: Feedback | null;
    onClose: () => void;
}

export function FeedbackDrawer({ item, onClose }: FeedbackDrawerProps) {
    const [copied, setCopied] = useState(false);

    // Copy metadata JSON to clipboard
    const handleCopyJSON = () => {
        if (!item?.metadata) return;

        navigator.clipboard.writeText(JSON.stringify(item.metadata, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!item) return null;

    return (
        <DetailDrawer
            isOpen={!!item}
            onClose={onClose}
            title={item.id.slice(0, 8)}
            badge={<FeedbackTypeBadge type={item.type} />}
            width="max-w-xl"
            footer={
                <button className="w-full text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-sm font-medium flex items-center justify-center gap-2 transition-all px-4 py-2.5 rounded border border-zinc-200 dark:border-zinc-800 hover:border-red-200 dark:hover:border-red-900/50">
                    <Trash2 className="w-4 h-4" />
                    Delete Feedback
                </button>
            }
        >
            <div className="space-y-8">
                {/* Rating & Emoji */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        {/* Emoji */}
                        {item.emoji && (
                            <span className="text-5xl grayscale opacity-90">{item.emoji}</span>
                        )}

                        {/* Rating */}
                        {item.rating !== null && (
                            <div className="flex flex-col">
                                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                                    Rating
                                </span>
                                <div className="text-3xl font-light text-zinc-900 dark:text-white flex items-baseline gap-1">
                                    {item.rating}
                                    <span className="text-lg text-zinc-400 font-normal">/10</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Comment */}
                    <div className="space-y-2">
                        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                            Comment
                        </h3>
                        {item.comment ? (
                            <p className="text-sm text-zinc-800 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                                {item.comment}
                            </p>
                        ) : (
                            <span className="text-sm text-zinc-400 italic">No comment provided.</span>
                        )}
                    </div>
                </div>

                <div className="h-px bg-zinc-100 dark:bg-zinc-900" />

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    {/* Created By */}
                    <div>
                        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                            Created By
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-zinc-900 dark:text-zinc-200">
                            <UserAvatar
                                name={item.created_by}
                                email={null}
                                size="sm"
                            />
                            {item.created_by || 'Anonymous'}
                        </div>
                    </div>

                    {/* Source */}
                    <div>
                        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                            Source
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-zinc-900 dark:text-zinc-200">
                            <Globe className="w-3.5 h-3.5 text-zinc-400" />
                            <span className="capitalize">{item.source || 'Unknown'}</span>
                        </div>
                    </div>

                    {/* Component */}
                    <div>
                        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                            Component
                        </h3>
                        <div className="text-sm text-zinc-900 dark:text-zinc-200">
                            {item.component_name || 'Not specified'}
                        </div>
                    </div>

                    {/* Variant */}
                    <div>
                        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                            Variant
                        </h3>
                        <div className="text-sm text-zinc-900 dark:text-zinc-200">
                            {item.component_variant || 'Not specified'}
                        </div>
                    </div>

                    {/* Context */}
                    <div className="col-span-2">
                        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                            Context
                        </h3>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-mono bg-zinc-50 dark:bg-zinc-900 p-2 rounded border border-zinc-100 dark:border-zinc-800">
                            {item.context || 'No context provided'}
                        </div>
                    </div>

                    {/* Timestamp */}
                    <div className="col-span-2">
                        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                            Timestamp
                        </h3>
                        <div className="text-sm text-zinc-900 dark:text-zinc-200">
                            {new Date(item.created_at).toLocaleString(undefined, {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                </div>

                {/* Metadata JSONB */}
                {item.metadata && Object.keys(item.metadata).length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                                <FileJson className="w-3.5 h-3.5" /> Raw Data
                            </h3>
                            <button
                                onClick={handleCopyJSON}
                                className="text-[10px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 transition-colors"
                            >
                                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copied ? 'Copied!' : 'Copy JSON'}
                            </button>
                        </div>
                        <pre className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded border border-zinc-100 dark:border-zinc-800 text-[10px] text-zinc-500 font-mono overflow-x-auto">
                            {JSON.stringify(item.metadata, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </DetailDrawer>
    );
}
