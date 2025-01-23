"use client";

import { Card, CardContent } from "@/components/ui/card";

interface PromotionStatsProps {
  title: string;
  amount: number;
  subtitle: string;
  trendData: number[]; // Array of numbers for the trend line
}

export default function ReuseableStats({
  title = "Promotion Spent",
  amount = 67124,
  subtitle = "Spent so far",
  trendData = [0, 20, 10, 30, 15, 45],
}: PromotionStatsProps) {
  // Determine if the trend is up or down
  const isTrendUp = trendData[trendData.length - 1] > trendData[0];
  const trendColor = isTrendUp ? "#09BD3C" : "#E02849"; // Green if up, red if down

  // Calculate points for the trend line
  const points = trendData
    .map((value, index) => {
      const x = (index / (trendData.length - 1)) * 100;
      const y =
        100 -
        ((value - Math.min(...trendData)) /
          (Math.max(...trendData) - Math.min(...trendData))) *
          100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Card className="rounded-lg bg-white  shadow-cards">
      <CardContent className="p-6 md:py-8  relative flex items-center gap-3 ">
        <div>
          <h3 className="text-xl font-bold text-[#1D1B23] mb-1">{title}</h3>

          <div className="space-y-1">
            <p className="md:text-[30px] text-2xl font-bold tracking-tight">
              ${amount.toLocaleString()}
            </p>
            <p className="text-[13px] text-[#717579]">{subtitle}</p>
          </div>
        </div>
        <div className="h-16 w-24 ">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polyline
              points={points}
              fill="none"
              stroke={trendColor}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
