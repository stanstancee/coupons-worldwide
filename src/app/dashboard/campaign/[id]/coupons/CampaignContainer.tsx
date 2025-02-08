import React from "react";
import TopNav from "@/components/nav/top-nav";
import CampaignHeaderInfo from "@/components/campaign/campagn-header-info";
import ListCampaigns from "@/components/campaign/list-campaign";

const CampaignContainer = () => {
  return (
    <div>
      <TopNav title="Campaign" />
      <main className="p-4 md:px-5 md:py-6 space-y-4 md:space-y-6 xl:space-y-8 pb-12">
        <CampaignHeaderInfo />
        <ListCampaigns />
      </main>
    </div>
  );
};

export default CampaignContainer;
