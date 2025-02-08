import React from "react";
import TopNav from "@/components/nav/top-nav";

import EditCampaignForm from "@/components/campaign/edit-campaign-form ";



const CampaignContainer = () => {
  return (
    <div>
      <TopNav title="Campaign" />
      <main className="p-4 md:px-5 md:py-6 space-y-4 md:space-y-6 xl:space-y-8 pb-12">
        <EditCampaignForm />
       
      </main>
    </div>
  );
};

export default CampaignContainer;
