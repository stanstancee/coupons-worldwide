"use client";

import React from "react";
import { Button } from "../ui/button";

const SubscriptionInfo = () => {
  return (
    <div className="bg-subscription_bg px-4 md:px-8 py-4 md:py-5 bg-cover">
      <div className="flex md:justify-end items-center gap-4 md:gap-8">
        <div className="space-y-1">
          <h2 className="font-medium text-xl">Subscription Status</h2>
          <p>ACTIVE TILL - 2nd, June, 2026</p>
        </div>
        <Button className="md:h-[50px] shadow-btn  text-primary-blue bg-[#D5DFEE] hover:bg-slate-50 font-bold">
          RENEW
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionInfo;
