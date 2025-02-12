/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import TopNav from "@/components/nav/top-nav";
import CampaignTable from "@/components/campaign/campaign-table";


const CampaignContainer = () => {
  return (
    <div>
      <TopNav title="Campaign" />
      <main className="p-4 md:px-5 md:py-6">
        <CampaignTable />
      </main>
    </div>
  );
};

export default CampaignContainer;
