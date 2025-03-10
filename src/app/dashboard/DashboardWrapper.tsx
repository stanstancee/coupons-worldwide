"use client";

import React, { useEffect } from "react";
import { DashboardBusiness } from "@/types/dashboard";
import { useDashboard } from "@/context/dashboard-context";

const DashboardWrapper = ({
  children,
  dashboardData,
}: {
  children: React.ReactNode;
  dashboardData: DashboardBusiness | null;
}) => {
  const { setDashboardData } = useDashboard();

  useEffect(() => {
    setDashboardData(dashboardData);
  }, [setDashboardData, dashboardData]);
  return <div>{children}</div>;
};

export default DashboardWrapper;
