"use client";

import { Cell, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import Image from "next/image";

const data = [
  { name: "Campaign Click", value: 2393, color: "#09BD3C" },
  { name: "Coupon Grabbed ", value: 920, color: "#FF9F29" },
];

export default function CampaignStats() {
  //   const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="w-full shadow-cards">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl text-[#1D1B23] font-bold">
          Campaign Statistics
        </CardTitle>
        <p className="text-sm text-[#717579]">Click VS Grab Rate </p>
      </CardHeader>
      <CardContent>
        <div className=" relative">
          <ChartContainer
            config={{
              active: {
                label: "Campaign Click",
                color: "#09BD3C",
              },
              closed: {
                label: "Coupon Grabbed",
                color: "#FF9F29",
              },
            }}
          >
            <PieChart width={500} height={500}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="absolute inset-0 flex items-center justify-center top-0">
            <div className="rounded-full bg-background p-4 ">
              <Image src="/svg/stats.svg" width={60} height={48} alt="icon" />
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-4 ">
              <div className="flex items-center gap-2 text-[#1D1B23]">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-base ">{item.name}:</span>
              </div>
              <span className=" font-bold">{item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
