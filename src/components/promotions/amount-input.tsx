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

export const AmountInput = ({ form }: { form: any }) => {
  const formatAmount = (value: string) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <FormField
      control={form.control}
      name="amount"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel
            className="text-[#1D1B23] font-semibold"
            htmlFor="amount"
            aria-required
          >
            Enter Desired Amount<span className="text-red-500 ml-1">*</span>
          </FormLabel>
          <FormControl>
            <div className="relative">
              <span className=" bg-primary rounded-[12px] text-white absolute left-0 top-0 bottom-0 w-[60px] flex items-center justify-center">
                <svg
                  width="32"
                  height="26"
                  viewBox="0 0 32 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6667 6.71667C11.3333 5.48834 8.98833 4.63334 6.83333 4.58M6.83333 4.58C4.26833 4.51667 1.97167 5.585 1.97167 8.51167C1.97167 13.895 12.6667 11.2033 12.6667 16.5883C12.6667 19.6583 9.82 20.9783 6.83333 20.88M6.83333 4.58V1.33334M1 18.3833C2.25333 19.925 4.58333 20.805 6.83333 20.88M6.83333 20.88V24.6667M17.6667 13H31M31 13L24.6 6.33334M31 13L24.6 19.6667"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <Input
                {...field}
                id="amount"
                placeholder="Enter amount"
                className="w-full shadow-grid-item rounded-[12px] px-6  h-[50px] pl-16"
                onChange={(e) => field.onChange(formatAmount(e.target.value))}
                value={formatAmount(field.value)}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
