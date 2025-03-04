/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Badge } from "./badge";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState, useMemo } from "react";
import { cancelSubscriptionAction } from "@/actions/subscription";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/useApi";
import Cookies from "js-cookie";

import ModalV2 from "../ModalV2";
import { useDashboard } from "@/context/dashboard-context";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface Subscription {
  id: number;
  plan: string;
  amount: number;
  payment_channel: string;
  expires: string;
  status: string;
  auto_renewal: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export default function SubscriptionTable() {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const business_uid = Cookies.get("business_uid");
  const { data } = useApi(
    `/subscription/list?business_uid=${business_uid}`,
    {}
  );

  const subscriptions: Subscription[] = useMemo(() => {
    return data?.data || [];
  }, [data]);

  return (
    <>
      <div className="w-full">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left text-sm font-medium">
                    Plan
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium">
                    Date
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium">
                    Expires
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium">
                    Payment Channel
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium">
                    Auto Renewal
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscriptions?.map((subscription) => (
                  <tr
                    key={subscription.id}
                    className="border-b last:border-b-0 hover:bg-muted/50"
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium">{subscription.plan}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {subscription?.date}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {subscription.expires}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {subscription.payment_channel}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          subscription.auto_renewal ? "default" : "secondary"
                        }
                      >
                        {subscription.auto_renewal ? "Yes" : "No"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          subscription.status?.toLowerCase() === "active"
                            ? "success"
                            : "destructive"
                        }
                      >
                        {subscription.status?.toLowerCase() === "active"
                          ? "Active"
                          : "Inactive"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            disabled={isLoading}
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {subscription.status?.toLowerCase() === "active" && (
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => {
                                setSelectedSubscription(subscription);
                                setCancelDialogOpen(true);
                              }}
                            >
                              Cancel subscription
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Grid */}
        <div className="grid gap-4 md:hidden">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{subscription.plan}</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      disabled={isLoading}
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {subscription.status?.toLowerCase() === "active" && (
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setSelectedSubscription(subscription);
                          setCancelDialogOpen(true);
                        }}
                      >
                        Cancel subscription
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="grid gap-1 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Date</span>
                  <span> {subscription.date}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Expires</span>
                  <span> {subscription.expires}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Payment</span>
                  <span> {subscription.payment_channel}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Auto Renewal</span>
                  <Badge
                    variant={
                      subscription.auto_renewal ? "default" : "secondary"
                    }
                  >
                    {subscription.auto_renewal ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Status</span>
                  <Badge
                    variant={
                      subscription.status?.toLowerCase() === "active"
                        ? "success"
                        : "destructive"
                    }
                  >
                    {subscription.status?.toLowerCase() === "active"
                      ? "Active"
                      : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SubscriptionDialog
        selectedSubscription={selectedSubscription}
        cancelDialogOpen={cancelDialogOpen}
        setCancelDialogOpen={setCancelDialogOpen}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  );
}

interface SubscriptionDiologProps {
  selectedSubscription: any;
  cancelDialogOpen: boolean;
  setCancelDialogOpen: (open: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const SubscriptionDialog = ({
  selectedSubscription,
  cancelDialogOpen,
  setCancelDialogOpen,
  isLoading,
  setIsLoading,
}: SubscriptionDiologProps) => {
  const { business } = useDashboard();
  const { toast } = useToast();
  const handleCancelSubscription = async () => {
    try {
      setIsLoading(true);
      const res = await cancelSubscriptionAction({
        business_uid: business?.uid as string,
        subscription_id: selectedSubscription?.id as string,
      });

      if (res.status) {
        toast({
          description: res?.message,
        });
        setCancelDialogOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: res?.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalV2
      isOpen={cancelDialogOpen}
      onClose={() => setCancelDialogOpen(false)}
    >
      <div className="relative w-full  p-4  md:p-6 space-y-6">
        {/* Close Button */}
        <Button
          variant="ghost"
          className="absolute top-3 right-3 hover:text-red-500"
          onClick={() => setCancelDialogOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Header */}
        <header className="text-center space-y-3">
          <h1 className="text-lg font-semibold md:text-xl">
            Cancel Subscription
          </h1>
          <p className="mt-2 text-sm text-gray-600 md:text-base">
            Are you sure you want to cancel your{" "}
            <span className="font-bold">{selectedSubscription?.plan}</span>{" "}
            subscription? This action cannot be undone.
          </p>
        </header>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center ">
          <Button
            variant="outline"
            onClick={() => setCancelDialogOpen(false)}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Keep Subscription
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancelSubscription}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Cancelling..." : "Yes, Cancel Subscription"}
          </Button>
        </div>
      </div>
    </ModalV2>
  );
};
