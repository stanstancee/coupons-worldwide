"use client";
import React from "react";
import TopNav from "@/components/nav/top-nav";
import { AnalyticsStatsCards } from "@/components/analytics/stats-card";
import { FollowersChart } from "@/components/dashboard/followers-chart";
import CampaignStats from "@/components/analytics/campaign-stats";
import { PromotionStatus } from "@/components/dashboard/promotion-status";
import PromotionStats from "@/components/ui/reuseable-stats";
import TrendingCampaigns from "@/components/analytics/trending-campaigns";
import { useDashboard } from "@/context/dashboard-context";

const AnalyticsContainer = () => {
  const { business, dashboardData } = useDashboard();

  return (
    <div>
      <TopNav title="Analytics" />
      <main className="p-4 md:px-5 md:py-6">
        <AnalyticsStatsCards />
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mt-4 md:mt-6">
          <section className="lg:col-span-8 space-y-4 md:space-y-6 xl:space-y-8 ">
            <FollowersChart />
            <TrendingCampaigns />
          </section>
          <section className="lg:col-span-4 space-y-4 md:space-y-6 xl:space-y-8">
            <CampaignStats />
            <PromotionStats
              title="Promotion Spent"
              amount={parseFloat(dashboardData?.promotion_spent || "0")}
              subtitle="Spent so far"
              trendData={[10, 25, 15, 45, 35, 70]}
            />
            <PromotionStats
              title="Wallet Balance"
              amount={business?.wallet?.balance || 0}
              subtitle="Promotion Wallet Balance"
              trendData={[70, 65, 55, 40, 30, 20]}
            />
            <PromotionStatus />
          </section>
        </section>
      </main>
    </div>
  );
};

export default AnalyticsContainer;
