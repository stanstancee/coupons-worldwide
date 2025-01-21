import React from "react";
import DashboardWrapper from "@/components/wrapper/dashboard-wrapper";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardWrapper>{children}</DashboardWrapper>;
};

export default layout;
