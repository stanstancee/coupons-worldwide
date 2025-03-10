/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AmountInput } from "./amount-input";
import { fundWalletAction } from "@/actions/wallet";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

export default function WalletTopUp({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const [amount, setAmount] = useState("");
  const [isConfirmationView, setIsConfirmationView] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const business_uid = Cookies.get("business_uid");
  const { toast } = useToast();

  const formSchema = z.object({
    amount: z.string().min(1, "Amount is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    setAmount(data.amount);
    setIsConfirmationView(true);
  };

  const handleConfirm = async () => {
    const formData = new FormData();
    formData.append("amount", amount.replace(/,/g, ""));
    formData.append("business_uid", business_uid || ("" as string));

    try {
      setIsLoading(true);
      const res = await fundWalletAction(formData);
      if (res?.status) {
        //redirect to payment page
        window.open(res?.data?.payment_url, "_blank");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: res?.message || "Something went wrong",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
      setIsConfirmationView(false);
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsConfirmationView(false);
    setIsOpen(false);
  };

  const handleBack = () => {
    setIsConfirmationView(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] pb-14 p-4 lg:p-6 lg:pb-16 shadow-btn items-start">
        {!isConfirmationView ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-bold text-lg">
                Wallet Top Up
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 mt-4 w-full"
              >
                <p className="text-sm text-gray-500">
                  Top up your promotional wallet balance, please note that
                  wallet balance can not be used for subscription renewal.
                </p>
                <div className="max-w-[400px]">
                  <AmountInput form={form} />
                </div>
                <p className="italic text-c-green text-sm">
                  Click on the below button, you will be redirected to a secured
                  payment page.
                </p>
                <Button
                  size={'lg'}
                  type="submit"
                  className="bg-primary"
                >
                  Top Up
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="mr-2 h-8 w-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <DialogTitle className="text-center">
                  Confirm Top Up
                </DialogTitle>
              </div>
            </DialogHeader>
            <div className="space-y-6 py-4 w-full">
              <div className="flex flex-col items-center justify-center space-y-3">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <p className="text-lg font-semibold">
                  Please Confirm Your Top Up
                </p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Amount to Top Up
                  </span>
                  <span className="font-medium">${amount}</span>
                </div>
                {/* <div className="mt-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Processing Fee</span>
                  <span className="font-medium">$0.00</span>
                </div> */}
                <div className="mt-3 border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">${amount}</span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex space-x-3 w-full">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1 bg-primary"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Proceed"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
