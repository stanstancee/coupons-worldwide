"use client";

import { CalendarDays, ExternalLink } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useApi } from "@/hooks/useApi";
import Cookies from "js-cookie";

interface RenewSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RenewSubscriptionDialog({
  open,
  onOpenChange,
}: RenewSubscriptionDialogProps) {
  const business_uid = Cookies.get("business_uid");
  const { data } = useApi(`/subscription/plans?business_uid=${business_uid}`, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  console.log(data);
  // Calculate next billing date (1 month from current expiry)
  const currentExpiryDate = new Date("2025-03-24");
  const nextBillingDate = new Date(currentExpiryDate);
  nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Renew Subscription</DialogTitle>
          <DialogDescription>
            Review your subscription renewal details below.
          </DialogDescription>
        </DialogHeader>
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Pro Plan (Monthly)</CardTitle>
            <CardDescription>$9/month</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-4 text-sm">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <div className="grid gap-1">
                <p className="text-muted-foreground">Current plan expires</p>
                <p className="font-medium">{formatDate(currentExpiryDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <div className="grid gap-1">
                <p className="text-muted-foreground">Next billing date</p>
                <p className="font-medium">{formatDate(nextBillingDate)}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="link" size="sm" className="px-0">
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2"
              >
                View all plans
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Continue</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
