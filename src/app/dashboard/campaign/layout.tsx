import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coupons Worldwide | Create Campaign",
  description: "Coupons Worldwide Campaign",
  category: "Business & Finance",
};

const CampaignLayout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default CampaignLayout;
