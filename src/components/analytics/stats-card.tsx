"use client";
import { StatsCards } from "../dashboard/stats-card";

export const AnalyticsStatsCards = () => {
  return (
    <div className="">
      <section className="shadow-cards rounded-[10.41px] bg-white ">
        <div className="px-4 pt-4 md:pt-6 md:px-6">
          <h1 className="font-bold text-lg md:text-xl mb-3">Insights </h1>
          <p className="font-normal text-sm text-[#717579] ">
            See reports about your overall store performance since your started
            using our platform
          </p>
        </div>
        <StatsCards />
      </section>
    </div>
  );
};
