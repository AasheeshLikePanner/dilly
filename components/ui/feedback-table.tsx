'use client'
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Eye, Pencil, Trash } from "lucide-react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "./dialog";
import { toast } from "sonner";

type Feedback = {
  id: string;
  created_at: string;
  workspace_id: string;
  type: 'emoji' | 'slider' | 'form';
  rating: number | null;
  comment: string | null;
  emoji: string | null;
  source: string | null;
  metadata: object | null;
  created_by: string | null;
};

const getTypeClasses = (type: string) => {
  switch (type) {
    case "emoji": return "bg-yellow-500/20 text-yellow-500";
    case "slider": return "bg-blue-500/20 text-blue-500";
    case "form": return "bg-green-500/20 text-green-500";
    case "test": return "bg-purple-500/20 text-purple-500";
    default: return "bg-gray-500/20 text-gray-500";
  }
};

export function FeedbackTable({ workspaceSlug }: { workspaceSlug: string }) {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMetadata, setSelectedMetadata] = useState<object | null>(null);

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
    const fetchFeedback = async () => {
      if (workspaceId) {
        try {
          const response = await fetch(`/api/feedback?workspace_id=${workspaceId}`);
          if (!response.ok) throw new Error('Failed to fetch feedback');
          const data = await response.json();
          setFeedback(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchFeedback();
  }, [workspaceId]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feedback?')) {
      return;
    }
    try {
      const response = await fetch(`/api/feedback/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete feedback');
      }
      setFeedback(feedback.filter(item => item.id !== id));
      toast.success('Feedback deleted successfully');
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    }
  };

  if (loading) return <div>Loading feedback...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Emoji</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Metadata</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedback.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.created_by || 'Anonymous'}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {item.type}
                </Badge>
              </TableCell>
              <TableCell className="text-xl">{item.emoji || 'N/A'}</TableCell>
              <TableCell>
                <span className="font-semibold">{item.rating !== null ? `${item.rating}/10` : 'N/A'}</span>
              </TableCell>
              <TableCell>
                <div className="max-w-xs break-words">{item.comment || 'No comment'}</div>
              </TableCell>
              <TableCell>
                {item.metadata ? (
                  <Button variant="ghost" size="icon" onClick={() => setSelectedMetadata(item.metadata)}>
                    <Eye className="h-5 w-5" />
                  </Button>
                ) : 'N/A'}
              </TableCell>
              <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant="ghost" size="icon" disabled>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(item.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedMetadata} onOpenChange={() => setSelectedMetadata(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feedback Metadata</DialogTitle>
            <DialogDescription >
              Detailed metadata associated with the feedback entry.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 max-h-96 overflow-y-auto rounded bg-gray-900 p-4">
            <pre className="text-sm text-white">
              {selectedMetadata ? JSON.stringify(selectedMetadata, null, 2) : ''}
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}