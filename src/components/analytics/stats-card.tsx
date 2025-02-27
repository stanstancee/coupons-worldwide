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
          className={cn(
            " text-[#717579] font-bold ",
            isLast && "font-normal"
          )}
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
  return (
    <div className="">
      <section className="shadow-cards rounded-[10.41px] bg-white p-4 md:py-6 md:px-6">
        <div>
          <h1 className="font-bold text-lg md:text-xl mb-3">Insights </h1>
          <p className="font-normal text-sm text-[#717579] mb-7">
            See reports about your overall store performance since your started
            using our platform
          </p>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2 2xl:grid-cols-4  md:justify-between gap-6">
          {dummyData.map((data, index) => (
            <StatsCard key={index} {...data} />
          ))}
        </div>
      </section>
    </div>
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
