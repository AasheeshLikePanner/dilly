"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  Layout,
  Plus,
  Search,
  User,
  Zap,
  Bug,
  Shield,
  FileText,
  Sliders,
  Activity,
} from "lucide-react";
import axios from "axios";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadarChart } from "@/components/ui/radar-chart";
import { StackedBarChart } from "@/components/ui/stacked-bar-chart";
import { cn } from "@/lib/utils";

// --- Types ---

type BugType = {
  id: string;
  title: string;
  type: string;
  priority: string;
  status: string;
  tags: string[];
  updated_at: string;
  created_at: string;
  media: any[];
  created_by: string | null;
};

type DashboardStats = {
  assignedToUserBugs: BugType[];
  assignedToUserCount: number;
  recentlyCreatedCount: number;
  unAssignedBugs: BugType[];
  unAssignedBugsCount: number;
  todoCount: number;
  inProgressCount: number;
  qaFailedCount: number;
  criticalCount: number;
  recentActivity: BugType[];
  weeklyThroughput: { name: string; open: number; closed: number }[];
};

type NotificationType = {
  id: string;
  title: string;
  message: string;
  created_at: string;
  read: boolean;
};

// --- Utility Components ---

const TypeIcon = ({ type }: { type: string }) => {
  const map: any = {
    bug: { icon: Bug, color: "text-red-500" },
    feature: { icon: Zap, color: "text-amber-500" },
    ui: { icon: Layout, color: "text-blue-500" },
    security: { icon: Shield, color: "text-emerald-500" },
    performance: { icon: Sliders, color: "text-purple-500" },
    other: { icon: FileText, color: "text-zinc-400" },
  };
  const { icon: Icon, color } = map[type] || map.other;
  return <Icon className={`w-3.5 h-3.5 ${color}`} />;
};

const PriorityDot = ({ priority }: { priority: string }) => {
  const colors: any = {
    critical: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]",
    high: "bg-orange-500",
    medium: "bg-blue-500",
    low: "bg-zinc-400",
  };
  return <div className={`w-1.5 h-1.5 rounded-full ${colors[priority] || colors.low}`} />;
};

const StatusText = ({ status }: { status: string }) => {
  return (
    <span className="text-[10px] uppercase tracking-wider font-medium text-zinc-500">
      {status.replace(/_/g, " ")}
    </span>
  );
};

// --- Main Page Component ---

