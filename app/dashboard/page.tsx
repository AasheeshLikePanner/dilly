"use client";

import { ClippedAreaChart } from "@/components/ui/clipped-area-chart";
import { RoundedPieChart } from "@/components/ui/rounded-pie-chart";
import { ValueLineBarChart } from "@/components/ui/value-line-bar-chart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IssuesTable } from "@/components/ui/issues-table";

export default function DashboardPage() {
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
        <IssuesTable />
      </div>
    </div>
  );
}
