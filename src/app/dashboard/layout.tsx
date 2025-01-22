import React from "react";
import DashboardWrapper from "@/components/wrapper/dashboard-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coupons Worldwide | Dashboard",
  description: "Coupons Worldwide Dashboard",
  category: "Business & Finance",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardWrapper>{children}</DashboardWrapper>;
};

export default layout;