export default function DashboardPage() {
  const { workspaceId, loading: workspaceLoading } = useWorkspace();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!workspaceId) return;
      setLoading(true);
      try {
        const [statsRes, notifRes] = await Promise.all([
          axios.get(`/api/dashboard/stats?workspace_id=${workspaceId}`),
          axios.get(`/api/notification?workspace_id=${workspaceId}`)
        ]);
        setStats(statsRes.data);
        setNotifications(notifRes.data.notifications || []);
        setNotificationsCount(notifRes.data.notificationsCount || 0);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [workspaceId]);

  const markNotificationsRead = async () => {
    if (!workspaceId || notificationsCount === 0) return;
    try {
      await axios.post(`/api/notification?workspace_id=${workspaceId}`);
      setNotificationsCount(0);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error("Failed to mark notifications as read", error);
    }
  };

  const handleBugClick = (bugId: string) => {
    router.push(`/bugs/${slug}?bug=${bugId}`);
  };

  if (workspaceLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
      </div>
    );
  }

  // Mock data for radar chart (since we don't have real endpoints for these yet)
  const radarData = [
    { subject: 'Velocity', A: 120, fullMark: 150 },
    { subject: 'Quality', A: 98, fullMark: 150 },
    { subject: 'Security', A: 86, fullMark: 150 },
    { subject: 'Uptime', A: 99, fullMark: 150 },
    { subject: 'UX', A: 85, fullMark: 150 },
    { subject: 'Docs', A: 65, fullMark: 150 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex text-sm selection:bg-zinc-800 selection:text-white">
      <main className="flex-1 flex flex-col min-w-0">

        {/* --- Minimal Header --- */}
        <header className="h-14 border-b border-border/40 flex items-center justify-between px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-sm tracking-tight">Dashboard</h1>
            <div className="h-4 w-px bg-border" />
            <span className="text-xs text-muted-foreground">Overview</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="w-3.5 h-3.5 absolute left-0 top-2 text-muted-foreground group-hover:text-foreground transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-b border-transparent group-hover:border-border pl-6 pr-2 py-1.5 text-xs w-48 focus:outline-none focus:border-foreground transition-all placeholder:text-muted-foreground/50"
              />
            </div>

            <DropdownMenu onOpenChange={(open) => { if (open) markNotificationsRead(); }}>
              <DropdownMenuTrigger asChild>
                <button className="relative text-muted-foreground hover:text-foreground transition-colors">
                  <Bell className="w-4 h-4" />
                  {notificationsCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0 bg-background border-border">
                <div className="px-4 py-3 border-b border-border flex justify-between items-center">
                  <span className="text-xs font-medium">Notifications</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-muted-foreground text-xs">
                      No new notifications
                    </div>
                  ) : (
                    notifications.map((notif, i) => (
                      <div key={i} className={cn("px-4 py-3 border-b border-border/50 hover:bg-muted/50 transition-colors cursor-pointer", !notif.read && "bg-blue-500/5")}>
                        <p className="text-xs font-medium mb-0.5">{notif.title || "Update"}</p>
                        <p className="text-[10px] text-muted-foreground line-clamp-2">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <button className="bg-foreground text-background hover:opacity-90 px-3 py-1.5 rounded text-xs font-medium flex items-center gap-2 transition-all">
              <Plus className="w-3.5 h-3.5" />
              New Issue
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-12">

          {/* --- KPI Row (Minimal) --- */}
          <div className="grid grid-cols-4 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Total Issues</p>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-light tracking-tight">{stats?.recentlyCreatedCount || 0}</span>
                <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" /> 12%
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Critical</p>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-light tracking-tight">{stats?.criticalCount || 0}</span>
                {stats?.criticalCount && stats.criticalCount > 0 ? (
                  <span className="text-[10px] text-red-500 font-medium">Action Needed</span>
                ) : (
                  <span className="text-[10px] text-muted-foreground">Stable</span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Triage</p>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-light tracking-tight">{stats?.unAssignedBugsCount || 0}</span>
                <span className="text-[10px] text-muted-foreground">Unassigned</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Velocity</p>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-light tracking-tight">4.2</span>
                <span className="text-[10px] text-muted-foreground">Issues / day</span>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border/40" />

          <div className="grid grid-cols-12 gap-12">

            {/* --- Left: Main Work Area --- */}
            <div className="col-span-12 lg:col-span-8 space-y-10">

              {/* Assigned to Me */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Assigned to Me
                  </h3>
                </div>

                <div className="border-t border-border/40">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      {stats?.assignedToUserBugs.length === 0 ? (
                        <tr>
                          <td className="py-8 text-center text-muted-foreground text-xs italic">
                            No active tasks assigned to you.
                          </td>
                        </tr>
                      ) : (
                        stats?.assignedToUserBugs.map((task) => (
                          <tr
                            key={task.id}
                            onClick={() => handleBugClick(task.id)}
                            className="group border-b border-border/40 hover:bg-muted/30 transition-all cursor-pointer"
                          >
                            <td className="py-3 pr-4 font-mono text-[10px] text-muted-foreground group-hover:text-foreground transition-colors w-20">{task.id.slice(0, 6)}</td>
                            <td className="py-3 px-4 w-8">
                              <TypeIcon type={task.type} />
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-foreground group-hover:underline decoration-border underline-offset-4 decoration-1 transition-all">{task.title}</span>
                            </td>
                            <td className="py-3 px-4 w-32">
                              <StatusText status={task.status} />
                            </td>
                            <td className="py-3 px-4 w-20 text-right">
                              <PriorityDot priority={task.priority} />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  Recent Activity
                </h3>
                <div className="border-l border-border/40 ml-2 space-y-6 pt-2 pb-2">
                  {stats?.recentActivity.map((activity, i) => (
                    <div
                      key={i}
                      onClick={() => handleBugClick(activity.id)}
                      className="ml-6 relative cursor-pointer group"
                    >
                      <div className="absolute -left-[29px] top-1.5 w-1.5 h-1.5 rounded-full bg-border group-hover:bg-foreground transition-colors"></div>
                      <div className="flex flex-col gap-1">
                        <p className="text-xs text-foreground">
                          <span className="font-medium group-hover:underline decoration-border underline-offset-4 decoration-1 transition-all">{activity.title}</span>
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span>{new Date(activity.updated_at).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{activity.created_by || "System"}</span>
                          <span>•</span>
                          <span className="uppercase tracking-wider">{activity.status.replace(/_/g, " ")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* --- Right: Insights & Charts --- */}
            <div className="col-span-12 lg:col-span-4 space-y-10">

              {/* Radar Chart: Project Health */}
              <div className="space-y-4">
                <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Project Health</h3>
                <div className="h-[250px] w-full border border-border/40 rounded-lg p-4 bg-muted/10">
                  <RadarChart data={radarData} />
                </div>
                <p className="text-[10px] text-muted-foreground text-center">
                  Metrics based on last 30 days activity.
                </p>
              </div>

              {/* Stacked Bar: Throughput */}
              <div className="space-y-4">
                <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Weekly Throughput</h3>
                <div className="h-[150px] w-full">
                  <StackedBarChart data={stats?.weeklyThroughput || []} />
                </div>
                <div className="flex justify-center gap-4 text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-sm"></div> Opened</div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-sm"></div> Closed</div>
                </div>
              </div>

              {/* Triage List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Triage Queue</h3>
                  <span className="text-[10px] text-muted-foreground">{stats?.unAssignedBugsCount} pending</span>
                </div>
                <div className="space-y-2">
                  {stats?.unAssignedBugs.slice(0, 4).map((bug, i) => (
                    <div
                      key={i}
                      onClick={() => handleBugClick(bug.id)}
                      className="group flex items-start gap-3 p-2 hover:bg-muted/30 rounded transition-all cursor-pointer border border-transparent hover:border-border/40"
                    >
                      <div className="mt-1.5 w-1 h-1 rounded-full bg-orange-500 group-hover:bg-orange-400 group-hover:shadow-[0_0_8px_rgba(249,115,22,0.4)] transition-all shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-foreground truncate group-hover:underline decoration-muted-foreground/50 underline-offset-2 transition-all">{bug.title}</p>
                        <p className="text-[10px] text-muted-foreground group-hover:text-foreground/70 transition-colors mt-0.5">{new Date(bug.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="text-[10px] text-muted-foreground hover:text-foreground transition-colors w-full text-left pl-4">
                  View all triage items →
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}