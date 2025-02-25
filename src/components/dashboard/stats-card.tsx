"use client";

import { cn } from "@/lib/utils";

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
    <div className="flex md:gap-8 gap-4 border-b pb-4 md:border-0 md:pb-0">
      <div
        className={cn(
          `rounded-[31.59px] h-[61.21px] w-[19.2px] `,
          color === "blue" && "bg-c-blue",
          color === "orange" && "bg-c-orange",
          color === "green" && "bg-c-green",
          color === "red" && "bg-c-red"
        )}
      />
      <div className="space-y-2">
        <p
          className={cn(
            " text-[#717579] font-bold md:text-[22px]",
            isLast && "font-normal"
          )}
        >
          {title}
        </p>
        <p className="xl:text-4xl md:text-3xl text-2xl font-bold text-[#1D1B23]">{value}</p>
        <p className="text-[#717579] md:text-xl">{subtitle}</p>
      </div>
    </div>
  );
}

export const StatsCards = () => {
  return (
    <section className="shadow-cards rounded-[10.41px] bg-white p-4 md:py-[3.75rem] md:px-6">
      <div className="flex flex-col lg:flex-row md:justify-between gap-6">
        {dummyData.map((data, index) => (
          <StatsCard key={index} {...data} />
        ))}
      </div>
    </section>
  );
};

const dummyData: StatsCardProps[] = [
  {
    title: "Total Campaigns",
    value: "63,500",
    subtitle: "112 Active",
    color: "blue",
  },

  {
    title: "Coupons Value",
    value: "$97,125 ",
    subtitle: "124 Redeemed",
    color: "orange",
  },

  {
    title: "Coupons Grabbed",
    value: "$872,335",
    subtitle: "321k This Month",
    color: "green",
  },

  {
    title: "Followers",
    value: "21,224",
    subtitle: "22 Average Monthly ",
    color: "red",
    isLast: true,
  },
];
