"use client";

import { format } from "date-fns";
import { useDashboard } from "@/context/dashboard-context";

export default function TrendingCampaigns() {
  const { dashboardData } = useDashboard();
  return (
    <div className="w-full p-4 md:p-6 rounded-lg bg-white  shadow-cards">
      <h2 className="text-xl font-bold mb-6 text-[#1D1B23]">
        Trending Campaign
      </h2>
      <div className="space-y-4">
        {dashboardData?.campaigns?.map((campaign, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer "
          >
            <div className="space-y-1">
              <h3 className="font-medium">{campaign?.title}</h3>
              <p className="text-[13.4px] text-[#717579]">
                {/* !!TODO: Add campaign start date */}
                Published on {format(new Date(), "dd/MM/yyyy")}
              </p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="font-bold text-lg ">
                  {campaign?.analytics?.[0]?.total_views}
                </p>
                <p className="text-[13.4px] text-[#717579]">Views</p>
              </div>
              <div className="text-right min-w-[80px]">
                <p className="font-bold text-lg">
                  {campaign?.coupons?.[0]?.total_grabs}
                </p>
                <p className="text-[13.4px] text-[#717579]">Grabs</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
