/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { LogoUpload } from "./logo-upload";
import { RichTextEditor } from "./rich-text-editor";
import { companyFormSchema, type CompanyFormValues } from "@/lib/schema";
import { Separator } from "../ui/separator";
import TitleAndDescription from "../ui/title-and-description";
import { useDashboard } from "@/context/dashboard-context";
import { useApi } from "@/hooks/useApi";
import { useState, useEffect, useMemo } from "react";
import { updateBasicAction } from "@/actions/settings";
import { useToast } from "@/hooks/use-toast";
import { mutate } from "swr";

export default function CompanyProfileForm() {
  const { business } = useDashboard();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data } = useApi("/business/list-industries", {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  const [industries, setIndustries] = useState<{ id: number; name: string }[]>(
    []
  );

  const { toast } = useToast();

  useEffect(() => {
    if (data) {
      setIndustries(data?.data || []);
    }
  }, [data]);

  const industriesOptions = useMemo(() => {
    return industries?.map((industry) => ({
      value: industry.name,
      label: industry.name,
    }));
  }, [industries]);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      website: "",
      email: "",
      company_size: "",
      primary_industry: "",
      phone: "",
      about: "",
      secondary_industry: "",
    },
  });
  

  useEffect(() => {
    if (business) {
      form.reset({
        name: business.name,
        website: business.website as string,
        email: business.email,
        company_size: business.company_size,
        primary_industry: business.primary_industry as string,
        secondary_industry: business.secondary_industry ||  "" ,
        phone: business.phone,
        about: business.about,
      });
    }
  }, [business, form]);

  // useEffect(() => {
  //   if (business) {
  //     form.setValue("name", business.name);
  //     form.setValue("website", business.url);
  //     form.setValue("email", business.email);
  //     form.setValue("company_size", business.company_size);
  //     form.setValue("primary_industry", business.primary_industry as string);
  //     form.setValue("phone", business.phone);
  //     form.setValue("about", business.about ?? "");
  //   }
  // }, [business, form]);

  async function onSubmit(data: CompanyFormValues) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    formData.append("business_uid", business?.uid || "");

    try {
      setIsLoading(true);
      const res = await updateBasicAction(formData);
      if (res.status) {
        toast({
          title: "Success",
          description: res?.message,
        });

        await mutate("/profile/info");
      } else {
        toast({
          title: "Error",
          description: res?.message,
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
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-[1200px]"
        >
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <Separator />

            <div className="flex flex-col gap-4 lg:flex-row  xl:gap-11  2xl:gap-28">
              <div className="md:max-w-[350px]">
                <TitleAndDescription
                  title="Company Logo"
                  description="This image will be shown publicly as company logo."
                />
              </div>

              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LogoUpload
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator />

            <div className="space-y-6">
              <div className="flex flex-col gap-4 lg:flex-row  xl:gap-11  2xl:gap-28">
                <div className="md:max-w-[350px]">
                  <TitleAndDescription
                    title="Company Details"
                    description="Introduce your company core info quickly to users by fill up company details"
                  />
                </div>

                <div className="flex flex-col gap-4 w-full lg:max-w-[600px]">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#515B6F] font-semibold text-base">
                          Company Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full rounded-none h-[48px] text-[#515B6F]"
                            placeholder="Enter company name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#515B6F] font-semibold text-base">
                          Website
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="url"
                            className="w-full text-[#515B6F]  rounded-none h-[48px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#515B6F] font-semibold text-base">
                          Official Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="w-full rounded-none h-[48px] text-[#515B6F]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="company_size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#515B6F] font-semibold text-base">
                            Employee
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              className="w-full rounded-none h-[48px] text-[#515B6F]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="primary_industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#515B6F] font-semibold text-base">
                            Industry
                          </FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className="rounded-none h-[48px] text-[#515B6F]">
                                <SelectValue
                                  placeholder={
                                    business?.primary_industry ||
                                    "Select industry"
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {industriesOptions.map((industry) => (
                                <SelectItem
                                  key={industry.value}
                                  value={industry.value}
                                >
                                  {industry.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                      control={form.control}
                      name="secondary_industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#515B6F] font-semibold text-base">
                          Secondary Industry
                          </FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className="rounded-none h-[48px] text-[#515B6F]">
                                <SelectValue
                                  placeholder={
                                    business?.secondary_industry ||
                                    "Select secondary industry"
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {industriesOptions.map((industry) => (
                                <SelectItem
                                  key={industry.value}
                                  value={industry.value}
                                >
                                  {industry.label}
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#515B6F] font-semibold text-base">
                          Official Phone number
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            className="w-full  rounded-none h-[48px] text-[#515B6F]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row  xl:gap-11  2xl:gap-28">
              <div className="md:max-w-[350px]">
                <TitleAndDescription
                  title="About Company"
                  description="Brief description for your company. URLs are hyperlinked."
                />
              </div>

              {business?.uid ? (
                <div className="w-full ">
                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#515B6F] font-semibold text-base">
                          Description
                        </FormLabel>
                        <FormControl>
                          <RichTextEditor
                            value={field.value || business?.about || ""}
                            onChange={field.onChange}
                            placeholder="Enter description"
                          />
                        </FormControl>
                        <p className="text-sm text-muted-foreground text-right">
                          Maximum 500 characters
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <Separator />

          <div className="flex justify-end">
            <Button isLoading={isLoading} type="submit" className="h-[48px]">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
