"use client";

import { Area, AreaChart, XAxis, YAxis, ReferenceLine } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { month: "August", clicks: 450000 },
  { month: "September", clicks: 320000 },
  { month: "September", clicks: 112000 },
  { month: "September", clicks: 320090 },
  { month: "October", clicks: 380000 },
  { month: "November", clicks: 520000 },
  { month: "December", clicks: 380000 },
  { month: "January", clicks: 675451 },
  { month: "February", clicks: 580000 },
];

const yAxisLines = [200000, 400000, 600000, 800000];

/**
 * Renders a card component displaying follower statistics with an interactive chart.
 * The card includes a header with the current follower count and a comparison to the previous month.
 * A dropdown allows the user to select different time periods for data visualization.
 * The chart visualizes follower data over a specified time range, using an AreaChart with X and Y axes.
 * It includes reference lines to provide context for follower count thresholds.
 */

export function ClicksChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between ">
        <div className="space-y-4 md:space-y-8">
          <CardTitle className="text-xl font-bold">Click Summary</CardTitle>
          <div className="flex items-baseline space-x-2">
            <span className="lg:text-[27px] text-xl font-bold">867,123k</span>
          </div>
        </div>
        <Select defaultValue="this-month">
          <SelectTrigger className="text-primary text-sm bg-[#F6F6F6] w-max gap-2 font-bold ">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            clicks: {
              label: "Clicks",
              color: "hsl(230 90% 30%)",
            },
          }}
          className="h-[350px] w-full"
        >
          <AreaChart data={data}>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="#1A2B88"
              strokeWidth={2}
              fill="#1A2B88"
              fillOpacity={1}
            />
            {yAxisLines.map((yValue) => (
              <ReferenceLine
                key={yValue}
                y={yValue}
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="0"
                strokeWidth={0.1}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
