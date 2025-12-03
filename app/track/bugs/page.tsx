'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Bug,
    Calendar,
    CheckCircle2,
    ChevronRight,
    Clock,
    AlertOctagon,
    ArrowUpCircle,
    Search,
    Filter,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { cn } from '@/lib/utils';

// Types
type Bug = {
    id: string;
    title: string;
    status: string;
    priority: string;
    created_at: string;
    type: string;
    workspaces?: {
        name: string;
        slug: string;
    };
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
        <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium uppercase tracking-wider border", styles[status] || styles.todo)}>
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
        <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-medium uppercase tracking-wider border", color)}>
            <Icon className="w-3 h-3" />
            {priority}
        </div>
    );
};

export default function MyBugsPage() {
    const [bugs, setBugs] = useState<Bug[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchBugs = async () => {
            try {
                const response = await axios.get('/api/track/bugs');
                setBugs(response.data);
            } catch (error) {
                console.error("Failed to fetch bugs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBugs();
    }, []);

    const filteredBugs = bugs.filter(bug =>
        bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bug.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <Bug className="w-6 h-6 text-zinc-900 dark:text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                            My Reported Bugs
                        </h1>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-lg leading-relaxed">
                        Track the status and progress of all the bugs and issues you've reported across different workspaces.
                    </p>
                </div>

                {/* Search & Filter */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search by title or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-white/10 outline-none transition-all shadow-sm"
                        />
                    </div>
                    {/* Add more filters here if needed */}
                </div>

                {/* List */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-zinc-300 dark:text-zinc-700" />
                    </div>
                ) : filteredBugs.length > 0 ? (
                    <div className="space-y-4">
                        {filteredBugs.map((bug, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                key={bug.id}
                            >
                                <Link href={`/track/bugs/${bug.id}`}>
                                    <div className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-200 cursor-pointer relative overflow-hidden">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-3 flex-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-mono text-[10px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                                                        {bug.id.slice(0, 8)}
                                                    </span>
                                                    <StatusBadge status={bug.status} />
                                                    <PriorityBadge priority={bug.priority} />
                                                </div>

                                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {bug.title}
                                                </h3>

                                                <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        <span>{new Date(bug.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                    {bug.workspaces && (
                                                        <div className="flex items-center gap-1.5">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                                            <span>{bug.workspaces.name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="self-center">
                                                <div className="w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/20 dark:group-hover:text-blue-400 transition-colors">
                                                    <ChevronRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
                        <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bug className="w-6 h-6 text-zinc-400" />
                        </div>
                        <h3 className="text-zinc-900 dark:text-white font-medium mb-1">No bugs found</h3>
                        <p className="text-zinc-500 text-sm">You haven't reported any bugs yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
