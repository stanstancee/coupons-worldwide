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
  { month: "August", followers: 450000 },
  { month: "September", followers: 320000 },
  { month: "September", followers: 112000 },
  { month: "September", followers: 320090 },
  { month: "October", followers: 380000 },
  { month: "November", followers: 520000 },
  { month: "December", followers: 380000 },
  { month: "January", followers: 675451 },
  { month: "February", followers: 580000 },
];

const yAxisLines = [200000, 400000, 600000, 800000];

export function FollowersChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between ">
        <div className="space-y-4">
          <CardTitle className="md:text-2xl text-lg text font-bold">
            Followers Statistics
          </CardTitle>
          <div className="flex items-baseline space-x-2">
            <span className="lg:text-[27px] text-xl font-bold">867,123k</span>
            <span className="md:text-xs text-[9px]  text-[#1D1B23]">
              +9% from last month
            </span>
          </div>
        </div>
        <Select defaultValue="this-month" >
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
            followers: {
              label: "Followers",
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
              dataKey="followers"
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
                strokeWidth={.1}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
