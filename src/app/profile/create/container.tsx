"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import CompanyDetails from "./CompanyDetails";
import Uploads from "./Uploads";
import About from "./About";

const Container = () => {
  const [activeTab, setActiveTab] = useState<string>("details");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="gap-10 lg:gap-20 mb-8">
        <TabsTrigger value="details">Company Details</TabsTrigger>
        <TabsTrigger value="about">About Company</TabsTrigger>
        <TabsTrigger value="logo">Logo and Uploads</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <CompanyDetails onNext={() => setActiveTab("about")} />
      </TabsContent>
      <TabsContent value="about">
        <About onNext={() => setActiveTab("logo")} />
      </TabsContent>
      <TabsContent value="logo">
        <Uploads onNext={() => setActiveTab("details")} />
      </TabsContent>
    </Tabs>
  );
};

export default Container;
