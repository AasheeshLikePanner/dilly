'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Bug as BugIcon,
    CheckCircle2,
    Clock,
    AlertOctagon,
    ArrowUpCircle,
    ChevronLeft,
    Loader2,
    Calendar,
    FileText,
    Paperclip,
    Layout,
    Check
} from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { cn } from '@/lib/utils';

// Types
type Bug = {
    id: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    type: string;
    created_at: string;
    updated_at: string;
    tags: string[];
    media: any[];
    workspaces?: {
        name: string;
        slug: string;
    };
};

const STEPS = [
    {
        id: 'submitted',
        label: 'Submitted',
        statuses: ['open', 'triage', 'todo'],
        description: 'Bug report received'
    },
    {
        id: 'in_progress',
        label: 'In Progress',
        statuses: ['in_progress', 'blocked', 'needs_info'],
        description: 'Team is working on it'
    },
    {
        id: 'testing',
        label: 'Testing',
        statuses: ['testing', 'review', 'qa_passed', 'qa_failed', 'ready_for_deploy'],
        description: 'Verifying the fix'
    },
    {
        id: 'done',
        label: 'Resolved',
        statuses: ['deployed', 'done', 'closed', 'archived'],
        description: 'Fix deployed'
    }
];

const getStepStatus = (currentStatus: string, stepIndex: number) => {
    // Find which step the current status belongs to
    const currentStepIndex = STEPS.findIndex(step => step.statuses.includes(currentStatus));

    if (currentStepIndex === -1) return 'waiting'; // Should not happen if all statuses mapped

    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'waiting';
};

const StatusBadge = ({ status }: { status: string }) => {
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
        <span className={cn("inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wider border", styles[status] || styles.todo)}>
            {status.replace(/_/g, ' ')}
        </span>
    );
};

const PriorityBadge = ({ priority }: { priority: string }) => {
    const config = {
        critical: { color: "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-500/10 dark:border-red-500/20", icon: AlertOctagon },
        high: { color: "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-500/10 dark:border-orange-500/20", icon: ArrowUpCircle },
        medium: { color: "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-500/20", icon: CheckCircle2 },
        low: { color: "text-zinc-500 bg-zinc-100 border-zinc-200 dark:text-zinc-400 dark:bg-zinc-800 dark:border-zinc-700", icon: CheckCircle2 },
    };
    const { color, icon: Icon } = config[priority as keyof typeof config] || config.low;
    return (
        <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wider border", color)}>
            <Icon className="w-3.5 h-3.5" />
            {priority}
        </div>
    );
};

export default function BugDetailsPage() {
    const params = useParams();
    const [bug, setBug] = useState<Bug | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBug = async () => {
            try {
                const response = await axios.get(`/api/track/bugs/${params.id}`);
                setBug(response.data);
            } catch (error) {
                console.error("Failed to fetch bug:", error);
            } finally {
                setLoading(false);
            }
        };
        if (params.id) {
            fetchBug();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-zinc-50 dark:bg-black">
                <Loader2 className="w-8 h-8 animate-spin text-zinc-300 dark:text-zinc-700" />
            </div>
        );
    }

    if (!bug) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-zinc-50 dark:bg-black gap-4">
                <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-full">
                    <BugIcon className="w-8 h-8 text-zinc-400" />
                </div>
                <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Bug Not Found</h1>
                <Link href="/track/bugs" className="text-blue-600 hover:underline text-sm">
                    Return to My Bugs
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 pb-20">

            {/* Top Navigation */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center">
                    <Link
                        href="/track/bugs"
                        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to My Bugs
                    </Link>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

                {/* Header Section */}
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="space-y-4 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="font-mono text-xs text-zinc-500 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-800">
                                    #{bug.id.split('-')[0]}
                                </span>
                                <StatusBadge status={bug.status} />
                                <PriorityBadge priority={bug.priority} />
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white leading-tight">
                                {bug.title}
                            </h1>

                            <div className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Reported on {new Date(bug.created_at).toLocaleDateString()}</span>
                                </div>
                                {bug.workspaces && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                        <span>{bug.workspaces.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Tracker */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-8">Status Progress</h3>
                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute top-5 left-0 w-full h-0.5 bg-zinc-100 dark:bg-zinc-800 -z-0" />

                        <div className="grid grid-cols-4 gap-4 relative z-10">
                            {STEPS.map((step, index) => {
                                const status = getStepStatus(bug.status, index);
                                const isCompleted = status === 'completed';
                                const isCurrent = status === 'current';

                                return (
                                    <div key={step.id} className="flex flex-col items-center text-center gap-3">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500",
                                            isCompleted ? "bg-blue-600 border-blue-100 dark:border-blue-900 text-white" :
                                                isCurrent ? "bg-white dark:bg-zinc-900 border-blue-600 text-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.1)]" :
                                                    "bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 text-zinc-300 dark:text-zinc-600"
                                        )}>
                                            {isCompleted ? <Check className="w-5 h-5" /> :
                                                isCurrent ? <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" /> :
                                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                            }
                                        </div>

                                        <div className="space-y-1">
                                            <div className={cn(
                                                "text-sm font-semibold transition-colors",
                                                isCompleted || isCurrent ? "text-zinc-900 dark:text-white" : "text-zinc-400 dark:text-zinc-600"
                                            )}>
                                                {step.label}
                                            </div>
                                            <div className="text-[10px] text-zinc-400 dark:text-zinc-600 hidden md:block">
                                                {step.description}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Description
                            </h3>
                            <div className="prose prose-zinc dark:prose-invert max-w-none text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                                {bug.description ? (
                                    <p className="whitespace-pre-wrap">{bug.description}</p>
                                ) : (
                                    <p className="italic text-zinc-400">No description provided.</p>
                                )}
                            </div>
                        </div>

                        {/* Media/Attachments */}
                        {bug.media && bug.media.length > 0 && (
                            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                                    <Paperclip className="w-4 h-4" /> Attachments
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {bug.media.map((item, i) => (
                                        <div key={i} className="group relative aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
                                            {/* Placeholder for actual media rendering - assuming JSON structure */}
                                            <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                                                <span className="text-xs">Media Item {i + 1}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6">
                            <div>
                                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">Type</h3>
                                <div className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-200 capitalize">
                                    <Layout className="w-4 h-4 text-zinc-400" />
                                    {bug.type}
                                </div>
                            </div>

                            <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

                            <div>
                                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {bug.tags && bug.tags.length > 0 ? (
                                        bug.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded-md font-medium border border-zinc-200 dark:border-zinc-700">
                                                #{tag}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-zinc-400 italic">No tags</span>
                                    )}
                                </div>
                            </div>

                            <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

                            <div>
                                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">Last Updated</h3>
                                <div className="flex items-center gap-2 text-sm text-zinc-900 dark:text-zinc-200">
                                    <Clock className="w-4 h-4 text-zinc-400" />
                                    {new Date(bug.updated_at).toLocaleDateString()} at {new Date(bug.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
