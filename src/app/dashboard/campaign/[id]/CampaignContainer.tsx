import React from "react";
import TopNav from "@/components/nav/top-nav";
import CampaignHeaderInfo from "@/components/campaign/campagn-header-info";
import { ClicksChart } from "@/components/campaign/clicks-chart";
import ReuseableStats from "@/components/ui/reuseable-stats";
import CampaignStats from "@/components/campaign/campaign-stats";
import RecentCampaigns from "@/components/campaign/recent-campaign";



const CampaignContainer = () => {
  return (
    <div>
      <TopNav title="Campaign Analytics " />
      <main className="p-4 md:px-5 md:py-6 space-y-4 md:space-y-6 xl:space-y-8 pb-12">
        <CampaignHeaderInfo />
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mt-4 md:mt-6">
          <section className="lg:col-span-8 space-y-4 md:space-y-6 xl:space-y-8 bg-white ">
            <ClicksChart />
          </section>
          <section className="lg:col-span-4 space-y-4 md:space-y-6 xl:space-y-8 ">
            <CampaignStats />
            <ReuseableStats
              title="Promotion Spent"
              amount={671}
              subtitle="Spent so far"
              trendData={[10, 25, 15, 45, 35, 70]}
            />
          </section>
        </section>
        <RecentCampaigns />
      
      </main>
    </div>
  );
};

export default CampaignContainer;
