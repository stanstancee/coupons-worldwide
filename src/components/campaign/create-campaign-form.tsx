"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

import { Textarea } from "../ui/textarea";
import { SelectDate } from "./select-date";
import { MinimumTransactionInput } from "./minimum-transaction-input";
import UploadImages from "./upload-images";
import CouponForm from "./coupon-generation";
import NewCampaignHeader from "./new-campaign-header";
import { useDashboard } from "@/context/dashboard-context";

import { useApi } from "@/hooks/useApi";
import { useToast } from "@/hooks/use-toast";
import { removeCommasAndSpaces } from "@/utils/format-number";
import { createCampaignAction } from "@/actions/campaign";
import { useRouter } from "next/navigation";
import Loading from "../loading";

import Cookies from "js-cookie";

const CreateCampaignForm = () => {
  const { toast } = useToast();
  const formSchema = z.object({
    title: z.string().min(3),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters" }),
    keywords: z.array(z.string()),
    currency: z.string()?.optional(),

    amount: z.string().min(1, { message: "Amount is required" }),
    discount: z.string().min(1, { message: "Discount is required" }),
    minimum_amount: z.string().optional(),
    valid_till: z.date({
      required_error: "Date is required",
    }),
    start_date: z.date({
      required_error: "Date is required",
    }),
    type: z.enum(["auto", "upload"]),
    total_coupons: z.string().optional(),
    activation_type: z.enum(["online", "store"]),
    csv: z.instanceof(File).optional(),
    // cover image file

    claim_type: z.enum(["single", "multiple"]),
    claim_limit: z.string().optional(),
  });

  const router = useRouter();

  const { data, isLoading } = useApi("/business/campaign/keywords", {
    revalidateOnFocus: false,
    refreshInterval: 60000,
    revalidateOnReconnect: false,
  });

  const [status, setStatus] = useState<"draft" | "">("");
  const { business } = useDashboard();
  const [isLoading2, setIsLoading2] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [allKeyWords, setAllKeyWords] = useState<string[]>([]);
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = React.useState("");
  const business_uid = Cookies.get("business_uid");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      keywords: [],
      currency: "",
      amount: "",
      discount: "",
      minimum_amount: "0",
      valid_till: new Date(),
      start_date: new Date(),
      total_coupons: "",
      claim_type: "single",
      claim_limit: "0",
      type: "auto",
      activation_type: "store",
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setAllKeyWords(
        data?.data?.map((keyword: { name: string }) => keyword.name)
      );
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddKeyword = (keyword: string = inputValue) => {
    if (keyword.trim() && !keywords.includes(keyword)) {
      const newKeyword = keyword.startsWith("#")
        ? keyword.trim()
        : "#" + keyword.trim();
      setKeywords((prevKeywords) => [...prevKeywords, newKeyword]);
      setInputValue("");
      setSuggestedKeywords([]);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 0) {
      const suggestions = allKeyWords.filter((kw) =>
        kw.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedKeywords(suggestions);
      setShowSuggestions(true);
    } else {
      setSuggestedKeywords([]);
      setShowSuggestions(false);
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setKeywords((prevKeywords) =>
      prevKeywords.filter((kw) => kw !== keywordToRemove)
    );
  };

  const formatAmount = (value: string) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    const cover_image = uploadedFiles?.length ? uploadedFiles[0] : "";
    const media = uploadedFiles?.slice(1, uploadedFiles?.length);
    if (!cover_image) {
      toast({
        description: "Cover image is required",
        variant: "destructive",
      });
      return;
    } else if (media?.length === 0) {
      toast({
        description: "Upload more images",
        variant: "destructive",
      });

      return;
    } else if (!keywords?.length) {
      toast({
        description: "Keywords are required",
        variant: "destructive",
      });
      return;
    } else if (values?.type === "auto" && !values?.total_coupons) {
      toast({
        description: "Enter the number of coupons to generate",
        variant: "destructive",
      });
      return;
    } else if (values?.type === "upload" && !values.csv) {
      toast({
        description: "Upload CSV file",
        variant: "destructive",
      });
      return;
    } else if (values.claim_type === "multiple" && !values.claim_limit) {
      toast({
        description: "Please choose claim limit",
        variant: "destructive",
      });
      return;
    }
    formData.append("business_uid", business_uid || "");
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("type", values.type);

    formData.append("activation_type", values.activation_type);
    formData.append("claim_type", values.claim_type);
    formData.append("cover_image", cover_image);
    media?.map((file) => {
      formData.append("media[]", file);
    });
    keywords?.map((kw) => {
      formData.append("keywords[]", kw);
    });
    formData.append("amount", removeCommasAndSpaces(values.amount));
    formData.append("currency", business?.business_country?.currency || "");
    formData.append(
      "minimum_amount",
      removeCommasAndSpaces(values.minimum_amount || "0")
    );
    formData.append("discount", removeCommasAndSpaces(values.discount));
    //conver date to 2024-02-14  yyyy-mm-dd
    formData.append(
      "start_date",
      values.start_date?.toISOString().split("T")[0]
    );
    formData.append(
      "valid_till",
      values.valid_till?.toISOString().split("T")[0]
    );

    if (values.claim_type === "multiple") {
      formData.append("claim_limit", values.claim_limit as string);
    }

    if (values.type === "upload") {
      formData.append("csv", values.csv as File);
    }
    if (values.type === "auto") {
      formData.append(
        "total_coupons",
        removeCommasAndSpaces(values.total_coupons?.toString() || "")
      );
    }
    if (status) {
      formData.append("status", status);
    }

    try {
      setIsLoading2(true);
      const res = await createCampaignAction(formData);
      if (res.status) {
        toast({
          description: res.message,
        });
        router.push("/dashboard/campaign");
      } else {
        toast({
          variant: "destructive",
          description: res.message,
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred!";
      toast({
        variant: "destructive",
        description: errorMessage,
      });
    } finally {
      setIsLoading2(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-4 md:px-5 md:py-6 space-y-6"
        >
          <NewCampaignHeader setStatus={setStatus} />

          <div className="grid gap-4 lg:gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 shadow-grid-item bg-white p-4 lg:p-7 rounded-[12px] space-y-4 lg:space-xy-8 2xl:space-y-10">
              <h1 className="text-[#1D1B23] text-lg md:text-xl font-bold">
                Describe your campaign below
              </h1>
              <p className="text-[#717579] text-sm max-w-[656px]">
                Enter details about your coupons below, ensure to put all the
                fine details so the customers can understand and grab the
                coupons, thereby increasing your sales.
              </p>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel
                      className="text-[#1D1B23] font-semibold"
                      htmlFor="title"
                      aria-required
                    >
                      Campaign Name
                      <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl id="title">
                      <Input
                        {...field}
                        id="title"
                        placeholder="Enter a title for your campaign"
                        className="w-full shadow-grid-item rounded-[12px] px-6  h-[50px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel
                      className="text-[#1D1B23] font-semibold"
                      htmlFor="description"
                      aria-required
                    >
                      Description
                      <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl id="description">
                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Enter a description for your campaign"
                        className="w-full shadow-grid-item rounded-[12px] px-6 py-5 h-[288px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="keywords"
                render={() => (
                  <FormItem className="space-y-2">
                    <FormLabel
                      className="text-[#1D1B23] font-semibold"
                      htmlFor="keywords"
                      aria-required
                    >
                      Keywords
                      <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl id="keywords">
                      <div className="w-full shadow-grid-item rounded-[12px] px-6 py-5 flex flex-wrap items-center gap-2 border border-gray-300 shadow-grid-item min-h-[131px]">
                        {keywords.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-[#FFF8E0] text-[#FF7D34] px-4 py-2 rounded-[12px] text-sm lg:text-base flex items-center gap-2"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveKeyword(tag)}
                              className="text-red-500 hover:text-red-700 focus:outline-none"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                        <div className="relative" ref={inputRef}>
                          <Input
                            disabled={isLoading}
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === "Tab") {
                                e.preventDefault();
                                handleAddKeyword();
                              }
                            }}
                            type="text"
                            placeholder="#Add keyword"
                            className=" outline-none border-none text-sm font-medium text-gray-600 flex-1 min-w-14"
                          />
                          {showSuggestions && suggestedKeywords.length > 0 && (
                            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                              {suggestedKeywords.map((suggestion, index) => (
                                <div
                                  key={index}
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => handleAddKeyword(suggestion)}
                                >
                                  {suggestion}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel
                        className="text-[#1D1B23] font-semibold"
                        htmlFor="currency"
                        aria-required
                      >
                        Currency
                        {/* <span className="text-red-500 ml-1">*</span> */}
                      </FormLabel>
                      <FormControl id="currency">
                        {/* <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            $
                          </span>
                          <Input
                            {...field}
                            id="currency"
                            placeholder="USD"
                            className=" h-[50px] w-full border-c-orange shadow-grid-item rounded-[12px] px-6 py-5 pl-10 focus-visible:outline-none focus-visible:ring-c-orange active:border-c-orange"
                          />
                        </div> */}
                        {/* <CurrencySelect
                          value={field.value}
                          onChange={field.onChange}
                        /> */}

                        <Input
                          {...field}
                          value={business?.business_country?.currency}
                          id="currency"
                          disabled
                          className="h-[50px] w-full border-c-orange shadow-grid-item rounded-[12px] px-6 py-5 focus-visible:outline-none focus-visible:ring-c-orange active:border-c-orange"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel
                        className="text-[#1D1B23] font-semibold"
                        htmlFor="amount"
                        aria-required
                      >
                        Amount
                        <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormControl id="amount">
                        <Input
                          {...field}
                          id="amount"
                          placeholder="Enter amount"
                          className="h-[50px] w-full border-c-orange shadow-grid-item rounded-[12px] px-6 py-5 focus-visible:outline-none focus-visible:ring-c-orange active:border-c-orange"
                          onChange={(e) =>
                            field.onChange(formatAmount(e.target.value))
                          }
                          value={formatAmount(field.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel
                        className="text-[#1D1B23] font-semibold"
                        htmlFor="discount"
                        aria-required
                      >
                        Discount %<span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormControl id="discount">
                        <div className="relative">
                          <Input
                            {...field}
                            id="discount"
                            placeholder="Enter discount"
                            type="number"
                            className="h-[50px] w-full border-c-orange shadow-grid-item rounded-[12px] px-6 py-5 pr-10  focus-visible:outline-none focus-visible:ring-c-orange active:border-c-orange "
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            %
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
                <MinimumTransactionInput form={form} />
                {/* start date */}
                <SelectDate form={form} title="Start Date" name="start_date" />
                <SelectDate form={form} title="Valid Until" name="valid_till" />
              </div>
            </div>
            <div className="lg:col-span-5  space-y-4 lg:space-xy-8 2xl:space-y-10">
              <UploadImages
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
              />
              <CouponForm form={form} />
            </div>
          </div>
        </form>
      </Form>
      <Loading loading={isLoading2} />
    </div>
  );
};

export default CreateCampaignForm;
