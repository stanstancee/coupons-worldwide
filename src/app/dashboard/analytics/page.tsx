import React from "react";
import AnalyticsWrapper from "./AnalyticsWrapper";

import { getRequest } from "@/actions/requests";
import { cookies } from "next/headers";
import AnalyticsContainer from "./AnalyticsContainer";
import { DashboardResponse } from "@/types/dashboard";

const AnalyticsPage = async () => {
  const cookieStore = await cookies();
  const business_uid = cookieStore.get("business_uid")?.value;
  const response: DashboardResponse = await getRequest({
    url: `business/dashboard?business_uid=${business_uid}`,
  });


  return (
    <AnalyticsWrapper dashboardData={response?.data?.business}>
      <AnalyticsContainer  />
    </AnalyticsWrapper>
  );
};

export default AnalyticsPage;
