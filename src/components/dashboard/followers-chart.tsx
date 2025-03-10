"use client";

import { useDashboard } from "@/context/dashboard-context";
import { Area, AreaChart, XAxis, YAxis, ReferenceLine } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { NoData } from "../ui/no-data";

// const data = [
//   { month: "August", followers: 450000 },
//   { month: "September", followers: 320000 },
//   { month: "September", followers: 112000 },
//   { month: "September", followers: 320090 },
//   { month: "October", followers: 380000 },
//   { month: "November", followers: 520000 },
//   { month: "December", followers: 380000 },
//   { month: "January", followers: 675451 },
//   { month: "February", followers: 580000 },
// ];

const months = [
  {
    month: "January",
    id: 1,
  },
  {
    month: "February",
    id: 2,
  },
  {
    month: "March",
    id: 3,
  },
  {
    month: "April",
    id: 4,
  },
  {
    month: "May",
    id: 5,
  },
  {
    month: "June",
    id: 6,
  },
  {
    month: "July",
    id: 7,
  },
  {
    month: "August",
    id: 8,
  },
  {
    month: "September",
    id: 9,
  },
  {
    month: "October",
    id: 10,
  },
  {
    month: "November",
    id: 11,
  },
  {
    month: "December",
    id: 12,
  },
];

const formatNumber = (num: number) => {
  if (num === null || num === undefined) {
    return "0";
  } else {
    return new Intl.NumberFormat("en-US").format(num);
  }
};
export function FollowersChart() {
  const { dashboardData } = useDashboard();
  //calculate %
  const lastMonth =
    dashboardData?.followers?.last_7_months[0]?.total_followers || 0;
  const currentMonth = dashboardData?.total_followers || 0;
  const percentage = ((currentMonth - lastMonth) / lastMonth || 1) * 100;

  const yAxisLines = useMemo(() => {
    return (
      dashboardData?.followers?.last_7_months.map(
        (month) => month.total_followers
      ) || []
    );
  }, [dashboardData?.followers?.last_7_months]);

  const data = useMemo(() => {
    return (
      dashboardData?.followers?.last_7_months?.map((month) => ({
        month: months?.find((m) => m.id === month.month)?.month,
        followers: month.total_followers,
      })) || []
    );
  }, [dashboardData?.followers?.last_7_months]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between ">
        <div className="space-y-4">
          <CardTitle className="md:text-lg text-base xl:text-xl text font-bold">
            Followers Statistics
          </CardTitle>
          <div className="flex items-baseline space-x-2">
            <span className="lg:text-[27px] text-xl font-bold">
              {formatNumber(dashboardData?.total_followers || 0)}
            </span>
            <span className="md:text-xs text-[9px]  text-[#1D1B23]">
              {` +${percentage.toFixed(2)}% from last month`}
            </span>
          </div>
        </div>
        <Select defaultValue="this-month">
          <SelectTrigger className="text-primary text-sm bg-[#F6F6F6] w-max gap-2 font-bold ">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          {/* <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
          </SelectContent> */}
        </Select>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
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
                  strokeWidth={0.1}
                />
              ))}
            </AreaChart>
          </ChartContainer>
        ) : (
          <NoData
            title="No Followers"
            description="Followers statistics will be displayed here"
          />
        )}
      </CardContent>
    </Card>
  );
}
