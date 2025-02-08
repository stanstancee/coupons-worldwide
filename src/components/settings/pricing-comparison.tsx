"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";
import TitleAndDescription from "../ui/title-and-description";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function PricingComparison() {
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly">("monthly");

  const features = [
    "Job Posting (Limited)",
    "Company Profile Page",
    "Job Alerts",
    "Basic Applicant Tracking",
    "Advanced Applicant Tracking System (ATS)",
    "Unlimited Job Postings",
    "Featured Job Listings",
    "Access to Candidate Database",
    "Customizable Screening Tools",
    "Employer Branding Tools",
    "Priority Customer Support",
  ];

  return (
    <div className="space-y-8 max-w-[1200px] py-10 px-4 lg:px-0">
      {/* Header */}
      <div className="mb-12">
        <TitleAndDescription
          title="Subscription"
          description="Desired subscription."
        />
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-l-lg",
              activeTab === "monthly"
                ? "bg-[#393A3D] text-white"
                : "bg-white text-gray-900 hover:bg-gray-100"
            )}
            onClick={() => setActiveTab("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-r-lg",
              activeTab === "yearly"
                ? "bg-[#1A2B88] text-white"
                : "bg-white text-gray-900 hover:bg-gray-100"
            )}
            onClick={() => setActiveTab("yearly")}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="hidden lg:grid lg:grid-cols-[1fr,auto,auto] gap-4">
        {/* Empty cell for alignment */}
        <div></div>

        {/* Monthly Header */}
        <div className="text-center mb-4 w-[300px]">
          <h3 className="text-2xl text-[#7C8493] mb-4">Monthly</h3>
          <div className="bg-[#393A3D] text-white rounded-t-[1rem] p-6">
            <div className="text-2xl font-bold mb-1">$4.99</div>
            <div className="text-sm text-gray-300">Starter</div>
          </div>
        </div>

        {/* Yearly Header */}
        <div className="text-center mb-4 w-[300px]">
          <h3 className="text-2xl text-[#7C8493] mb-4">Yearly</h3>
          <div className="bg-[#1A2B88] text-white rounded-t-[1rem] p-6">
            <div className="text-2xl font-bold mb-1">$4.99</div>
            <div className="text-sm text-gray-300">Best Deal</div>
          </div>
        </div>

        {/* Features List */}
        {features.map((feature) => (
          <div
            key={feature}
            className="grid grid-cols-[1fr,auto,auto] col-span-3 items-center mb-3"
          >
            <span className="text-[#515B6F]">{feature}</span>
            <div className="w-[300px] flex justify-center">
              <CircleCheck className="w-5 h-5 text-[#393A3D]" />
            </div>
            <div className="w-[300px] flex justify-center">
              <CircleCheck className="w-5 h-5 text-[#1A2B88]" />
            </div>
          </div>
        ))}

        {/* Empty cell for alignment */}
        <div></div>

        {/* Action Buttons */}
        <div className="w-[300px] pt-6">
          <Button className="w-full h-[48px] bg-[#393A3D] text-white rounded-md hover:bg-zinc-700 transition-colors">
            ACTIVE PLAN
          </Button>
        </div>

        <div className="w-[300px] pt-6">
          <Button className="w-full h-[48px] bg-[#1A2B88] text-white rounded-md hover:bg-blue-700 transition-colors">
            Get Started
          </Button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-8">
        {/* Monthly Card */}
        <div className={cn("space-y-6", activeTab === "yearly" && "hidden")}>
          <div className="bg-[#393A3D] text-white rounded-t-[1rem] p-6 text-center">
            <h3 className="text-2xl mb-2">Monthly</h3>
            <div className="text-2xl font-bold mb-1">$4.99</div>
            <div className="text-sm text-gray-300">Starter</div>
          </div>
          <div className="space-y-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <CircleCheck className="w-5 h-5 text-[#393A3D] flex-shrink-0" />
                <span className="text-[#515B6F] text-sm">{feature}</span>
              </div>
            ))}
          </div>
          <Button className="w-full h-[48px] bg-[#393A3D] text-white rounded-md hover:bg-zinc-700 transition-colors">
            ACTIVE PLAN
          </Button>
        </div>

        {/* Yearly Card */}
        <div className={cn("space-y-6", activeTab === "monthly" && "hidden")}>
          <div className="bg-[#1A2B88] text-white rounded-t-[1rem] p-6 text-center">
            <h3 className="text-2xl mb-2">Yearly</h3>
            <div className="text-2xl font-bold mb-1">$4.99</div>
            <div className="text-sm text-gray-300">Best Deal</div>
          </div>
          <div className="space-y-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <CircleCheck className="w-5 h-5 text-[#1A2B88] flex-shrink-0" />
                <span className="text-[#515B6F] text-sm">{feature}</span>
              </div>
            ))}
          </div>
          <Button className="w-full h-[48px] bg-[#1A2B88] text-white rounded-md hover:bg-blue-700 transition-colors">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
