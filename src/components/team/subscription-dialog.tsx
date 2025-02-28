/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useApi } from "@/hooks/useApi";
import Cookies from "js-cookie";
import type { Plan } from "@/types/subscriptions";
import { useMemo, useState } from "react";
import { updateSubscriptionAction } from "@/actions/subscription";
import { useToast } from "@/hooks/use-toast";

interface RenewSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RenewSubscriptionDialog({
  open,
  onOpenChange,
}: RenewSubscriptionDialogProps) {
  const business_uid = Cookies.get("business_uid");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data } = useApi(`/subscription/plans?business_uid=${business_uid}`, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  const { toast } = useToast();

  const subscriptions = useMemo(() => {
    return data?.data?.plans;
  }, [data]);

  const handleSubscribe = async (plan: Plan) => {
    const formData = new FormData();

    formData.append("license_id", plan.id?.toString() as string);
    formData.append("business_uid", business_uid as string);

    try {
      setIsLoading(true);
      const res = await updateSubscriptionAction(formData);
      toast({
        title: res?.status ? "Success" : "Error",
        description: res?.message || "Something went wrong",
        variant: res?.status ? "default" : "destructive",
      });
      if (res?.data?.url) {
        window.open(res?.data?.url, "_blank");
        onOpenChange(false);
        
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] xl:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Renew Subscription</DialogTitle>
          <DialogDescription>
            Review your subscription renewal details below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {subscriptions && subscriptions?.length > 0 ? (
            subscriptions.map((plan: Plan) => (
              <div
                key={plan.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <h3 className="font-medium">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.duration_days} days - {plan.license_type} License
                  </p>
                  <p className="text-lg font-bold">
                    {plan.currency.symbol}
                    {plan.price}
                  </p>
                </div>
                <Button
                  isLoading={isLoading}
                  onClick={() => handleSubscribe(plan)}
                >
                  Subscribe
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No subscription plans available
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-3 space-y-reverse sm:space-y-0 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button asChild variant="link" size="sm" className="px-0">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2"
            >
              View subscription history
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
