'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, Pencil, Copy, Check, FileJson, Layout, User } from 'lucide-react';
import axios from 'axios';
import { DetailDrawer } from '@/components/shared/detail-drawer';
import { UserAvatar } from '@/components/shared/user-avatar';
import { BugStatusBadge, BugPriorityBadge } from '@/components/bugs/bug-badges';
import { BugTypeIcon } from '@/components/bugs/bug-type-icon';
import { toast } from 'sonner';

/**
 * BugDrawer Component
 * 
 * A detailed view drawer for bugs with editing capabilities.
 * Uses DetailDrawer as the base and adds bug-specific content and edit mode.
 * 
 * Features:
 * - View bug details
 * - Edit bug properties (title, description, status, priority, type, assignee)
 * - Displays metadata (creator, timestamps, tags)
 * - Shows attachments and raw JSON data
 * - Copy bug ID functionality
 */

// Bug type definition
type Bug = {
    id: string;
    workspace_id: string;
    assigned_to: string | null;
    profiles: { id: string; email: string | null; full_name: string | null } | null;
    title: string;
    description: string | null;
    type: 'bug' | 'feature' | 'ui' | 'performance' | 'security' | 'other';
    priority: 'low' | 'medium' | 'high' | 'critical';
    status:
    | 'open' | 'triage' | 'todo' | 'in_progress' | 'blocked' | 'needs_info'
    | 'testing' | 'qa_failed' | 'qa_passed' | 'review' | 'ready_for_deploy'
    | 'deployed' | 'done' | 'closed' | 'reopened' | 'archived';
    media: any[];
    tags: string[];
    created_at: string;
    updated_at: string;
    created_by: string | null;
};

interface BugDrawerProps {
    bug: Bug | null;
    onClose: () => void;
    onUpdate: () => void;
}

