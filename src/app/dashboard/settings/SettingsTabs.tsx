"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Separator } from "@/components/ui/separator";
import CompanyProfileForm from "@/components/settings/company-profile-form";
import SocialForm from "@/components/settings/social-and-images";
// import PricingComparison from "@/components/settings/pricing-comparison";
import SubscriptionTable from "@/components/settings/subscription-table";

const SettingsTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="gap-10 lg:gap-20 mb-8 relative">
        <TabsTrigger className="" value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger value="images">Social /Images</TabsTrigger>
        <TabsTrigger value="subscription">Subscription </TabsTrigger>
        <Separator className="absolute -bottom-0 h-[2px] " />
      </TabsList>
      <TabsContent value="overview">
        <CompanyProfileForm />
      </TabsContent>
      <TabsContent value="images">
        <SocialForm />
      </TabsContent>
      <TabsContent value="subscription">
        <SubscriptionTable />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
