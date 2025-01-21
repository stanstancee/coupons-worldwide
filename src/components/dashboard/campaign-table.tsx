import { Button } from "../ui/button";

interface Campaign {
  name: string;
  views: string;
  grabs: string;
  redeemed: string;
  reviews: string;
}

const campaigns: Campaign[] = [
  {
    name: "Christmas Special Sales and...",
    views: "189k",
    grabs: "9k",
    redeemed: "6.2k",
    reviews: "850",
  },
  {
    name: "Tops and Gowns discount s...",
    views: "287k",
    grabs: "15k",
    redeemed: "452",
    reviews: "400",
  },
  {
    name: "Online only Trouser sales a...",
    views: "156k",
    grabs: "12k",
    redeemed: "9.1k",
    reviews: "1.25k",
  },
];

export function CampaignTable() {
  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold lg:text-2xl">
          Campaign Performance
        </h3>
        <Button className="font-bold text-primary bg-[#F6F6F6] rounded-[14.13px] hover:bg-[#E5E5E5]">
          See All
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left font-semibold text-[#717171] border-b md:text-lg">
              <th className="whitespace-nowrap pb-4">Campaign</th>
              <th className="whitespace-nowrap pb-4">Views</th>
              <th className="whitespace-nowrap pb-4">Grabs</th>
              <th className="whitespace-nowrap pb-4">Redeemed</th>
              <th className="whitespace-nowrap pb-4">Reviews</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {campaigns.map((campaign) => (
              <tr key={campaign.name} className="md:text-lg">
                <td className="whitespace-nowrap py-4 font-semibold md:text-lg">{campaign.name}</td>
                <td className="whitespace-nowrap py-4">{campaign.views}</td>
                <td className="whitespace-nowrap py-4">{campaign.grabs}</td>
                <td className="whitespace-nowrap py-4">{campaign.redeemed}</td>
                <td className="whitespace-nowrap py-4">{campaign.reviews}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
