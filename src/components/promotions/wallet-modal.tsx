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

export default function WalletTopUp({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const [amount, setAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const formSchema = z.object({
    amount: z.string().min(1, "Amount is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  // const formatAmount = (value: string) => {
  //   // Remove all non-digit characters
  //   const numberOnly = value.replace(/\D/g, "");

  //   // Convert to number and format with commas
  //   const formatted = Number(numberOnly).toLocaleString("en-US");

  //   // Handle empty or invalid input
  //   if (formatted === "0" || formatted === "NaN") return "";

  //   return formatted;
  // };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    setAmount(data.amount);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    // Handle the final top up logic here
    console.log("Processing payment for:", amount.replace(/,/g, ""));
    setShowConfirmation(false);
    setIsOpen(false);
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
      />
    </>
  );
}
