/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "./confirmation-modal";
import { Form } from "@/components/ui/form";

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
  const [showConfirmation, setShowConfirmation] = useState(false);
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
    setShowConfirmation(true);
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
      setShowConfirmation(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="lg:max-w-[716px] pb-14 p-4 lg:p-6 lg:pb-16  shadow-btn items-start">
          <DialogHeader className="">
            <DialogTitle className="font-bold text-xl">
              Wallet Top Up
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 mt-4"
            >
              <p className="text-sm text-[#717579]">
                Top up your promotional wallet balance, please note that wallet
                balance can not be used for subscription renewal.
              </p>
              <div className="max-w-[400px]">
                <AmountInput form={form} />
              </div>
              <p className="italic text-c-green">
                Click on the below button, you will be redirected to a secured
                payment page.
              </p>
              <Button
                type="submit"
                className=" bg-primary shadow-lg w-[153px] text-lg h-[50px]"
              >
                Top Up
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        amount={amount}
        onConfirm={handleConfirm}
        isLoading={isLoading}
      />
    </>
  );
}
