/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Badge } from "./badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState, useMemo } from "react";
import { downloadInvoice, cancelSubscription } from "./actions";
import { toast } from "sonner";
import { useApi } from "@/hooks/useApi";
import Cookies from "js-cookie";
import  {format }from "date-fns";

interface Subscription {
  amount: number;
  auto_renewal: number;
  business_id: number;
  created_at: string;
  expires_at: string;
  id: number;
  license: string;
  license_id: number;
  license_type: string | null;
  status: number;
  stripe_id: string;
  subscription_id: string;
  updated_at: string;
  user_id: number;
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

  const handleDownloadInvoice = async (subscriptionId: string | number) => {
    try {
      setIsLoading(true);
      await downloadInvoice(subscriptionId);
      toast.success("Invoice downloaded successfully");
    } catch (error) {
      toast.error("Failed to download invoice");
    } finally {
      setIsLoading(false);
    }
  };

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
                {subscriptions.map((subscription) => (
                  <tr
                    key={subscription.id}
                    className="border-b last:border-b-0 hover:bg-muted/50"
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium">{subscription.license}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {format(new Date(subscription.created_at), "MMMM d, yyyy")}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {format(new Date(subscription.expires_at), "MMMM d, yyyy")}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {subscription.stripe_id}
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
                          subscription.status === 1 
                            ? "success"
                            : "destructive"
                        }
                      >
                        {subscription.status === 1 ? "Active" : "Inactive"}
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
                          <DropdownMenuItem
                            onClick={() =>
                              handleDownloadInvoice(subscription.license_id)
                            }
                          >
                            Download invoice
                          </DropdownMenuItem>
                          {subscription.status === 1 && (
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
                <div className="font-medium">{subscription.license}</div>
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
                    <DropdownMenuItem
                      onClick={() => handleDownloadInvoice(subscription.id)}
                    >
                      Download invoice
                    </DropdownMenuItem>
                    {subscription.status === 1 && (
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
                  <span>  {format(new Date(subscription.created_at), "MMMM d, yyyy")}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Expires</span>
                  <span> {format(new Date(subscription.expires_at), "MMMM d, yyyy")}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Payment</span>
                  <span> {subscription.stripe_id}</span>
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
                      subscription.status === 1 
                        ? "success"
                        : "destructive"
                    }
                  >
                    {subscription.status === 1 ? "Active" : "Inactive"}
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
  const handleCancelSubscription = async () => {
    if (!selectedSubscription) return;

    try {
      setIsLoading(true);
      await cancelSubscription(selectedSubscription.id);
      toast.success("Subscription cancelled successfully");
      setCancelDialogOpen(false);
    } catch (error) {
      toast.error("Failed to cancel subscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen} modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Subscription</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel your {selectedSubscription?.plan}{" "}
            subscription? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setCancelDialogOpen(false)}
            disabled={isLoading}
          >
            Keep subscription
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancelSubscription}
            disabled={isLoading}
          >
            {isLoading ? "Cancelling..." : "Yes, cancel subscription"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
