"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { useDashboard } from "@/context/dashboard-context";
import { NoData } from "../ui/no-data";

// interface Campaign {
//   name: string;
//   views: string;
//   grabs: string;
//   redeemed: string;
//   reviews: string;
// }

export function CampaignTable() {
  const { dashboardData } = useDashboard();
  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base md:text-lg font-bold lg:text-xl">
          Campaign Performance
        </h3>
        <Link href={"/dashboard/campaign"}>
          <Button className="font-bold text-primary bg-[#F6F6F6] rounded-[14.13px] hover:bg-[#E5E5E5]">
            See All
          </Button>
        </Link>
      </div>
      {dashboardData && dashboardData?.campaigns?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left font-semibold text-[#717171] border-b md:text-base text-sm ">
                <th className="whitespace-nowrap pb-4 px-2">Campaign</th>
                <th className="whitespace-nowrap pb-4 px-2">Views</th>
                <th className="whitespace-nowrap pb-4 px-2">Grabs</th>
                <th className="whitespace-nowrap pb-4 px-2">Redeemed</th>
                <th className="whitespace-nowrap pb-4 px-2">Reviews</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {dashboardData?.campaigns?.map((campaign) => (
                <tr key={campaign.id} className="md:text-base text-sm">
                  <td className="whitespace-nowrap py-4 font-semibold md:text-base px-2">
                    {campaign?.title}
                  </td>
                  <td className="whitespace-nowrap py-4 px-2">
                    {campaign?.analytics[0]?.total_views}
                  </td>
                  <td className="whitespace-nowrap py-4 px-2">
                    {campaign?.coupons[0]?.total_grabs}
                  </td>
                  <td className="whitespace-nowrap py-4 px-2">
                    {campaign?.coupons[0]?.total_redeemed}
                  </td>
                  <td className="whitespace-nowrap py-4 px-2">
                    {campaign?.total_reviews}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoData
          title="No Campaigns"
          description="Your business has no campaigns"
        />
      )}
    </div>
  );
}
