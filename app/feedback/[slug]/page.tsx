'use client'
import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Trash2,
  X,
  Hash,
  User,
  Globe,
  Copy,
  Check,
  Calendar as CalendarIcon,
  Smile,
  SlidersHorizontal,
  FileText,
  MessageSquare,
  Inbox,
  ChevronDown,
  ArrowUpDown,
  MoreHorizontal,
  RefreshCw,
  Download,
  LayoutGrid,
  List as ListIcon,
  Loader2,
  FileJson
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
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ClippedAreaChart } from "@/components/ui/clipped-area-chart";
import { RoundedPieChart } from "@/components/ui/rounded-pie-chart";
import { ValueLineBarChart } from "@/components/ui/value-line-bar-chart";
import { Calendar } from "@/components/ui/calendar";
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

// --- Types ---
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

// --- Utility Components ---
const TypeBadge = ({ type }: { type: string }) => {
  const icons: Record<string, any> = {
    emoji: Smile,
    slider: SlidersHorizontal,
    form: FileText,
  };

  const Icon = icons[type] || MessageSquare;

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-transparent">
      <Icon className="w-3 h-3" />
      {type}
    </span>
  );
};

const RatingBadge = ({ rating }: { rating: number | null }) => {
  if (rating === null) return <span className="text-zinc-400 text-xs">-</span>;

  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-900">
      {rating}
    </span>
  );
};

// --- Detail Drawer ---
const FeedbackDrawer = ({ item, onClose }: { item: Feedback, onClose: () => void }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 z-50 shadow-xl flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="font-mono text-xs text-zinc-500">
              {item.id.slice(0, 8)}
            </div>
            <TypeBadge type={item.type} />
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Rating & Emoji */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              {item.emoji && <span className="text-5xl grayscale opacity-90">{item.emoji}</span>}
              {item.rating !== null && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Rating</span>
                  <div className="text-3xl font-light text-zinc-900 dark:text-white flex items-baseline gap-1">
                    {item.rating}
                    <span className="text-lg text-zinc-400 font-normal">/10</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Comment</h3>
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
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Created By</h3>
              <div className="flex items-center gap-2 text-sm text-zinc-900 dark:text-zinc-200">
                <div className="w-5 h-5 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-500 font-medium">
                  {(item.created_by || 'A')[0].toUpperCase()}
                </div>
                {item.created_by || 'Anonymous'}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Source</h3>
              <div className="flex items-center gap-2 text-sm text-zinc-900 dark:text-zinc-200">
                <Globe className="w-3.5 h-3.5 text-zinc-400" />
                <span className="capitalize">{item.source || 'Unknown'}</span>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Component</h3>
              <div className="text-sm text-zinc-900 dark:text-zinc-200">
                {item.component_name || 'Not specified'}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Variant</h3>
              <div className="text-sm text-zinc-900 dark:text-zinc-200">
                {item.component_variant || 'Not specified'}
              </div>
            </div>

            <div className="col-span-2">
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Context</h3>
              <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-mono bg-zinc-50 dark:bg-zinc-900 p-2 rounded border border-zinc-100 dark:border-zinc-800">
                {item.context || 'No context provided'}
              </div>
            </div>

            <div className="col-span-2">
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Timestamp</h3>
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
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(item.metadata, null, 2));
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
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

        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
          <button className="w-full text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-sm font-medium flex items-center justify-center gap-2 transition-all px-4 py-2.5 rounded border border-zinc-200 dark:border-zinc-800 hover:border-red-200 dark:hover:border-red-900/50">
            <Trash2 className="w-4 h-4" />
            Delete Feedback
          </button>
        </div>
      </motion.div>
    </>
  );
};

