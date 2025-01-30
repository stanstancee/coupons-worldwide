"use client";

import React from "react";
import { Form, FormField, FormControl, FormLabel, FormItem } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

import { Textarea } from "../ui/textarea";
import { SelectDate } from "./select-date";
import { MinimumTransactionInput } from "./minimum-transaction-input";
import UploadImages from "./upload-images";
import CouponForm from "./coupon-generation";

const CreateCampaignForm = () => {
  const formSchema = z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string(),
    currency: z.string(),
    amount: z.string(),
    discount: z.string(),
    minimum: z.string(),
    valid_until: z.date({
      required_error: "Date is required",
    }),
    minimum_transaction: z.string(),
    number_of_coupons: z.string(),
    //csv file
    csv_file: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      keywords: "",
      currency: "",
      amount: "",
      discount: "",
      minimum: "",
      valid_until: new Date(),
      minimum_transaction: "",
      number_of_coupons: "",
      csv_file: "",
    },
  });

  const [keywords, setKeywords] = React.useState<string[]>([
    "#fashion",
    "#women",
    "#trend",
    "#clothes",
  ]);
  const [inputValue, setInputValue] = React.useState("");

  const handleAddKeyword = () => {
    if (inputValue.trim() && !keywords.includes(inputValue)) {
      if (!inputValue.startsWith("#")) {
        const input = "#" + inputValue.trim();

        setKeywords((prevKeywords) => [...prevKeywords, input]);
        setInputValue("");
      } else {
        setKeywords((prevKeywords) => [...prevKeywords, inputValue.trim()]);
        setInputValue("");
      }
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

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => console.log(values))}
          className="grid gap-4 lg:gap-6 lg:grid-cols-12"
        >
          <div className="lg:col-span-7 shadow-grid-item bg-white p-4 lg:p-7 rounded-[12px] space-y-4 lg:space-xy-8 2xl:space-y-10">
            <h1 className="text-[#1D1B23] text-lg md:text-xl font-bold">
              Describe your campaign below
            </h1>
            <p className="text-[#717579] text-sm max-w-[656px]">
              Enter details about your coupons below, ensure to put all the fine
              details so the customers can understand and grab the coupons,
              thereby increasing your sales.
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
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
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
                    </div>
                  </FormControl>
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
                      <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl id="currency">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <Input
                          {...field}
                          id="currency"
                          placeholder="USD"
                          className=" h-[50px] w-full border-c-orange shadow-grid-item rounded-[12px] px-6 py-5 pl-10 focus-visible:outline-none focus-visible:ring-c-orange active:border-c-orange"
                        />
                      </div>
                    </FormControl>
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
                          className="h-[50px] w-full border-c-orange shadow-grid-item rounded-[12px] px-6 py-5 pr-10  focus-visible:outline-none focus-visible:ring-c-orange active:border-c-orange "
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          %
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
              <MinimumTransactionInput form={form} />
              {/* start date */}
              <SelectDate form={form} title="Start Date" name="start-date" />
              <SelectDate form={form} title="Valid Until" name="valid-until" />
            </div>
          </div>
          <div className="lg:col-span-5  space-y-4 lg:space-xy-8 2xl:space-y-10">
            <UploadImages />
            <CouponForm form={form} />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCampaignForm;
