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
  Calendar as CalendarIcon,
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
  Loader2,
  ChevronDown,
  Download
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { ClippedAreaChart } from "@/components/ui/clipped-area-chart";
import { RoundedPieChart } from "@/components/ui/rounded-pie-chart";
import { ValueLineBarChart } from "@/components/ui/value-line-bar-chart";
import axios from 'axios';
import { cn } from "@/lib/utils";
import { useParams } from 'next/navigation';

// --- Schema Definition ---

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url?: string | null;
};

// Exact mapping to 'public.bugs' schema
type Bug = {
  id: string;
  workspace_id: string;
  assigned_to: string | null;
  profiles: Profile | null;
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

// --- Utility Components ---

const Avatar = ({ name, email }: { name: string | null, email: string | null }) => {
  const initial = (name || email || "?").charAt(0).toUpperCase();
  return (
    <div className="w-6 h-6 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-medium text-zinc-500 dark:text-zinc-400 shrink-0">
      {initial}
    </div>
  );
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

const TypeIcon = ({ type }: { type: string }) => {
  const icons = {
    bug: <Bug className="w-3 h-3 text-red-500 dark:text-red-400" />,
    feature: <Zap className="w-3 h-3 text-amber-500 dark:text-amber-400" />,
    ui: <Monitor className="w-3 h-3 text-blue-500 dark:text-blue-400" />,
    performance: <Clock className="w-3 h-3 text-purple-500 dark:text-purple-400" />,
    security: <Shield className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />,
    other: <HelpCircle className="w-3 h-3 text-zinc-400" />
  };
  return (
    <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 capitalize font-medium">
      {icons[type as keyof typeof icons] || icons.other}
      {type}
    </div>
  );
};

// --- Drawer Component (Shows Everything in Schema) ---

const BugDrawer = ({ bug, onClose, onUpdate }: { bug: Bug, onClose: () => void, onUpdate: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBug, setEditedBug] = useState<Partial<Bug>>({});
  const [members, setMembers] = useState<any[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isEditing && bug.workspace_id) {
      fetchMembers();
    }
  }, [isEditing, bug.workspace_id]);

  const fetchMembers = async () => {
    setLoadingMembers(true);
    try {
      const response = await axios.get(`/api/workspaces/${bug.workspace_id}/members`);
      setMembers(response.data);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    } finally {
      setLoadingMembers(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put('/api/bugs', {
        id: bug.id,
        last_updated_at: bug.updated_at,
        ...editedBug
      });
      onUpdate();
      setIsEditing(false);
    } catch (error: any) {
      console.error("Failed to update bug:", error);
      if (error.response && error.response.status === 409) {
        alert("Conflict: The bug has been modified by another user. Please refresh and try again.");
        onUpdate();
        onClose();
      } else {
        alert("Failed to save changes. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const startEditing = () => {
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

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40"
      />
      <motion.div
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 z-50 shadow-xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="font-mono text-xs text-zinc-500">
              {bug.id.slice(0, 8)}
            </div>
            {!isEditing && <StatusBadge status={bug.status} />}
            {isEditing && (
              <select
                value={editedBug.status}
                onChange={e => setEditedBug({ ...editedBug, status: e.target.value as any })}
                className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs rounded px-2 py-1 outline-none focus:border-zinc-400"
              >
                {['open', 'triage', 'todo', 'in_progress', 'blocked', 'needs_info', 'testing', 'qa_failed', 'qa_passed', 'review', 'ready_for_deploy', 'deployed', 'done', 'closed', 'reopened', 'archived'].map(s => (
                  <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                ))}
              </select>
            )}
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Title & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {!isEditing ? (
                <>
                  <TypeIcon type={bug.type} />
                  <span className="text-zinc-300 dark:text-zinc-700 text-xs">•</span>
                  <PriorityBadge priority={bug.priority} />
                </>
              ) : (
                <div className="flex gap-2">
                  <select
                    value={editedBug.type}
                    onChange={e => setEditedBug({ ...editedBug, type: e.target.value as any })}
                    className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs rounded px-2 py-1 outline-none focus:border-zinc-400"
                  >
                    {['bug', 'feature', 'ui', 'performance', 'security', 'other'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
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

            {!isEditing ? (
              <h1 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6 leading-snug">{bug.title}</h1>
            ) : (
              <input
                value={editedBug.title || ''}
                onChange={e => setEditedBug({ ...editedBug, title: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xl font-semibold rounded px-3 py-2 mb-6 outline-none focus:border-zinc-400"
              />
            )}

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
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Created By</h3>
              <div className="flex items-center gap-2 text-sm text-zinc-900 dark:text-zinc-200">
                <User className="w-3.5 h-3.5 text-zinc-400" />
                {bug.created_by || 'Unknown'}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Assigned To</h3>
              {!isEditing ? (
                <div className="flex items-center gap-2">
                  <Avatar name={bug.profiles?.full_name || null} email={bug.profiles?.email || null} />
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

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Created At</h3>
              <div className="text-sm text-zinc-900 dark:text-zinc-200 font-mono">
                {new Date(bug.created_at).toLocaleDateString()}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Updated At</h3>
              <div className="text-sm text-zinc-900 dark:text-zinc-200 font-mono">
                {new Date(bug.updated_at).toLocaleDateString()}
              </div>
            </div>

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

          {/* Media */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
              <Paperclip className="w-3.5 h-3.5" /> Attachments
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

          {/* Raw Data */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <FileJson className="w-3.5 h-3.5" /> Raw Data
              </h3>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(bug, null, 2));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
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

        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <button className="text-zinc-500 hover:text-red-600 text-sm font-medium flex items-center gap-2 transition-colors px-3 py-2 rounded hover:bg-red-50 dark:hover:bg-red-950/30">
            <Trash2 className="w-4 h-4" /> Delete
          </button>
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

  const fetchBugs = async () => {
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

  useEffect(() => {
    fetchBugs();
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

  const handleUpdate = () => {
    fetchBugs();
  };

  useEffect(() => {
    if (selectedBug) {
      const updated = bugs.find(b => b.id === selectedBug.id);
      if (updated) {
        setSelectedBug(updated);
      }
    }
  }, [bugs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            placeholder="Search bugs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-sm pl-9 pr-4 py-2 focus:border-zinc-400 dark:focus:border-zinc-600 outline-none transition-colors placeholder:text-zinc-400"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Bug</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                <th className="py-4 px-4 w-[100px] font-medium">ID</th>
                <th className="py-4 px-4 w-[160px] font-medium">Reporter</th>
                <th className="py-4 px-4 w-[250px] font-medium">Title</th>
                <th className="py-4 px-4 w-[300px] font-medium">Description</th>
                <th className="py-4 px-4 w-[120px] font-medium">Status</th>
                <th className="py-4 px-4 w-[120px] font-medium">Assignee</th>
                <th className="py-4 px-4 w-[60px] text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {bugs.map((bug) => (
                <tr
                  key={bug.id}
                  onClick={() => setSelectedBug(bug)}
                  className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/50 cursor-pointer transition-colors"
                >
                  {/* ID */}
                  <td className="py-4 px-4 align-top">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-zinc-400">{bug.id.slice(0, 6)}</span>
                      <button
                        onClick={(e) => handleCopy(bug.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-400 transition-all"
                      >
                        {copiedId === bug.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>

                  {/* Reporter */}
                  <td className="py-4 px-4 align-top">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                        <User className="w-3 h-3 text-zinc-400" />
                        {bug.created_by || 'Unknown'}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                        <Clock className="w-3 h-3 opacity-50" />
                        {new Date(bug.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </td>

                  {/* Title */}
                  <td className="py-4 px-4 align-top">
                    <div className="flex flex-col gap-2">
                      <span className="font-medium text-sm text-zinc-900 dark:text-zinc-200 leading-snug">{bug.title}</span>
                      <div className="flex items-center gap-2">
                        <TypeIcon type={bug.type} />
                        <PriorityBadge priority={bug.priority} />
                      </div>
                    </div>
                  </td>

                  {/* Description */}
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
                        <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium truncate max-w-[100px]">{bug.profiles.full_name}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-400 italic">Unassigned</span>
                    )}
                  </td>

                  {/* Edit Action */}
                  <td className="py-4 px-4 align-top text-right">
                    <button
                      onClick={(e) => handleEdit(bug, e)}
                      className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bugs.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-zinc-400">
              <Inbox className="w-10 h-10 mb-4 opacity-20" />
              <p className="text-sm">No active issues found.</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedBug && <BugDrawer bug={selectedBug} onClose={() => setSelectedBug(null)} onUpdate={handleUpdate} />}
      </AnimatePresence>
    </div>
  );
}

// --- Page Component ---


export default function BugsPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [loadingWorkspace, setLoadingWorkspace] = useState(true);
  const [stats, setStats] = useState<any>(null);

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

  useEffect(() => {
    const fetchStats = async () => {
      if (!workspaceId) return;
      try {
        const response = await axios.get(`/api/bugs/stats?workspace_id=${workspaceId}`);
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, [workspaceId]);

  if (loadingWorkspace) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-[1600px] mx-auto space-y-12">

        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">Bugs & Issues</h1>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Activity</h3>
            <ClippedAreaChart
              className="border-none shadow-none bg-transparent p-0"
              data={stats?.areaChartData}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Status</h3>
            <RoundedPieChart
              className="border-none shadow-none bg-transparent p-0"
              data={stats?.pieChartData}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Priority</h3>
            <ValueLineBarChart
              className="border-none shadow-none bg-transparent p-0"
              data={stats?.barChartData}
            />
          </div>
        </div>

        {/* Table Section */}
        <IssuesTable workspaceId={workspaceId} />
      </div>
    </div>
  );
}