'use client'
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  CheckCircle2,
  AlertCircle,
  X,
  Paperclip,
  Calendar,
  User,
  Hash,
  Copy,
  Check,
  Trash2,
  Inbox,
  Pencil,
  AlertOctagon,
  ArrowUpCircle,
  MoreVertical,
  Layout,
  Clock,
  Shield,
  Zap,
  Monitor,
  Bug,
  HelpCircle,
  FileJson,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClippedAreaChart } from "@/components/ui/clipped-area-chart"; // Import charts
import { RoundedPieChart } from "@/components/ui/rounded-pie-chart"; // Import charts
import { ValueLineBarChart } from "@/components/ui/value-line-bar-chart"; // Import charts
import axios from 'axios';

// --- Original Chart Imports (Commented out) ---
// import { ClippedAreaChart } from "@/components/ui/clipped-area-chart";
// import { RoundedPieChart } from "@/components/ui/rounded-pie-chart";
// import { ValueLineBarChart } from "@/components/ui/value-line-bar-chart";

// --- Schema Definition ---

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url?: string | null;
};

// Exact mapping to 'public.bugs' schema
type Bug = {
  id: string;                       // uuid
  workspace_id: string;             // uuid
  assigned_to: string | null;       // uuid -> profiles.id
  profiles: Profile | null;         // Joined profile data
  title: string;
  description: string | null;
  type: 'bug' | 'feature' | 'ui' | 'performance' | 'security' | 'other';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status:
  | 'open' | 'triage' | 'todo' | 'in_progress' | 'blocked' | 'needs_info'
  | 'testing' | 'qa_failed' | 'qa_passed' | 'review' | 'ready_for_deploy'
  | 'deployed' | 'done' | 'closed' | 'reopened' | 'archived';
  media: any[];                     // jsonb default []
  tags: string[];                   // text[] default {}
  created_at: string;               // timestamp with time zone
  updated_at: string;               // timestamp with time zone
  created_by: string | null;        // text
};

// --- Utility Components ---

