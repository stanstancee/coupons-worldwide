import React from "react";
import TopNav from "@/components/nav/top-nav";

import CreateCampaignForm from "@/components/campaign/create-campaign-form";

const CampaignContainer = () => {
  return (
    <div>
      <TopNav title="Campaign" />
     
      
        <CreateCampaignForm />
    
    </div>
  );
};

export default CampaignContainer;
