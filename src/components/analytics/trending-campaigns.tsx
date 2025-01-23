"use client";

import { formatNumber } from "@/utils/format-number";

interface Campaign {
  title: string;
  publishedDate: string;
  views: number;
  grabs: number;
}

const campaigns: Campaign[] = [
  {
    title: "Game Online Vouchers 20% OFF",
    publishedDate: "5 June 2020",
    views: 672000,
    grabs: 72000,
  },
  {
    title: "15% OFF Granite Stone",
    publishedDate: "5 June 2020",
    views: 672000,
    grabs: 72000,
  },
  {
    title: "50% OFF Floor Lamp Get it Now!",
    publishedDate: "5 June 2020",
    views: 672000,
    grabs: 62000,
  },
  {
    title: "50% OFF Floor Lamp Get it Now!",
    publishedDate: "5 June 2020",
    views: 672000,
    grabs: 62000,
  },
];

export default function TrendingCampaigns() {
  return (
    <div className="w-full p-4 md:p-6 rounded-lg bg-white  shadow-cards">
      <h2 className="text-xl font-bold mb-6 text-[#1D1B23]">
        Trending Campaign
      </h2>
      <div className="space-y-4">
        {campaigns.map((campaign, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer "
          >
            <div className="space-y-1">
              <h3 className="font-medium">{campaign.title}</h3>
              <p className="text-[13.4px] text-[#717579]">
                Published on {campaign.publishedDate}
              </p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="font-bold text-lg ">
                  {formatNumber(campaign.views)}
                </p>
                <p className="text-[13.4px] text-[#717579]">Views</p>
              </div>
              <div className="text-right min-w-[80px]">
                <p className="font-bold text-lg">
                  {formatNumber(campaign.grabs)}
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
