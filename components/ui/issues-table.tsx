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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash, Image, Check, X } from "phosphor-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const generateId = (issueType: string) => {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${issueType.toLowerCase()}-${randomString}`;
};

const issuesData = [
  {
    issueType: "Bug",
    title: "App Crash on Startup",
    description: "The app crashes on startup on iOS 17.",
    status: "In Progress",
    dateAttached: "2024-05-23",
    assets: true,
  },
  {
    issueType: "Feature",
    title: "Dark Mode Toggle",
    description: "Add a dark mode toggle to the settings page.",
    status: "Open",
    dateAttached: "2024-05-22",
    assets: false,
  },
  {
    issueType: "Documentation",
    title: "Outdated API Docs",
    description: "The API documentation for the /users endpoint is outdated.",
    status: "Closed",
    dateAttached: "2024-05-21",
    assets: true,
  },
];

const initialIssues = issuesData.map(issue => ({
  ...issue,
  id: generateId(issue.issueType),
}));

const statusOptions = ["Open", "In Progress", "Closed", "Resolved", "Testing"];
const issueTypeOptions = ["Bug", "Feature", "Documentation", "Other"];

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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Issue Title</TableHead>
          <TableHead>Issue Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>
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
          <TableHead>Date Attached</TableHead>
          <TableHead>Assets</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.map((issue) => (
          <TableRow key={issue.id}>
            {editingRowId === issue.id ? (
              <>
                <TableCell>{issue.id}</TableCell>
                <TableCell>
                  <Input value={editedData.title} onChange={(e) => handleChange('title', e.target.value)} />
                </TableCell>
                <TableCell>
                  <Select value={editedData.issueType} onValueChange={(value) => handleChange('issueType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {issueTypeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <TableCell>{issue.dateAttached}</TableCell>
                <TableCell>
                  {issue.assets && <Image className="h-5 w-5" />}
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
                <TableCell>{issue.id}</TableCell>
                <TableCell>{issue.title}</TableCell>
                <TableCell>{issue.issueType}</TableCell>
                <TableCell>{issue.description}</TableCell>
                <TableCell>
                  <Badge className={cn("border-transparent", getStatusClasses(issue.status))}>
                    {issue.status}
                  </Badge>
                </TableCell>
                <TableCell>{issue.dateAttached}</TableCell>
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
        ))}
      </TableBody>
    </Table>
  );
}
