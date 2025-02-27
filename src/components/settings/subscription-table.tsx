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
import { useState } from "react";
import { downloadInvoice, cancelSubscription } from "./actions";
import { toast } from "sonner";

export default function SubscriptionTable() {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const subscriptions = [
    {
      id: "sub_1234",
      plan: "Business Pro",
      date: "Jan 1, 2024",
      expires: "Dec 31, 2024",
      paymentChannel: "Visa •••• 4242",
      autoRenewal: true,
      status: "active",
    },
    {
      id: "sub_5678",
      plan: "Team Plus",
      date: "Dec 1, 2023",
      expires: "Nov 30, 2024",
      paymentChannel: "Mastercard •••• 5555",
      autoRenewal: true,
      status: "active",
    },
    {
      id: "sub_9012",
      plan: "Starter",
      date: "Jun 1, 2023",
      expires: "Nov 30, 2023",
      paymentChannel: "PayPal",
      autoRenewal: false,
      status: "expired",
    },
  ];

  const handleDownloadInvoice = async (subscriptionId: string) => {
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
                      <div className="font-medium">{subscription.plan}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {subscription.date}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {subscription.expires}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {subscription.paymentChannel}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          subscription.autoRenewal ? "default" : "secondary"
                        }
                      >
                        {subscription.autoRenewal ? "Yes" : "No"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          subscription.status === "active"
                            ? "success"
                            : "destructive"
                        }
                      >
                        {subscription.status}
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
                              handleDownloadInvoice(subscription.id)
                            }
                          >
                            Download invoice
                          </DropdownMenuItem>
                          {subscription.status === "active" && (
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
                    <DropdownMenuItem
                      onClick={() => handleDownloadInvoice(subscription.id)}
                    >
                      Download invoice
                    </DropdownMenuItem>
                    {subscription.status === "active" && (
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
                  <span>{subscription.date}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Expires</span>
                  <span>{subscription.expires}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Payment</span>
                  <span>{subscription.paymentChannel}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Auto Renewal</span>
                  <Badge
                    variant={subscription.autoRenewal ? "default" : "secondary"}
                  >
                    {subscription.autoRenewal ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Status</span>
                  <Badge
                    variant={
                      subscription.status === "active"
                        ? "success"
                        : "destructive"
                    }
                  >
                    {subscription.status}
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
