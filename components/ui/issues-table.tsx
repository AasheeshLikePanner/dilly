"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash, Image, Check, X, Copy } from "phosphor-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


// Define the type for a bug item
type Profile = {
  email: string | null;
  full_name: string | null;
};

type Bug = {
  id: string;
  created_at: string;
  updated_at: string;
  workspace_id: string;
  assigned_to: string | null; // UUID
  profiles: Profile | null; // For assigned_to details
  title: string;
  description: string;
  type: string; // e.g., "Bug", "Feature", "Improvement"
  priority: string; // e.g., "High", "Medium", "Low"
  status: string; // e.g., "Open", "In Progress", "Closed", "Resolved"
  media: string[]; // Array of URLs or file paths
  tags: string[];
  created_by: string | null;
};

const statusOptions = ["Open", "In Progress", "Closed", "Resolved", "Testing"];

const getStatusClasses = (status: string) => {
  switch (status) {
    case "Open": return "bg-sky-500/20 text-sky-500";
    case "In Progress": return "bg-amber-500/20 text-amber-500";
    case "Closed": return "bg-gray-500/20 text-gray-500";
    case "Resolved": return "bg-emerald-500/20 text-emerald-500";
    case "Testing": return "bg-indigo-500/20 text-indigo-500";
    default: return "bg-gray-500/20 text-gray-500";
  }
};

const getPriorityClasses = (priority: string) => {
  switch (priority) {
    case "High": return "bg-red-500/20 text-red-500";
    case "Medium": return "bg-orange-500/20 text-orange-500";
    case "Low": return "bg-blue-500/20 text-blue-500";
    default: return "bg-gray-500/20 text-gray-500";
  }
};

export function IssuesTable({ workspaceSlug }: { workspaceSlug: string }) {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [issues, setIssues] = useState<Bug[]>([]); // Renamed to issues to match component name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<any>({});
  const [userToBlock, setUserToBlock] = useState<string | null>(null); // This might need to be removed or adapted
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    const resolveSlug = async () => {
      if (workspaceSlug) {
        try {
          const response = await fetch(`/api/workspaces/resolve-slug/${workspaceSlug}`);
          if (!response.ok) throw new Error('Failed to resolve workspace slug');
          const data = await response.json();
          setWorkspaceId(data.workspace_id);
        } catch (err: any) {
          setError(err.message);
          setLoading(false);
        }
      }
    };
    resolveSlug();
  }, [workspaceSlug]);

  useEffect(() => {
    const fetchIssues = async () => {
      if (workspaceId) {
        try {
          const response = await fetch(`/api/bugs?workspace_id=${workspaceId}`); // Fetch from /api/bugs
          if (!response.ok) throw new Error('Failed to fetch issues');
          const data = await response.json();
          setIssues(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchIssues();
  }, [workspaceId]);

  const handleEdit = (issue: any) => {
    setEditingRowId(issue.id);
    setEditedData(issue);
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setEditedData({});
  };

  const handleSave = () => {
    // This will need to be an API call (PUT/PATCH)
    setIssues(issues.map(issue => issue.id === editingRowId ? editedData : issue));
    setEditingRowId(null);
    setEditedData({});
  };

  const handleChange = (field: string, value: string) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const handleBlockUser = () => {
    if (userToBlock) {
      console.log(`Blocking user: ${userToBlock}`);
      // Here you would typically make an API call to block the user
      setUserToBlock(null);
    }
  };

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRowClick = (id: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (loading) return <div>Loading issues...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Media</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="w-[120px]">Created At</TableHead>
            <TableHead className="w-[120px]">Updated At</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => {
            const isExpanded = expandedRows.has(issue.id);
            const displayTags = issue.tags.length > 1 ? `${issue.tags[0]} +${issue.tags.length - 1}` : issue.tags[0];
            const assigneeName = issue.profiles?.full_name || issue.profiles?.email || 'Unassigned';

            return (
              <TableRow key={issue.id} onClick={() => handleRowClick(issue.id)} className="cursor-pointer">
                {editingRowId === issue.id ? (
                  <>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{editedData.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input value={editedData.title} onChange={(e) => handleChange('title', e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <Input value={editedData.description} onChange={(e) => handleChange('description', e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <Select value={editedData.type} onValueChange={(value) => handleChange('type', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bug">Bug</SelectItem>
                          <SelectItem value="feature">Feature</SelectItem>
                          <SelectItem value="ui">UI</SelectItem>
                          <SelectItem value="performance">Performance</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select value={editedData.priority} onValueChange={(value) => handleChange('priority', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select value={editedData.status} onValueChange={(value) => handleChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option} value={option.toLowerCase()}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {/* Assignee input - needs to be a select with profiles */}
                      <Input value={editedData.assigned_to || ''} onChange={(e) => handleChange('assigned_to', e.target.value)} />
                    </TableCell>
                    <TableCell>
                      {issue.media && issue.media.length > 0 && <Image className="h-5 w-5" />}
                    </TableCell>
                    <TableCell>
                      <Input value={editedData.tags?.join(', ')} onChange={(e) => handleChange('tags', e.target.value.split(',').map(tag => tag.trim()))} />
                    </TableCell>
                    <TableCell>{new Date(editedData.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(editedData.updated_at).toLocaleDateString()}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={handleSave}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleCancel}>
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={cn("font-mono text-xs", { "whitespace-nowrap overflow-hidden text-ellipsis": !isExpanded })}>{issue.id.substring(0, 8)}...</span>
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleCopy(issue.id); }}>
                          {copiedId === issue.id ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={cn({ "whitespace-nowrap overflow-hidden text-ellipsis": !isExpanded })}>
                        {issue.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={cn({ "whitespace-nowrap overflow-hidden text-ellipsis": !isExpanded, "text-gray-500": !issue.description })}>
                        {issue.description || 'No description provided'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{issue.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("border-transparent", getPriorityClasses(issue.priority))}>
                        {issue.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("border-transparent", getStatusClasses(issue.status))}>
                        {issue.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="font-medium">
                              {assigneeName}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            {issue.profiles?.email || 'Unassigned'}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      {issue.media && issue.media.length > 0 && <Image className="h-5 w-5" />}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {issue.tags && issue.tags.length > 0 ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge variant="outline">
                                  {displayTags}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                {issue.tags.join(', ')}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <Badge variant="outline">No Tags</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>{new Date(issue.created_at).toLocaleDateString()}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            Time: {new Date(issue.created_at).toLocaleTimeString()} Date: {new Date(issue.created_at).toLocaleDateString()}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>{new Date(issue.updated_at).toLocaleDateString()}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            Time: {new Date(issue.updated_at).toLocaleTimeString()} Date: {new Date(issue.updated_at).toLocaleDateString()}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleEdit(issue); }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Dialog open={!!userToBlock} onOpenChange={() => setUserToBlock(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block User</DialogTitle>
            <DialogDescription>
              Are you sure you want to block {userToBlock}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUserToBlock(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBlockUser}>
              Block
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
