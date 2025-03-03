"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
// import Link from "next/link";
import RenewSubscriptionDialog from "./subscription-dialog";
import { useDashboard } from "@/context/dashboard-context";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const SubscriptionInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { business } = useDashboard();
  const formattedDate = business?.current_subscription?.expires_at
    ? format(
        business?.current_subscription?.expires_at as string,
        "dd, MMM, yyyy"
      )
    : "";

  return (
    <div className="bg-subscription_bg px-4 md:px-8 py-4 md:py-5 bg-cover">
      <div className="flex md:justify-end items-center gap-4 md:gap-8">
        <div className="space-y-1">
          <h2 className="font-medium text-xl">Subscription Status</h2>
          <p>
            ACTIVE TILL -{" "}
            {/* {format(
              business?.current_subscription?.expires_at as string,
              "dd, MMM, yyyy"
            )} */}
            {formattedDate}
          </p>
        </div>
        {/* <Link href="/dashboard/settings"> */}
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "md:h-[50px] shadow-btn  text-primary-blue bg-[#D5DFEE] hover:bg-slate-50 font-bold",
            business?.current_subscription?.status !== 1 &&
              "bg-destructive text-white"
          )}
        >
          RENEW
        </Button>
        {/* </Link> */}
      </div>
      <RenewSubscriptionDialog open={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
};

export default SubscriptionInfo;
