import React from "react";
import TopNav from "@/components/nav/top-nav";
import NewCampaignHeader from "@/components/campaign/new-campaign-header";
import CreateCampaignForm from "@/components/campaign/create-campaign-form";

const CampaignContainer = () => {
  return (
    <div>
      <TopNav title="Campaign" />
      <main className="p-4 md:px-5 md:py-6 space-y-6">
        <NewCampaignHeader />
        <CreateCampaignForm />
      </main>
    </div>
  );
};

export default CampaignContainer;
