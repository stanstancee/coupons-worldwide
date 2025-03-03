/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";

export const MinimumTransactionInput = ({ form }: { form: any }) => {
  const formatAmount = (value: string) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <FormField
      control={form.control}
      name="minimum_amount"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel
            className="text-[#1D1B23] font-semibold"
            htmlFor="minimum-transaction"
            aria-required
          ></FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                id="amount"
                placeholder="Enter amount"
                className="w-full shadow-grid-item rounded-[12px] px-6  h-[50px] pr-14"
                onChange={(e) => field.onChange(formatAmount(e.target.value))}
                value={formatAmount(field.value)}
              />
              <span className=" bg-primary rounded-[12px] text-white absolute right-0 top-0 bottom-0 w-[60px] flex items-center justify-center">
                $
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
