"use client";

import React, { useEffect } from "react";
import { CampaignResponse } from "@/types/campaign";
import { useDashboard } from "@/context/dashboard-context";

const CampaignWrapper = ({
  children,
  res,
}: {
  children: React.ReactNode;
  res: CampaignResponse;
}) => {
  const { setCampaign, setCampaignResponse } = useDashboard();
  useEffect(() => {
    setCampaign(res.data.campaigns);
    setCampaignResponse(res);
  }, [res, setCampaign, setCampaignResponse]);
  return <div>{children}</div>;
};

export default CampaignWrapper;