const Avatar = ({ name, email }: { name: string | null, email: string | null }) => {
  const initial = (name || email || "?").charAt(0).toUpperCase();
  return (
    <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300 shadow-sm shrink-0">
      {initial}
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  // Mapping huge list of statuses to colors
  const getColor = (s: string) => {
    if (['open', 'reopened', 'todo'].includes(s)) return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    if (['in_progress', 'review', 'testing'].includes(s)) return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    if (['qa_passed', 'ready_for_deploy', 'deployed', 'done'].includes(s)) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (['blocked', 'qa_failed'].includes(s)) return "bg-red-500/10 text-red-400 border-red-500/20";
    if (['closed', 'archived'].includes(s)) return "bg-zinc-800 text-zinc-500 border-zinc-700";
    return "bg-purple-500/10 text-purple-400 border-purple-500/20"; // triage, needs_info
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider border ${getColor(status)}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  const config = {
    critical: { color: "text-red-500 bg-red-500/10 border-red-500/20", icon: AlertOctagon },
    high: { color: "text-orange-500 bg-orange-500/10 border-orange-500/20", icon: ArrowUpCircle },
    medium: { color: "text-blue-500 bg-blue-500/10 border-blue-500/20", icon: CheckCircle2 },
    low: { color: "text-zinc-500 bg-zinc-800 border-zinc-700", icon: CheckCircle2 },
  };
  const { color, icon: Icon } = config[priority as keyof typeof config] || config.low;
  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border ${color}`}>
      <Icon className="w-3 h-3" />
      {priority.toUpperCase()}
    </div>
  );
};

const TypeIcon = ({ type }: { type: string }) => {
  const icons = {
    bug: <Bug className="w-3 h-3 text-red-400" />,
    feature: <Zap className="w-3 h-3 text-yellow-400" />,
    ui: <Monitor className="w-3 h-3 text-blue-400" />,
    performance: <Clock className="w-3 h-3 text-purple-400" />,
    security: <Shield className="w-3 h-3 text-emerald-400" />,
    other: <HelpCircle className="w-3 h-3 text-zinc-400" />
  };
  return (
    <div className="flex items-center gap-1.5 text-xs text-zinc-300 capitalize">
      {icons[type as keyof typeof icons] || icons.other}
      {type}
    </div>
  );
};

// --- Drawer Component (Shows Everything in Schema) ---

const BugDrawer = ({ bug, onClose }: { bug: Bug, onClose: () => void }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40"
      />
      <motion.div
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-zinc-950 border-l border-zinc-800 z-50 shadow-2xl flex flex-col"
      >
        {/* Header: ID, Status, Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="font-mono text-xs text-zinc-400 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-2">
              <Hash className="w-3 h-3 opacity-50" />
              {bug.id.slice(0, 8)}...
            </div>
            <StatusBadge status={bug.status} />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: All Schema Fields */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-8">

            {/* 1. Title & Description */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TypeIcon type={bug.type} />
                <span className="text-zinc-600 text-xs">•</span>
                <PriorityBadge priority={bug.priority} />
              </div>
              <h1 className="text-xl font-bold text-white mb-4 leading-relaxed">{bug.title}</h1>

              <div className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2">
                  <Layout className="w-3 h-3" /> Description
                </h3>
                <p className="text-sm text-zinc-300 leading-7 whitespace-pre-wrap font-sans">
                  {bug.description || <span className="italic opacity-50">No description provided.</span>}
                </p>
              </div>
            </div>

            {/* 2. Metadata Grid (Schema Fields) */}
            <div className="grid grid-cols-2 gap-6 p-6 rounded-xl border border-zinc-800 bg-zinc-900/10">

              {/* Column A: People & Identity */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Created By</h3>
                  <div className="flex items-center gap-2 text-sm text-zinc-200">
                    <User className="w-4 h-4 text-zinc-500" />
                    {bug.created_by || 'Unknown'}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Assigned To</h3>
                  <div className="flex items-center gap-3">
                    <Avatar name={bug.profiles?.full_name || null} email={bug.profiles?.email || null} />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">{bug.profiles?.full_name || 'Unassigned'}</span>
                      <span className="text-[10px] text-zinc-500">{bug.profiles?.email}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Workspace ID</h3>
                  <code className="text-[10px] bg-zinc-950 px-2 py-1 rounded border border-zinc-800 text-zinc-400 font-mono block w-fit">
                    {bug.workspace_id}
                  </code>
                </div>
              </div>

              {/* Column B: Timestamps & Meta */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Timestamps</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">Created At</span>
                      <span className="text-zinc-300 font-mono">{new Date(bug.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">Updated At</span>
                      <span className="text-zinc-300 font-mono">{new Date(bug.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {bug.tags && bug.tags.length > 0 ? bug.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded text-zinc-400">
                        #{tag}
                      </span>
                    )) : <span className="text-xs text-zinc-600 italic">No tags</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Media (JSONB) */}
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                <Paperclip className="w-3 h-3" /> Media Attachments (JSONB)
              </h3>
              {bug.media && bug.media.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {bug.media.map((m, i) => (
                    <div key={i} className="bg-zinc-900 border border-zinc-800 rounded p-3 flex items-center gap-2 text-xs text-zinc-300">
                      <FileJson className="w-4 h-4 text-zinc-500" />
                      <span className="truncate">Media Item {i + 1}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded border border-dashed border-zinc-800 text-center text-xs text-zinc-600">
                  No media attached
                </div>
              )}
            </div>

            {/* 4. Raw JSON Dump (To prove full schema access) */}
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2">
                <FileJson className="w-3 h-3" /> Raw Data Record
              </h3>
              <pre className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-[10px] text-zinc-500 font-mono overflow-x-auto">
                {JSON.stringify(bug, null, 2)}
              </pre>
            </div>

          </div>
        </div>

        <div className="p-6 border-t border-zinc-800 bg-zinc-900/30 flex justify-between items-center">
          <button className="text-zinc-500 hover:text-red-400 text-sm font-medium flex items-center gap-2 transition-colors px-3 py-2 rounded hover:bg-red-500/10">
            <Trash2 className="w-4 h-4" /> Delete
          </button>
          <button className="bg-white text-black px-5 py-2 rounded-lg text-sm font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5">
            Edit Bug
          </button>
        </div>
      </motion.div>
    </>
  );
};

// --- Main Table ---

export function IssuesTable({ workspaceId }: { workspaceId: string | null }) {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBug, setSelectedBug] = useState<Bug | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!workspaceId) return;

      setLoading(true);
      try {
        const response = await axios.get(`/api/bugs?workspace_id=${workspaceId}`);
        setBugs(response.data);
      } catch (error) {
        console.error("Failed to fetch bugs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [workspaceId]);

  const handleCopy = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEdit = (bug: Bug, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBug(bug);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters Toolbar */}
      <div className="flex items-center justify-between gap-4 bg-zinc-950/50 p-1 rounded-xl">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            placeholder="Search bugs, features..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-200 text-sm rounded-lg pl-9 pr-4 py-2 focus:ring-1 focus:ring-zinc-700 outline-none transition-all placeholder:text-zinc-600"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Bug</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 shadow-sm relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/30 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                <th className="py-3 px-4 w-[100px]">ID</th>
                {/* 1. CreatedBy & CreatedAt FIRST (as requested) */}
                <th className="py-3 px-4 w-[160px]">Reporter</th>
                <th className="py-3 px-4 w-[250px]">Title</th>
                <th className="py-3 px-4 w-[300px]">Description</th>
                <th className="py-3 px-4 w-[120px]">Status</th>
                <th className="py-3 px-4 w-[120px]">Assignee</th>
                <th className="py-3 px-4 w-[60px] text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {bugs.map((bug) => (
                <tr
                  key={bug.id}
                  onClick={() => setSelectedBug(bug)}
                  className="group hover:bg-zinc-900/40 cursor-pointer transition-colors"
                >
                  {/* ID */}
                  <td className="py-4 px-4 align-top">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-zinc-500">{bug.id.slice(0, 6)}...</span>
                      <button
                        onClick={(e) => handleCopy(bug.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-zinc-800 rounded text-zinc-500 transition-all"
                      >
                        {copiedId === bug.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>

                  {/* Reporter (Created By + Date) */}
                  <td className="py-4 px-4 align-top">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 text-sm text-zinc-200 font-medium">
                        <User className="w-3 h-3 text-zinc-500" />
                        {bug.created_by || 'Unknown'}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 mt-0.5">
                        <Clock className="w-3 h-3 opacity-50" />
                        {new Date(bug.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </td>

                  {/* Title (Separate Column) */}
                  <td className="py-4 px-4 align-top">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-medium text-sm text-zinc-200 leading-snug">{bug.title}</span>
                      <div className="flex items-center gap-2">
                        <TypeIcon type={bug.type} />
                        <PriorityBadge priority={bug.priority} />
                      </div>
                    </div>
                  </td>

                  {/* Description (Separate Column) */}
                  <td className="py-4 px-4 align-top">
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {bug.description || <span className="italic opacity-50">No description provided.</span>}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 align-top">
                    <StatusBadge status={bug.status} />
                  </td>

                  {/* Assignee */}
                  <td className="py-4 px-4 align-top">
                    {bug.profiles ? (
                      <div className="flex items-center gap-2">
                        <Avatar name={bug.profiles.full_name} email={bug.profiles.email} />
                        <span className="text-xs text-zinc-300 font-medium truncate max-w-[100px]">{bug.profiles.full_name}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-600 italic">Unassigned</span>
                    )}
                  </td>

                  {/* Edit Action */}
                  <td className="py-4 px-4 align-top text-right">
                    <button
                      onClick={(e) => handleEdit(bug, e)}
                      className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bugs.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center text-zinc-500">
              <Inbox className="w-10 h-10 mb-3 opacity-20" />
              <p className="text-sm">No active issues found.</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedBug && <BugDrawer bug={selectedBug} onClose={() => setSelectedBug(null)} />}
      </AnimatePresence>
    </div>
  );
}

// --- Page Component ---

import { useParams } from 'next/navigation';

export default function BugsPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [loadingWorkspace, setLoadingWorkspace] = useState(true);

  useEffect(() => {
    const fetchWorkspaceId = async () => {
      if (!slug) {
        setLoadingWorkspace(false);
        return;
      }
      try {
        const response = await axios.get(`/api/workspaces/resolve-slug/${slug}`);
        setWorkspaceId(response.data.workspace_id);
      } catch (error) {
        console.error("Failed to resolve workspace slug:", error);
      } finally {
        setLoadingWorkspace(false);
      }
    };
    fetchWorkspaceId();
  }, [slug]);

  if (loadingWorkspace) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer h-full">
              <ClippedAreaChart className="h-full" />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Playground Chats</DialogTitle>
            </DialogHeader>
            <ClippedAreaChart />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer h-full">
              <RoundedPieChart className="h-full" />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Chats Involving File Uploads</DialogTitle>
            </DialogHeader>
            <RoundedPieChart />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer h-full">
              <ValueLineBarChart className="h-full" />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Role-playing Conversations</DialogTitle>
            </DialogHeader>
            <ValueLineBarChart />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-8">
        <IssuesTable workspaceId={workspaceId} />
      </div>
    </div>
  );
}