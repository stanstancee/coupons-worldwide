"use client";

import React, { useEffect } from "react";
import { useDashboard } from "@/context/dashboard-context";
import { ICampaignData } from "@/types/campaign";

const CampaignDetailsWrapper = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: ICampaignData;
}) => {
  const { setCampaignDetails } = useDashboard();
  useEffect(() => {
    setCampaignDetails(data);
  }, [setCampaignDetails, data]);

  return <div>{children}</div>;
};

export default CampaignDetailsWrapper;
