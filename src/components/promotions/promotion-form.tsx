/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PartyPopper } from "lucide-react";
import { promotionSchema, type PromotionFormData } from "@/lib/schema";
import { PromotionPreview } from "./promotion-preview";

import { DatePicker } from "@/components/ui/date-picker";
import { useApi } from "@/hooks/useApi";
import Cookies from "js-cookie";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

import { runPromotionAction } from "@/actions/promotion";

export function PromotionForm({}) {
  const { toast } = useToast();
  const business_uid = Cookies.get("business_uid");

  const form = useForm<PromotionFormData>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      promotionType: "" as "Store" | "Campaign",
      adChannel: "" as "Featured" | "Promoted" | "Popular",
      start_date: new Date(),
      end_date: new Date(new Date().setDate(new Date().getDate() + 7)), // Default to 7 days from now
    },
  });

  const { data: types, isLoading: isLoadingTypes } = useApi(
    "/business/promotion/types",
    {
      refreshInterval: 0,
    }
  );
  const { data: channels, isLoading: isLoadingChannels } = useApi(
    "/business/promotion/channels",
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );
  const { data: campaigns, isLoading: isLoadingCampaigns } = useApi(
    `/business/campaign/list?business_uid=${business_uid}`,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  const campaignsList = useMemo(() => {
    return campaigns?.data?.campaigns;
  }, [campaigns]);

  const channelsList = useMemo(() => {
    return channels?.data?.channels?.filter(
      (channel: any) => Number(channel.is_active) === 1
    );
  }, [channels]);

  const typesList = useMemo(() => {
    return types?.data?.promotion_types?.filter(
      (type: any) => Number(type.is_active) === 1
    );
  }, [types]);

  const [promotionType, setPromotionType] = useState<any>({});
  const [promotionChannel, setPromotionChannel] = useState<any>({});
  const [campaign, setCampaign] = useState<any>({});
  const pType = form.watch("promotionType");
  const pChannel = form.watch("adChannel");
  const campaignId = form.watch("campaignId");
  const currencySymbol = Cookies.get("currency_symbol");

  useEffect(() => {
    setPromotionType(
      typesList?.find((promotionType: any) => promotionType.name === pType)
    );

    if (pChannel) {
      setPromotionChannel(
        channelsList?.find((channel: any) => channel.name === pChannel)
      );
    }

    if (campaignId) {
      setCampaign(
        campaignsList?.find((campaign: any) => campaign.title === campaignId)
      );
    }
  }, [pType, pChannel, campaignId]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const COST_PER_DAY = useMemo(
    () => (promotionChannel.cost ? Number(promotionChannel.cost) : 0),
    [promotionChannel]
  );

  const formData = form.watch();
  const duration =
    formData.end_date && formData.start_date
      ? Math.ceil(
          (formData.end_date.getTime() - formData.start_date.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;
  const totalCost = duration * COST_PER_DAY;

  async function onSubmit(data: PromotionFormData) {
    if (!data.campaignId && data.promotionType === "Campaign") {
      toast({
        title: "Campaign is required",
        variant: "destructive",
      });

      return;
    }

    const payload = {
      total_amount: totalCost,
      start_date: convertDateFormat(formData.start_date),
      end_date: convertDateFormat(formData.end_date),
      promotion_type_id: promotionType.id,
      promotion_channel_id: promotionChannel.id,
      business_uid: business_uid as string,
      campaign_uid: campaign?.uid ? campaign.uid : null,
    };

    if (!campaign.uid) {
      delete payload.campaign_uid;
    }

    try {
      setIsLoading(true);
      const res = await runPromotionAction(payload);
      if (res.status) {
        setShowSuccess(true);
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
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
  }

  
  return (
    <div className="flex flex-col gap-4 md:gap-6 p-4 bg-white md:py-6 md:px-8 min-h-[calc(100vh-100px)]">
      <h2 className="font-semibold text-xl xl:text-2xl">Create Promotion</h2>
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                disabled={isLoadingTypes}
                name="promotionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#515B6F] font-semibold text-base">
                      Promotion Type
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="rounded-none h-[48px] text-[#515B6F]">
                          <SelectValue placeholder="Select promotion type"></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {typesList?.map((item: any) => (
                          <SelectItem
                            onClick={() => setPromotionType(item)}
                            key={item.id}
                            value={item.name}
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {formData.promotionType === "Campaign" && (
                <FormField
                  control={form.control}
                  name="campaignId"
                  disabled={isLoadingCampaigns}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#515B6F] font-semibold text-base">
                        Campaign
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="rounded-none h-[48px] text-[#515B6F]">
                            <SelectValue placeholder="Select campaign" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {campaignsList?.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.title}
                              onClick={() => setPromotionChannel(item)}
                            >
                              {item.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="adChannel"
                disabled={isLoadingChannels}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#515B6F] font-semibold text-base">
                      Ad Channel
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="rounded-none h-[48px] text-[#515B6F]">
                          <SelectValue placeholder="Select ad channel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {channelsList?.map((item) => (
                          <SelectItem key={item.id} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#515B6F] font-semibold text-base">
                      Start Date
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={field.value}
                        onSelect={field.onChange}
                        minDate={new Date()}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#515B6F] font-semibold text-base">
                      End Date
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={field.value}
                        onSelect={field.onChange}
                        minDate={formData.start_date}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="rounded-lg bg-muted p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Cost per day:</span>
                    <span>
                      {currencySymbol}
                      {COST_PER_DAY}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total cost:</span>
                    <span>
                      {currencySymbol}
                      {totalCost}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Duration:</span>
                    <span>{duration} days</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size={"lg"}
                className="w-full"
                isLoading={isLoading}
              >
                Run Ads
              </Button>
            </form>
          </Form>
        </div>

        <div className="order-first lg:order-last">
          <PromotionPreview data={formData} duration={duration} />
        </div>

        {showSuccess && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="rounded-full bg-green-100 p-3">
                  <PartyPopper className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold">
                  Promotion submitted successfully!
                </h2>
                <p className="text-muted-foreground">
                  Your Promotion will start running once approved.
                </p>
                <Link href="/dashboard/promote">
                  <Button
                    className="h-[40px]"
                    onClick={() => setShowSuccess(false)}
                  >
                    Close
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function convertDateFormat(dateString: any): string {
  const inputDate = new Date(dateString);

  // Check if the date is valid
  if (isNaN(inputDate.getTime())) {
    throw new Error("Invalid date string provided");
  }

  const tzOffset = inputDate.getTimezoneOffset();

  const adjustedDate = new Date(inputDate.getTime() - tzOffset * 60000);

  const date = adjustedDate.toISOString().split("T")[0];
  const time = adjustedDate.toISOString().split("T")[1];
  const formattedTime = time.split(".")[0];
  return `${date} ${formattedTime}`;
}
