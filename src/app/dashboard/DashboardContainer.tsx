import React from "react";
import TopNav from "@/components/nav/top-nav";
import { StatsCards } from "@/components/dashboard/stats-card";
import { FollowersChart } from "@/components/dashboard/followers-chart";
import { TopCountries } from "@/components/dashboard/top-countries";
import { CampaignTable } from "@/components/dashboard/campaign-table";
import { PromotionStatus } from "@/components/dashboard/promotion-status";
import WalletBalance from "@/components/dashboard/wallet-balance";

const DashboardContainer = () => {
  return (
    <div className="">
      <TopNav title="Dashboard" />
      <div className="flex w-full flex-col gap-4 md:gap-6 pt-3 px-4 md:px-6 pb-12 ">
        <StatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          <div className="lg:col-span-8">
            <FollowersChart />
          </div>
          <div className="lg:col-span-4 rounded-[10px] bg-white p-4 md:py-5 shadow-cards md:pb-16">
            <TopCountries />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          <div className="lg:col-span-8 rounded-lg bg-white p-6 shadow">
            <CampaignTable />
          </div>
          <div className="lg:col-span-4 space-y-5">
            <WalletBalance />
            <PromotionStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
