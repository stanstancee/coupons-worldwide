"use client";

import { MiniTrendline } from "./mini-trendline";

interface SimpleMetricProps {
  value: string;
  label: string;
  trend?: number[];
  className?: string;
}

export function SimpleMetric({
  value,
  label,
  trend = [4, 7, 5, 9, 6, 8],
  className = "",
}: SimpleMetricProps) {
  return (
    <div
      className={`flex items-center gap-4 xl:gap-10 p-4 md:py-7 md:px-6 rounded-lg bg-white ${className}`}
    >
      <div className="text-[#1D1B23]">
        <div className="md:text-3xl text-xl font-bold text-[#1D1B23]">
          {value}
        </div>
        <div className="text-sm font-medium">{label}</div>
      </div>
      <div className="text-[#FED035]">
        <MiniTrendline data={trend} />
      </div>
    </div>
  );
}
