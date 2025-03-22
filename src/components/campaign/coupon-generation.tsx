/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { UploadIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormField, FormControl, FormLabel, FormItem } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useDashboard } from "@/context/dashboard-context";

export default function CouponForm({ form }: { form: any }) {
  const { campaignDetails, business } = useDashboard();
  // Highlight: Changed initial states to null to properly handle uninitialized values
  const [generationType, setGenerationType] = useState<
    "auto" | "upload" | null
  >("auto");
  const [activationType, setActivationType] = useState<
    "online" | "store" | null
  >("store");
  const [claimType, setClaimType] = useState<"single" | "multiple" | null>(
    "single"
  );

  useEffect(() => {
    if (campaignDetails?.campaign) {
      const { type, activation_type, claim_type } = campaignDetails.campaign;

      // Highlight: Updated to set both local state and form values
      if (type) {
        setGenerationType(type as "auto" | "upload");
        form.setValue("type", type);
      }

      if (activation_type) {
        setActivationType(activation_type as "online" | "store");
        form.setValue("activation_type", activation_type);
      }

      if (claim_type) {
        setClaimType(claim_type as "single" | "multiple");
        form.setValue("claim_type", claim_type);
      }
    }
  }, [campaignDetails, form]);

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    const numValue = Number.parseInt(value, 10);
    field.onChange(numValue > 10000 ? "10000" : value);
  };

  return (
    <div className="w-full space-y-8 lg:space-y-14 ">
      <div className="shadow-grid-item bg-white p-4 lg:p-7 rounded-[12px] space-y-4 lg:space-y-8 2xl:space-y-10">
        <div>
          <h3 className="text-[#1D1B23] font-semibold mb-5">
            Coupon Generation Type
          </h3>
          {/* Highlight: Wrapped RadioGroup with FormField */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={(value: "auto" | "upload") => {
                      field.onChange(value);
                      setGenerationType(value);
                    }}
                    className="flex gap-8 text-[#1D1B23] font-normal text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="auto"
                        id="auto"
                        className="text-c-orange"
                      />
                      <Label
                        htmlFor="auto"
                        className="font-normal text-xs md:text-sm"
                      >
                        System Automated Generation
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upload" id="upload" />
                      <Label
                        htmlFor="upload"
                        className="font-normal text-xs md:text-sm"
                      >
                        Upload Coupon Data
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {generationType === "auto" ? (
          <FormField
            control={form.control}
            name="total_coupons"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel
                  className="text-[#1D1B23] font-semibold"
                  htmlFor="total_coupons"
                  aria-required
                >
                  Number of Coupons to Generate
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl id="total_coupons">
                  <Input
                    {...field}
                    id="total_coupons"
                    placeholder="Enter number"
                    className="h-[50px] w-full border-c-orange shadow-grid-item rounded-[12px] px-6 py-5 focus-visible:outline-none focus-visible:ring-c-orange active:border-c-orange max-w-[200px]"
                    onChange={(e) => handleNumberChange(e, field)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ) : (
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="csv"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex items-center justify-between gap-1">
                    <FormLabel
                      className="text-[#1D1B23] font-semibold"
                      htmlFor="csv"
                      aria-required
                    >
                      Upload your coupon CSV file
                      <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <span className="text-c-orange  text-xs font-semibold">
                      Download Sample CSV
                    </span>
                  </div>
                  <FormControl id="csv">
                    <div className="relative">
                      <Input
                        {...field}
                        id="csv_file"
                        placeholder="select csv file"
                        accept=".csv"
                        type="file"
                        className="h-[50px] w-full shadow-grid-item rounded-[12px] px-6 py-5 pr-10"
                      />
                      <UploadIcon className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-[#1D1B23] font-semibold">Claim Type</h3>
          {/* Highlight: Wrapped RadioGroup with FormField */}
          <FormField
            control={form.control}
            name="claim_type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={(value: "single" | "multiple") => {
                      field.onChange(value);
                      setClaimType(value);
                    }}
                    className="flex gap-8 text-[#1D1B23] font-normal text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="single" id="single" />
                      <Label htmlFor="single" className="font-normal">
                        Single
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="multiple" id="multiple" />
                      <Label htmlFor="multiple" className="font-normal">
                        Multiple
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          {claimType === "multiple" && (
            <FormField
              control={form.control}
              name="claim_limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1D1B23] font-semibold">
                    Number of Claims
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[300px] h-[50px]">
                        <SelectValue placeholder="Select number of claims" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          )}
        </div>
      </div>

      <div className="shadow-grid-item bg-white p-4 lg:p-7 rounded-[12px] space-y-4 lg:space-y-8 2xl:space-y-10">
        <div className="pt-4">
          <h3 className="text-[#1D1B23] font-semibold mb-5">
            Coupon Activation Type
          </h3>
          {/* Highlight: Wrapped RadioGroup with FormField */}
          <FormField
            control={form.control}
            name="activation_type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={(value: "online" | "store") => {
                      field.onChange(value);
                      setActivationType(value);
                    }}
                    className="flex gap-8 text-[#1D1B23] font-normal "
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        disabled={!business?.website}
                        value="online"
                        id="online"
                      />
                      <Label
                        htmlFor="online"
                        className="font-normal text-xs md:text-sm"
                      >
                        ONLINE ACTIVATION
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        disabled={!business?.address}
                        value="store"
                        id="store"
                      />
                      <Label
                        htmlFor="store"
                        className="font-normal text-xs md:text-sm"
                      >
                        IN STORE ACTIVATION
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {activationType === "online" ? (
          <FormField
            control={form.control}
            name="activation_url"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormControl id="activation_url">
                  <Input
                    {...field}
                    id="activation_url"
                    type="url"
                    placeholder="www.websiteaddress.com display website address here"
                    className="w-full shadow-grid-item rounded-[12px] px-6  h-[50px]"
                    value={business?.website || "No business website"}
                    readOnly
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="activation_code"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormControl id="activation_code">
                  <Textarea
                    {...field}
                    id="activation_code"
                    placeholder="Display store address here"
                    className="w-full shadow-grid-item rounded-[12px] px-6 py-5 h-[130px]"
                    value={business?.address || "No business address"}
                    readOnly
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
}
