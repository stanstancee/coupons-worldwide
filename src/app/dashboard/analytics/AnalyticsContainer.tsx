
import React from "react";
import TopNav from "@/components/nav/top-nav";
import { StatsCards } from "@/components/analytics/stats-card";
import { FollowersChart } from "@/components/analytics/followers-chart";
import CampaignStats from "@/components/analytics/campaign-stats";
import { PromotionStatus } from "@/components/analytics/promotion-status";
import PromotionStats from "@/components/ui/reuseable-stats";
import TrendingCampaigns from "@/components/analytics/trending-campaigns";





const AnalyticsContainer = () => {
  return (
    <div>
      <TopNav title="Analytics" />
      <main className="p-4 md:px-5 md:py-6">
        <StatsCards />
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mt-4 md:mt-6">
          <section className="lg:col-span-8 space-y-4 md:space-y-6 xl:space-y-8 ">
            <FollowersChart />
            <TrendingCampaigns />
          </section>
          <section className="lg:col-span-4 space-y-4 md:space-y-6 xl:space-y-8">
            <CampaignStats />
            <PromotionStats
              title="Promotion Spent"
              amount={67124}
              subtitle="Spent so far"
              trendData={[10, 25, 15, 45, 35, 70]}
            />
            <PromotionStats
              title="Wallet Balance"
              amount={54321}
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
