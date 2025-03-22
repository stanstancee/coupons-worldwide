"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { useDashboard } from "@/context/dashboard-context";
import { NoData } from "../ui/no-data";

import { cn } from "@/lib/utils";

// interface Campaign {
//   name: string;
//   views: string;
//   grabs: string;
//   redeemed: string;
//   reviews: string;
// }

export function RecentPromotions() {
  const { dashboardData } = useDashboard();
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="mb-4  flex items-center justify-between">
        <h3 className="text-base md:text-lg font-bold lg:text-xl">
          Recent Promotions
        </h3>
        <Link href={"/dashboard/promote"}>
          <Button className="font-bold text-primary bg-[#F6F6F6] rounded-[14.13px] hover:bg-[#E5E5E5]">
            See All
          </Button>
        </Link>
      </div>
      {dashboardData && dashboardData?.recent_promotions?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left   border-b  text-sm  ">
                <th className="whitespace-nowrap pb-4 px-2 font-semibold ">
                  Campaign
                </th>
                <th className="whitespace-nowrap pb-4 px-2 font-semibold">
                  Duration
                </th>
                <th className="whitespace-nowrap pb-4 px-2 text-right font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {dashboardData?.recent_promotions?.map((promotion, index) => (
                <tr key={index} className="md:text-base text-sm">
                  <td className="whitespace-nowrap py-4 px-2 truncate max-w-[150px]">
                    {`campaign ${index + 1}`}
                  </td>

                  <td className="whitespace-nowrap py-4 px-2">
                    {`${parseInt(promotion?.duration)} days`}
                  </td>
                  <td className="whitespace-nowrap py-4 px-2 text-right">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium capitalize",
                        promotion?.approval_status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      )}
                    >
                      {promotion?.approval_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoData
          title="No Promotion"
          description="Your business has no promotion"
        />
      )}
    </div>
  );
}