// --- Main Table ---
function FeedbackTable({ workspaceId }: { workspaceId: string | null }) {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Feedback | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [uniqueUsers, setUniqueUsers] = useState<string[]>([]);

  // Fetch data
  useEffect(() => {
    const loadData = async () => {
      if (!workspaceId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append('workspace_id', workspaceId);
        if (debouncedSearch) params.append('search', debouncedSearch);
        if (selectedUser) params.append('created_by', selectedUser);

        const response = await axios.get(`/api/feedback?${params.toString()}`);
        setFeedback(response.data);

        // Extract unique users if not already populated (or update it)
        // Note: Ideally this comes from a separate aggregation query, but for now we extract from the result
        // However, if we filter, we lose other users. So we should only extract on initial load.
        // For simplicity in this "lab" view, we'll just add any new users we see to the list.
        if (!selectedUser && !debouncedSearch) {
          const users = Array.from(new Set(response.data.map((f: Feedback) => f.created_by).filter(Boolean))) as string[];
          setUniqueUsers(users.sort());
        }
      } catch (error) {
        console.error('Failed to fetch feedback:', error);
        setFeedback([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [workspaceId, debouncedSearch, selectedUser]);

  const handleCopy = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    // setCopiedId(id); // This state was removed
    // setTimeout(() => setCopiedId(null), 2000); // This state was removed
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this feedback?")) {
      setFeedback(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
          <input
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-sm pl-9 pr-4 py-2 focus:border-zinc-500 outline-none transition-all placeholder:text-zinc-400"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* User Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all border",
                selectedUser
                  ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white"
                  : "bg-transparent text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
              )}>
                <User className="w-3 h-3" />
                {selectedUser || "All Users"}
                <ChevronDown className="w-3 h-3 opacity-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end">
              <div className="max-h-[300px] overflow-y-auto p-1">
                <DropdownMenuItem
                  onClick={() => setSelectedUser(null)}
                  className="text-xs cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    All Users
                    {!selectedUser && <Check className="w-3 h-3" />}
                  </div>
                </DropdownMenuItem>
                {uniqueUsers.map(user => (
                  <DropdownMenuItem
                    key={user}
                    onClick={() => setSelectedUser(user)}
                    className="text-xs cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="truncate">{user}</span>
                      {selectedUser === user && <Check className="w-3 h-3" />}
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="flex items-center gap-2 px-3 py-1.5 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <Filter className="w-3 h-3" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                <th className="py-3 px-4 w-[140px] font-medium">User</th>
                <th className="py-3 px-4 w-[120px] font-medium">Type</th>
                <th className="py-3 px-4 w-[80px] text-center font-medium">Rating</th>
                <th className="py-3 px-4 font-medium">Feedback</th>
                <th className="py-3 px-4 w-[160px] font-medium">Date</th>
                <th className="py-3 px-4 w-[50px]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-zinc-300 mx-auto" />
                  </td>
                </tr>
              ) : feedback.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-zinc-400">
                      <Inbox className="w-8 h-8 mb-3 opacity-20" />
                      <p className="text-sm">No feedback found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                feedback.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/50 cursor-pointer transition-colors"
                  >
                    {/* User */}
                    <td className="py-3 px-4 align-top">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-medium text-zinc-500">
                          {(item.created_by || 'A')[0].toUpperCase()}
                        </div>
                        <span className="text-xs text-zinc-700 dark:text-zinc-300 truncate max-w-[100px]" title={item.created_by || 'Anonymous'}>
                          {item.created_by || 'Anonymous'}
                        </span>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-3 px-4 align-top">
                      <div className="flex flex-col items-start gap-1">
                        <TypeBadge type={item.type} />
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="py-3 px-4 align-top text-center">
                      <RatingBadge rating={item.rating} />
                    </td>

                    {/* Feedback */}
                    <td className="py-3 px-4 align-top">
                      <div className="flex items-start gap-3">
                        {item.emoji && <span className="text-lg flex-shrink-0 grayscale opacity-80">{item.emoji}</span>}
                        <div className="space-y-1">
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                            {item.comment || <span className="italic opacity-50">No comment</span>}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 align-top">
                      <span className="text-xs text-zinc-500">
                        {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        <span className="text-zinc-300 dark:text-zinc-700 mx-1">•</span>
                        {new Date(item.created_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 align-top text-right">
                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-zinc-400 hover:text-red-500 rounded transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && <FeedbackDrawer item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </div>
  );
}

// --- Page Component ---
export default function FeedbackPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [loadingWorkspace, setLoadingWorkspace] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [dateRange, setDateRange] = useState<'1d' | '7d' | '1m' | 'max'>('1m');
  const [customDateRange, setCustomDateRange] = useState<{ start: string; end: string } | null>(null);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

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

      setLoadingStats(true);
      try {
        let url = `/api/feedback/stats?workspace_id=${workspaceId}&range=${dateRange}`;

        if (customDateRange) {
          url = `/api/feedback/stats?workspace_id=${workspaceId}&start_date=${customDateRange.start}&end_date=${customDateRange.end}`;
        }

        const response = await axios.get(url);
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, [workspaceId, dateRange, customDateRange]);

  if (loadingWorkspace) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-300" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8 space-y-12">
      {/* Header & Controls */}
      <div className="flex flex-col gap-8">
        <div className="flex items-baseline justify-between">
          <h1 className="text-xl font-medium text-zinc-900 dark:text-white tracking-tight">Feedback</h1>

          {/* Date Range Selector */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {(['1d', '7d', '1m', 'max'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => { setDateRange(range); setCustomDateRange(null); }}
                  className={cn(
                    "px-2 py-1 text-[11px] font-medium transition-all border-b-2",
                    dateRange === range && !customDateRange
                      ? "border-zinc-900 dark:border-white text-zinc-900 dark:text-white"
                      : "border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                  )}
                >
                  {range === '1d' ? '24h' : range === '7d' ? '7d' : range === '1m' ? '30d' : 'All'}
                </button>
              ))}
            </div>

            <div className="w-px h-3 bg-zinc-200 dark:bg-zinc-800" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={cn(
                  "flex items-center gap-2 text-[11px] font-medium transition-colors",
                  customDateRange ? "text-zinc-900 dark:text-white" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                )}>
                  <CalendarIcon className="w-3 h-3" />
                  {customDateRange ? `${customDateRange.start} - ${customDateRange.end}` : 'Custom'}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={customDateRange ? { from: new Date(customDateRange.start), to: new Date(customDateRange.end) } : undefined}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      setCustomDateRange({
                        start: range.from.toISOString().split('T')[0],
                        end: range.to.toISOString().split('T')[0]
                      });
                    }
                  }}
                  initialFocus
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loadingStats ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-zinc-50 dark:bg-zinc-900/50 animate-pulse rounded" />
            ))
          ) : stats ? (
            <>
              <div className="space-y-2">
                <h3 className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Rating Trend</h3>
                <ClippedAreaChart
                  className="border-none shadow-none bg-transparent p-0"
                  data={stats?.areaChartData}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Distribution</h3>
                <RoundedPieChart
                  className="border-none shadow-none bg-transparent p-0"
                  data={stats?.pieChartData}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Sources</h3>
                <ValueLineBarChart
                  className="border-none shadow-none bg-transparent p-0"
                  data={stats?.barChartData}
                />
              </div>
            </>
          ) : (
            <div className="col-span-3 text-center py-12 text-zinc-400 text-sm">
              No stats data available
            </div>
          )}
        </div>
      </div>

      {/* Table Section */}
      <FeedbackTable workspaceId={workspaceId} />
    </div>
  );
}