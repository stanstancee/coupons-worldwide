import React from "react";
import DashboardContainer from "./DashboardContainer";

import { getRequest } from "@/actions/requests";
import { cookies } from "next/headers";
import DashboardWrapper from "./DashboardWrapper";
import { DashboardResponse } from "@/types/dashboard";

const DashboardPage = async () => {
  const cookieStore = await cookies();
  const business_uid = cookieStore.get("business_uid")?.value;
  const response: DashboardResponse = await getRequest({
    url: `business/dashboard?business_uid=${business_uid}`,
  });

  return (
    <DashboardWrapper dashboardData={response?.data?.business}>
      <DashboardContainer />
    </DashboardWrapper>
  );
};

export default DashboardPage;
