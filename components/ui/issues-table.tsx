"use client";

import { useState } from "react";
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
import issuesData from "@/data/issues.json";

const generateId = (issueType: string) => {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${issueType.toLowerCase()}-${randomString}`;
};

const initialIssues = issuesData
  .filter(issue => issue.issueType === "Bug") // Filter for bugs
  .map(issue => ({
    ...issue,
    id: generateId(issue.issueType),
  }));

const statusOptions = ["Open", "In Progress", "Closed", "Resolved", "Testing"];

const getStatusClasses = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-sky-500/20 text-sky-500";
    case "In Progress":
      return "bg-amber-500/20 text-amber-500";
    case "Closed":
      return "bg-gray-500/20 text-gray-500";
    case "Resolved":
      return "bg-emerald-500/20 text-emerald-500";
    case "Testing":
      return "bg-indigo-500/20 text-indigo-500";
    default:
      return "bg-gray-500/20 text-gray-500";
  }
};

export function IssuesTable() {
  const [issues, setIssues] = useState(initialIssues);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<any>({});
  const [userToBlock, setUserToBlock] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const handleEdit = (issue: any) => {
    setEditingRowId(issue.id);
    setEditedData(issue);
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setEditedData({});
  };

  const handleSave = () => {
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

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">ID</TableHead>
            <TableHead className="w-[200px]">Issue Title</TableHead>
            <TableHead className="w-[300px]">Description</TableHead>
            <TableHead className="w-[100px]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    Status <span className="ml-2">▾</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {statusOptions.map((option) => (
                    <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>
            <TableHead>Submitted By</TableHead>
            <TableHead className="w-[120px]">Date Attached</TableHead>
            <TableHead className="w-[60px]">Assets</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => {
            const isExpanded = expandedRows.has(issue.id);
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
                      <Select value={editedData.status} onValueChange={(value) => handleChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{editedData.submittedBy}</TableCell>
                    <TableCell>{editedData.dateAttached}</TableCell>
                    <TableCell>
                      {editedData.assets && <Image className="h-5 w-5" />}
                    </TableCell>
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
                        <span className={cn({ "whitespace-nowrap overflow-hidden text-ellipsis": !isExpanded })}>{issue.id}</span>
                        <Button variant="ghost" size="icon" onClick={() => handleCopy(issue.id)}>
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
                      <div className={cn({ "whitespace-nowrap overflow-hidden text-ellipsis": !isExpanded })}>
                        {issue.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("border-transparent", getStatusClasses(issue.status), { "whitespace-nowrap overflow-hidden text-ellipsis": !isExpanded })}>
                        {issue.status}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className="cursor-pointer hover:line-through hover:text-red-500"
                      onClick={() => setUserToBlock(issue.submittedBy)}
                    >
                      <div className={cn({ "whitespace-nowrap overflow-hidden text-ellipsis": !isExpanded })}>
                        {issue.submittedBy}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={cn({ "whitespace-nowrap overflow-hidden text-ellipsis": !isExpanded })}>
                        {issue.dateAttached}
                      </div>
                    </TableCell>
                    <TableCell>
                      {issue.assets && <Image className="h-5 w-5" />}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(issue)}>
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