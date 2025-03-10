"use client";

import { cn } from "@/lib/utils";
import { useDashboard } from "@/context/dashboard-context";

const formatNumber = (num: number) => {
  if (num === null || num === undefined) {
    return "0";
  } else {
    return new Intl.NumberFormat("en-US").format(num);
  }
};

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  color: "blue" | "orange" | "green" | "red";
  isLast?: boolean;
}

export function StatsCard({
  title,
  value,
  subtitle,
  color,
  isLast,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "flex md:gap-6 gap-4 border-b pb-4 lg:border-0  p-4 md:p-6 rounded-lg shadow-sm ",
        color === "blue" && "bg-c-blue/5",
        color === "orange" && "bg-c-orange/5",
        color === "green" && "bg-c-green/5",
        color === "red" && "bg-c-red/5"
      )}
    >
      <div
        className={cn(
          `rounded-[31.59px] h-[61.21px] w-[1rem] `,
          color === "blue" && "bg-c-blue",
          color === "orange" && "bg-c-orange",
          color === "green" && "bg-c-green",
          color === "red" && "bg-c-red"
        )}
      />
      <div className="space-y-2">
        <p
          className={cn(" text-[#717579] font-bold ", isLast && "font-normal")}
        >
          {title}
        </p>
        <p className="xl:text-2xl md:text-xl text-lg font-bold text-[#1D1B23]">
          {value}
        </p>
        <p className="text-[#717579] text-sm md:text-base">{subtitle}</p>
      </div>
    </div>
  );
}

export const StatsCards = () => {
  const { dashboardData } = useDashboard();
  const data: StatsCardProps[] = [
    {
      title: "Total Campaigns",
      value: formatNumber(dashboardData?.total_campaigns || 0),
      subtitle: `${formatNumber(dashboardData?.active_campaigns || 0)} Active`,
      color: "blue",
    },

    {
      title: "Coupons Value",
      value: `$${formatNumber(Number(dashboardData?.coupon_value) || 0)}`,
      subtitle: `${formatNumber(
        dashboardData?.coupons_redeemed || 0
      )} Redeemed`,
      color: "orange",
    },

    {
      title: "Coupons Grabbed",
      value: formatNumber(dashboardData?.coupons_grabbed || 0),
      subtitle: `${formatNumber(
        dashboardData?.total_followers || 0
      )} This Month`,
      color: "green",
    },

    {
      title: "Followers",
      value: formatNumber(dashboardData?.total_followers || 0),
      subtitle: `${formatNumber(
        Number(dashboardData?.followers?.avg_monthly) || 0
      )} Average Monthly`,
      color: "red",
      isLast: true,
    },
  ];

  return (
    <section className="shadow-cards rounded-[10.41px] bg-white p-4 md:py-[3.75rem] md:px-6">
      <div className="flex flex-col md:grid md:grid-cols-2 2xl:grid-cols-4  md:justify-between gap-6">
        {data.map((data, index) => (
          <StatsCard key={index} {...data} />
        ))}
      </div>
    </section>
  );
};
