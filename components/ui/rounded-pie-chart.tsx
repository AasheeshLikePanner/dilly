"use client";

import { LabelList, Pie, PieChart } from "recharts";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const description = "A pie chart with a label list";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function RoundedPieChart({ className, data }: { className?: string, data?: any[] }) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const displayData = data || chartData;

  // Handle both formats: {browser, visitors} and {name, value}
  const normalizedData = displayData.map(item => ({
    browser: item.name || item.browser,
    visitors: item.value || item.visitors,
    fill: item.fill
  }));

  const total = normalizedData.reduce((acc, curr) => acc + (curr.visitors || 0), 0);

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="flex flex-row items-start justify-between pb-0">
        <div className="items-center">
          <CardTitle>
            Status Distribution
            <Badge
              variant="outline"
              className="text-green-500 bg-green-500/10 border-none ml-2"
            >
              <TrendingUp className="h-4 w-4" />
              <span>{total} Total</span>
            </Badge>
          </CardTitle>
          <CardDescription>Bugs by Status</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="browser" />}
            />
            <Pie
              data={normalizedData}
              innerRadius={30}
              dataKey="visitors"
              nameKey="browser"
              radius={10}
              cornerRadius={8}
              paddingAngle={4}
            >
              <LabelList
                dataKey="browser"
                stroke="none"
                fontSize={12}
                fontWeight={500}
                className="fill-zinc-900 dark:fill-zinc-100"
                formatter={(value: string) => value.replace(/_/g, ' ')}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