export function BugDrawer({ bug, onClose, onUpdate }: BugDrawerProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedBug, setEditedBug] = useState<Partial<Bug>>({});
    const [members, setMembers] = useState<any[]>([]);
    const [loadingMembers, setLoadingMembers] = useState(false);
    const [saving, setSaving] = useState(false);
    const [copied, setCopied] = useState(false);

    // Fetch workspace members when entering edit mode
    useEffect(() => {
        if (isEditing && bug?.workspace_id) {
            fetchMembers();
        }
    }, [isEditing, bug?.workspace_id]);

    const fetchMembers = async () => {
        if (!bug) return;
        setLoadingMembers(true);
        try {
            const response = await axios.get(`/api/workspaces/${bug.workspace_id}/members`);
            setMembers(response.data);
        } catch (error) {
            console.error('Failed to fetch members:', error);
        } finally {
            setLoadingMembers(false);
        }
    };

    // Save edited bug
    const handleSave = async () => {
        if (!bug) return;

        setSaving(true);
        try {
            await axios.put('/api/bugs', {
                id: bug.id,
                last_updated_at: bug.updated_at,
                ...editedBug
            });
            onUpdate(); // Refresh bug list
            setIsEditing(false);
        } catch (error: any) {
            console.error('Failed to update bug:', error);
            if (error.response && error.response.status === 409) {
                toast.error('Conflict: The bug has been modified by another user. Please refresh and try again.');
                onUpdate();
                onClose();
            } else {
                toast.error('Failed to save changes. Please try again.');
            }
        } finally {
            setSaving(false);
        }
    };

    // Enter edit mode
    const startEditing = () => {
        if (!bug) return;

        setEditedBug({
            title: bug.title,
            description: bug.description,
            status: bug.status,
            priority: bug.priority,
            type: bug.type,
            assigned_to: bug.assigned_to
        });
        setIsEditing(true);
    };

    // Copy bug JSON to clipboard
    const handleCopyJSON = () => {
        if (!bug) return;

        navigator.clipboard.writeText(JSON.stringify(bug, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!bug) return null;

    return (
        <DetailDrawer
            isOpen={!!bug}
            onClose={onClose}
            title={bug.id.slice(0, 8)}
            badge={
                isEditing ? (
                    // Status selector in edit mode
                    <select
                        value={editedBug.status}
                        onChange={e => setEditedBug({ ...editedBug, status: e.target.value as any })}
                        className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs rounded px-2 py-1 outline-none focus:border-zinc-400"
                    >
                        {['open', 'triage', 'todo', 'in_progress', 'blocked', 'needs_info', 'testing', 'qa_failed', 'qa_passed', 'review', 'ready_for_deploy', 'deployed', 'done', 'closed', 'reopened', 'archived'].map(s => (
                            <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                        ))}
                    </select>
                ) : (
                    <BugStatusBadge status={bug.status} />
                )
            }
            footer={
                <div className="flex justify-between items-center w-full">
                    {/* Delete button */}
                    <button className="text-zinc-500 hover:text-red-600 text-sm font-medium flex items-center gap-2 transition-colors px-3 py-2 rounded hover:bg-red-50 dark:hover:bg-red-950/30">
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>

                    {/* Edit/Save buttons */}
                    {!isEditing ? (
                        <button
                            onClick={startEditing}
                            className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                        >
                            <Pencil className="w-4 h-4" />
                            Edit Bug
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-zinc-900 dark:bg-white text-white dark:text-black px-5 py-2 rounded text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    )}
                </div>
            }
        >
            <div className="space-y-8">
                {/* Title & Description */}
                <div>
                    {/* Type & Priority */}
                    <div className="flex items-center gap-3 mb-4">
                        {!isEditing ? (
                            <>
                                <BugTypeIcon type={bug.type} />
                                <span className="text-zinc-300 dark:text-zinc-700 text-xs">•</span>
                                <BugPriorityBadge priority={bug.priority} />
                            </>
                        ) : (
                            <div className="flex gap-2">
                                {/* Type selector */}
                                <select
                                    value={editedBug.type}
                                    onChange={e => setEditedBug({ ...editedBug, type: e.target.value as any })}
                                    className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs rounded px-2 py-1 outline-none focus:border-zinc-400"
                                >
                                    {['bug', 'feature', 'ui', 'performance', 'security', 'other'].map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>

                                {/* Priority selector */}
                                <select
                                    value={editedBug.priority}
                                    onChange={e => setEditedBug({ ...editedBug, priority: e.target.value as any })}
                                    className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs rounded px-2 py-1 outline-none focus:border-zinc-400"
                                >
                                    {['low', 'medium', 'high', 'critical'].map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    {!isEditing ? (
                        <h1 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6 leading-snug">{bug.title}</h1>
                    ) : (
                        <input
                            value={editedBug.title || ''}
                            onChange={e => setEditedBug({ ...editedBug, title: e.target.value })}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xl font-semibold rounded px-3 py-2 mb-6 outline-none focus:border-zinc-400"
                        />
                    )}

                    {/* Description */}
                    <div className="space-y-2">
                        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                            <Layout className="w-3.5 h-3.5" /> Description
                        </h3>
                        {!isEditing ? (
                            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                                {bug.description || <span className="italic text-zinc-400">No description provided.</span>}
                            </p>
                        ) : (
                            <textarea
                                value={editedBug.description || ''}
                                onChange={e => setEditedBug({ ...editedBug, description: e.target.value })}
                                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-sm rounded px-3 py-2 outline-none focus:border-zinc-400 min-h-[120px]"
                            />
                        )}
                    </div>
                </div>

                <div className="h-px bg-zinc-100 dark:bg-zinc-900" />

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    {/* Created By */}
                    <div>
                        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Created By</h3>
                        <div className="flex items-center gap-2 text-sm text-zinc-900 dark:text-zinc-200">
                            <User className="w-3.5 h-3.5 text-zinc-400" />
                            {bug.created_by || 'Unknown'}
                        </div>
                    </div>

                    {/* Assigned To */}
                    <div>
                        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Assigned To</h3>
                        {!isEditing ? (
                            <div className="flex items-center gap-2">
                                <UserAvatar name={bug.profiles?.full_name || null} email={bug.profiles?.email || null} />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-200">{bug.profiles?.full_name || 'Unassigned'}</span>
                                </div>
                            </div>
                        ) : (
                            <select
                                value={editedBug.assigned_to || ''}
                                onChange={e => setEditedBug({ ...editedBug, assigned_to: e.target.value || null })}
                                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-sm rounded px-2 py-1 outline-none focus:border-zinc-400"
                                disabled={loadingMembers}
                            >
                                <option value="">Unassigned</option>
                                {members.map(m => (
                                    <option key={m.user_id} value={m.user_id}>
                                        {m.profiles?.full_name || m.profiles?.email || 'Unknown User'}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Created At */}
                    <div>
                        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Created At</h3>
                        <div className="text-sm text-zinc-900 dark:text-zinc-200 font-mono">
                            {new Date(bug.created_at).toLocaleDateString()}
                        </div>
                    </div>

                    {/* Updated At */}
                    <div>
                        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Updated At</h3>
                        <div className="text-sm text-zinc-900 dark:text-zinc-200 font-mono">
                            {new Date(bug.updated_at).toLocaleDateString()}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="col-span-2">
                        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-1.5">
                            {bug.tags && bug.tags.length > 0 ? bug.tags.map(tag => (
                                <span key={tag} className="text-[10px] bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-400 font-medium">
                                    #{tag}
                                </span>
                            )) : <span className="text-xs text-zinc-400 italic">No tags</span>}
                        </div>
                    </div>
                </div>

                {/* Media Attachments */}
                <div>
                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                        <FileJson className="w-3.5 h-3.5" /> Attachments
                    </h3>
                    {bug.media && bug.media.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                            {bug.media.map((m, i) => (
                                <div key={i} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-3 flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                                    <FileJson className="w-4 h-4 text-zinc-400" />
                                    <span className="truncate">Media Item {i + 1}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 rounded border border-dashed border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-400">
                            No media attached
                        </div>
                    )}
                </div>

                {/* Raw JSON Data */}
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
                    <pre className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded border border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-500 font-mono overflow-x-auto">
                        {JSON.stringify(bug, null, 2)}
                    </pre>
                </div>
            </div>
        </DetailDrawer>
    );
}
